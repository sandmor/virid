import { Metadata } from 'next';
import { getAppSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { isAdmin } from '@/lib/auth/admin';
import SettingsView from './view';
import AdminSections from './AdminSections';
import { getTierForUserType } from '@/lib/ai/tiers';
import { resolveChatModelOptions } from '@/lib/ai/models.server';

export const metadata: Metadata = {
  title: 'Account Settings',
};

// Server helper to prefetch archive list when archive tab is active so first paint is immediate.
async function prefetchArchive() {
  const qc = new QueryClient();
  await qc.prefetchInfiniteQuery({
    queryKey: ['archive', 'search', { q: undefined, tags: undefined }],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/archive/search?limit=20`,
        { cache: 'no-store' }
      );
      if (!res.ok) return { entries: [], hasMore: false, nextCursor: null };
      return res.json();
    },
    initialPageParam: undefined,
  });
  return dehydrate(qc);
}

// Server helper to prefetch agents list when agents tab is active.
async function prefetchAgents() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/agents`,
        { cache: 'no-store' }
      );
      if (!res.ok) return { agents: [] };
      return res.json();
    },
  });
  return dehydrate(qc);
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getAppSession();
  if (!session?.user) redirect('/login');
  const { modelIds: allowedModelIds } = await getTierForUserType(
    session.user.type
  );
  const allowedModels = await resolveChatModelOptions(allowedModelIds);
  const params = await searchParams;
  const tabParam = typeof params?.tab === 'string' ? params.tab : undefined;
  const adminAllowed = await isAdmin();
  const defaultTab =
    tabParam === 'admin' && adminAllowed
      ? 'admin'
      : tabParam === 'agents'
        ? 'agents'
        : 'archive';
  const dehydrated =
    defaultTab === 'archive'
      ? await prefetchArchive()
      : defaultTab === 'agents'
        ? await prefetchAgents()
        : undefined;
  const adminContent = adminAllowed ? <AdminSections /> : null;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your knowledge archive, AI agents, and administrative
          configuration.
        </p>
      </header>
      <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
        <HydrationBoundary state={dehydrated}>
          <Suspense fallback={<div className="flex-1 rounded-md border" />}>
            <SettingsView
              defaultTab={defaultTab}
              isAdmin={adminAllowed}
              adminContent={adminContent}
              allowedModels={allowedModels}
            />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
