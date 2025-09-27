import { prisma } from '@/lib/db/prisma';
import { SUPPORTED_PROVIDERS } from '@/lib/ai/registry';
import { ProvidersEditor } from '@/components/admin/providers-editor';

export const dynamic = 'force-dynamic';

export default async function ProvidersSection() {
  const rows = await prisma.provider.findMany({ orderBy: { id: 'asc' } });
  const initialKeys: Record<string, string | undefined> = {};
  for (const p of SUPPORTED_PROVIDERS) {
    initialKeys[p] = rows.find((r) => r.id === p)?.apiKey;
  }
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Providers</h2>
      <ProvidersEditor initialKeys={initialKeys} />
    </section>
  );
}
