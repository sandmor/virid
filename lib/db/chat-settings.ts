import { prisma } from './prisma';
import type { ChatSettings } from './schema';
import type { Prisma } from '../../generated/prisma-client';
import { ChatSDKError } from '../errors';

// Default empty settings object (do not persist unless mutations occur)
const EMPTY: ChatSettings = {};

export async function getChatSettings(chatId: string): Promise<ChatSettings> {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { settings: true },
  });
  if (!chat) return EMPTY;
  try {
    if (!chat.settings || typeof chat.settings !== 'object') return EMPTY;
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
  } catch (_error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to update chat settings'
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

export async function updateChatAgent(chatId: string, agentId: string | null) {
  try {
    await prisma.chat.update({
      where: { id: chatId },
      data: { agentId },
    });
  } catch (_error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to update chat agent'
    );
  }
}

export async function refreshPinnedEntriesCache(
  chatId: string,
  pinnedSlugs: string[]
) {
  return updateChatSettings(chatId, () => ({ pinnedEntries: pinnedSlugs }));
}

// Merge agent (base) settings with runtime overrides (allowedTools, pinnedSlugs, future fields).
// Precedence order (highest last): base <- overrides
// - base: agent.settings (or existing chat settings if we later support cloning chats)
// - overrides.allowedTools -> maps to tools.allow semantics
// - overrides.pinnedSlugs -> sets pinnedEntries cache (does not create join rows itself)
// Input semantics mirror chat creation API semantics.
export interface SettingsOverrideInput {
  allowedTools?: string[]; // undefined => no restriction stored, [] => explicit empty allow list, [...]
  pinnedSlugs?: string[]; // optional initial pinned slugs (cache only); join table insert handled separately
}

export async function applyInitialSettingsPreset({
  chatId,
  base,
  overrides,
}: {
  chatId: string;
  base: any | null | undefined; // agent.settings JSON stored
  overrides: SettingsOverrideInput;
}) {
  // Start from a safe normalized object
  const merged: any = base && typeof base === 'object' ? { ...base } : {};

  // Apply allowedTools override semantics
  if (Object.prototype.hasOwnProperty.call(overrides, 'allowedTools')) {
    const list = overrides.allowedTools;
    if (list === undefined) {
      // leave merged.tools.allow undefined (no restriction)
      if (merged.tools && 'allow' in merged.tools) delete merged.tools.allow;
    } else {
      merged.tools = { ...(merged.tools || {}), allow: list };
    }
  }

  if (overrides.pinnedSlugs) {
    // Cache - actual pin join rows are handled elsewhere (route logic already handles pinning asynchronously)
    merged.pinnedEntries = overrides.pinnedSlugs.slice(0, 64); // guard size
  }

  await prisma.chat.update({
    where: { id: chatId },
    data: { settings: merged },
  });

  return merged as ChatSettings;
}
