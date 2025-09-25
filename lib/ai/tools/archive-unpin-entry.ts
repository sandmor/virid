import { tool } from "ai";
import { z } from "zod";
import type { AppSession } from "@/lib/auth/session";
import { unpinArchiveEntryFromChat } from "@/lib/db/queries";

export const archiveUnpinEntry = ({ session, chatId }: { session: AppSession; chatId: string }) =>
  tool({
    description: `Unpin a previously pinned archive entry from the active chat.
Use this when a pinned file is no longer relevant to keep the system context lean.`,
    inputSchema: z.object({
      slug: z.string().min(1).describe("Slug of the archive entry to unpin"),
      chatId: z.string().uuid().optional().describe("Override chat id (defaults to active chat)")
    }),
    execute: async ({ slug, chatId: override }) => {
      if (!session.user?.id) return { error: "No active user session" } as const;
      const targetChatId = override || chatId;
      try {
        const res = await unpinArchiveEntryFromChat({ userId: session.user.id, chatId: targetChatId, slug });
        return { slug, chatId: targetChatId, ...res } as const;
      } catch (e: any) {
        return { error: e?.message || "Failed to unpin entry", slug } as const;
      }
    }
  });
