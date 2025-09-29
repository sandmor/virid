'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatHeader } from '@/components/chat-header';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import type { ChatSettings, Vote } from '@/lib/db/schema';
import { ChatSDKError } from '@/lib/errors';
import type { Attachment, ChatMessage } from '@/lib/types';
import type { AppUsage } from '@/lib/usage';
import { fetcher, fetchWithErrorHandlers, generateUUID } from '@/lib/utils';
import { Artifact } from './artifact';
import { useDataStream } from './data-stream-provider';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { toast } from './toast';
import type { VisibilityType } from './visibility-selector';
import type { AgentPreset } from './chat-agent-selector';
import {
  normalizeAllowedTools,
  normalizePinnedEntries,
} from '@/lib/agent-settings';

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  autoResume,
  initialLastContext,
  allowedModelIds,
  agentId,
  initialAgent,
  initialSettings,
}: {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  autoResume: boolean;
  initialLastContext?: AppUsage;
  allowedModelIds: string[];
  agentId?: string;
  initialAgent?: AgentPreset | null;
  initialSettings?: ChatSettings | null;
}) {
  const { visibilityType } = useChatVisibility({
    chatId: id,
    initialVisibilityType,
  });
  const router = useRouter();

  const queryClient = useQueryClient();
  const { setDataStream } = useDataStream();

  const [input, setInput] = useState<string>('');
  const [usage, setUsage] = useState<AppUsage | undefined>(initialLastContext);
  const [currentModelId, setCurrentModelId] = useState(initialChatModel);
  const currentModelIdRef = useRef(currentModelId);

  const resolvedInitialAgent = initialAgent ?? null;
  const initialAgentSettings = (resolvedInitialAgent?.settings ??
    null) as ChatSettings | null;
  const [selectedAgent, setSelectedAgent] = useState<AgentPreset | null>(
    resolvedInitialAgent
  );
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(
    resolvedInitialAgent?.id ?? agentId
  );
  const stagedAgentIdRef = useRef<string | undefined>(selectedAgentId);

  // Provisional pinning (allow selecting archive entries before first message creates backend chat row)
  const [stagedPinnedSlugs, setStagedPinnedSlugs] = useState<string[]>(() =>
    normalizePinnedEntries(
      initialSettings?.pinnedEntries ??
        initialAgentSettings?.pinnedEntries ??
        []
    )
  );
  const stagedPinnedSlugsRef = useRef<string[]>(stagedPinnedSlugs);
  // Provisional tool allow list (undefined => all, subset array => restrict)
  const [stagedAllowedTools, setStagedAllowedTools] = useState<
    string[] | undefined
  >(() =>
    normalizeAllowedTools(
      initialSettings?.tools?.allow ?? initialAgentSettings?.tools?.allow
    )
  );
  const stagedAllowedToolsRef = useRef<string[] | undefined>(
    stagedAllowedTools
  );
  const chatHasStartedRef = useRef(initialMessages.length > 0);
  useEffect(() => {
    if (initialMessages.length > 0) chatHasStartedRef.current = true;
  }, [initialMessages.length]);
  useEffect(() => {
    stagedPinnedSlugsRef.current = stagedPinnedSlugs;
  }, [stagedPinnedSlugs]);
  useEffect(() => {
    stagedAllowedToolsRef.current = stagedAllowedTools;
  }, [stagedAllowedTools]);

  useEffect(() => {
    stagedAgentIdRef.current = selectedAgentId;
  }, [selectedAgentId]);

  useEffect(() => {
    currentModelIdRef.current = currentModelId;
  }, [currentModelId]);
  useEffect(() => {
    if (chatHasStartedRef.current) return;
    const settings = (selectedAgent?.settings ?? null) as ChatSettings | null;
    if (selectedAgent) {
      setStagedPinnedSlugs(
        normalizePinnedEntries(settings?.pinnedEntries ?? [])
      );
      setStagedAllowedTools(normalizeAllowedTools(settings?.tools?.allow));
    } else {
      setStagedPinnedSlugs([]);
      setStagedAllowedTools(undefined);
    }
  }, [selectedAgent?.id]);

  const handleSelectAgent = useCallback(
    async (agent: AgentPreset | null, options?: { userInitiated?: boolean }) => {
      const userInitiated = options?.userInitiated ?? false;
      const newAgentId = agent?.id ?? null;
      if (selectedAgentId === newAgentId) return;

      try {
        if (userInitiated) {
          await fetchWithErrorHandlers(`/api/chat/settings`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: id, agentId: newAgentId }),
          });
        }

        if (agent) {
          setSelectedAgent({
            id: agent.id,
            name: agent.name,
            description: agent.description,
            settings: agent.settings,
          });
          setSelectedAgentId(agent.id);
        } else {
          setSelectedAgent(null);
          setSelectedAgentId(undefined);
        }

        const settings = (agent?.settings ?? null) as ChatSettings | null;
        setStagedPinnedSlugs(normalizePinnedEntries(settings?.pinnedEntries ?? []));
        setStagedAllowedTools(normalizeAllowedTools(settings?.tools?.allow));
      } catch (error) {
        console.error('Failed to update chat agent', error);
        toast({ type: 'error', description: 'Failed to update chat agent' });
      }
    },
    [id, selectedAgentId]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (chatHasStartedRef.current) return;
    const url = new URL(window.location.href);
    if (selectedAgentId) {
      url.searchParams.set('agentId', selectedAgentId);
    } else {
      url.searchParams.delete('agentId');
    }
    const search = url.searchParams.toString();
    const next = `${url.pathname}${search ? `?${search}` : ''}${url.hash}`;
    window.history.replaceState({}, '', next);
  }, [selectedAgentId]);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    resumeStream,
    regenerate,
    error: chatError,
    clearError: clearChatError,
  } = useChat<ChatMessage>({
    id,
    messages: initialMessages,
    experimental_throttle: 100,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      fetch: fetchWithErrorHandlers,
      prepareSendMessagesRequest(request) {
        const staged = stagedPinnedSlugsRef.current;
        const stagedTools = stagedAllowedToolsRef.current;
        return {
          body: {
            ...request.body,
            id: request.id,
            message: request.messages.at(-1),
            selectedChatModel: currentModelIdRef.current,
            selectedVisibilityType: visibilityType,
            pinnedSlugs: staged.length > 0 ? staged : undefined,
            allowedTools: !chatHasStartedRef.current ? stagedTools : undefined,
            agentId: !chatHasStartedRef.current
              ? stagedAgentIdRef.current
              : undefined,
          },
        };
      },
    }),
    onData: (dataPart) => {
      setDataStream((ds) => (ds ? [...ds, dataPart] : []));
      if (dataPart.type === 'data-usage') {
        setUsage(dataPart.data);
      }
    },
    onFinish: () => {
      // Invalidate chat history infinite query (new message might affect ordering)
      queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
      if (!chatHasStartedRef.current) {
        chatHasStartedRef.current = true;
        // After first message, pins are persisted or merged; clear staged state & ref
        setStagedPinnedSlugs([]);
        stagedPinnedSlugsRef.current = [];
        setStagedAllowedTools(undefined);
        stagedAllowedToolsRef.current = undefined;
      }
    },
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast({ type: 'error', description: error.message });
      }
    },
  });

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const regenerateParam = searchParams.get('regenerate');
  const initialQueryHandledRef = useRef(false);
  const initialRegenerateHandledRef = useRef(false);

  // Single-run initial query injection (forked edit path)
  useEffect(() => {
    if (!query) return;
    if (initialQueryHandledRef.current) return;
    // Avoid duplicate if a user message with same text already exists
    const existingSame = messages.some(
      (m) =>
        m.role === 'user' &&
        m.parts.some((p) => p.type === 'text' && p.text === query)
    );
    if (existingSame) {
      initialQueryHandledRef.current = true;
      window.history.replaceState({}, '', `/chat/${id}`);
      return;
    }
    initialQueryHandledRef.current = true;
    sendMessage({
      role: 'user' as const,
      parts: [{ type: 'text', text: query }],
    });
    // Strip query param immediately to prevent re-trigger on fast re-render
    window.history.replaceState({}, '', `/chat/${id}`);
  }, [query, messages, sendMessage, id]);

  // Single-run regeneration trigger (forked regenerate path)
  useEffect(() => {
    if (!regenerateParam) return;
    if (initialRegenerateHandledRef.current) return;
    if (messages.length === 0) return; // Wait for messages to load
    initialRegenerateHandledRef.current = true;
    regenerate();
    // Strip query param immediately to prevent re-trigger on fast re-render
    window.history.replaceState({}, '', `/chat/${id}`);
  }, [regenerateParam, messages, regenerate, id]);

  const { data: votes } = useQuery<Vote[] | undefined>({
    queryKey: ['chat', 'votes', id],
    queryFn: async () => fetcher(`/api/vote?chatId=${id}`),
    enabled: messages.length >= 2,
    staleTime: 30_000,
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  // Suppress auto-resume when a query injection or regeneration is pending to avoid duplicate stream starts
  const effectiveAutoResume =
    autoResume &&
    !query &&
    !regenerateParam &&
    !initialQueryHandledRef.current &&
    !initialRegenerateHandledRef.current;
  useAutoResume({
    autoResume: effectiveAutoResume,
    initialMessages,
    resumeStream,
    setMessages,
  });

  const [isForking, setIsForking] = useState(false);

  const handleRetryOnError = useCallback(() => {
    if (clearChatError) clearChatError();
    // small delay to ensure error state clears before regenerating
    setTimeout(() => {
      regenerate();
    }, 16);
  }, [clearChatError, regenerate]);

  const handleDismissError = useCallback(() => {
    if (clearChatError) clearChatError();
  }, [clearChatError]);

  const handleForkRegenerate = useCallback(
    async (assistantMessageId: string) => {
      if (isForking) return; // guard against double clicks
      setIsForking(true);
      toast({ type: 'success', description: 'Forking chat…' });
      try {
        const match = window.location.pathname.match(/\/chat\/(.+)$/);
        if (!match) throw new Error('Cannot infer current chat id');
        const currentChatId = match[1];
        const { forkChatAction } = await import('@/app/(chat)/actions');
        const result: any = await forkChatAction({
          sourceChatId: currentChatId,
          pivotMessageId: assistantMessageId,
          mode: 'regenerate',
        });
        if (!result?.newChatId) {
          throw new Error('Fork action did not return newChatId');
        }
        queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
        }, 8000);
        requestAnimationFrame(() => {
          router.push(`/chat/${result.newChatId}?regenerate=true`);
        });
      } catch (e) {
        console.error('Regenerate fork failed', e);
        toast({ type: 'error', description: (e as Error).message || 'Failed to fork chat' });
        setIsForking(false);
      }
    },
    [isForking, queryClient, router]
  );

  const handleAddStagedPin = useCallback((slug: string) => {
    setStagedPinnedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const handleRemoveStagedPin = useCallback((slug: string) => {
    setStagedPinnedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const handleUpdateStagedAllowedTools = useCallback((tools: string[] | undefined) => {
    setStagedAllowedTools(tools);
  }, []);

  useEffect(() => {
    if (!chatError) return;
    // Use project's toast with Retry/Dismiss actions following color schema
    toast({
      type: 'error',
      description: chatError.message || 'An error occurred while generating the response.',
      actions: [
        { label: 'Retry', onClick: handleRetryOnError, primary: true },
        { label: 'Dismiss', onClick: handleDismissError },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatError]);

  return (
    <>
      <div className="overscroll-behavior-contain flex h-dvh min-w-0 touch-pan-y flex-col bg-background">
        <ChatHeader
          chatId={id}
          isReadonly={isReadonly}
          selectedVisibilityType={initialVisibilityType}
          stagedPinnedSlugs={stagedPinnedSlugs}
          onAddStagedPin={handleAddStagedPin}
          onRemoveStagedPin={handleRemoveStagedPin}
          chatHasStarted={chatHasStartedRef.current}
          selectedAgentId={selectedAgentId}
          selectedAgentLabel={selectedAgent?.name}
                  onUpdateStagedAllowedTools={handleUpdateStagedAllowedTools}
        />

        <Messages
          chatId={id}
          isArtifactVisible={isArtifactVisible}
          isReadonly={isReadonly}
          messages={messages}
          onRegenerateAssistant={handleForkRegenerate}
          selectedModelId={currentModelId}
          status={status}
          votes={votes}
          disableRegenerate={isForking}
        />

        <div className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4">
          {!isReadonly && (
            <MultimodalInput
              attachments={attachments}
              chatId={id}
              input={input}
              messages={messages}
              onModelChange={setCurrentModelId}
              selectedModelId={currentModelId}
              selectedVisibilityType={visibilityType}
              sendMessage={sendMessage}
              setAttachments={setAttachments}
              setInput={setInput}
              setMessages={setMessages}
              status={status}
              stop={stop}
              usage={usage}
              allowedModelIds={allowedModelIds}
            />
          )}
        </div>

        {isForking && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center bg-gradient-to-t from-background/80 via-background/20 to-transparent p-6">
            <div className="flex items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-sm shadow-lg backdrop-blur-md">
              <span className="relative inline-flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
              </span>
              <span>Creating fork…</span>
            </div>
          </div>
        )}

        <Artifact
          attachments={attachments}
          chatId={id}
          input={input}
          isReadonly={isReadonly}
          messages={messages}
          selectedModelId={currentModelId}
          selectedVisibilityType={visibilityType}
          sendMessage={sendMessage}
          setAttachments={setAttachments}
          setInput={setInput}
          setMessages={setMessages}
          status={status}
          stop={stop}
          votes={votes}
          allowedModelIds={allowedModelIds}
        />
      </div>
    </>
  );
}
