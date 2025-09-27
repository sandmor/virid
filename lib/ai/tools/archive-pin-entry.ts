import { tool } from 'ai';
import { z } from 'zod';
import type { AppSession } from '@/lib/auth/session';
import { pinArchiveEntryToChat } from '@/lib/db/queries';

export const archivePinEntry = ({
  session,
  chatId,
}: {
  session: AppSession;
  chatId: string;
}) =>
  tool({
    description: `Pin an existing archive entry to the active chat so its full body is injected into the system context.
Guidelines:
- Pin only entries that will be repeatedly relevant for this chat (projects, people, long-running tasks).
- Do NOT pin transient, one-off, or redundant entries.
- Before pinning, ensure the entry exists (search/read first if unsure).
- Keep total pins lean (prefer <= ~6) to avoid prompt bloat.
`,
    inputSchema: z.object({
      slug: z
        .string()
        .min(1)
        .describe('Slug of the archive entry to pin (must already exist)'),
      chatId: z
        .string()
        .uuid()
        .optional()
        .describe('Override chat id (defaults to active chat)'),
    }),
    execute: async ({ slug, chatId: override }) => {
      if (!session.user?.id)
        return { error: 'No active user session' } as const;
      const targetChatId = override || chatId;
      try {
        const res = await pinArchiveEntryToChat({
          userId: session.user.id,
          chatId: targetChatId,
          slug,
        });
        return { slug, chatId: targetChatId, ...res } as const;
      } catch (e: any) {
        return { error: e?.message || 'Failed to pin entry', slug } as const;
      }
    },
  });
