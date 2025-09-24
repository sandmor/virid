import { NextResponse } from "next/server";
import { getAssistantVariantsByMessageId } from "@/lib/db/queries";
import { ChatSDKError } from "@/lib/errors";
import { getAppSession } from "@/lib/auth/session";
import { getChatById } from "@/lib/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get("messageId");
  const chatId = searchParams.get("chatId");
  if (!messageId || !chatId) {
    return new ChatSDKError("bad_request:api").toResponse();
  }
  const session = await getAppSession();
  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }
  const chat = await getChatById({ id: chatId });
  if (!chat || chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }
  const variants = await getAssistantVariantsByMessageId({ messageId });
  return NextResponse.json({ variants });
}
