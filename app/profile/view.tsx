'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ArchiveDetail } from '@/components/archive/archive-detail';
import { ArchiveList } from '@/components/archive/archive-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  useArchiveEntry,
  useCreateArchiveEntry,
  useUpdateArchiveEntry,
} from '@/hooks/use-archive';

export function ArchiveExplorer() {
  const [q, setQ] = useState('');
  const [current, setCurrent] = useState<string | undefined>();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data: selected } = useArchiveEntry(current);
  const createMutation = useCreateArchiveEntry();
  const updateMutation = useUpdateArchiveEntry();

  // Schemas
  const tagSchema = z
    .string()
    .trim()
    .min(1)
    .max(40)
    .regex(/^[^,]+$/, 'Commas not allowed');
  const baseSchema = z.object({
    entity: z
      .string()
      .trim()
      .min(2, 'Entity must be at least 2 characters')
      .max(200),
    body: z.string().trim().max(20_000).optional().or(z.literal('')),
    tags: z.array(tagSchema).max(24, 'Too many tags'),
    tagInput: z.string().optional(), // ephemeral input field
  });

  type FormValues = z.infer<typeof baseSchema>;

  const createForm = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: { entity: '', body: '', tags: [], tagInput: '' },
    mode: 'onChange',
  });

  const editForm = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: { entity: '', body: '', tags: [], tagInput: '' },
  });

  // Populate edit form when selected changes & dialog opened
  useEffect(() => {
    if (selected && openEdit) {
      editForm.reset({
        entity: selected.entity,
        body: selected.body,
        tags: selected.tags,
        tagInput: '',
      });
    }
  }, [selected, openEdit, editForm]);

  const addTag = useCallback((form: typeof createForm | typeof editForm) => {
    const ti = form.getValues('tagInput')?.trim();
    if (!ti) return;
    const tags = form.getValues('tags');
    if (!tags.includes(ti))
      form.setValue('tags', [...tags, ti], {
        shouldDirty: true,
        shouldValidate: true,
      });
    form.setValue('tagInput', '');
  }, []);

  const removeTag = useCallback(
    (form: typeof createForm | typeof editForm, tag: string) => {
      const tags = form.getValues('tags').filter((t) => t !== tag);
      form.setValue('tags', tags, { shouldDirty: true, shouldValidate: true });
    },
    []
  );

  const handleCreate = createForm.handleSubmit(async (values) => {
    try {
      const { slug } = await createMutation.mutateAsync({
        entity: values.entity.trim(),
        body: values.body?.trim() || undefined,
        tags: values.tags,
      });
      toast.success('Entry created');
      setOpenNew(false);
      createForm.reset();
      setCurrent(slug);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to create entry');
    }
  });

  const handleUpdate = editForm.handleSubmit(async (values) => {
    if (!current) return;
    try {
      // Tag updates: diff existing
      const original = selected?.tags || [];
      const addTags = values.tags.filter((t) => !original.includes(t));
      const removeTags = original.filter((t) => !values.tags.includes(t));
      await updateMutation.mutateAsync({
        slug: current,
        entity: values.entity.trim(),
        body: values.body?.trim(),
        addTags: addTags.length ? addTags : undefined,
        removeTags: removeTags.length ? removeTags : undefined,
      });
      toast.success('Entry updated');
      setOpenEdit(false);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update entry');
    }
  });

  function openEditDialog() {
    if (!selected) return;
    editForm.reset({
      entity: selected.entity,
      body: selected.body,
      tags: selected.tags,
      tagInput: '',
    });
    setOpenEdit(true);
  }
  return (
    <div className="flex h-full min-h-0 gap-4">
      <div className="flex w-80 flex-shrink-0 flex-col rounded-md border min-h-0">
        <div className="flex items-center gap-2 p-3 border-b">
          <Input
            placeholder="Search archive…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-8"
          />
          <Dialog
            open={openNew}
            onOpenChange={(o) => {
              setOpenNew(o);
              if (!o) createForm.reset();
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Archive Entry</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Entity</label>
                  <Input
                    {...createForm.register('entity')}
                    placeholder="e.g. Project Phoenix"
                  />
                  {createForm.formState.errors.entity && (
                    <p className="text-xs text-destructive">
                      {createForm.formState.errors.entity.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 pb-1">
                    {createForm.watch('tags').map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTag(createForm, t)}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      {...createForm.register('tagInput')}
                      placeholder="Add tag and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(createForm);
                        }
                      }}
                    />
                    {createForm.watch('tagInput') && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addTag(createForm)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {createForm.formState.errors.tags && (
                    <p className="text-xs text-destructive">
                      {createForm.formState.errors.tags.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Body</label>
                  <Textarea
                    {...createForm.register('body')}
                    rows={10}
                    placeholder="Structured long-form content..."
                  />
                  {createForm.formState.errors.body && (
                    <p className="text-xs text-destructive">
                      {createForm.formState.errors.body.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenNew(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !createForm.formState.isValid || createMutation.isPending
                    }
                  >
                    {createMutation.isPending ? 'Creating…' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex-1 min-h-0">
          <ArchiveList
            q={q || undefined}
            onSelect={setCurrent}
            activeSlug={current}
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col rounded-md border relative min-h-0">
        <div className="absolute right-2 top-2 flex gap-2">
          {current && selected && (
            <Dialog
              open={openEdit}
              onOpenChange={(o) => {
                setOpenEdit(o);
                if (!o) editForm.reset();
              }}
            >
              <Button size="sm" variant="outline" onClick={openEditDialog}>
                Edit
              </Button>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Entry</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Entity</label>
                    <Input {...editForm.register('entity')} />
                    {editForm.formState.errors.entity && (
                      <p className="text-xs text-destructive">
                        {editForm.formState.errors.entity.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Tags (remove by click)
                    </label>
                    <div className="flex flex-wrap gap-2 pb-1">
                      {editForm.watch('tags').map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(editForm, t)}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        {...editForm.register('tagInput')}
                        placeholder="Add tag and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(editForm);
                          }
                        }}
                      />
                      {editForm.watch('tagInput') && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addTag(editForm)}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                    {editForm.formState.errors.tags && (
                      <p className="text-xs text-destructive">
                        {editForm.formState.errors.tags.message as string}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Body</label>
                    <Textarea {...editForm.register('body')} rows={14} />
                    {editForm.formState.errors.body && (
                      <p className="text-xs text-destructive">
                        {editForm.formState.errors.body.message}
                      </p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenEdit(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? 'Saving…' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <ArchiveDetail
            slug={current}
            onDeleted={() => {
              setCurrent(undefined);
            }}
          />
        </div>
      </div>
    </div>
  );
}
