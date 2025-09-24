"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { deleteTrailingMessages, forkChatAction } from "@/app/(chat)/actions";
import { useRouter } from "next/navigation";
import type { ChatMessage } from "@/lib/types";
import { getTextFromMessage } from "@/lib/utils";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export type MessageEditorProps = {
  message: ChatMessage;
  setMode: Dispatch<SetStateAction<"view" | "edit">>;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  regenerate: UseChatHelpers<ChatMessage>["regenerate"];
};

export function MessageEditor({
  message,
  setMode,
  setMessages,
  regenerate,
}: MessageEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [draftContent, setDraftContent] = useState<string>(
    getTextFromMessage(message)
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
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
            setMode("view");
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
            setMode("view");

            setMessages((messages) => messages); // noop optimistic disable

            // Determine if this user message is the last user message in the timeline.
            let isLastUser = false;
            setMessages((messages) => {
              const idx = messages.findIndex((m) => m.id === message.id);
              if (idx === -1) return messages;
              isLastUser = messages.slice(idx + 1).every((m) => m.role !== "user");
              return messages;
            });

            if (isLastUser) {
              // Legacy inline edit path (will later convert to versioned assistant regeneration flow only for last message)
              await deleteTrailingMessages({ id: message.id });
              setMessages((messages) => {
                const index = messages.findIndex((m) => m.id === message.id);
                if (index !== -1) {
                  const updatedMessage: ChatMessage = {
                    ...message,
                    parts: [{ type: "text", text: draftContent }],
                  };
                  return [...messages.slice(0, index), updatedMessage];
                }
                return messages;
              });
              regenerate();
              return;
            }

            // Non-terminal edit: fork chat
            try {
              // We need the chatId; it is not passed directly here, so infer from message (assistant messages have no direct chatId client-side).
              // The simplest path: rely on window location /chat/:id pattern.
              const match = window.location.pathname.match(/\/chat\/(.+)$/);
              if (!match) {
                throw new Error("Cannot infer chat id for fork");
              }
              const currentChatId = match[1];
              // User id not available in this client component directly; server will validate ownership through forkChat (current scaffold requires userId so we skip if absent)
              const { newChatId } = await forkChatAction({
                sourceChatId: currentChatId,
                fromMessageId: message.id,
                editedText: draftContent,
              });
              // Encode edited message so Chat page auto-sends it (leverages existing query->send logic)
              const encoded = encodeURIComponent(draftContent);
              router.push(`/chat/${newChatId}?query=${encoded}`);
            } catch (err) {
              console.error("Fork failed", err);
            }
          }}
          variant="default"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
