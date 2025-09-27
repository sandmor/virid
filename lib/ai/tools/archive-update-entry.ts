import { tool } from 'ai';
import { z } from 'zod';
import type { AppSession } from '@/lib/auth/session';
import { updateArchiveEntry, getArchiveEntryBySlug } from '@/lib/db/queries';
import { ChatSDKError } from '@/lib/errors';

// Canonical strict schema (internal) after normalization
const canonicalSchema = z
  .object({
    slug: z
      .string()
      .min(1)
      .describe('Identifier of the archive entry to update'),
    newEntity: z
      .string()
      .min(1)
      .max(512)
      .optional()
      .describe('New entity/title (<=512 chars)'),
    addTags: z
      .array(z.string().min(1))
      .max(64)
      .optional()
      .describe('Tags to add (duplicates ignored, normalized)'),
    removeTags: z
      .array(z.string().min(1))
      .max(64)
      .optional()
      .describe('Tags to remove'),
    body: z
      .string()
      .optional()
      .describe('Full replacement body (mutually exclusive with appendBody)'),
    appendBody: z
      .string()
      .optional()
      .describe(
        "Text to append to existing body (mutually exclusive with body). Avoid passing 'false' or boolean-like strings."
      ),
  })
  .superRefine((val, ctx) => {
    if (val.body && val.appendBody) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide only one of body or appendBody',
      });
    }
    if (val.appendBody === 'false') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "appendBody should not be the literal string 'false'; omit the field instead",
      });
    }
  });

// Extremely lenient outer schema: accept any object (the model can send natural variants)
const rawInputSchema = z
  .record(z.string(), z.any())
  .describe(
    'Lenient update syntax: provide slug (or id / entry / file) and any of body|content|replaceBody, append|appendBody|add, entity|title|name|rename, addTags|addTag, removeTags|removeTag, tags|setTags (exact set). Comma separated tag strings allowed.'
  );

type Canonical = z.infer<typeof canonicalSchema>;

function coerceStringArray(v: unknown): string[] | undefined {
  if (v == null) return undefined;
  if (Array.isArray(v))
    return v
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  const s = String(v).trim();
  if (!s) return undefined;
  // Allow comma / space separated
  if (s.includes(','))
    return s
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  return [s];
}

function pickFirst<T>(...vals: T[]): T | undefined {
  for (const v of vals) {
    if (
      v !== undefined &&
      v !== null &&
      (typeof v !== 'string' || v.trim() !== '')
    )
      return v;
  }
  return undefined;
}

function extractSlug(raw: any): string | undefined {
  return pickFirst(
    raw.slug,
    raw.id,
    raw.entry,
    raw.file,
    raw.targetSlug,
    raw.identifier
  )?.toString();
}

function normalizeUpdateRaw(
  raw: any,
  currentTags: string[] | null
): Canonical | { error: string; issues?: string[] } {
  const slug = extractSlug(raw);
  if (!slug) return { error: 'Missing slug (use slug / id / entry / file)' };

  // Entity/title rename
  let newEntity = pickFirst(raw.newEntity, raw.entity, raw.title, raw.name);
  if (!newEntity && typeof raw.rename === 'string') newEntity = raw.rename;
  else if (
    !newEntity &&
    raw.rename &&
    typeof raw.rename === 'object' &&
    typeof raw.rename.to === 'string'
  )
    newEntity = raw.rename.to;

  // Body replacement vs append
  let body = pickFirst(
    raw.body,
    raw.fullBody,
    raw.replaceBody,
    raw.content,
    raw.text,
    raw.replace
  );
  let appendBody = pickFirst(
    raw.appendBody,
    raw.append,
    raw.addition,
    raw.add,
    raw.extra
  );

  // Heuristic: if both provided prefer full body replacement
  if (body && appendBody) appendBody = undefined;

  // Treat literal noise values as undefined
  if (
    appendBody &&
    ['false', 'none', 'null'].includes(String(appendBody).toLowerCase())
  )
    appendBody = undefined;
  if (body && ['false', 'none', 'null'].includes(String(body).toLowerCase()))
    body = undefined;

  // Tags additions / removals
  const addTags = coerceStringArray(
    pickFirst(raw.addTags, raw.addTag, raw.tagsAdd, raw.tagAdd)
  );
  const removeTags = coerceStringArray(
    pickFirst(raw.removeTags, raw.removeTag, raw.tagsRemove, raw.tagRemove)
  );

  // Exact set semantics (setTags / tags) -> derive add/remove relative to current tags
  let setTags = coerceStringArray(pickFirst(raw.setTags, raw.tags));
  if (setTags && setTags.length && currentTags) {
    const desired = new Set(setTags.map((t) => t.toLowerCase()));
    const current = new Set(currentTags.map((t) => t.toLowerCase()));
    const toAdd: string[] = [];
    const toRemove: string[] = [];
    for (const t of desired) if (!current.has(t)) toAdd.push(t);
    for (const t of current) if (!desired.has(t)) toRemove.push(t);
    // Merge with any explicit add/remove provided
    const mergedAdd = new Set([...(addTags || []), ...toAdd]);
    const mergedRemove = new Set([...(removeTags || []), ...toRemove]);
    // Remove overlap (cannot both add & remove)
    for (const t of mergedAdd) {
      if (mergedRemove.has(t)) {
        mergedRemove.delete(t); // prefer keep (add) semantics if contradictory
      }
    }
    return {
      slug,
      newEntity,
      addTags: mergedAdd.size ? Array.from(mergedAdd) : undefined,
      removeTags: mergedRemove.size ? Array.from(mergedRemove) : undefined,
      body,
      appendBody,
    };
  }

  return {
    slug,
    newEntity,
    addTags: addTags && addTags.length ? addTags : undefined,
    removeTags: removeTags && removeTags.length ? removeTags : undefined,
    body,
    appendBody,
  };
}

export const archiveUpdateEntry = ({ session }: { session: AppSession }) =>
  tool({
    description: `Archive Update Tool (lenient)

Use this ONLY to modify an existing archive entry (rename, tags, or body changes). Always prefer minimal, precise updates over noisy overwrites.

FIELD SYNONYMS (any one works):
- slug → slug | id | entry | file | targetSlug | identifier (REQUIRED)
- entity rename → newEntity | entity | title | name | rename | { "rename": { "to": "..." } }
- full body replacement → body | fullBody | replaceBody | content | text | replace
- append body → appendBody | append | addition | add | extra (will be concatenated verbatim)
- add tags → addTags | addTag | tagsAdd | tagAdd (string or array; comma allowed)
- remove tags → removeTags | removeTag | tagsRemove | tagRemove
- exact tag set (diffed vs current) → setTags | tags (string or array; comma allowed)

RULES:
1. Provide EITHER a full body (replacement) OR an append text — if both appear, full body wins and append is ignored.
2. To only adjust tags, omit body/append.
3. setTags/tags expresses the desired *final* set; we internally compute adds/removes.
4. Do not send meaningless literals like "false", "null", "none" for optional fields (they are ignored if present).
5. Avoid adding and removing the same tag in the same call (we resolve conflicts by keeping the tag).
6. If no effective change results (no rename, tag delta, or body modification) the update is a no-op.

WHEN TO USE THIS vs archiveApplyEdits:
- Use THIS tool for: renaming, tag operations, whole body rewrites, or simple appends.
- Use archiveApplyEdits for multiple localized anchor edits inside the existing body.

EXAMPLES:
// Rename only
{ "slug": "project-alpha", "rename": "Project Alpha Revamp" }

// Replace entire body and set exact tag set (any missing old tags will be removed)
{ "id": "alpha-notes", "content": "Structured dossier...", "tags": ["active","initiative"] }

// Append a milestone & add a tag
{ "slug": "alpha-notes", "append": "\nMilestone: Phase 2 approved.", "addTag": "milestone" }

// Incremental tag changes (comma string accepted)
{ "slug": "alpha-notes", "addTags": "priority-a,urgent", "removeTag": "deprecated" }

// Provide both body & append (body wins; append ignored)
{ "slug": "alpha-notes", "body": "Fresh cohesive body", "append": "This WILL be ignored" }

Return shape always includes: slug, entity, tags, body, createdAt, updatedAt, noOp.
`,
    inputSchema: rawInputSchema,
    execute: async (rawInput) => {
      if (!session.user?.id)
        return {
          error: 'No active user session',
          code: 'unauthorized',
        } as const;

      // Attempt early slug extraction to fetch current tags (for setTags semantics)
      const provisionalSlug = extractSlug(rawInput);
      const userId = session.user.id;
      const current = provisionalSlug
        ? await getArchiveEntryBySlug({ userId, slug: provisionalSlug })
        : null;
      if (provisionalSlug && !current) {
        // If the caller provided a slug-like field but it doesn't exist, short-circuit
        return {
          error: 'Entry not found',
          code: 'not_found',
          hints: ['Ensure the slug exists before updating'],
        } as const;
      }

      const normalized = normalizeUpdateRaw(
        rawInput,
        current ? current.tags : null
      );
      if ('error' in normalized) {
        return {
          error: normalized.error,
          code: 'bad_request',
          issues: normalized.issues,
        } as const;
      }

      // Canonical validation
      const parsed = canonicalSchema.safeParse(normalized);
      if (!parsed.success) {
        return {
          error: 'Invalid normalized update input',
          code: 'bad_request',
          issues: parsed.error.issues.map((i) => i.message).slice(0, 10),
          received: Object.keys(rawInput || {}),
          normalized: normalized,
          hints: [
            'Provide only one of body or appendBody (body wins if both given)',
            'Use setTags or tags for exact set replacement',
            'Use addTags/removeTags for incremental changes',
          ],
        } as const;
      }

      let { slug, newEntity, addTags, removeTags, body, appendBody } =
        parsed.data;

      // Normalizations of common noise already handled; still guard explicit string "false"/empty
      if (appendBody === 'false' || appendBody === '') appendBody = undefined;
      if (body === 'false') body = undefined;

      try {
        const updated = await updateArchiveEntry({
          userId,
          slug,
          newEntity,
          addTags,
          removeTags,
          body,
          appendBody,
        });
        if (!updated) {
          return { error: 'Entry not found', code: 'not_found' } as const;
        }
        const refetched = await getArchiveEntryBySlug({ userId, slug });
        if (!refetched)
          return {
            error: 'Entry not found after update',
            code: 'not_found',
          } as const;
        return {
          slug: refetched.slug,
          entity: refetched.entity,
          tags: refetched.tags,
          body: refetched.body,
          createdAt: refetched.createdAt.toISOString(),
          updatedAt: refetched.updatedAt.toISOString(),
          noOp:
            updated.updatedAt.getTime() === refetched.updatedAt.getTime() &&
            updated.body === refetched.body,
        } as const;
      } catch (e: any) {
        if (e instanceof ChatSDKError) {
          return {
            error: e.message,
            code: e.type,
            surface: e.surface,
            cause: e.cause,
            hints: deriveHints({ body, appendBody, addTags, removeTags }),
          } as const;
        }
        const msg = (e as Error)?.message || 'Unknown error';
        console.error('archiveUpdateEntry unexpected error', e);
        return {
          error: 'Unexpected failure updating archive entry',
          code: 'bad_request',
          cause: msg.slice(0, 160),
          hints: deriveHints({ body, appendBody, addTags, removeTags }),
        } as const;
      }
    },
  });

function deriveHints(args: {
  body?: string;
  appendBody?: string;
  addTags?: string[];
  removeTags?: string[];
}) {
  const hints: string[] = [];
  if (args.body && args.appendBody)
    hints.push('Provide only one of body or appendBody');
  if (args.appendBody === 'false')
    hints.push("Do not send literal 'false' as appendBody");
  if (!args.body && !args.appendBody && !args.addTags && !args.removeTags)
    hints.push(
      'Provide at least one field to modify (entity, tags, body, or appendBody)'
    );
  if (
    args.addTags &&
    args.removeTags &&
    args.addTags.some((t) => args.removeTags?.includes(t))
  )
    hints.push('Avoid adding and removing the same tag in one call');
  return hints.slice(0, 6);
}
