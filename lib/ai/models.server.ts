import 'server-only';

import { deriveChatModel, type ChatModelOption } from './models';
import { getModelCapabilities } from './model-capabilities';

/**
 * Resolve the chat model metadata along with a lightweight capability summary for UI consumption.
 * Preserves the order of the provided ids and drops duplicates that cannot be resolved.
 */
export async function resolveChatModelOptions(
  modelIds: string[]
): Promise<ChatModelOption[]> {
  if (modelIds.length === 0) {
    return [];
  }

  const uniqueIds = Array.from(new Set(modelIds));
  const resolvedEntries = await Promise.all(
    uniqueIds.map(async (id) => {
      const baseModel = deriveChatModel(id);
      const capabilities = await getModelCapabilities(id);
      const summary = capabilities
        ? {
            supportsTools: capabilities.supportsTools,
            supportedFormats: capabilities.supportedFormats,
          }
        : null;
      return {
        ...baseModel,
        capabilities: summary,
      } as ChatModelOption;
    })
  );

  const lookup = new Map<string, ChatModelOption>(
    resolvedEntries.map((entry) => [entry.id, entry])
  );

  const ordered: ChatModelOption[] = [];
  for (const id of modelIds) {
    const resolved = lookup.get(id);
    if (resolved) {
      ordered.push(resolved);
    }
  }

  return ordered;
}
