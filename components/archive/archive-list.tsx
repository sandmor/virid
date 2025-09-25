"use client";
import { useRef, useEffect, useState } from "react";
import { useArchiveSearch } from "@/hooks/use-archive";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function ArchiveList({
  q,
  tags,
  onSelect,
  activeSlug,
}: {
  q?: string;
  tags?: string[];
  onSelect: (slug: string) => void;
  activeSlug?: string;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useArchiveSearch({ q, tags });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!hasNextPage || isFetchingNextPage) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fetchNextPage();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data]);

  const pages = (data as any)?.pages ?? [];
  const entries = pages.flatMap((p: { entries: any[] }) => p.entries as any[]);

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-2">
          {isLoading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md border p-3">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
          {entries.map((e: any) => (
            <button
              key={e.slug}
              onClick={() => onSelect(e.slug)}
              className={cn(
                "group flex flex-col items-start gap-1 rounded-md border p-3 text-left transition hover:bg-accent",
                activeSlug === e.slug && "border-primary ring-1 ring-primary"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="font-medium line-clamp-1" title={e.entity}>{e.entity}</div>
                {e.linkCount > 0 && (
                  <span className="text-xs text-muted-foreground">{e.linkCount} link{e.linkCount === 1 ? "" : "s"}</span>
                )}
              </div>
              <div className="line-clamp-2 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: escapeHtml(e.bodyPreview) }} />
              <div className="flex flex-wrap gap-1 pt-1">
                {e.tags.slice(0,4).map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                {e.tags.length > 4 && <Badge variant="outline" className="text-[10px]">+{e.tags.length - 4}</Badge>}
              </div>
            </button>
          ))}
          {entries.length === 0 && !isLoading && (
            <div className="text-sm text-muted-foreground p-4 text-center">No archive entries found.</div>
          )}
          <div ref={sentinelRef} />
          {isFetchingNextPage && <div className="py-4 text-center text-xs text-muted-foreground">Loading more…</div>}
          {!hasNextPage && entries.length > 0 && (
            <div className="py-4 text-center text-xs text-muted-foreground">End of results</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
