import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getAppSession } from '@/lib/auth/session';
import { Chat } from '@/components/chat';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL, isModelIdAllowed } from '@/lib/ai/models';
import { getTierForUserType } from '@/lib/ai/tiers';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { convertToUIMessages } from '@/lib/utils';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await getAppSession();

  if (!session) {
    redirect('/api/auth/guest');
  }

  if (chat.visibility === 'private') {
    if (!session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const uiMessages = convertToUIMessages(messagesFromDb);

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');
  const { modelIds: allowedModels } = await getTierForUserType(
    session.user.type
  );
  const cookieCandidate = chatModelFromCookie
    ? chatModelFromCookie.value
    : undefined;
  let initialModel =
    cookieCandidate && isModelIdAllowed(cookieCandidate, allowedModels)
      ? cookieCandidate
      : DEFAULT_CHAT_MODEL;
  if (!isModelIdAllowed(initialModel, allowedModels)) {
    initialModel = allowedModels[0];
  }

  if (
    !chatModelFromCookie ||
    !isModelIdAllowed(chatModelFromCookie.value, allowedModels)
  ) {
    return (
      <>
        <Chat
          autoResume={true}
          id={chat.id}
          initialChatModel={initialModel}
          initialLastContext={chat.lastContext ?? undefined}
          initialMessages={uiMessages}
          initialVisibilityType={chat.visibility}
          isReadonly={session?.user?.id !== chat.userId}
          allowedModelIds={allowedModels}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={true}
        id={chat.id}
        initialChatModel={initialModel}
        initialLastContext={chat.lastContext ?? undefined}
        initialMessages={uiMessages}
        initialVisibilityType={chat.visibility}
        isReadonly={session?.user?.id !== chat.userId}
        allowedModelIds={allowedModels}
      />
      <DataStreamHandler />
    </>
  );
}
