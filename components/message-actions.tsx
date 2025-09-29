import equal from 'fast-deep-equal';
import { memo } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCopyToClipboard } from 'usehooks-ts';
import type { Vote } from '@/lib/db/schema';
import type { ChatMessage } from '@/lib/types';
import { Action, Actions } from './elements/actions';
import { Copy, Pencil, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
  setMode,
  onRegenerate,
  disableRegenerate,
  modelBadge,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMode?: (mode: 'view' | 'edit') => void;
  onRegenerate?: (assistantMessageId: string) => void;
  disableRegenerate?: boolean;
  modelBadge?: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const voteQueryKey = ['chat', 'votes', chatId];

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/vote', {
        method: 'PATCH',
        body: JSON.stringify({ chatId, messageId: message.id, type: 'up' }),
      });
      if (!res.ok) throw new Error('Failed to upvote');
      return res.json().catch(() => ({}));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: voteQueryKey });
      const prev = queryClient.getQueryData<Vote[] | undefined>(voteQueryKey);
      queryClient.setQueryData<Vote[] | undefined>(voteQueryKey, (current) => {
        const safe = current || [];
        const filtered = safe.filter((v) => v.messageId !== message.id);
        return [
          ...filtered,
          { chatId, messageId: message.id, isUpvoted: true } as Vote,
        ];
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(voteQueryKey, ctx.prev);
      toast.error('Failed to upvote response.');
    },
    onSuccess: () => {
      toast.success('Upvoted Response!');
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/vote', {
        method: 'PATCH',
        body: JSON.stringify({ chatId, messageId: message.id, type: 'down' }),
      });
      if (!res.ok) throw new Error('Failed to downvote');
      return res.json().catch(() => ({}));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: voteQueryKey });
      const prev = queryClient.getQueryData<Vote[] | undefined>(voteQueryKey);
      queryClient.setQueryData<Vote[] | undefined>(voteQueryKey, (current) => {
        const safe = current || [];
        const filtered = safe.filter((v) => v.messageId !== message.id);
        return [
          ...filtered,
          { chatId, messageId: message.id, isUpvoted: false } as Vote,
        ];
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(voteQueryKey, ctx.prev);
      toast.error('Failed to downvote response.');
    },
    onSuccess: () => {
      toast.success('Downvoted Response!');
    },
  });
  const [_, copyToClipboard] = useCopyToClipboard();

  if (isLoading) {
    return null;
  }

  const textFromParts = message.parts
    ?.filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();

  const handleCopy = async () => {
    if (!textFromParts) {
      toast.error("There's no text to copy!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success('Copied to clipboard!');
  };

  // User messages get edit (on hover) and copy actions
  if (message.role === 'user') {
    return (
      <Actions className="-mr-0.5 justify-end">
        <div className="relative">
          {setMode && (
            <Action
              onClick={() => setMode('edit')}
              tooltip="Edit"
            >
              <Pencil size={16} />
            </Action>
          )}
          <Action onClick={handleCopy} tooltip="Copy">
            <Copy size={16} />
          </Action>
        </div>
      </Actions>
    );
  }

  return (
    <div className="flex items-center gap-2 -ml-0.5">
      <Actions>
        <div className="relative">
          {/* Primary actions: Copy, Upvote, Downvote */}
          <Action onClick={handleCopy} tooltip="Copy">
            <Copy size={16} />
          </Action>

          <Action
            data-testid="message-upvote"
            disabled={vote?.isUpvoted}
            onClick={() => {
              upvoteMutation.mutate();
            }}
            tooltip="Upvote Response"
          >
            <ThumbsUp size={16} />
          </Action>

          <Action
            data-testid="message-downvote"
            disabled={vote && !vote.isUpvoted}
            onClick={() => {
              downvoteMutation.mutate();
            }}
            tooltip="Downvote Response"
          >
            <ThumbsDown size={16} />
          </Action>

          {/* Secondary actions: Edit then Regenerate (last two) */}
          {setMode && (
            <Action onClick={() => setMode('edit')} tooltip="Edit">
              <Pencil size={16} />
            </Action>
          )}
          {onRegenerate && message.role === 'assistant' && (
            <Action
              onClick={() => !disableRegenerate && onRegenerate(message.id)}
              tooltip={disableRegenerate ? 'Regenerating…' : 'Regenerate'}
              disabled={disableRegenerate}
            >
              <RotateCcw size={16} />
            </Action>
          )}
        </div>
      </Actions>

      {message.role === 'assistant' && modelBadge ? (
        <div className="flex items-center">{modelBadge}</div>
      ) : null}
    </div>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) {
      return false;
    }
    if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    }

    return true;
  }
);
