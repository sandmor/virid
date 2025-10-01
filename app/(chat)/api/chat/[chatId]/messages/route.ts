import { getAppSession } from '@/lib/auth/session';
import { deleteMessagesByIds } from '@/lib/db/queries';
import { ChatSDKError } from '@/lib/errors';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;

  if (!chatId) {
    return new ChatSDKError(
      'bad_request:api',
      'Parameter chatId is required.'
    ).toResponse();
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new ChatSDKError(
      'bad_request:api',
      'Request body must be valid JSON.'
    ).toResponse();
  }

  const messageIds = Array.isArray((payload as any)?.messageIds)
    ? (payload as any).messageIds.filter(
        (id: unknown) => typeof id === 'string' && id.trim().length > 0
      )
    : null;

  if (!messageIds || messageIds.length === 0) {
    return new ChatSDKError(
      'bad_request:api',
      'Request body must include messageIds as a non-empty array of strings.'
    ).toResponse();
  }

  const session = await getAppSession();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  try {
    const result = await deleteMessagesByIds({
      chatId,
      messageIds,
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
