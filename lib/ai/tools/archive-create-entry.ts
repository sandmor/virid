import { tool } from "ai";
import { z } from "zod";
import type { AppSession } from "@/lib/auth/session";
import { createArchiveEntry, linkArchiveEntries } from "@/lib/db/queries";
import { normalizeTags } from "@/lib/archive/utils";

export const archiveCreateEntry = ({ session }: { session: AppSession }) =>
  tool({
    description: "Create a memory archive entry (a durable note).",
    inputSchema: z.object({
      entity: z.string().min(1).describe("Short title for what this entry is about"),
      slug: z.string().optional().describe("Desired unique slug (optional). Will be adjusted if taken."),
      body: z.string().optional().describe("Full body text for the memory entry"),
      tags: z.array(z.string()).optional().describe("Tags / keywords"),
      links: z.array(z.object({
        targetSlug: z.string().min(1),
        type: z.string().min(1).max(64).default("related"),
        bidirectional: z.boolean().optional(),
      })).optional().describe("Links to other existing entries"),
    }),
    execute: async ({ entity, slug, body, tags, links }) => {
      if (!session.user?.id) {
        return { error: "No active user session" } as const;
      }
      const userId = session.user.id;
      const { entry, adjusted, base } = await createArchiveEntry({ userId, entity, slug, body, tags });

      const linkResults: any[] = [];
      if (links?.length) {
        for (const l of links) {
          try {
            const res = await linkArchiveEntries({ userId, sourceSlug: entry.slug, targetSlug: l.targetSlug, type: l.type, bidirectional: l.bidirectional ?? true });
            linkResults.push({ targetSlug: l.targetSlug, ...res });
          } catch (e) {
            linkResults.push({ targetSlug: l.targetSlug, error: "Failed to create link" });
          }
        }
      }

      return {
        slug: entry.slug,
        entity: entry.entity,
        tags: normalizeTags(entry.tags),
        body: entry.body || undefined,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
        note: adjusted ? `Slug '${base}' was taken. Used '${entry.slug}'.` : undefined,
        links: linkResults.length ? linkResults : undefined,
      };
    },
  });
