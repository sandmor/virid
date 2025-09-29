import { geolocation } from '@vercel/functions';
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai';
import { unstable_cache as cache } from 'next/cache';
import { after } from 'next/server';
import { getAppSession } from '@/lib/auth/session';
import type { UserType } from '@/lib/auth/types';
import type { VisibilityType } from '@/components/visibility-selector';
import { getTierForUserType } from '@/lib/ai/tiers';
import type { ChatModel } from '@/lib/ai/models';
import { isModelIdAllowed } from '@/lib/ai/models';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import type { ModelCatalog } from 'tokenlens/core';
import { fetchModels } from 'tokenlens/fetch';
import { getUsage } from 'tokenlens/helpers';
import { getLanguageModel } from '@/lib/ai/providers';
import { createDocument } from '@/lib/ai/tools/create-document';
import { archiveCreateEntry } from '@/lib/ai/tools/archive-create-entry';
import { archiveReadEntry } from '@/lib/ai/tools/archive-read-entry';
import { archiveUpdateEntry } from '@/lib/ai/tools/archive-update-entry';
import { archiveDeleteEntry } from '@/lib/ai/tools/archive-delete-entry';
import { archiveLinkEntries } from '@/lib/ai/tools/archive-link-entries';
import { archiveSearchEntries } from '@/lib/ai/tools/archive-search-entries';
import { archiveApplyEdits } from '@/lib/ai/tools/archive-apply-edits';
import { archivePinEntry } from '@/lib/ai/tools/archive-pin-entry';
import { archiveUnpinEntry } from '@/lib/ai/tools/archive-unpin-entry';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { getChatSettings } from '@/lib/db/chat-settings';
import { isProductionEnvironment } from '@/lib/constants';
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getActiveMessagesByChatId,
  saveChat,
  saveMessages,
  updateChatLastContextById,
  saveAssistantMessage,
  getPinnedArchiveEntriesForChat,
} from '@/lib/db/queries';
import { consumeTokens } from '@/lib/rate-limit/token-bucket';
import { ChatSDKError } from '@/lib/errors';
import type { ChatMessage } from '@/lib/types';
import type { AppUsage } from '@/lib/usage';
import { convertToUIMessages, generateUUID } from '@/lib/utils';
import { generateTitleFromChatHistory } from '../../actions';
import { updateChatTitleById } from '@/lib/db/queries';
import { type PostRequestBody, postRequestBodySchema } from './schema';
import { prisma } from '@/lib/db/prisma';

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        'TokenLens: catalog fetch failed, using default catalog',
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ['tokenlens-catalog'],
  { revalidate: 60 * 60 }
);

export function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL'
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
    return new ChatSDKError('bad_request:api').toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      pinnedSlugs,
      allowedTools,
      agentId,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel['id'];
      selectedVisibilityType: VisibilityType;
      pinnedSlugs?: string[];
      allowedTools?: string[];
      agentId?: string;
    } = requestBody;

    const session = await getAppSession();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const userType: UserType = session.user.type;

    // Enforce model entitlement server-side (guards against tampered client requests)
    const {
      modelIds: allowedModels,
      bucketCapacity,
      bucketRefillAmount,
      bucketRefillIntervalSeconds,
    } = await getTierForUserType(userType);
    if (!isModelIdAllowed(selectedChatModel, allowedModels)) {
      return new ChatSDKError(
        userType === 'guest' ? 'forbidden:model' : 'forbidden:model'
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
      if (
        e instanceof ChatSDKError &&
        e.type === 'rate_limit' &&
        e.surface === 'chat'
      ) {
        return e.toResponse();
      }
      throw e;
    }

    // Fetch chat + any other needed data concurrently where possible
    const chat = await getChatById({ id });
    let createdNewChat = false;

    if (chat) {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError('forbidden:chat').toResponse();
      }
    } else {
      // Fast placeholder title from user text (avoid model call latency)
      const placeholder = (() => {
        try {
          const textParts = message.parts
            .filter((p: any) => p.type === 'text' && typeof p.text === 'string')
            .map((p: any) => p.text)
            .join(' ')
            .trim();
          if (!textParts) return 'New Chat';
          return textParts.slice(0, 60);
        } catch {
          return 'New Chat';
        }
      })();

      await saveChat({
        id,
        userId: session.user.id,
        title: placeholder,
        visibility: selectedVisibilityType,
        agentId,
      });
      createdNewChat = true;

      // Apply initial settings preset (agent base + user overrides) in one place.
      try {
        const { applyInitialSettingsPreset } = await import(
          '@/lib/db/chat-settings'
        );
        let base: any | null = null;
        if (agentId) {
          try {
            const agent = await prisma.agent.findFirst({
              where: { id: agentId, userId: session.user.id },
            });
            base = agent?.settings || null;
          } catch (e) {
            console.warn('Agent fetch failed during initialization', e);
          }
        }
        // Deduplicate allowedTools if present before passing down
        const normalizedAllowed = allowedTools
          ? Array.from(new Set(allowedTools)).slice(0, 64)
          : allowedTools;
        await applyInitialSettingsPreset({
          chatId: id,
          base,
          overrides: {
            allowedTools: normalizedAllowed,
            // pinnedSlugs are applied to settings cache only; join creation handled below asynchronously.
            pinnedSlugs:
              pinnedSlugs && pinnedSlugs.length
                ? pinnedSlugs.slice(0, 12)
                : undefined,
          },
        });
      } catch (e) {
        console.warn('Failed to apply initial settings preset', e);
      }

      // Fire-and-forget real title generation (no await)
      (async () => {
        try {
          const realTitle = await generateTitleFromChatHistory({
            messages: [message],
          });
          if (realTitle && realTitle !== placeholder) {
            await updateChatTitleById({ chatId: id, title: realTitle });
          }
        } catch (e) {
          console.warn('Deferred title generation failed', e);
        }
      })();

      // Initial pinning executes in background; we don't block stream start.
      if (pinnedSlugs && pinnedSlugs.length) {
        (async () => {
          const unique = Array.from(new Set(pinnedSlugs)).slice(0, 12);
          try {
            const { pinArchiveEntryToChat } = await import('@/lib/db/queries');
            await Promise.all(
              unique.map(async (slug) => {
                try {
                  await pinArchiveEntryToChat({
                    userId: session.user.id,
                    chatId: id,
                    slug,
                  });
                } catch (e) {
                  console.warn('Initial pin failed', {
                    chatId: id,
                    slug,
                    error: e,
                  });
                }
              })
            );
          } catch (e) {
            console.warn('Pin helper import failed', e);
          }
        })();
      }
    }

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
    let finalMergedUsage: AppUsage | undefined;

    const stream = createUIMessageStream({
      execute: async ({ writer: dataStream }) => {
        // Immediately send init event to flush headers early
        dataStream.write({
          type: 'data-init',
          data: { chatId: id, createdNewChat },
        });
        // Kick off persistence & context gathering in parallel.
        const streamId = generateUUID();
        const persistUserMessagePromise = saveMessages({
          messages: [
            {
              chatId: id,
              id: message.id,
              role: 'user',
              parts: message.parts,
              attachments: [],
              createdAt: new Date(),
            },
          ],
        }).catch((e) => {
          console.warn('Failed to persist user message (non-fatal)', e);
        });
        const streamIdPromise = createStreamId({ streamId, chatId: id }).catch(
          (e) => console.warn('Failed to persist stream id (non-fatal)', e)
        );

        const messagesPromise = getActiveMessagesByChatId({ id }).catch((e) => {
          console.warn(
            'Failed to load messages, proceeding with only user message',
            e
          );
          return [];
        });
        const modelPromise = getLanguageModel(selectedChatModel);
        const pinnedPromise = (async () => {
          try {
            const dbPinned = createdNewChat
              ? []
              : await getPinnedArchiveEntriesForChat({
                  userId: session.user.id,
                  chatId: id,
                });
            const supplied = pinnedSlugs
              ? Array.from(new Set(pinnedSlugs))
              : [];
            if (!dbPinned.length && !supplied.length) return undefined;
            // Merge: db first (stable order by pinnedAt asc), then any supplied not already present
            const existingSlugSet = new Set(dbPinned.map((p) => p.slug));
            const merged = [
              ...dbPinned.map((p) => ({
                slug: p.slug,
                entity: p.entity,
                body: p.body,
              })),
              ...supplied
                .filter((slug) => !existingSlugSet.has(slug))
                .map((slug) => ({ slug, entity: 'archive', body: '' })), // body blank; model prompt handler can trim / request body later if needed
            ];
            return merged;
          } catch (e) {
            console.warn('Failed to load/merge pinned entries for chat', id, e);
            return undefined;
          }
        })();

        const [messagesFromDb, model, pinnedForPrompt] = await Promise.all([
          messagesPromise,
          modelPromise,
          pinnedPromise,
        ]);

        const uiMessages = [...convertToUIMessages(messagesFromDb), message];

        // Determine allowed tools (chat settings allow-list or default = all)
        const settings = await getChatSettings(id);
        // If chat just created and we received a provisional allowedTools list, prefer it over settings
        const effectiveAllowedTools =
          createdNewChat && allowedTools !== undefined
            ? allowedTools // could be [] meaning no tools
            : settings.tools?.allow;
        const allToolFactories: Record<string, any> = {
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
        };
        const allowedToolIds =
          effectiveAllowedTools === undefined
            ? Object.keys(allToolFactories) // undefined => all tools
            : effectiveAllowedTools.filter((k) => k in allToolFactories); // [] => none
        const activeTools: Record<string, any> = {};
        for (const k of allowedToolIds) activeTools[k] = allToolFactories[k];

        const result = streamText({
          model,
          system: systemPrompt({
            requestHints,
            pinnedEntries: pinnedForPrompt,
            allowedTools: allowedToolIds,
          }),
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(20),
          experimental_activeTools: allowedToolIds,
          experimental_transform: smoothStream({ chunking: 'word' }),
          tools: activeTools,
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
          abortSignal: request.signal,
          onFinish: async ({ usage }) => {
            try {
              const providers = await getTokenlensCatalog();
              if (!selectedChatModel) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: 'data-usage',
                  data: finalMergedUsage,
                });
                return;
              }

              if (!providers) {
                finalMergedUsage = usage;
                dataStream.write({
                  type: 'data-usage',
                  data: finalMergedUsage,
                });
                return;
              }

              const summary = getUsage({
                modelId: selectedChatModel,
                usage,
                providers,
              });
              finalMergedUsage = {
                ...usage,
                ...summary,
                modelId: selectedChatModel,
              } as AppUsage;
              dataStream.write({ type: 'data-usage', data: finalMergedUsage });
            } catch (err) {
              console.warn('TokenLens enrichment failed', err);
              finalMergedUsage = usage;
              dataStream.write({ type: 'data-usage', data: finalMergedUsage });
            }
          },
        });

        // Ensure persistence tasks complete, but don't block model start
        Promise.all([persistUserMessagePromise, streamIdPromise]).catch(() => {
          /* already logged individually */
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
            messageMetadata: ({}) => {
              return {
                model: selectedChatModel,
              };
            },
          })
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        // messages includes the newly streamed assistant response as the last element
        const assistantMessage = messages.findLast(
          (m) => m.role === 'assistant'
        );
        if (assistantMessage) {
          await saveAssistantMessage({
            id: assistantMessage.id,
            chatId: id,
            parts: assistantMessage.parts,
            attachments: [],
            model: selectedChatModel,
          });
        }

        if (finalMergedUsage) {
          try {
            await updateChatLastContextById({
              chatId: id,
              context: finalMergedUsage,
            });
          } catch (err) {
            console.warn('Unable to persist last usage for chat', id, err);
          }
        }
      },
      onError: () => {
        return 'Oops, an error occurred!';
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

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()), {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    const vercelId = request.headers.get('x-vercel-id');

    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    console.error('Unhandled error in chat API:', error, { vercelId });
    return new ChatSDKError('offline:chat').toResponse();
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  // Unified session (Clerk or guest)
  const session = await getAppSession();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  const chat = await getChatById({ id });

  if (chat?.userId !== session.user.id) {
    return new ChatSDKError('forbidden:chat').toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
