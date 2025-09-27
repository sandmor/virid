import type { ChatSettings } from '@/lib/db/schema';
import type { ChatToolId } from '@/lib/ai/tool-ids';

export interface AgentSettingsValue {
  pinnedEntries: string[];
  allowedTools?: ChatToolId[];
}

export const DEFAULT_AGENT_SETTINGS: AgentSettingsValue = {
  pinnedEntries: [],
  allowedTools: undefined,
};

export function normalizePinnedEntries(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const deduped = Array.from(
    new Set(
      raw.filter(
        (item): item is string =>
          typeof item === 'string' && item.trim().length > 0
      )
    )
  );
  return deduped.slice(0, 12);
}

export function normalizeAllowedTools(raw: unknown): ChatToolId[] | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (!Array.isArray(raw)) return undefined;
  const deduped = Array.from(
    new Set(
      raw.filter(
        (item): item is ChatToolId =>
          typeof item === 'string' && item.trim().length > 0
      )
    )
  );
  if (deduped.length === 0) return [];
  return deduped.slice(0, 64);
}

export function agentSettingsFromChatSettings(
  settings: ChatSettings | null | undefined
): AgentSettingsValue {
  return {
    pinnedEntries: normalizePinnedEntries(settings?.pinnedEntries ?? []),
    allowedTools: normalizeAllowedTools(settings?.tools?.allow ?? undefined),
  };
}

export function agentSettingsToChatSettings(
  value: AgentSettingsValue
): ChatSettings {
  const result: ChatSettings = {};
  result.pinnedEntries = [...value.pinnedEntries];
  if (value.allowedTools !== undefined) {
    result.tools = { allow: [...value.allowedTools] };
  }
  if (!result.pinnedEntries.length) {
    delete result.pinnedEntries;
  }
  if (
    result.tools &&
    result.tools.allow !== undefined &&
    result.tools.allow.length === 0
  ) {
    result.tools = { allow: [] };
  }
  if (result.tools && result.tools.allow === undefined) {
    delete result.tools;
  }
  return result;
}

export function agentSettingsIsDefault(value: AgentSettingsValue): boolean {
  return value.pinnedEntries.length === 0 && value.allowedTools === undefined;
}

export function normalizeAgentSettingsPayload(input: unknown): ChatSettings {
  if (!input || typeof input !== 'object') {
    return {};
  }
  const raw = input as Record<string, unknown>;
  const pinnedEntries = normalizePinnedEntries(
    raw.pinnedEntries ?? (raw as any)?.settings?.pinnedEntries
  );
  const allowedTools = normalizeAllowedTools(
    raw.allowedTools ??
      (raw as any)?.settings?.allowedTools ??
      (raw as any)?.tools?.allow
  );
  const settings: ChatSettings = {};
  if (pinnedEntries.length) settings.pinnedEntries = pinnedEntries;
  if (allowedTools !== undefined) settings.tools = { allow: allowedTools };
  return settings;
}
