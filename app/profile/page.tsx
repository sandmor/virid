import { Metadata } from "next";
import { getAppSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArchiveExplorer } from "./view";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Profile | Archive",
};

export default async function ProfilePage() {
  const session = await getAppSession();
  if (!session?.user) redirect("/" );
  // SSR prefetch first page of archive list (empty search)
  const qc = new QueryClient();
  await qc.prefetchInfiniteQuery({
    queryKey: ["archive","search", { q: undefined, tags: undefined }],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/archive/search?limit=20`, { cache: 'no-store' });
      if (!res.ok) return { entries: [], hasMore: false, nextCursor: null };
      return res.json();
    },
    initialPageParam: undefined,
  });
  const dehydrated = dehydrate(qc);
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <h1 className="px-6 pt-6 text-2xl font-semibold tracking-tight">Your Knowledge Archive</h1>
      <p className="px-6 text-sm text-muted-foreground mb-4">Long-form memory entries curated through conversations.</p>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <HydrationBoundary state={dehydrated}>
          <Suspense fallback={<div className="flex-1 rounded-md border" />}> <ArchiveExplorer /> </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
