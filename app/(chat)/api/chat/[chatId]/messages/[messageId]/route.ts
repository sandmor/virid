import { getAppSession } from '@/lib/auth/session';
import { deleteMessageById } from '@/lib/db/queries';
import { ChatSDKError } from '@/lib/errors';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ chatId: string; messageId: string }> }
) {
  const { chatId, messageId } = await params;

  if (!chatId || !messageId) {
    return new ChatSDKError(
      'bad_request:api',
      'Parameters chatId and messageId are required.'
    ).toResponse();
  }

  const session = await getAppSession();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  try {
    const result = await deleteMessageById({
      chatId,
      messageId,
      userId: session.user.id,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }

    return new ChatSDKError('bad_request:api').toResponse();
  }
}
