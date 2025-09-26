import { z } from "zod";
import { getAppSession } from "@/lib/auth/session";
import { getChatById } from "@/lib/db/queries";
import { getChatSettings, setAllowedTools } from "@/lib/db/chat-settings";
import { ChatSDKError } from "@/lib/errors";

const patchSchema = z.object({
  chatId: z.string().uuid(),
  allowedTools: z
    .array(z.string().min(1).max(64))
    .max(32)
    .nullable()
    .optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");
  if (!chatId) return new ChatSDKError("bad_request:api").toResponse();
  const session = await getAppSession();
  if (!session?.user) return new ChatSDKError("unauthorized:chat").toResponse();
  const chat = await getChatById({ id: chatId });
  if (!chat || chat.userId !== session.user.id)
    return new ChatSDKError("forbidden:chat").toResponse();
  const settings = await getChatSettings(chatId);
  return Response.json({ settings }, { status: 200 });
}

export async function PATCH(request: Request) {
  let body: z.infer<typeof patchSchema>;
  try {
    body = patchSchema.parse(await request.json());
  } catch (_) {
    return new ChatSDKError("bad_request:api").toResponse();
  }
  const session = await getAppSession();
  if (!session?.user) return new ChatSDKError("unauthorized:chat").toResponse();
  const chat = await getChatById({ id: body.chatId });
  if (!chat || chat.userId !== session.user.id)
    return new ChatSDKError("forbidden:chat").toResponse();
  if (body.allowedTools !== undefined) {
    await setAllowedTools(body.chatId, body.allowedTools ?? undefined);
  } // else undefined means no change
  const settings = await getChatSettings(body.chatId);
  return Response.json({ settings }, { status: 200 });
}
