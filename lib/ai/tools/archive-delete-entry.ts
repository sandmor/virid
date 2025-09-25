import { tool } from "ai";
import { z } from "zod";
import type { AppSession } from "@/lib/auth/session";
import { deleteArchiveEntry } from "@/lib/db/queries";

export const archiveDeleteEntry = ({ session }: { session: AppSession }) =>
  tool({
    description: "Delete an archive memory entry and its links.",
    inputSchema: z.object({ slug: z.string().min(1) }),
    execute: async ({ slug }) => {
      if (!session.user?.id) return { error: "No active user session" } as const;
      const userId = session.user.id;
      const res = await deleteArchiveEntry({ userId, slug });
      if (!res.deleted) return { error: "Entry not found" } as const;
      return { slug, deleted: true, removedLinks: res.removedLinks };
    },
  });
