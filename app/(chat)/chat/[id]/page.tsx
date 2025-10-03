import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getAppSession } from '@/lib/auth/session';
import { Chat } from '@/components/chat';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL, isModelIdAllowed } from '@/lib/ai/models';
import { resolveChatModelOptions } from '@/lib/ai/models.server';
import { getTierForUserType } from '@/lib/ai/tiers';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { convertToUIMessages } from '@/lib/utils';
import { normalizeModelId } from '@/lib/agent-settings';

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

  // Fetch agent if exists
  let initialAgent = null;
  if (chat.agent) {
    initialAgent = {
      id: chat.agent.id,
      name: chat.agent.name,
      description: chat.agent.description,
      settings: chat.agent.settings,
    };
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');
  const { modelIds: allowedModelIds } = await getTierForUserType(
    session.user.type
  );
  const allowedModels = await resolveChatModelOptions(allowedModelIds);
  const cookieCandidate = chatModelFromCookie
    ? chatModelFromCookie.value
    : undefined;

  const chatSettingsModel = normalizeModelId(chat.settings?.modelId);
  const agentSettingsModel = normalizeModelId(
    (chat.agent?.settings as any)?.modelId
  );

  const candidateOrder = [
    chatSettingsModel,
    agentSettingsModel,
    cookieCandidate,
    DEFAULT_CHAT_MODEL,
  ];

  let initialModel = candidateOrder.find(
    (candidate): candidate is string =>
      !!candidate && isModelIdAllowed(candidate, allowedModelIds)
  );

  if (!initialModel) {
    initialModel = allowedModelIds[0] ?? DEFAULT_CHAT_MODEL;
  }

  if (
    !chatModelFromCookie ||
    !isModelIdAllowed(chatModelFromCookie.value, allowedModelIds)
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
          allowedModels={allowedModels}
          agentId={chat.agent?.id}
          initialAgent={initialAgent}
          initialSettings={chat.settings}
          key={chat.id}
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
        allowedModels={allowedModels}
        agentId={chat.agent?.id}
        initialAgent={initialAgent}
        initialSettings={chat.settings}
        key={chat.id}
      />
      <DataStreamHandler />
    </>
  );
}
