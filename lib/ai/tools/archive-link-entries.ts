import { tool } from 'ai';
import { z } from 'zod';
import type { AppSession } from '@/lib/auth/session';
import { linkArchiveEntries } from '@/lib/db/queries';

export const archiveLinkEntries = ({ session }: { session: AppSession }) =>
  tool({
    description:
      'Create a semantic relationship link between two archive entries.',
    inputSchema: z.object({
      sourceSlug: z.string().min(1),
      targetSlug: z.string().min(1),
      type: z.string().min(1).max(64).default('related'),
      bidirectional: z.boolean().optional().default(true),
    }),
    execute: async ({ sourceSlug, targetSlug, type, bidirectional }) => {
      if (!session.user?.id)
        return { error: 'No active user session' } as const;
      const userId = session.user.id;
      try {
        const res = await linkArchiveEntries({
          userId,
          sourceSlug,
          targetSlug,
          type,
          bidirectional,
        });
        return { sourceSlug, targetSlug, ...res };
      } catch (e: any) {
        return { error: e?.message || 'Failed to link entries' };
      }
    },
  });
