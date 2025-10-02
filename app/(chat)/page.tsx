import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Chat } from '@/components/chat';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL, isModelIdAllowed } from '@/lib/ai/models';
import { getTierForUserType } from '@/lib/ai/tiers';
import { generateUUID } from '@/lib/utils';
import { getAppSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import type { Agent as AgentModel } from '@/lib/db/schema';
import { normalizeModelId } from '@/lib/agent-settings';

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const session = await getAppSession();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  const { modelIds: allowedModels } = await getTierForUserType(
    session.user.type
  );
  // Check for agentId
  const agentId =
    typeof searchParams?.agentId === 'string'
      ? searchParams.agentId
      : undefined;
  let initialAgent: Pick<
    AgentModel,
    'id' | 'name' | 'description' | 'settings'
  > | null = null;
  if (agentId) {
    try {
      const agent = await prisma.agent.findFirst({
        where: { id: agentId, userId: session.user.id },
      });
      if (agent) {
        initialAgent = {
          id: agent.id,
          name: agent.name,
          description: agent.description,
          settings: agent.settings,
        };
      }
    } catch {
      // Ignore errors; fall back to default selections
    }
  }

  const cookieCandidate = modelIdFromCookie
    ? modelIdFromCookie.value
    : undefined;
  const agentModelPreference = normalizeModelId(
    initialAgent?.settings ? (initialAgent.settings as any)?.modelId : undefined
  );

  const candidateOrder = [
    agentModelPreference,
    cookieCandidate,
    DEFAULT_CHAT_MODEL,
  ];

  let initialModel = candidateOrder.find(
    (candidate): candidate is string =>
      !!candidate && isModelIdAllowed(candidate, allowedModels)
  );

  if (!initialModel) {
    initialModel = allowedModels[0] ?? DEFAULT_CHAT_MODEL;
  }

  if (
    !modelIdFromCookie ||
    !isModelIdAllowed(modelIdFromCookie.value, allowedModels)
  ) {
    return (
      <>
        <Chat
          autoResume={false}
          id={id}
          initialChatModel={initialModel}
          initialMessages={[]}
          initialVisibilityType="private"
          isReadonly={false}
          key={id}
          allowedModelIds={allowedModels}
          agentId={agentId}
          initialAgent={initialAgent}
          initialSettings={null}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        autoResume={false}
        id={id}
        initialChatModel={initialModel}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        key={id}
        allowedModelIds={allowedModels}
        agentId={agentId}
        initialAgent={initialAgent}
        initialSettings={null}
      />
      <DataStreamHandler />
    </>
  );
}
