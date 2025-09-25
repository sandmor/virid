"use client";
import { useState } from "react";
import { ArchiveList } from "@/components/archive/archive-list";
import { ArchiveDetail } from "@/components/archive/archive-detail";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useArchiveEntry, useCreateArchiveEntry, useUpdateArchiveEntry } from "@/hooks/use-archive";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ArchiveExplorer() {
  const [q, setQ] = useState("");
  const [current, setCurrent] = useState<string | undefined>();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data: selected } = useArchiveEntry(current);
  const createMutation = useCreateArchiveEntry();
  const updateMutation = useUpdateArchiveEntry();

  // Form state (simple local states; could be replaced with react-hook-form for richer validation later)
  const [newEntity, setNewEntity] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [editEntity, setEditEntity] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editTagInput, setEditTagInput] = useState("");

  function resetNewForm() {
    setNewEntity(""); setNewBody(""); setNewTags([]); setTagInput("");
  }

  function openEditDialog() {
    if (!selected) return;
    setEditEntity(selected.entity);
    setEditBody(selected.body);
    setEditTags(selected.tags);
    setEditTagInput("");
    setOpenEdit(true);
  }

  async function handleCreate() {
    try {
      const { slug } = await createMutation.mutateAsync({ entity: newEntity.trim(), body: newBody.trim() || undefined, tags: newTags });
      toast.success("Entry created");
      setOpenNew(false);
      resetNewForm();
      setCurrent(slug);
    } catch (e: any) {
      toast.error(e?.message || "Failed to create entry");
    }
  }

  async function handleUpdate() {
    if (!current) return;
    try {
      await updateMutation.mutateAsync({ slug: current, entity: editEntity.trim(), body: editBody.trim() });
      toast.success("Entry updated");
      setOpenEdit(false);
    } catch (e: any) {
      toast.error(e?.message || "Failed to update entry");
    }
  }
  return (
    <div className="flex h-full gap-4">
      <div className="flex w-80 flex-shrink-0 flex-col rounded-md border">
        <div className="flex items-center gap-2 p-3">
          <Input placeholder="Search archive…" value={q} onChange={e => setQ(e.target.value)} className="h-8" />
          <Dialog open={openNew} onOpenChange={setOpenNew}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">New</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Create Archive Entry</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Entity</label>
                  <Input value={newEntity} onChange={e=>setNewEntity(e.target.value)} placeholder="e.g. Project Phoenix" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 pb-1">
                    {newTags.map(t => <Badge key={t} variant="secondary" className="cursor-pointer" onClick={()=>setNewTags(newTags.filter(x=>x!==t))}>{t}</Badge>)}
                  </div>
                  <div className="flex gap-2">
                    <Input value={tagInput} onChange={e=>setTagInput(e.target.value)} placeholder="Add tag and press Enter" onKeyDown={e=>{ if(e.key==='Enter' && tagInput.trim()){ e.preventDefault(); if(!newTags.includes(tagInput.trim())) setNewTags([...newTags, tagInput.trim()]); setTagInput(''); }} } />
                    {tagInput && <Button type="button" variant="outline" onClick={()=>{ if(tagInput.trim() && !newTags.includes(tagInput.trim())) setNewTags([...newTags, tagInput.trim()]); setTagInput(''); }}>Add</Button>}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Body</label>
                  <Textarea value={newBody} onChange={e=>setNewBody(e.target.value)} rows={10} placeholder="Structured long-form content..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={()=>setOpenNew(false)}>Cancel</Button>
                <Button disabled={!newEntity.trim() || createMutation.isPending} onClick={handleCreate}>{createMutation.isPending ? 'Creating…' : 'Create'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Separator />
        <div className="flex-1"><ArchiveList q={q || undefined} onSelect={setCurrent} activeSlug={current} /></div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col rounded-md border relative">
        <div className="absolute right-2 top-2 flex gap-2">
          {current && selected && (
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <Button size="sm" variant="outline" onClick={openEditDialog}>Edit</Button>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>Edit Entry</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Entity</label>
                    <Input value={editEntity} onChange={e=>setEditEntity(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Tags (remove by click)</label>
                    <div className="flex flex-wrap gap-2 pb-1">
                      {editTags.map(t => <Badge key={t} variant="secondary" className="cursor-pointer" onClick={()=>setEditTags(editTags.filter(x=>x!==t))}>{t}</Badge>)}
                    </div>
                    <div className="flex gap-2">
                      <Input value={editTagInput} onChange={e=>setEditTagInput(e.target.value)} placeholder="Add tag and press Enter" onKeyDown={e=>{ if(e.key==='Enter' && editTagInput.trim()){ e.preventDefault(); if(!editTags.includes(editTagInput.trim())) setEditTags([...editTags, editTagInput.trim()]); setEditTagInput(''); }} } />
                      {editTagInput && <Button type="button" variant="outline" onClick={()=>{ if(editTagInput.trim() && !editTags.includes(editTagInput.trim())) setEditTags([...editTags, editTagInput.trim()]); setEditTagInput(''); }}>Add</Button>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Body</label>
                    <Textarea value={editBody} onChange={e=>setEditBody(e.target.value)} rows={14} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={()=>setOpenEdit(false)}>Cancel</Button>
                  <Button disabled={updateMutation.isPending} onClick={handleUpdate}>{updateMutation.isPending ? 'Saving…' : 'Save'}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <ArchiveDetail slug={current} onDeleted={()=>{ setCurrent(undefined); }} />
      </div>
    </div>
  );
}
