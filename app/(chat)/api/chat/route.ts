import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from "ai";
import { unstable_cache as cache } from "next/cache";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";
import { getAppSession } from "@/lib/auth/session";
import type { UserType } from "@/lib/auth/types";
import type { VisibilityType } from "@/components/visibility-selector";
import { getTierForUserType } from "@/lib/ai/tiers";
import type { ChatModel } from "@/lib/ai/models";
import { isModelIdAllowed } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { getLanguageModel, getResolvedProviderModelId } from "@/lib/ai/providers";
import { createDocument } from "@/lib/ai/tools/create-document";
import { archiveCreateEntry } from "@/lib/ai/tools/archive-create-entry";
import { archiveReadEntry } from "@/lib/ai/tools/archive-read-entry";
import { archiveUpdateEntry } from "@/lib/ai/tools/archive-update-entry";
import { archiveDeleteEntry } from "@/lib/ai/tools/archive-delete-entry";
import { archiveLinkEntries } from "@/lib/ai/tools/archive-link-entries";
import { archiveSearchEntries } from "@/lib/ai/tools/archive-search-entries";
import { archiveApplyEdits } from "@/lib/ai/tools/archive-apply-edits";
import { archivePinEntry } from "@/lib/ai/tools/archive-pin-entry";
import { archiveUnpinEntry } from "@/lib/ai/tools/archive-unpin-entry";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { isProductionEnvironment } from "@/lib/constants";
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessagesByChatId,
  getActiveMessagesByChatId,
  saveChat,
  saveMessages,
  updateChatLastContextById,
  saveAssistantMessage,
  getPinnedArchiveEntriesForChat,
} from "@/lib/db/queries";
import { consumeTokens } from "@/lib/rate-limit/token-bucket";
import { ChatSDKError } from "@/lib/errors";
import type { ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { convertToUIMessages, generateUUID } from "@/lib/utils";
import { generateTitleFromUserMessage } from "../../actions";
import { type PostRequestBody, postRequestBodySchema } from "./schema";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 60 * 60 }
);

export function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes("REDIS_URL")) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL"
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      initialPinnedSlugs,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel["id"];
      selectedVisibilityType: VisibilityType;
      initialPinnedSlugs?: string[];
    } = requestBody;

  const session = await getAppSession();

    if (!session?.user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const userType: UserType = session.user.type;

    // Enforce model entitlement server-side (guards against tampered client requests)
  const { modelIds: allowedModels, bucketCapacity, bucketRefillAmount, bucketRefillIntervalSeconds } = await getTierForUserType(userType);
    if (!isModelIdAllowed(selectedChatModel, allowedModels)) {
      return new ChatSDKError(
        userType === "guest" ? "forbidden:model" : "forbidden:model"
      ).toResponse();
    }

    // Token bucket consumption: cost = 1 user message per invocation
    try {
      await consumeTokens({
        userId: session.user.id,
        cost: 1,
        config: {
          capacity: bucketCapacity,
          refillAmount: bucketRefillAmount,
          refillIntervalSeconds: bucketRefillIntervalSeconds,
        },
      });
    } catch (e) {
      if (e instanceof ChatSDKError && e.type === "rate_limit" && e.surface === "chat") {
        return e.toResponse();
      }
      throw e;
    }

  const chat = await getChatById({ id });
  let createdNewChat = false;

    if (chat) {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError("forbidden:chat").toResponse();
      }
    } else {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
      createdNewChat = true;
      // If UI provided initialPinnedSlugs, attempt to pin them now (best-effort, ignore individual failures)
      if (initialPinnedSlugs && initialPinnedSlugs.length) {
        // De-duplicate slugs client may have repeated
        const unique = Array.from(new Set(initialPinnedSlugs)).slice(0, 12);
        // Lazy import pin helper to avoid expanding top-level import surface
        const { pinArchiveEntryToChat } = await import("@/lib/db/queries");
        await Promise.all(
          unique.map(async (slug) => {
            try {
              await pinArchiveEntryToChat({ userId: session.user.id, chatId: id, slug });
            } catch (e) {
              // Swallow errors – individual pin failure shouldn't abort first message send
              console.warn("Initial pin failed", { chatId: id, slug, error: e });
            }
          })
        );
      }
    }

  // Use only active (non-superseded) versions for context
  const messagesFromDb = await getActiveMessagesByChatId({ id });
  // For regeneration, we still send the full active path + new user message (handled client side presently)
  const uiMessages = [...convertToUIMessages(messagesFromDb), message];

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    // For a regeneration request we do NOT persist the user message again
    // (same id) – otherwise we'd trigger a unique key violation. The
    // downstream logic only needs the existing persisted user message plus
    // the previous assistant message id for lineage mutation.
    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: "user",
          parts: message.parts,
          attachments: [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    let finalMergedUsage: AppUsage | undefined;

    const stream = createUIMessageStream({
      execute: async ({ writer: dataStream }) => {
        const model = await getLanguageModel(selectedChatModel);
        // Load pinned archive entries for this chat (if any) to enrich system prompt
        let pinnedForPrompt: { slug: string; entity: string; body: string }[] | undefined;
        try {
          const pinned = await getPinnedArchiveEntriesForChat({ userId: session.user.id, chatId: id });
          if (pinned.length) {
            // Only include body if reasonably small; large bodies trimmed inside systemPrompt
            pinnedForPrompt = pinned.map(p => ({ slug: p.slug, entity: p.entity, body: p.body }));
          }
        } catch (e) {
          console.warn("Failed to load pinned entries for chat", id, e);
        }

        const result = streamText({
          model,
          system: systemPrompt({ selectedChatModel, requestHints, pinnedEntries: pinnedForPrompt }),
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(5),
          experimental_activeTools: [
            "getWeather",
            "createDocument",
            "updateDocument",
            "requestSuggestions",
            "archiveCreateEntry",
            "archiveReadEntry",
            "archiveUpdateEntry",
            "archiveDeleteEntry",
            "archiveLinkEntries",
            "archiveSearchEntries",
            "archiveApplyEdits",
            "archivePinEntry",
            "archiveUnpinEntry",
          ],
          experimental_transform: smoothStream({ chunking: "word" }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({ session, dataStream }),
            archiveCreateEntry: archiveCreateEntry({ session }),
            archiveReadEntry: archiveReadEntry({ session }),
            archiveUpdateEntry: archiveUpdateEntry({ session }),
            archiveDeleteEntry: archiveDeleteEntry({ session }),
            archiveLinkEntries: archiveLinkEntries({ session }),
            archiveSearchEntries: archiveSearchEntries({ session }),
            archiveApplyEdits: archiveApplyEdits({ session }),
            archivePinEntry: archivePinEntry({ session, chatId: id }),
            archiveUnpinEntry: archiveUnpinEntry({ session, chatId: id }),
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
          onFinish: async ({ usage }) => {
            try {
              const providers = await getTokenlensCatalog();
              // Report usage against the exact selected model id
              const modelId = getResolvedProviderModelId(selectedChatModel);
              if (!modelId) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              if (!providers) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: "data-usage",
                  data: finalMergedUsage,
                });
                return;
              }

              const summary = getUsage({ modelId, usage, providers });
              finalMergedUsage = { ...usage, ...summary, modelId } as AppUsage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            } catch (err) {
              console.warn("TokenLens enrichment failed", err);
              finalMergedUsage = usage;
              dataStream.write({ type: "data-usage", data: finalMergedUsage });
            }
          },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          })
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        // messages includes the newly streamed assistant response as the last element
        const assistantMessage = messages.findLast((m) => m.role === "assistant");
        if (assistantMessage) {
          await saveAssistantMessage({
            id: assistantMessage.id,
            chatId: id,
            parts: assistantMessage.parts,
            attachments: [],
          });
        }

        if (finalMergedUsage) {
          try {
            await updateChatLastContextById({
              chatId: id,
              context: finalMergedUsage,
            });
          } catch (err) {
            console.warn("Unable to persist last usage for chat", id, err);
          }
        }
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });

    // const streamContext = getStreamContext();

    // if (streamContext) {
    //   return new Response(
    //     await streamContext.resumableStream(streamId, () =>
    //       stream.pipeThrough(new JsonToSseTransformStream())
    //     )
    //   );
    // }

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    const vercelId = request.headers.get("x-vercel-id");

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }


    console.error("Unhandled error in chat API:", error, { vercelId });
    return new ChatSDKError("offline:chat").toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  // Unified session (Clerk or guest)
  const { getAppSession } = await import("@/lib/auth/session");
  const session = await getAppSession();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  const chat = await getChatById({ id });

  if (chat?.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
