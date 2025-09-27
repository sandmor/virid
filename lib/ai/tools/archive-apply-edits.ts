import { tool } from 'ai';
import { z } from 'zod';
import type { AppSession } from '@/lib/auth/session';
import { getArchiveEntryBySlug, updateArchiveEntry } from '@/lib/db/queries';

type Edit = {
  mode: 'replace' | 'insertAfter' | 'insertBefore' | 'remove';
  target: string; // anchor substring to locate
  text?: string; // new content for replace/insert
  occurrences?: 'first' | 'all'; // default first
};

function applyEdits(body: string, edits: Edit[]) {
  const results: Array<{
    index: number;
    mode: string;
    target: string;
    status: 'applied' | 'skipped';
    reason?: string;
  }> = [];
  let current = body;
  edits.forEach((e, i) => {
    if (!e.target) {
      results.push({
        index: i,
        mode: e.mode,
        target: e.target,
        status: 'skipped',
        reason: 'empty target',
      });
      return;
    }
    if (
      (e.mode === 'replace' ||
        e.mode === 'insertAfter' ||
        e.mode === 'insertBefore') &&
      !e.text
    ) {
      results.push({
        index: i,
        mode: e.mode,
        target: e.target,
        status: 'skipped',
        reason: 'missing text',
      });
      return;
    }
    const occAll = e.occurrences === 'all';
    let applied = 0;
    if (e.mode === 'remove' || e.mode === 'replace') {
      const replacement = e.mode === 'replace' ? (e.text as string) : '';
      if (occAll) {
        if (!current.includes(e.target)) {
          results.push({
            index: i,
            mode: e.mode,
            target: e.target,
            status: 'skipped',
            reason: 'not found',
          });
          return;
        }
        const count = current.split(e.target).length - 1;
        current = current.split(e.target).join(replacement);
        applied = count;
      } else {
        const pos = current.indexOf(e.target);
        if (pos === -1) {
          results.push({
            index: i,
            mode: e.mode,
            target: e.target,
            status: 'skipped',
            reason: 'not found',
          });
          return;
        }
        current =
          current.slice(0, pos) +
          replacement +
          current.slice(pos + e.target.length);
        applied = 1;
      }
    } else if (e.mode === 'insertAfter' || e.mode === 'insertBefore') {
      const insertText = e.text as string;
      if (occAll) {
        if (!current.includes(e.target)) {
          results.push({
            index: i,
            mode: e.mode,
            target: e.target,
            status: 'skipped',
            reason: 'not found',
          });
          return;
        }
        const parts = current.split(e.target);
        if (e.mode === 'insertAfter') {
          current =
            parts
              .slice(0, -1)
              .map((p) => p + e.target + insertText)
              .join('') + parts.at(-1);
        } else {
          current =
            parts[0] +
            parts
              .slice(1)
              .map((p) => insertText + e.target + p)
              .join('');
        }
        applied = parts.length - 1;
      } else {
        const pos = current.indexOf(e.target);
        if (pos === -1) {
          results.push({
            index: i,
            mode: e.mode,
            target: e.target,
            status: 'skipped',
            reason: 'not found',
          });
          return;
        }
        if (e.mode === 'insertAfter') {
          const after = pos + e.target.length;
          current = current.slice(0, after) + insertText + current.slice(after);
        } else {
          // insertBefore
          current = current.slice(0, pos) + insertText + current.slice(pos);
        }
        applied = 1;
      }
    }
    results.push({
      index: i,
      mode: e.mode,
      target: e.target,
      status: applied > 0 ? 'applied' : 'skipped',
      reason: applied === 0 ? 'no occurrences' : undefined,
    });
  });
  return { body: current, results };
}

export const archiveApplyEdits = ({ session }: { session: AppSession }) =>
  tool({
    description:
      'Apply surgical edits to an archive entry (anchor-based partial modifications) without rewriting the entire body. Does NOT record revision notes inside the body.',
    inputSchema: z.object({
      slug: z.string().min(1),
      edits: z
        .array(
          z.object({
            mode: z
              .enum(['replace', 'insertAfter', 'insertBefore', 'remove'])
              .describe('Edit operation kind'),
            target: z
              .string()
              .min(1)
              .describe('Anchor substring to locate in current body'),
            text: z
              .string()
              .optional()
              .describe('Replacement or insertion text (omit for remove)'),
            occurrences: z
              .enum(['first', 'all'])
              .optional()
              .describe('Apply to first match or all matches (default first)'),
          })
        )
        .min(1)
        .max(25),
    }),
    execute: async ({ slug, edits }) => {
      if (!session.user?.id)
        return { error: 'No active user session' } as const;
      const userId = session.user.id;
      const entry = await getArchiveEntryBySlug({ userId, slug });
      if (!entry) return { error: 'Entry not found' } as const;

      const { body: newBody, results } = applyEdits(entry.body, edits);
      if (newBody !== entry.body) {
        await updateArchiveEntry({ userId, slug, body: newBody });
      }

      return {
        slug,
        appliedEdits: results.filter((r) => r.status === 'applied').length,
        skippedEdits: results.filter((r) => r.status === 'skipped').length,
        edits: results,
        bodyLength: newBody.length,
        updated: newBody !== entry.body,
        oldBody: entry.body, // included for UI diff visualization
        newBody, // included for UI diff visualization
      };
    },
  });
