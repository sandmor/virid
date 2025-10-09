import { notFound, redirect } from 'next/navigation';
import AgentEditor, { type AgentEditorAgent } from '@/components/agent-editor';
import { prisma } from '@/lib/db/prisma';
import { getAppSession } from '@/lib/auth/session';
import { getTierForUserType } from '@/lib/ai/tiers';
import { resolveChatModelOptions } from '@/lib/ai/models.server';
import type { ChatSettings } from '@/lib/db/schema';

export default async function AgentDetailPage({
  params,
}: {
  params: { agentId: string };
}) {
  const session = await getAppSession();
  if (!session?.user) {
    redirect('/login');
  }

  const { agentId } = params;
  if (!agentId) {
    notFound();
  }

  const agent = await prisma.agent.findFirst({
    where: { id: agentId, userId: session.user.id },
  });

  if (!agent) {
    notFound();
  }

  const { modelIds: allowedModelIds } = await getTierForUserType(
    session.user.type
  );
  const allowedModels = await resolveChatModelOptions(allowedModelIds);

  const serializedAgent: AgentEditorAgent = {
    id: agent.id,
    name: agent.name,
    description: agent.description ?? null,
    settings: (agent.settings as ChatSettings | null | undefined) ?? null,
    createdAt: agent.createdAt.toISOString(),
    updatedAt: agent.updatedAt.toISOString(),
  };

  return (
    <AgentEditor
      mode="edit"
      agent={serializedAgent}
      allowedModels={allowedModels}
    />
  );
}
