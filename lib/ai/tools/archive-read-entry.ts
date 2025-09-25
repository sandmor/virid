import { tool } from "ai";
import { z } from "zod";
import type { AppSession } from "@/lib/auth/session";
import { getArchiveEntryBySlug, getLinksForEntry, getArchiveEntriesByIds } from "@/lib/db/queries";

export const archiveReadEntry = ({ session }: { session: AppSession }) =>
  tool({
    description: "Read a memory archive entry by its slug.",
    inputSchema: z.object({
      slug: z.string().min(1),
      includeLinks: z.boolean().optional().default(true),
    }),
    execute: async ({ slug, includeLinks }) => {
      if (!session.user?.id) return { error: "No active user session" } as const;
      const userId = session.user.id;
      const entry = await getArchiveEntryBySlug({ userId, slug });
      if (!entry) return { error: "Entry not found" } as const;
      let links: any[] | undefined = undefined;
      if (includeLinks) {
        const { outgoing, incoming } = await getLinksForEntry({ entryId: entry.id });
        const targetIds = new Set<string>();
        outgoing.forEach(l => targetIds.add(l.targetId));
        incoming.forEach(l => targetIds.add(l.sourceId));
        const related = await getArchiveEntriesByIds({ ids: Array.from(targetIds) });
        const idToSlug = new Map(related.map(r => [r.id, r.slug] as const));
        links = [];
        for (const o of outgoing) {
          links.push({ otherSlug: idToSlug.get(o.targetId) || "unknown", type: o.type, direction: o.bidirectional ? "bidirectional" : "out" });
        }
        for (const i of incoming) {
          links.push({ otherSlug: idToSlug.get(i.sourceId) || "unknown", type: i.type, direction: "bidirectional" });
        }
      }
      return {
        slug: entry.slug,
        entity: entry.entity,
        tags: entry.tags,
        body: entry.body,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
        links,
      };

      // no inner resolveSlug needed now (batch implemented above)
    },
  });
