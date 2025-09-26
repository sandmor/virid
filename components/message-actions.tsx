import equal from "fast-deep-equal";
import { memo } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCopyToClipboard } from "usehooks-ts";
import type { Vote } from "@/lib/db/schema";
import type { ChatMessage } from "@/lib/types";
import { Action, Actions } from "./elements/actions";
import { CopyIcon, PencilEditIcon, ThumbDownIcon, ThumbUpIcon } from "./icons";
// Variant history removed with simplified message model

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
  setMode,
  onRegenerate,
  disableRegenerate,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMode?: (mode: "view" | "edit") => void;
  onRegenerate?: (assistantMessageId: string) => void;
  disableRegenerate?: boolean;
}) {
  const queryClient = useQueryClient();
  const voteQueryKey = ["chat","votes", chatId];

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/vote", {
        method: "PATCH",
        body: JSON.stringify({ chatId, messageId: message.id, type: "up" }),
      });
      if (!res.ok) throw new Error("Failed to upvote");
      return res.json().catch(() => ({}));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: voteQueryKey });
      const prev = queryClient.getQueryData<Vote[] | undefined>(voteQueryKey);
      queryClient.setQueryData<Vote[] | undefined>(voteQueryKey, (current) => {
        const safe = current || [];
        const filtered = safe.filter((v) => v.messageId !== message.id);
        return [...filtered, { chatId, messageId: message.id, isUpvoted: true } as Vote];
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(voteQueryKey, ctx.prev);
      toast.error("Failed to upvote response.");
    },
    onSuccess: () => {
      toast.success("Upvoted Response!");
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/vote", {
        method: "PATCH",
        body: JSON.stringify({ chatId, messageId: message.id, type: "down" }),
      });
      if (!res.ok) throw new Error("Failed to downvote");
      return res.json().catch(() => ({}));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: voteQueryKey });
      const prev = queryClient.getQueryData<Vote[] | undefined>(voteQueryKey);
      queryClient.setQueryData<Vote[] | undefined>(voteQueryKey, (current) => {
        const safe = current || [];
        const filtered = safe.filter((v) => v.messageId !== message.id);
        return [...filtered, { chatId, messageId: message.id, isUpvoted: false } as Vote];
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(voteQueryKey, ctx.prev);
      toast.error("Failed to downvote response.");
    },
    onSuccess: () => {
      toast.success("Downvoted Response!");
    },
  });
  const [_, copyToClipboard] = useCopyToClipboard();

  if (isLoading) {
    return null;
  }

  const textFromParts = message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();

  const handleCopy = async () => {
    if (!textFromParts) {
      toast.error("There's no text to copy!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success("Copied to clipboard!");
  };

  // User messages get edit (on hover) and copy actions
  if (message.role === "user") {
    return (
      <Actions className="-mr-0.5 justify-end">
        <div className="relative">
          {setMode && (
            <Action
              className="-left-10 absolute top-0 opacity-0 transition-opacity group-hover/message:opacity-100"
              onClick={() => setMode("edit")}
              tooltip="Edit"
            >
              <PencilEditIcon />
            </Action>
          )}
          <Action onClick={handleCopy} tooltip="Copy">
            <CopyIcon />
          </Action>
        </div>
      </Actions>
    );
  }

  return (
    <Actions className="-ml-0.5">
      {onRegenerate && message.role === "assistant" && (
        <Action
          onClick={() => !disableRegenerate && onRegenerate(message.id)}
          tooltip={disableRegenerate ? "Regenerating…" : "Regenerate"}
          disabled={disableRegenerate}
        >
          <PencilEditIcon />
        </Action>
      )}
      {/* Variant history action removed */}
      <Action onClick={handleCopy} tooltip="Copy">
        <CopyIcon />
      </Action>

      <Action
        data-testid="message-upvote"
        disabled={vote?.isUpvoted}
        onClick={() => {
          upvoteMutation.mutate();
        }}
        tooltip="Upvote Response"
      >
        <ThumbUpIcon />
      </Action>

      <Action
        data-testid="message-downvote"
        disabled={vote && !vote.isUpvoted}
        onClick={() => {
          downvoteMutation.mutate();
        }}
        tooltip="Downvote Response"
      >
        <ThumbDownIcon />
      </Action>
    </Actions>
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
