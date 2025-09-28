'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { forkChatAction } from '@/app/(chat)/actions';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import type { ChatMessage } from '@/lib/types';
import { getTextFromMessage } from '@/lib/utils';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from './toast';

export type MessageEditorProps = {
  message: ChatMessage;
  setMode: Dispatch<SetStateAction<'view' | 'edit'>>;
};

export function MessageEditor({ message, setMode }: MessageEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [draftContent, setDraftContent] = useState<string>(
    getTextFromMessage(message)
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [adjustHeight]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftContent(event.target.value);
    adjustHeight();
  };

  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div className="flex w-full flex-col gap-2">
      <Textarea
        className="w-full resize-none overflow-hidden rounded-xl bg-transparent text-base! outline-hidden"
        data-testid="message-editor"
        onChange={handleInput}
        ref={textareaRef}
        value={draftContent}
      />

      <div className="flex flex-row justify-end gap-2">
        <Button
          className="h-fit px-3 py-2"
          onClick={() => {
            setMode('view');
          }}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          className="h-fit px-3 py-2"
          data-testid="message-editor-send-button"
          disabled={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            setMode('view');
            toast({ type: 'success', description: 'Forking chat…' });
            try {
              const match = window.location.pathname.match(/\/chat\/(.+)$/);
              if (!match) throw new Error('Cannot infer chat id for fork');
              const currentChatId = match[1];
              const { newChatId } = await forkChatAction({
                sourceChatId: currentChatId,
                pivotMessageId: message.id,
                mode: 'edit',
                editedText: draftContent,
              });
              // Invalidate chat history query so sidebar updates with new chat
              queryClient.invalidateQueries({ queryKey: ['chat', 'history'] });
              // Refetch again after title generation completes (async operation)
              setTimeout(() => {
                queryClient.invalidateQueries({
                  queryKey: ['chat', 'history'],
                });
              }, 8000); // Wait 8 seconds for title generation to complete
              // For user messages, trigger regeneration. For assistant messages, just navigate.
              const shouldRegenerate = message.role === 'user';
              router.push(
                `/chat/${newChatId}${shouldRegenerate ? '?regenerate=true' : ''}`
              );
            } catch (err) {
              console.error('Fork failed', err);
              toast({ type: 'error', description: 'Failed to fork chat' });
              setMode('edit'); // Re-enable edit mode on failure
            } finally {
              setIsSubmitting(false);
            }
          }}
          variant="default"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
