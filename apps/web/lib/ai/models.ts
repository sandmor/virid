import type { ModelFormat } from './model-capabilities';

// Used only during bootstrap. Runtime availability is database-owned.
export const DEFAULT_CHAT_MODEL = 'google:gemini-2.5-flash';

export type ChatModel = {
  id: string; // composite id creator:model
  creator: string; // Model creator (openai, google, anthropic, meta, etc.)
  model: string; // creator-specific model slug used in SDK calls
  name: string; // human readable name
  description?: string; // optional
};

export type ChatModelCapabilitiesSummary = {
  supportsTools: boolean;
  supportedFormats: ModelFormat[];
};

export type ChatModelOption = ChatModel & {
  capabilities: ChatModelCapabilitiesSummary | null;
  isBYOK?: boolean;
};

export function isModelIdAllowed(
  selectedId: string,
  allowedIds: string[]
): boolean {
  return allowedIds.includes(selectedId);
}
