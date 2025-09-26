import { prisma } from "./prisma";
import type { ChatSettings } from "./schema";
import type { Prisma } from "../../generated/prisma-client";
import { ChatSDKError } from "../errors";

// Default empty settings object (do not persist unless mutations occur)
const EMPTY: ChatSettings = {};

export async function getChatSettings(chatId: string): Promise<ChatSettings> {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { settings: true },
  });
  if (!chat) return EMPTY;
  try {
    if (!chat.settings || typeof chat.settings !== "object") return EMPTY;
    return chat.settings as ChatSettings;
  } catch {
    return EMPTY;
  }
}

export async function updateChatSettings(
  chatId: string,
  mutate: (prev: ChatSettings) => ChatSettings | Partial<ChatSettings>
): Promise<ChatSettings> {
  // Read existing (tolerate parse errors)
  const prev = await getChatSettings(chatId);
  const nextPatch = mutate(prev);
  const next: ChatSettings = { ...prev, ...nextPatch };
  try {
    await prisma.chat.update({
      where: { id: chatId },
      data: { settings: next as unknown as Prisma.InputJsonValue },
    });
  } catch (e) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to update chat settings"
    );
  }
  return next;
}

export async function setAllowedTools(
  chatId: string,
  toolIds: string[] | undefined
) {
  return updateChatSettings(chatId, (prev) => ({
    tools: {
      ...(prev.tools ?? {}),
      // New semantics: undefined => all tools; [] => no tools
      allow: toolIds === undefined ? undefined : toolIds,
    },
  }));
}

export async function refreshPinnedEntriesCache(
  chatId: string,
  pinnedSlugs: string[]
) {
  return updateChatSettings(chatId, (prev) => ({ pinnedEntries: pinnedSlugs }));
}
