import equal from 'fast-deep-equal';
import { memo, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCopyToClipboard } from 'usehooks-ts';
import type { Vote } from '@/lib/db/schema';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Action, Actions } from './elements/actions';
import {
  Copy,
  Pencil,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { ChatSDKError } from '@/lib/errors';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
  setMode,
  onRegenerate,
  disableRegenerate,
  modelBadge,
  onDelete,
  onDeleteCascade,
  onToggleSelect,
  isSelected,
  isSelectionMode,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMode?: (mode: 'view' | 'edit') => void;
  onRegenerate?: (assistantMessageId: string) => void;
  disableRegenerate?: boolean;
  modelBadge?: React.ReactNode;
  onDelete?: (messageId: string) => Promise<{ chatDeleted: boolean }>;
  onDeleteCascade?: (messageId: string) => Promise<{ chatDeleted: boolean }>;
  onToggleSelect?: (messageId: string) => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
}) {
  const queryClient = useQueryClient();
  const voteQueryKey = ['chat', 'votes', chatId];
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  type DeleteMode = 'single' | 'cascade';

  const deleteMutation = useMutation<
    { chatDeleted: boolean },
    ChatSDKError | Error,
    { mode: DeleteMode }
  >({
    mutationFn: async ({ mode }) => {
      if (mode === 'single') {
        if (!onDelete) {
          throw new ChatSDKError('bad_request:api');
        }
        const result = await onDelete(message.id);
        return result ?? { chatDeleted: false };
      }

      if (!onDeleteCascade) {
        throw new ChatSDKError('bad_request:api');
      }

      const result = await onDeleteCascade(message.id);
      return result ?? { chatDeleted: false };
    },
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast.error(error.message);
        return;
      }
      toast.error('Failed to delete message.');
    },
    onSuccess: (data, variables) => {
      const successDescription = data?.chatDeleted
        ? 'Chat deleted.'
        : variables.mode === 'cascade'
          ? 'Messages deleted.'
          : 'Message deleted.';
      toast.success(successDescription);
      setIsDeleteDialogOpen(false);
    },
  });

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

  const handleDelete = useCallback(
    (mode: DeleteMode) => {
      deleteMutation.mutate({ mode });
    },
    [deleteMutation]
  );

  const SelectionIndicator = ({ checked }: { checked: boolean }) => (
    <span
      aria-hidden="true"
      className={cn(
        'block h-4 w-4 rounded-[4px] border transition-colors',
        checked
          ? 'border-primary bg-primary'
          : 'border-muted-foreground/40 bg-transparent'
      )}
    />
  );

  const handleDeleteDialogToggle = useCallback(
    (open: boolean) => {
      if (deleteMutation.isPending) {
        return;
      }
      setIsDeleteDialogOpen(open);
    },
    [deleteMutation.isPending]
  );

  const renderDeleteAction = () => {
    if (!onDelete) {
      return null;
    }

    return (
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogToggle}
      >
        <AlertDialogTrigger asChild>
          <Action
            disabled={deleteMutation.isPending}
            tooltip={deleteMutation.isPending ? 'Deleting…' : 'Delete'}
          >
            <Trash2 size={16} />
          </Action>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
            <AlertDialogDescription>
              Choose whether to delete only this message or remove it along with
              every following message in the thread.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:flex-row">
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: 'secondary' }))}
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                handleDelete('single');
              }}
            >
              Delete only this
            </AlertDialogAction>
            <AlertDialogAction
              className={cn(buttonVariants({ variant: 'destructive' }))}
              disabled={deleteMutation.isPending || !onDeleteCascade}
              onClick={(event) => {
                event.preventDefault();
                if (!onDeleteCascade) {
                  return;
                }
                handleDelete('cascade');
              }}
            >
              Delete this & following
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  if (isLoading) {
    return null;
  }

  // User messages get edit (on hover) and copy actions
  if (message.role === 'user') {
    return (
      <Actions className="-mr-0.5 justify-end">
        <div className="relative">
          {onToggleSelect && (
            <Action
              aria-pressed={isSelected}
              onClick={() => onToggleSelect(message.id)}
              tooltip={isSelected ? 'Deselect' : 'Select'}
            >
              <SelectionIndicator checked={Boolean(isSelected)} />
            </Action>
          )}
          {renderDeleteAction()}
          {setMode && (
            <Action onClick={() => setMode('edit')} tooltip="Edit">
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
          {onToggleSelect && (
            <Action
              aria-pressed={isSelected}
              onClick={() => onToggleSelect(message.id)}
              tooltip={isSelected ? 'Deselect' : 'Select'}
            >
              <SelectionIndicator checked={Boolean(isSelected)} />
            </Action>
          )}
          {renderDeleteAction()}
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
    if (prevProps.onDelete !== nextProps.onDelete) {
      return false;
    }
    if (prevProps.onDeleteCascade !== nextProps.onDeleteCascade) {
      return false;
    }
    if (prevProps.onToggleSelect !== nextProps.onToggleSelect) {
      return false;
    }
    if (prevProps.isSelected !== nextProps.isSelected) {
      return false;
    }
    if (prevProps.isSelectionMode !== nextProps.isSelectionMode) {
      return false;
    }
    if (!equal(prevProps.vote, nextProps.vote)) {
      return false;
    }
    if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    }

    return true;
  }
);
