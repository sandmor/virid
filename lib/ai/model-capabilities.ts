import { prisma } from '../db/prisma';
import type { SupportedProvider } from './registry';
import { getTier } from './tiers';

export type ModelFormat = 'text' | 'image' | 'file' | 'audio' | 'video';

export type ModelCapabilities = {
  id: string; // composite id (provider:model)
  name: string;
  provider: string;
  supportsTools: boolean;
  supportedFormats: ModelFormat[];
  createdAt: Date;
  updatedAt: Date;
};

export type ManagedModelCapabilities = ModelCapabilities & {
  isPersisted: boolean;
  inUse: boolean;
};

const DEFAULT_TIER_IDS = ['guest', 'regular'];

// Default capabilities by provider - these are safe defaults
const PROVIDER_DEFAULTS: Record<
  SupportedProvider,
  Omit<
    ModelCapabilities,
    'id' | 'name' | 'provider' | 'createdAt' | 'updatedAt'
  >
> = {
  openai: {
    supportsTools: true,
    supportedFormats: ['text', 'image', 'file', 'audio'],
  },
  google: {
    supportsTools: true,
    supportedFormats: ['text', 'image', 'file', 'audio', 'video'],
  },
  openrouter: {
    // Conservative default - will be overridden by OpenRouter API sync
    supportsTools: false,
    supportedFormats: ['text'],
  },
};

// OpenRouter API response types
export type OpenRouterModel = {
  id: string;
  name: string;
  architecture?: {
    input_modalities?: string[];
    output_modalities?: string[];
  };
  supported_parameters?: string[];
};

export type OpenRouterModelsResponse = {
  data: OpenRouterModel[];
};

/**
 * Map OpenRouter modalities to our format types
 */
function mapModalityToFormat(modality: string): ModelFormat | null {
  const normalized = modality.toLowerCase();
  if (normalized.includes('text')) return 'text';
  if (normalized.includes('image')) return 'image';
  if (normalized.includes('file')) return 'file';
  if (normalized.includes('audio')) return 'audio';
  if (normalized.includes('video')) return 'video';
  return null;
}

/**
 * Parse OpenRouter model data to our capabilities format
 */
export function parseOpenRouterCapabilities(
  model: OpenRouterModel,
  provider: string = 'openrouter'
): Omit<ModelCapabilities, 'createdAt' | 'updatedAt'> {
  const supportsTools =
    model.supported_parameters?.some(
      (param) =>
        param === 'tools' || param === 'tool_choice' || param === 'functions'
    ) ?? false;

  const formats = new Set<ModelFormat>(['text']); // Always support text at minimum

  if (model.architecture?.input_modalities) {
    for (const modality of model.architecture.input_modalities) {
      const format = mapModalityToFormat(modality);
      if (format) formats.add(format);
    }
  }

  return {
    id: `${provider}:${model.id}`,
    name: model.name,
    provider,
    supportsTools,
    supportedFormats: Array.from(formats),
  };
}

/**
 * Fetch models from OpenRouter API
 */
export async function fetchOpenRouterModels(): Promise<OpenRouterModel[]> {
  const response = await fetch('https://openrouter.ai/api/v1/models');
  if (!response.ok) {
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}`
    );
  }
  const data: OpenRouterModelsResponse = await response.json();
  return data.data;
}

/**
 * Get model capabilities from database, with fallback to provider defaults
 */
export async function getModelCapabilities(
  modelId: string
): Promise<ModelCapabilities | null> {
  try {
    const model = await prisma.model.findUnique({
      where: { id: modelId },
    });

    if (model) {
      return {
        ...model,
        supportedFormats: model.supportedFormats as ModelFormat[],
      };
    }

    // Fallback to provider defaults
    const [provider] = modelId.split(':');
    if (provider in PROVIDER_DEFAULTS) {
      const defaults = PROVIDER_DEFAULTS[provider as SupportedProvider];
      return {
        id: modelId,
        name: modelId.split(':').slice(1).join(':'),
        provider,
        ...defaults,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching model capabilities:', error);
    return null;
  }
}

/**
 * Upsert model capabilities to database
 */
export async function upsertModelCapabilities(
  capabilities: Omit<ModelCapabilities, 'createdAt' | 'updatedAt'>
): Promise<ModelCapabilities> {
  const model = await prisma.model.upsert({
    where: { id: capabilities.id },
    create: {
      id: capabilities.id,
      name: capabilities.name,
      provider: capabilities.provider,
      supportsTools: capabilities.supportsTools,
      supportedFormats: capabilities.supportedFormats,
    },
    update: {
      name: capabilities.name,
      supportsTools: capabilities.supportsTools,
      supportedFormats: capabilities.supportedFormats,
    },
  });

  return {
    ...model,
    supportedFormats: model.supportedFormats as ModelFormat[],
  };
}

/**
 * Sync OpenRouter models to database
 */
export async function syncOpenRouterModels(
  options: {
    modelIds?: string[];
    allowCreate?: boolean;
  } = {}
): Promise<{ synced: number; errors: string[] }> {
  const errors: string[] = [];
  let synced = 0;

  const { modelIds, allowCreate = false } = options;

  try {
    const existing = await prisma.model.findMany({
      where: { provider: 'openrouter' },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((m) => m.id));

    let targets: string[];
    if (modelIds && modelIds.length > 0) {
      targets = allowCreate
        ? modelIds
        : modelIds.filter((id) => existingIds.has(id));
    } else {
      targets = Array.from(existingIds);
    }

    if (targets.length === 0) {
      return { synced, errors };
    }

    const openRouterModels = await fetchOpenRouterModels();
    const catalog = new Map(openRouterModels.map((model) => [model.id, model]));

    for (const compositeId of targets) {
      const slug = compositeId.startsWith('openrouter:')
        ? compositeId.slice('openrouter:'.length)
        : compositeId;
      const orModel = catalog.get(slug);
      if (!orModel) {
        errors.push(`${slug}: not found in OpenRouter catalog`);
        continue;
      }
      try {
        const capabilities = parseOpenRouterCapabilities(orModel);
        if (!allowCreate && !existingIds.has(capabilities.id)) {
          // Skip creation when creation not allowed
          continue;
        }
        await upsertModelCapabilities(capabilities);
        synced++;
      } catch (error) {
        errors.push(
          `${slug}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    return { synced, errors };
  } catch (error) {
    errors.push(
      `OpenRouter API: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    return { synced, errors };
  }
}

/**
 * Get all models from database
 */
export async function getAllModels(): Promise<ModelCapabilities[]> {
  const models = await prisma.model.findMany({
    orderBy: [{ provider: 'asc' }, { name: 'asc' }],
  });

  return models.map((m) => ({
    ...m,
    supportedFormats: m.supportedFormats as ModelFormat[],
  }));
}

/**
 * Collect the set of model ids referenced by all tiers (including fallbacks)
 */
export async function getTierModelIds(): Promise<string[]> {
  const tiers = await prisma.tier.findMany({
    select: { id: true, modelIds: true },
  });

  const tierIdsInDb = new Set(tiers.map((tier) => tier.id));
  const modelIds = new Set<string>();

  for (const tier of tiers) {
    for (const id of tier.modelIds) {
      if (id) modelIds.add(id);
    }
  }

  for (const fallbackTierId of DEFAULT_TIER_IDS) {
    if (tierIdsInDb.has(fallbackTierId)) continue;
    try {
      const fallbackTier = await getTier(fallbackTierId);
      fallbackTier.modelIds.forEach((id) => {
        if (id) modelIds.add(id);
      });
    } catch (error) {
      console.warn(
        `[model-capabilities] Failed to load fallback tier '${fallbackTierId}'`,
        error
      );
    }
  }

  return Array.from(modelIds);
}

/**
 * Get managed model capabilities ensuring tier coverage metadata
 */
export async function getManagedModels(): Promise<ManagedModelCapabilities[]> {
  const [dbModels, tierModelIds] = await Promise.all([
    prisma.model.findMany({
      orderBy: [{ provider: 'asc' }, { name: 'asc' }],
    }),
    getTierModelIds(),
  ]);

  const tierSet = new Set(tierModelIds);
  const managed: ManagedModelCapabilities[] = [];
  const persistedIds = new Set<string>();

  for (const model of dbModels) {
    const normalized: ManagedModelCapabilities = {
      ...model,
      supportedFormats: model.supportedFormats as ModelFormat[],
      isPersisted: true,
      inUse: tierSet.has(model.id),
    };
    managed.push(normalized);
    persistedIds.add(model.id);
  }

  const missingIds = tierModelIds.filter((id) => !persistedIds.has(id));
  if (missingIds.length > 0) {
    const missingCapabilities = await Promise.all(
      missingIds.map((id) => getModelCapabilities(id))
    );
    for (const capabilities of missingCapabilities) {
      if (!capabilities) continue;
      managed.push({
        ...capabilities,
        isPersisted: false,
        inUse: true,
      });
    }
  }

  managed.sort((a, b) => {
    if (a.provider === b.provider) {
      return a.name.localeCompare(b.name);
    }
    return a.provider.localeCompare(b.provider);
  });

  return managed;
}

/**
 * Remove models that are not referenced by any tier
 */
export async function removeUnusedModels(): Promise<number> {
  const [dbModels, tierModelIds] = await Promise.all([
    prisma.model.findMany({ select: { id: true } }),
    getTierModelIds(),
  ]);

  const tierSet = new Set(tierModelIds);
  const toDelete = dbModels
    .map((model) => model.id)
    .filter((id) => !tierSet.has(id));

  if (toDelete.length === 0) {
    return 0;
  }

  const result = await prisma.model.deleteMany({
    where: {
      id: { in: toDelete },
    },
  });

  return result.count;
}

/**
 * Batch upsert default capabilities for known models
 */
export async function seedDefaultCapabilities(
  modelIds: string[]
): Promise<void> {
  for (const modelId of modelIds) {
    const [provider, ...modelParts] = modelId.split(':');
    const model = modelParts.join(':');

    if (provider in PROVIDER_DEFAULTS) {
      const defaults = PROVIDER_DEFAULTS[provider as SupportedProvider];
      await upsertModelCapabilities({
        id: modelId,
        name: model,
        provider,
        ...defaults,
      });
    }
  }
}

/**
 * Ensure the specified models exist in the database with capabilities.
 * Missing OpenRouter models are fetched from the OpenRouter catalog.
 * Other providers fall back to inferred/default capabilities.
 */
export async function ensureModelCapabilities(modelIds: string[]): Promise<{
  created: number;
  errors: string[];
}> {
  const uniqueIds = Array.from(new Set(modelIds.filter(Boolean)));
  if (uniqueIds.length === 0) {
    return { created: 0, errors: [] };
  }

  const existing = await prisma.model.findMany({
    where: { id: { in: uniqueIds } },
    select: { id: true },
  });
  const existingIds = new Set(existing.map((m) => m.id));
  const missing = uniqueIds.filter((id) => !existingIds.has(id));

  if (missing.length === 0) {
    return { created: 0, errors: [] };
  }

  let created = 0;
  const errors: string[] = [];

  const openRouterIds: string[] = [];
  const otherIds: string[] = [];

  for (const id of missing) {
    const provider = id.split(':')[0];
    if (provider === 'openrouter') openRouterIds.push(id);
    else otherIds.push(id);
  }

  if (openRouterIds.length > 0) {
    const result = await syncOpenRouterModels({
      modelIds: openRouterIds,
      allowCreate: true,
    });
    created += result.synced;
    errors.push(
      ...result.errors.map((err) =>
        err.startsWith('openrouter:') ? err : `openrouter:${err}`
      )
    );
  }

  for (const id of otherIds) {
    try {
      const capabilities = await getModelCapabilities(id);
      if (!capabilities) {
        errors.push(`${id}: unsupported provider`);
        continue;
      }

      await upsertModelCapabilities({
        id: capabilities.id,
        name: capabilities.name,
        provider: capabilities.provider,
        supportsTools: capabilities.supportsTools,
        supportedFormats: capabilities.supportedFormats,
      });
      created++;
    } catch (error) {
      errors.push(
        `${id}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  return { created, errors };
}
