import type { UseChatHelpers } from '@ai-sdk/react';
import equal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { useMessages } from '@/hooks/use-messages';
import type { Vote } from '@/lib/db/schema';
import type { ChatMessage } from '@/lib/types';
import type { UIArtifact } from './artifact';
import { PreviewMessage, ThinkingMessage } from './message';

type ArtifactMessagesProps = {
  chatId: string;
  status: UseChatHelpers<ChatMessage>['status'];
  votes: Vote[] | undefined;
  messages: ChatMessage[];
  isReadonly: boolean;
  artifactStatus: UIArtifact['status'];
  onDeleteMessage?: (messageId: string) => Promise<{ chatDeleted: boolean }>;
  onDeleteMessageCascade?: (
    messageId: string
  ) => Promise<{ chatDeleted: boolean }>;
  onToggleSelectMessage?: (messageId: string) => void;
  selectedMessageIds: Set<string>;
  isSelectionMode: boolean;
};

function PureArtifactMessages({
  chatId,
  status,
  votes,
  messages,
  isReadonly,
  onDeleteMessage,
  onDeleteMessageCascade,
  onToggleSelectMessage,
  selectedMessageIds,
  isSelectionMode,
}: ArtifactMessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    status,
  });

  return (
    <div
      className="flex h-full flex-col items-center gap-4 overflow-y-scroll px-4 pt-20"
      ref={messagesContainerRef}
    >
      {messages.map((message, index) => (
        <PreviewMessage
          chatId={chatId}
          isLoading={status === 'streaming' && index === messages.length - 1}
          isReadonly={isReadonly}
          key={message.id}
          message={message}
          requiresScrollPadding={
            hasSentMessage && index === messages.length - 1
          }
          onDeleteMessage={onDeleteMessage}
          onDeleteMessageCascade={onDeleteMessageCascade}
          onToggleSelectMessage={onToggleSelectMessage}
          isSelected={selectedMessageIds.has(message.id)}
          isSelectionMode={isSelectionMode}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
        />
      ))}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages.at(-1)?.role === 'user' && <ThinkingMessage />}

      <motion.div
        className="min-h-[24px] min-w-[24px] shrink-0"
        onViewportEnter={onViewportEnter}
        onViewportLeave={onViewportLeave}
        ref={messagesEndRef}
      />
    </div>
  );
}

function areEqual(
  prevProps: ArtifactMessagesProps,
  nextProps: ArtifactMessagesProps
) {
  if (
    prevProps.artifactStatus === 'streaming' &&
    nextProps.artifactStatus === 'streaming'
  ) {
    return true;
  }

  if (prevProps.onDeleteMessage !== nextProps.onDeleteMessage) {
    return false;
  }
  if (prevProps.onDeleteMessageCascade !== nextProps.onDeleteMessageCascade) {
    return false;
  }
  if (prevProps.onToggleSelectMessage !== nextProps.onToggleSelectMessage) {
    return false;
  }
  if (prevProps.isSelectionMode !== nextProps.isSelectionMode) {
    return false;
  }
  if (prevProps.selectedMessageIds !== nextProps.selectedMessageIds) {
    return false;
  }

  if (prevProps.status !== nextProps.status) {
    return false;
  }
  if (prevProps.status && nextProps.status) {
    return false;
  }
  if (prevProps.messages.length !== nextProps.messages.length) {
    return false;
  }
  if (!equal(prevProps.votes, nextProps.votes)) {
    return false;
  }

  return true;
}

export const ArtifactMessages = memo(PureArtifactMessages, areEqual);
