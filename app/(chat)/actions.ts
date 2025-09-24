"use server";

import { generateText, type UIMessage } from "ai";
import { cookies } from "next/headers";
import type { VisibilityType } from "@/components/visibility-selector";
import { myProvider } from "@/lib/ai/providers";
import { TITLE_GENERATION_MODEL } from "@/lib/ai/models";
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  forkChat,
  updateChatVisiblityById,
} from "@/lib/db/queries";
import { getAppSession } from "@/lib/auth/session";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
  model: myProvider.languageModel(TITLE_GENERATION_MODEL),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}

export async function forkChatAction({
  sourceChatId,
  fromMessageId,
  editedText,
}: {
  sourceChatId: string;
  fromMessageId: string;
  editedText: string;
}) {
  const session = await getAppSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const { newChatId } = await forkChat({
    sourceChatId,
    fromMessageId,
    userId: session.user.id,
  });
  // Return new chat id and the edited content so client can send it as first message
  return { newChatId };
}
