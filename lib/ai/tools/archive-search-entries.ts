import { tool } from 'ai';
import { z } from 'zod';
import type { AppSession } from '@/lib/auth/session';
import { searchArchiveEntries } from '@/lib/db/queries';
import { prisma } from '@/lib/db/prisma';

export const archiveSearchEntries = ({ session }: { session: AppSession }) =>
  tool({
    description: 'Search archive entries by tags and/or text query.',
    inputSchema: z.object({
      tags: z.array(z.string()).optional(),
      matchMode: z.enum(['any', 'all']).optional().default('any'),
      query: z.string().optional(),
      limit: z.number().int().positive().max(50).optional(),
    }),
    execute: async ({ tags, matchMode, query, limit }) => {
      if (!session.user?.id)
        return { error: 'No active user session' } as const;
      const userId = session.user.id;
      const rows = await searchArchiveEntries({
        userId,
        tags,
        matchMode,
        query,
        limit,
      });
      const ids = rows.map((r) => r.id);
      let linkCounts = new Map<string, number>();
      if (ids.length) {
        const linkAgg = await prisma.archiveLink.groupBy({
          by: ['sourceId'],
          where: { sourceId: { in: ids } },
          _count: { _all: true },
        });
        const bidiIncoming = await prisma.archiveLink.groupBy({
          by: ['targetId'],
          where: { targetId: { in: ids }, bidirectional: true },
          _count: { _all: true },
        });
        for (const g of linkAgg)
          linkCounts.set(
            g.sourceId,
            (linkCounts.get(g.sourceId) || 0) + g._count._all
          );
        for (const g of bidiIncoming)
          linkCounts.set(
            g.targetId,
            (linkCounts.get(g.targetId) || 0) + g._count._all
          );
      }
      return rows.map((r) => ({
        slug: r.slug,
        entity: r.entity,
        tags: r.tags,
        bodyPreview: r.body.slice(0, 200),
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        linkCount: linkCounts.get(r.id) || 0,
      }));
    },
  });
