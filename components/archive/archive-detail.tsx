"use client";
import { useArchiveEntry, useDeleteArchiveEntry, useLinkArchiveEntries, useUnlinkArchiveEntries, useArchiveSlugSuggestions } from "@/hooks/use-archive";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function ArchiveDetail({ slug, onDeleted }: { slug?: string; onDeleted?: () => void }) {
  const { data, isLoading } = useArchiveEntry(slug);
  const deleteMutation = useDeleteArchiveEntry();
  const linkMutation = useLinkArchiveEntries();
  const unlinkMutation = useUnlinkArchiveEntries();
  const [linkTarget, setLinkTarget] = useState("");
  const [linkType, setLinkType] = useState("related");
  const { data: slugSuggestions, isFetching: loadingSuggestions } = useArchiveSlugSuggestions(linkTarget);

  useEffect(() => {
    // scroll to top on slug change
    const container = document.getElementById("archive-detail-area");
    if (container) container.scrollTop = 0;
  }, [slug]);

  if (!slug) {
    return <div className="p-6 text-sm text-muted-foreground">Select an entry to view its contents.</div>;
  }
  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-3 w-full" />)}
      </div>
    );
  }
  if (!data) return <div className="p-6 text-sm text-muted-foreground">Entry not found.</div>;

  async function handleDelete() {
    if (!slug) return;
    if (!confirm("Delete this entry?")) return;
    try {
      await deleteMutation.mutateAsync({ slug });
      toast.success("Entry deleted");
      onDeleted?.();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete");
    }
  }

  async function handleLink() {
    if (!slug || !linkTarget.trim()) return;
    try {
      await linkMutation.mutateAsync({ sourceSlug: slug, targetSlug: linkTarget.trim(), type: linkType, bidirectional: true });
      toast.success("Link added");
      setLinkTarget("");
    } catch (e: any) { toast.error(e?.message || "Failed to link"); }
  }

  async function handleUnlink(otherSlug: string, type: string) {
    if (!slug) return;
    try {
      await unlinkMutation.mutateAsync({ sourceSlug: slug, targetSlug: otherSlug, type });
      toast.success("Link removed");
    } catch (e: any) { toast.error(e?.message || "Failed to unlink"); }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold leading-tight">{data.entity}</h2>
        <div className="mt-1 flex flex-wrap gap-1">
          {data.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">Updated {new Date(data.updatedAt).toLocaleString()}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>{deleteMutation.isPending ? 'Deleting…' : 'Delete'}</Button>
        </div>
      </div>
      <ScrollArea id="archive-detail-area" className="flex-1">
        <div className="prose dark:prose-invert max-w-none p-4">
          {data.body.split(/\n{2,}/).map((para, idx) => <p key={idx} className="whitespace-pre-wrap">{para}</p>)}
        </div>
      </ScrollArea>
      <div className="border-t bg-muted/30 p-3 text-xs space-y-3">
        <div className="font-medium">Links</div>
        <div className="flex flex-wrap gap-2">
          {data.links.map((l,i) => (
            <span key={i} className="flex items-center gap-1 rounded bg-muted px-2 py-1">
              <span>{l.type}: {l.otherSlug}</span>
              <button className="text-[10px] text-red-500 hover:underline" onClick={()=>handleUnlink(l.otherSlug, l.type)}>x</button>
            </span>
          ))}
          {data.links.length === 0 && <span className="text-muted-foreground">No links</span>}
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input placeholder="Target slug" value={linkTarget} onChange={e=>setLinkTarget(e.target.value)} className="h-7 pr-8" />
                  {loadingSuggestions && <span className="absolute right-2 top-1.5 animate-spin text-muted-foreground text-xs">…</span>}
                  {slugSuggestions && slugSuggestions.length > 0 && linkTarget.length >= 2 && (
                    <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow">
                      <ul className="max-h-56 overflow-y-auto text-sm">
                        {slugSuggestions.map(s => (
                          <li key={s.slug}>
                            <button
                              type="button"
                              className="flex w-full items-start gap-2 px-2 py-1.5 text-left hover:bg-accent"
                              onClick={() => setLinkTarget(s.slug)}
                            >
                              <span className="font-medium truncate max-w-[8rem]" title={s.slug}>{s.slug}</span>
                              <span className="truncate text-muted-foreground max-w-[10rem]" title={s.entity}>{s.entity}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Input placeholder="Type" value={linkType} onChange={e=>setLinkType(e.target.value)} className="h-7 w-28" />
                <Button size="sm" onClick={handleLink} disabled={linkMutation.isPending || !linkTarget.trim()}>{linkMutation.isPending ? 'Adding…' : 'Add'}</Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
