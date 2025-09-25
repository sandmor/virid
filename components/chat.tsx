"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatHeader } from "@/components/chat-header";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { useAutoResume } from "@/hooks/use-auto-resume";
import { useChatVisibility } from "@/hooks/use-chat-visibility";
import type { Vote } from "@/lib/db/schema";
import { ChatSDKError } from "@/lib/errors";
import type { Attachment, ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { fetcher, fetchWithErrorHandlers, generateUUID } from "@/lib/utils";
import { Artifact } from "./artifact";
import { useDataStream } from "./data-stream-provider";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { toast } from "./toast";
import type { VisibilityType } from "./visibility-selector";

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  autoResume,
  initialLastContext,
  allowedModelIds,
}: {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  autoResume: boolean;
  initialLastContext?: AppUsage;
  allowedModelIds: string[];
}) {
  const { visibilityType } = useChatVisibility({
    chatId: id,
    initialVisibilityType,
  });

  const queryClient = useQueryClient();
  const { setDataStream } = useDataStream();

  const [input, setInput] = useState<string>("");
  const [usage, setUsage] = useState<AppUsage | undefined>(initialLastContext);
  const [currentModelId, setCurrentModelId] = useState(initialChatModel);
  const currentModelIdRef = useRef(currentModelId);

  // Provisional pinning (allow selecting archive entries before first message creates backend chat row)
  const [stagedPinnedSlugs, setStagedPinnedSlugs] = useState<string[]>([]);
  const chatHasStartedRef = useRef(initialMessages.length > 0);
  useEffect(() => { if (initialMessages.length > 0) chatHasStartedRef.current = true; }, [initialMessages.length]);

  useEffect(() => {
    currentModelIdRef.current = currentModelId;
  }, [currentModelId]);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
  } = useChat<ChatMessage>({
    id,
    messages: initialMessages,
    experimental_throttle: 100,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: fetchWithErrorHandlers,
      prepareSendMessagesRequest(request) {
        // If we have marked a message for regeneration, include its id then clear it
        const regenId = regeneratingMessageIdRef.current;
        regeneratingMessageIdRef.current = null;
        const includeInitialPins = !chatHasStartedRef.current && stagedPinnedSlugs.length > 0;
        return {
          body: {
            ...request.body,
            id: request.id,
            message: request.messages.at(-1),
            selectedChatModel: currentModelIdRef.current,
            selectedVisibilityType: visibilityType,
            regeneratingMessageId: regenId || undefined,
            initialPinnedSlugs: includeInitialPins ? stagedPinnedSlugs : undefined,
          },
        };
      },
    }),
    onData: (dataPart) => {
      setDataStream((ds) => (ds ? [...ds, dataPart] : []));
      if (dataPart.type === "data-usage") {
        setUsage(dataPart.data);
      }
    },
    onFinish: () => {
      // Invalidate chat history infinite query (new message might affect ordering)
      queryClient.invalidateQueries({ queryKey: ["chat","history"] });
      chatHasStartedRef.current = true; // lock-in; subsequent sends won't include initialPinnedSlugs
    },
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast({ type: "error", description: error.message });
      }
    },
  });

  // Track which assistant message is being regenerated so we can pass its id in the next request body
  const [regeneratingMessageIdState, setRegeneratingMessageIdState] = useState<string | null>(null);
  const regeneratingMessageIdRef = useRef<string | null>(null);
  useEffect(() => { regeneratingMessageIdRef.current = regeneratingMessageIdState; }, [regeneratingMessageIdState]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const initialQueryHandledRef = useRef(false);

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  // Single-run initial query injection (forked edit path)
  useEffect(() => {
    if (!query) return;
    if (initialQueryHandledRef.current) return;
    // Avoid duplicate if a user message with same text already exists
    const existingSame = messages.some(
      (m) => m.role === "user" && m.parts.some((p) => p.type === "text" && p.text === query)
    );
    if (existingSame) {
      initialQueryHandledRef.current = true;
      setHasAppendedQuery(true);
      window.history.replaceState({}, "", `/chat/${id}`);
      return;
    }
    initialQueryHandledRef.current = true;
    setHasAppendedQuery(true);
    sendMessage({
      role: "user" as const,
      parts: [{ type: "text", text: query }],
    });
    // Strip query param immediately to prevent re-trigger on fast re-render
    window.history.replaceState({}, "", `/chat/${id}`);
  }, [query, messages, sendMessage, id]);

  const { data: votes } = useQuery<Vote[] | undefined>({
    queryKey: ["chat","votes", id],
    queryFn: async () => fetcher(`/api/vote?chatId=${id}`),
    enabled: messages.length >= 2,
    staleTime: 30_000,
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  // Suppress auto-resume when a query injection is pending to avoid duplicate stream starts
  const effectiveAutoResume = autoResume && !query && !initialQueryHandledRef.current;
  useAutoResume({
    autoResume: effectiveAutoResume,
    initialMessages,
    resumeStream,
    setMessages,
  });

  return (
    <>
      <div className="overscroll-behavior-contain flex h-dvh min-w-0 touch-pan-y flex-col bg-background">
        <ChatHeader
          chatId={id}
          isReadonly={isReadonly}
          selectedVisibilityType={initialVisibilityType}
            stagedPinnedSlugs={stagedPinnedSlugs}
            onAddStagedPin={(slug) => setStagedPinnedSlugs((prev) => prev.includes(slug) ? prev : [...prev, slug])}
            onRemoveStagedPin={(slug) => setStagedPinnedSlugs((prev) => prev.filter(s => s !== slug))}
            chatHasStarted={chatHasStartedRef.current}
        />


        <Messages
          chatId={id}
          isArtifactVisible={isArtifactVisible}
          isReadonly={isReadonly}
          messages={messages}
          regenerate={regenerate}
          onRegenerateAssistant={(assistantMessageId: string) => {
            setRegeneratingMessageIdState(assistantMessageId);
            regenerate();
          }}
          selectedModelId={initialChatModel}
          setMessages={setMessages}
          status={status}
          votes={votes}
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
      </div>

      <Artifact
        attachments={attachments}
        chatId={id}
        input={input}
        isReadonly={isReadonly}
        messages={messages}
        regenerate={regenerate}
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

    </>
  );
}
