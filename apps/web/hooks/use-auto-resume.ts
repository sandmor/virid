'use client';

import type { UseChatHelpers } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { useDataStreamState } from '@/components/data-stream-provider';
import type { ChatMessage } from '@/lib/types';

export type UseAutoResumeParams = {
  chatId: string;
  autoResume: boolean;
  initialMessages: ChatMessage[];
  resumeStream: UseChatHelpers<ChatMessage>['resumeStream'];
  setMessages: UseChatHelpers<ChatMessage>['setMessages'];
};

export function useAutoResume({
  chatId,
  autoResume,
  initialMessages,
  resumeStream,
  setMessages,
}: UseAutoResumeParams) {
  const dataStream = useDataStreamState();
  const handledAppendMessageIdsRef = useRef(new Set<string>());

  useEffect(() => {
    handledAppendMessageIdsRef.current.clear();
  }, [chatId]);

  useEffect(() => {
    if (!autoResume) {
      return;
    }

    const mostRecentMessage = initialMessages.at(-1);

    if (mostRecentMessage?.role === 'user') {
      resumeStream();
    }

    // we intentionally run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoResume, initialMessages.at, resumeStream]);

  useEffect(() => {
    if (!dataStream) {
      return;
    }
    if (dataStream.length === 0) {
      return;
    }

    for (const dataPart of dataStream) {
      if (dataPart.type !== 'data-appendMessage') {
        continue;
      }

      let message: ChatMessage & { chatId?: string };
      try {
        message = JSON.parse(dataPart.data) as ChatMessage & {
          chatId?: string;
        };
      } catch {
        continue;
      }

      if (
        !message.id ||
        message.chatId !== chatId ||
        handledAppendMessageIdsRef.current.has(message.id)
      ) {
        continue;
      }

      handledAppendMessageIdsRef.current.add(message.id);

      // A restored-stream event can race with a cache snapshot containing the
      // same assistant message. Apply it to current state as an idempotent
      // keyed event instead of rebuilding from the initial snapshot.
      setMessages((currentMessages) => {
        const alreadyPresent = currentMessages.some(
          (currentMessage) => currentMessage.id === message.id
        );

        if (alreadyPresent) {
          // The cache snapshot is authoritative and may be newer than this
          // retained transient event (for example after an in-place edit).
          return currentMessages;
        }

        return [...currentMessages, message];
      });
    }
  }, [chatId, dataStream, setMessages]);
}
