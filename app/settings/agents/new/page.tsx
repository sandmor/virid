import { redirect } from 'next/navigation';
import AgentEditor from '@/components/agent-editor';
import { getAppSession } from '@/lib/auth/session';
import { getTierForUserType } from '@/lib/ai/tiers';
import { resolveChatModelOptions } from '@/lib/ai/models.server';

export default async function NewAgentPage() {
  const session = await getAppSession();
  if (!session?.user) {
    redirect('/login');
  }

  const { modelIds: allowedModelIds } = await getTierForUserType(
    session.user.type
  );
  const allowedModels = await resolveChatModelOptions(allowedModelIds);

  return <AgentEditor mode="create" allowedModels={allowedModels} />;
}
