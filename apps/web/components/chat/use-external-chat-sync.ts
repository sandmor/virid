import { useEncryptedCache } from '@/components/encrypted-cache-provider';
import { getSyncManager } from '@/lib/cache/sync-manager';
import type { ChatMessage } from '@/lib/types';
import { buildMessageTree } from '@/lib/utils/message-tree';
import { convertToUIMessages } from '@/lib/utils';
import type { ExistingChatBootstrap } from '@/types/chat-bootstrap';
import { useCallback, useEffect, useMemo, useRef } from 'react';

type UseExternalChatSyncArgs = {
  chatId: string;
  messages: ChatMessage[];
  setMessages: (fn: (prev: ChatMessage[]) => ChatMessage[]) => void;
  isStreaming: boolean;
  /** Keep the branch operation state in step with an authoritative snapshot. */
  onSnapshotApplied?: (snapshot: ExistingChatBootstrap) => void;
  /** The authoritative cache removed a chat that was previously mounted. */
  onChatDeleted?: () => void;
};

/**
 * Reconciles the mounted useChat state with the authoritative encrypted-cache
 * snapshot. BroadcastChannel messages deliberately carry no data: they only
 * ask the sync leader to refresh IndexedDB. This prevents a transient event or
 * a timestamp heuristic from becoming a second source of truth.
 */
export function useExternalChatSync({
  chatId,
  messages: _messages,
  setMessages,
  isStreaming,
  onSnapshotApplied,
  onChatDeleted,
}: UseExternalChatSyncArgs) {
  const { cachedChats = [] } = useEncryptedCache();
  const chatIdRef = useRef(chatId);
  const isStreamingRef = useRef(isStreaming);
  const wasStreamingRef = useRef(isStreaming);
  const pendingSnapshotRef = useRef<ExistingChatBootstrap | null>(null);
  const awaitingPostStreamSnapshotRef = useRef(false);
  const lastAppliedSnapshotRef = useRef<string | null>(null);
  const hasSeenSnapshotRef = useRef(false);

  const cachedSnapshot = useMemo(() => {
    const record = cachedChats.find((entry) => entry.chatId === chatId);
    const bootstrap = record?.data.bootstrap;
    if (!bootstrap || bootstrap.kind !== 'existing') {
      return null;
    }
    return {
      bootstrap,
      // cachedAt distinguishes a freshly committed snapshot even when a
      // database timestamp has millisecond precision.
      identity: `${record.lastUpdatedAt}:${record.cachedAt}`,
    };
  }, [cachedChats, chatId]);

  const applySnapshot = useCallback(
    (snapshot: ExistingChatBootstrap, identity: string) => {
      const tree = buildMessageTree(snapshot.initialMessages, {
        rootMessageIndex: snapshot.initialBranchState.rootMessageIndex ?? null,
      });
      const nextMessages = convertToUIMessages(tree.branch);

      setMessages(() => nextMessages);
      onSnapshotApplied?.(snapshot);
      lastAppliedSnapshotRef.current = identity;
    },
    [onSnapshotApplied, setMessages]
  );

  useEffect(() => {
    chatIdRef.current = chatId;
    pendingSnapshotRef.current = null;
    awaitingPostStreamSnapshotRef.current = false;
    lastAppliedSnapshotRef.current = null;
    hasSeenSnapshotRef.current = false;
  }, [chatId]);

  useEffect(() => {
    const wasStreaming = wasStreamingRef.current;
    isStreamingRef.current = isStreaming;
    wasStreamingRef.current = isStreaming;

    if (!wasStreaming || isStreaming) {
      return;
    }

    // Do not replay a snapshot received during generation: it can contain the
    // persisted user turn but not the final assistant turn. Ask for a fresh
    // cache commit and accept the next resulting snapshot instead.
    pendingSnapshotRef.current = null;
    awaitingPostStreamSnapshotRef.current = true;
    getSyncManager()?.requestSync('tab-request', chatId);
  }, [chatId, isStreaming]);

  useEffect(() => {
    if (!cachedSnapshot) {
      if (hasSeenSnapshotRef.current && !isStreamingRef.current) {
        hasSeenSnapshotRef.current = false;
        setMessages(() => []);
        onChatDeleted?.();
      }
      return;
    }
    const { bootstrap, identity } = cachedSnapshot;

    if (isStreamingRef.current) {
      pendingSnapshotRef.current = bootstrap;
      return;
    }

    if (awaitingPostStreamSnapshotRef.current) {
      // This effect only observes snapshots committed after the stream-end
      // effect set the barrier. The first one is the requested fresh sync.
      awaitingPostStreamSnapshotRef.current = false;
    }

    if (lastAppliedSnapshotRef.current === identity) return;
    applySnapshot(bootstrap, identity);
    hasSeenSnapshotRef.current = true;
  }, [applySnapshot, cachedSnapshot, onChatDeleted, setMessages]);

  return undefined;
}
