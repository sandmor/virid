import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createXai } from '@ai-sdk/xai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { prisma } from '@vero/db';
import { isTestEnvironment } from '../constants';
import { getProviderApiKey } from './provider-keys';
import { SDK_PROVIDERS } from './registry';
import { type ParsedByokModelId } from './byok';

// =============================================================================
// Provider Factory Caching
// =============================================================================

const PROVIDER_CACHE_TTL_MS = 60_000; // 1 minute
let providerVersion = 0;

type ProviderClientEntry = {
  factory: (model: string) => any;
  apiKey: string | undefined;
  fetchedAt: number;
};

const providerClientCache = new Map<string, ProviderClientEntry>();

/**
 * Build a provider factory for a known platform provider
 */
function buildProviderFactory(
  provider: string,
  apiKey?: string,
  baseUrl?: string
) {
  switch (provider) {
    case 'openrouter':
      return createOpenRouter({
        apiKey: apiKey ?? '',
        extraBody: { include_reasoning: true },
      });
    case 'openai':
      return createOpenAI({ apiKey, baseURL: baseUrl });
    case 'google':
      return createGoogleGenerativeAI({ apiKey, baseURL: baseUrl });
    case 'xai':
      return createXai({ apiKey, baseURL: baseUrl });
    default:
      throw new Error(`Unsupported provider '${provider}'`);
  }
}

/**
 * Build an OpenAI-compatible provider factory for custom endpoints
 */
function buildCustomProviderFactory(
  name: string,
  apiKey: string,
  baseUrl: string
) {
  return createOpenAICompatible({
    name,
    apiKey: apiKey,
    baseURL: baseUrl,
    includeUsage: true,
  });
}

/**
 * Get or create a cached provider client factory
 */
async function getProviderClient(
  provider: string
): Promise<(model: string) => any> {
  const existing = providerClientCache.get(provider);
  const now = Date.now();
  if (existing && now - existing.fetchedAt < PROVIDER_CACHE_TTL_MS) {
    return existing.factory;
  }
  const apiKey = await getProviderApiKey(provider);
  const factory = buildProviderFactory(provider, apiKey);
  providerClientCache.set(provider, { factory, apiKey, fetchedAt: now });
  providerVersion++;
  return factory;
}

// =============================================================================
// Provider Info Resolution
// =============================================================================

/**
 * Resolution result for a built-in platform provider (openai, google, openrouter)
 */
type BuiltinProviderInfo = {
  type: 'builtin';
  provider: string;
  providerModelId: string;
};

/**
 * Resolution result for an admin-configured OpenAI-compatible endpoint.
 */
type OpenAICompatibleProviderInfo = {
  type: 'openai-compatible';
  providerModelId: string;
  customProvider: {
    slug: string;
    baseUrl: string;
    apiKey: string | null;
  };
};

type ProviderInfo = BuiltinProviderInfo | OpenAICompatibleProviderInfo;

/**
 * Resolve provider and providerModelId for a model ID.
 *
 * Models must be configured in the database. There is deliberately no model-ID
 * inference: it silently routes unreviewed models to the wrong endpoint.
 */
async function resolveProviderInfo(modelId: string): Promise<ProviderInfo> {
  const model = await prisma.model.findUnique({
    where: { id: modelId },
    include: {
      providers: {
        where: { enabled: true },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
        take: 1,
        include: { provider: true },
      },
    },
  });

  const provider = model?.providers.find((association) => association.provider.enabled);
  if (provider) {
    if (provider.provider.kind === 'openai-compatible') {
      if (!provider.provider.baseUrl) {
        throw new Error(`Provider '${provider.providerId}' has no base URL`);
      }
      return {
        type: 'openai-compatible',
        providerModelId: provider.providerModelId,
        customProvider: { slug: provider.providerId, baseUrl: provider.provider.baseUrl, apiKey: provider.provider.apiKey },
      };
    }
    return {
      type: 'builtin',
      provider: provider.providerId,
      providerModelId: provider.providerModelId,
    };
  }

  throw new Error(`Model '${modelId}' has no enabled provider configuration`);
}

// =============================================================================
// Model Resolution & Caching
// =============================================================================

const MODEL_CACHE_TTL_MS = 10 * 60_000; // 10 minutes

type ModelCacheEntry = {
  model: any;
  fetchedAt: number;
};

const modelCache = new Map<string, ModelCacheEntry>();

/**
 * Build a language model client based on resolved provider info
 */
function buildLanguageModel(
  info: ProviderInfo,
  providerFactory?: (model: string) => any
) {
  if (info.type === 'openai-compatible') {
    const factory = buildCustomProviderFactory(
      info.customProvider.slug,
      info.customProvider.apiKey || '',
      info.customProvider.baseUrl
    );
    return factory(info.providerModelId);
  }

  if (!providerFactory) {
    throw new Error('Provider factory required for builtin providers');
  }
  return providerFactory(info.providerModelId);
}

/**
 * Resolve and build a language model client for a model ID.
 * Results are cached for MODEL_CACHE_TTL_MS.
 */
async function resolveLanguageModel(modelId: string) {
  const info = await resolveProviderInfo(modelId);

  if (info.type === 'openai-compatible') {
    return buildLanguageModel(info);
  }

  const client = await getProviderClient(info.provider);
  return client(info.providerModelId);
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Get a language model client for a model ID.
 * Uses caching to avoid repeated database lookups and SDK initialization.
 */
export async function getLanguageModel(id: string) {
  // Check cache first
  const cached = modelCache.get(id);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < MODEL_CACHE_TTL_MS) {
    return cached.model;
  }

  // Test environment mock
  if (isTestEnvironment) {
    const { reasoningModel } = require('./models.mock');
    return reasoningModel;
  }

  // Resolve and cache
  const model = await resolveLanguageModel(id);
  modelCache.set(id, { model, fetchedAt: now });
  return model;
}

/**
 * Get a language model with a user-provided API key.
 * Used for platform models when user wants to use their own key.
 */
export async function getLanguageModelWithKey(id: string, apiKey: string) {
  const info = await resolveProviderInfo(id);

  if (info.type === 'openai-compatible') {
    // OpenAI-compatible platform providers use their managed credential.
    return buildLanguageModel(info);
  }

  const factory = buildProviderFactory(info.provider, apiKey);
  return factory(info.providerModelId);
}

/**
 * Get a language model for a BYOK model ID with user credentials.
 *
 * @param parsed - Parsed BYOK model ID from parseByokModelId()
 * @param resolution - Resolution info containing API key and optional base URL
 */
export function getByokLanguageModel(
  parsed: ParsedByokModelId,
  resolution: {
    apiKey: string;
    baseUrl?: string;
    providerModelId: string;
  }
) {
  if (parsed.sourceType === 'platform') {
    // Use platform provider with user's API key
    const factory = buildProviderFactory(parsed.providerId, resolution.apiKey);
    return factory(resolution.providerModelId);
  }

  // Custom provider - use OpenAI-compatible client
  const factory = buildCustomProviderFactory(
    'byok-custom',
    resolution.apiKey,
    resolution.baseUrl!
  );
  return factory(resolution.providerModelId);
}

/**
 * Get the current provider version.
 * Increments whenever provider caches are refreshed.
 */
export function getProviderVersion() {
  return providerVersion;
}

/**
 * Force refresh all provider and model caches.
 * Call this after admin changes to providers or models.
 */
export async function forceRefreshProviders() {
  providerClientCache.clear();
  modelCache.clear();
  providerVersion++;
}

// =============================================================================
// Re-exports
// =============================================================================

export { SDK_PROVIDERS };
export { isByokModelId, parseByokModelId } from './byok';
export type { ParsedByokModelId } from './byok';
