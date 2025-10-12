import { geolocation } from '@vercel/functions';
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai';
import type { CoreMessage } from 'ai';
import { unstable_cache as cache } from 'next/cache';
import { after } from 'next/server';
import { getAppSession } from '@/lib/auth/session';
import type { UserType } from '@/lib/auth/types';
import type { VisibilityType } from '@/components/visibility-selector';
import { getTierForUserType } from '@/lib/ai/tiers';
import type { ChatModel } from '@/lib/ai/models';
import { isModelIdAllowed } from '@/lib/ai/models';
import {
  getDefaultSystemPromptParts,
  type RequestHints,
  type SystemPromptOptions,
  systemPrompt,
} from '@/lib/ai/prompts';
import {
  agentPromptConfigIsDefault,
  buildPromptPartsFromConfig,
  getAgentPromptVariableMap,
} from '@/lib/agent-prompt';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import type { ModelCatalog } from 'tokenlens/core';
import { fetchModels } from 'tokenlens/fetch';
import { getUsage } from 'tokenlens/helpers';
import { getModelCost } from '@/lib/ai/pricing';
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
import type { ArtifactToolContext } from '@/lib/artifacts/server';
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
import { ZodError } from 'zod';
import {
  type PostRequestBody,
  postRequestBodySchema,
  MAX_TEXT_PART_LENGTH,
} from './schema';
import { prisma } from '@/lib/db/prisma';
import { getModelCapabilities } from '@/lib/ai/model-capabilities';

export const maxDuration = 300;

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
  } catch (error) {
    if (error instanceof ZodError) {
      const friendlyMessage = formatChatValidationError(error);
      const err = new ChatSDKError('bad_request:api', friendlyMessage);
      return err.toResponse();
    }
    return new ChatSDKError('bad_request:api').toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      pinnedSlugs,
      allowedTools: rawAllowedTools,
      agentId,
      reasoningEffort,
    }: {
      id: string;
      message: ChatMessage;
      selectedChatModel: ChatModel['id'];
      selectedVisibilityType: VisibilityType;
      pinnedSlugs?: string[];
      allowedTools?: string[] | null;
      agentId?: string;
      reasoningEffort?: 'low' | 'medium' | 'high';
    } = requestBody;

    const allowedTools = rawAllowedTools ?? undefined;

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
            reasoningEffort,
            modelId: selectedChatModel,
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
        const modelMessages = convertToModelMessages(uiMessages);

        // Check model capabilities for tool support
        const modelCapabilities = await getModelCapabilities(selectedChatModel);
        const modelSupportsTools = modelCapabilities?.supportsTools ?? true; // Default to true if not found

        // Determine allowed tools (chat settings allow-list or default = all)
        const settings = await getChatSettings(id);
        // If chat just created and we received a provisional allowedTools list, prefer it over settings
        const effectiveAllowedTools =
          createdNewChat && allowedTools !== undefined
            ? allowedTools // could be [] meaning no tools
            : settings.tools?.allow;

        // Determine reasoning effort (prefer provided value, then settings, then default medium)
        const effectiveReasoningEffort =
          reasoningEffort ?? settings.reasoningEffort ?? 'medium';

        // Build provider-specific options for reasoning effort
        const [provider] = selectedChatModel.split(':');
        const providerOptions: Record<string, any> = {};

        if (provider === 'openai') {
          // OpenAI uses reasoningEffort: 'minimal' | 'low' | 'medium' | 'high'
          providerOptions.openai = {
            reasoningEffort: effectiveReasoningEffort,
          };
        } else if (provider === 'google') {
          // Google uses thinkingConfig with thinkingBudget (number of tokens)
          // Map effort levels to token budgets
          const budgetMap = { low: 2048, medium: 4096, high: 8192 };
          providerOptions.google = {
            thinkingConfig: {
              thinkingBudget: budgetMap[effectiveReasoningEffort],
              includeThoughts: true,
            },
          };
        } else if (provider === 'openrouter') {
          // OpenRouter uses reasoning.effort: 'low' | 'medium' | 'high'
          providerOptions.openrouter = {
            reasoning: {
              effort: effectiveReasoningEffort,
              enabled: true,
              exclude: false,
            },
          };
        }

        const allToolIds = [
          'getWeather',
          'createDocument',
          'updateDocument',
          'requestSuggestions',
          'archiveCreateEntry',
          'archiveReadEntry',
          'archiveUpdateEntry',
          'archiveDeleteEntry',
          'archiveLinkEntries',
          'archiveSearchEntries',
          'archiveApplyEdits',
          'archivePinEntry',
          'archiveUnpinEntry',
        ] as const;

        const allToolIdsSet = new Set<string>(allToolIds);

        // If model doesn't support tools, force empty tool list
        const allowedToolIds = !modelSupportsTools
          ? []
          : effectiveAllowedTools === undefined
            ? [...allToolIds]
            : effectiveAllowedTools.filter((toolId) =>
                allToolIdsSet.has(toolId)
              );

        const basePromptParts = getDefaultSystemPromptParts();
        const promptResolution = buildPromptPartsFromConfig(
          settings.prompt,
          basePromptParts
        );
        const promptOptions: SystemPromptOptions = {
          requestHints,
          pinnedEntries: pinnedForPrompt,
          allowedTools: allowedToolIds,
          variables: getAgentPromptVariableMap(promptResolution.normalized),
        };

        if (!agentPromptConfigIsDefault(promptResolution.normalized)) {
          promptOptions.parts = promptResolution.parts;
          promptOptions.joiner = promptResolution.joiner;
        }

        const promptComposition = systemPrompt(promptOptions);
        const composedSystemPrompt = promptComposition.system;

        let mergedModelMessages: CoreMessage[] = [...modelMessages];

        if (promptComposition.messages.length > 0) {
          const baseMessageCount = modelMessages.length;
          const insertsByIndex = new Map<number, CoreMessage[]>();
          const appendedMessages: CoreMessage[] = [];

          for (const message of promptComposition.messages) {
            const normalizedDepth =
              typeof message.depth === 'number' &&
              Number.isFinite(message.depth)
                ? Math.max(0, Math.floor(message.depth))
                : 0;

            const coreMessage: CoreMessage = {
              role: message.role,
              content: message.content,
            };

            if (normalizedDepth === 0) {
              appendedMessages.push(coreMessage);
              continue;
            }

            const targetIndex = Math.max(0, baseMessageCount - normalizedDepth);
            const bucket = insertsByIndex.get(targetIndex);
            if (bucket) {
              bucket.push(coreMessage);
            } else {
              insertsByIndex.set(targetIndex, [coreMessage]);
            }
          }

          const merged: CoreMessage[] = [];

          if (baseMessageCount === 0) {
            const bucket = insertsByIndex.get(0);
            if (bucket) {
              merged.push(...bucket);
            }
          } else {
            for (let index = 0; index < baseMessageCount; index += 1) {
              const bucket = insertsByIndex.get(index);
              if (bucket) {
                merged.push(...bucket);
              }
              merged.push(modelMessages[index]);
            }
          }

          if (appendedMessages.length > 0) {
            merged.push(...appendedMessages);
          }

          mergedModelMessages = merged;
        }

        const artifactContext: ArtifactToolContext = {
          modelId: selectedChatModel,
          model,
          providerOptions: Object.keys(providerOptions).length
            ? providerOptions
            : undefined,
          systemPrompt: composedSystemPrompt,
          messages: mergedModelMessages,
          reasoningEffort: effectiveReasoningEffort,
        };

        const activeTools: Record<string, any> = {};

        if (allowedToolIds.includes('getWeather')) {
          activeTools.getWeather = getWeather;
        }
        if (allowedToolIds.includes('createDocument')) {
          activeTools.createDocument = createDocument({
            session,
            dataStream,
            context: artifactContext,
          });
        }
        if (allowedToolIds.includes('updateDocument')) {
          activeTools.updateDocument = updateDocument({
            session,
            dataStream,
            context: artifactContext,
          });
        }
        if (allowedToolIds.includes('requestSuggestions')) {
          activeTools.requestSuggestions = requestSuggestions({
            session,
            dataStream,
          });
        }
        if (allowedToolIds.includes('archiveCreateEntry')) {
          activeTools.archiveCreateEntry = archiveCreateEntry({ session });
        }
        if (allowedToolIds.includes('archiveReadEntry')) {
          activeTools.archiveReadEntry = archiveReadEntry({ session });
        }
        if (allowedToolIds.includes('archiveUpdateEntry')) {
          activeTools.archiveUpdateEntry = archiveUpdateEntry({ session });
        }
        if (allowedToolIds.includes('archiveDeleteEntry')) {
          activeTools.archiveDeleteEntry = archiveDeleteEntry({ session });
        }
        if (allowedToolIds.includes('archiveLinkEntries')) {
          activeTools.archiveLinkEntries = archiveLinkEntries({ session });
        }
        if (allowedToolIds.includes('archiveSearchEntries')) {
          activeTools.archiveSearchEntries = archiveSearchEntries({ session });
        }
        if (allowedToolIds.includes('archiveApplyEdits')) {
          activeTools.archiveApplyEdits = archiveApplyEdits({ session });
        }
        if (allowedToolIds.includes('archivePinEntry')) {
          activeTools.archivePinEntry = archivePinEntry({
            session,
            chatId: id,
          });
        }
        if (allowedToolIds.includes('archiveUnpinEntry')) {
          activeTools.archiveUnpinEntry = archiveUnpinEntry({
            session,
            chatId: id,
          });
        }

        console.log(
          'Merged Model Messages:',
          JSON.stringify(mergedModelMessages, null, 2)
        );

        const result = streamText({
          model,
          system: composedSystemPrompt,
          messages: mergedModelMessages,
          stopWhen: stepCountIs(20),
          experimental_activeTools: allowedToolIds,
          experimental_transform: smoothStream({ chunking: 'word' }),
          tools: activeTools,
          ...(Object.keys(providerOptions).length > 0 && { providerOptions }),
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

              // Get cost from database pricing
              const dbCost = await getModelCost(selectedChatModel, usage);

              // Try to get usage summary from tokenlens for context window info
              let summary = {};
              if (providers) {
                try {
                  summary = getUsage({
                    modelId: selectedChatModel,
                    usage,
                    providers,
                  });
                } catch (err) {
                  console.warn('TokenLens summary failed', err);
                }
              }

              finalMergedUsage = {
                ...usage,
                ...summary,
                modelId: selectedChatModel,
                costUSD: dbCost || undefined,
              } as AppUsage;
              dataStream.write({ type: 'data-usage', data: finalMergedUsage });
            } catch (err) {
              console.warn('Usage enrichment failed', err);
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

function formatChatValidationError(error: ZodError): string {
  const issue = error.issues[0];
  if (!issue) {
    return 'The chat request is missing required fields. Please try again.';
  }

  const path = issue.path.join('.') || 'request';

  if (
    issue.code === 'too_big' &&
    typeof issue.maximum === 'number' &&
    issue.maximum === MAX_TEXT_PART_LENGTH &&
    issue.path.includes('text')
  ) {
    return `Your message is too long. Please shorten it to ${MAX_TEXT_PART_LENGTH.toLocaleString()} characters or fewer.`;
  }

  if (issue.code === 'invalid_type') {
    return `The field "${path}" is missing or has the wrong type.`;
  }

  return `Invalid ${path}: ${issue.message}`;
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
