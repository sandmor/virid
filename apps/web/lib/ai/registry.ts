/**
 * Provider Registry
 *
 * Centralized registry for AI providers (API endpoints that serve models).
 * This is THE single source of truth for all provider-related configuration.
 *
 * Providers are the API endpoints used to make inference calls:
 * - openai: Direct OpenAI API
 * - google: Google AI / Gemini API
 * - openrouter: OpenRouter aggregator (serves models from many creators)
 *
 * This is separate from creators (who made the models) - see creators.ts.
 *
 * Future: This registry can be extended to support user-defined custom providers.
 */

import type { ModelFormat } from './model-capabilities/types';

// =============================================================================
// Types
// =============================================================================

/**
 * Provider configuration type
 * Contains all metadata needed across the application for a provider
 */
export type ProviderConfig = {
  /** Canonical provider ID */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Whether this provider supports BYOK (Bring Your Own Key) */
  supportsByok: boolean;
  /** Whether this is an aggregator that serves models from multiple creators */
  isAggregator: boolean;
  /**
   * Whether this provider uses SDK factory for direct API calls.
   * If true, buildProviderFactory() can create a client for this provider.
   * If false, models are accessed through an aggregator (e.g., OpenRouter).
   */
  hasSdkSupport: boolean;
  /**
   * The catalog sync source for this provider.
   * - 'openrouter': Uses OpenRouter's API directly
   * - 'models.dev': Uses models.dev community catalog
   * - null: No catalog sync (models must be manually configured)
   */
  catalogSource: 'openrouter' | 'models.dev' | null;
  /**
   * The models.dev provider ID if different from our internal ID.
   * Only needed if the provider uses models.dev for catalog sync.
   */
  modelsDevId?: string;
  /** Default model capabilities when not specified in catalog */
  defaults: {
    supportsTools: boolean;
    supportedFormats: ModelFormat[];
  };
  /** Optional website URL */
  website?: string;
  /** Optional description */
  description?: string;
};

// =============================================================================
// Provider Registry
// =============================================================================

/**
 * Built-in provider registry
 * This is THE single source of truth for all provider configuration.
 *
 * To add a new provider:
 * 1. Add an entry here with all required fields
 * 2. If hasSdkSupport is true, update buildProviderFactory() in providers.ts
 * 3. The provider will automatically be available for catalog sync if catalogSource is set
 */
const PROVIDER_REGISTRY: Record<string, ProviderConfig> = {
  // -------------------------------------------------------------------------
  // Built-in providers with SDK support (direct API calls)
  // -------------------------------------------------------------------------
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    supportsByok: true,
    isAggregator: true,
    hasSdkSupport: true,
    catalogSource: 'openrouter',
    defaults: {
      supportsTools: false, // Default false, catalog entries override
      supportedFormats: ['text'],
    },
    website: 'https://openrouter.ai',
    description: 'Access models from multiple providers through a single API',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    supportsByok: true,
    isAggregator: false,
    hasSdkSupport: true,
    catalogSource: 'models.dev',
    modelsDevId: 'openai',
    defaults: {
      supportsTools: true,
      supportedFormats: ['text', 'image', 'file', 'audio'],
    },
    website: 'https://openai.com',
    description: 'Direct access to OpenAI models like GPT-4 and GPT-5',
  },
  google: {
    id: 'google',
    name: 'Google',
    supportsByok: true,
    isAggregator: false,
    hasSdkSupport: true,
    catalogSource: 'models.dev',
    modelsDevId: 'google',
    defaults: {
      supportsTools: true,
      supportedFormats: ['text', 'image', 'file', 'audio', 'video'],
    },
    website: 'https://ai.google.dev',
    description: 'Google AI / Gemini models',
  },
  xai: {
    id: 'xai',
    name: 'xAI',
    supportsByok: true,
    isAggregator: false,
    hasSdkSupport: true,
    catalogSource: 'models.dev',
    modelsDevId: 'xai',
    defaults: {
      supportsTools: true,
      supportedFormats: ['text', 'image'],
    },
    website: 'https://x.ai',
    description: 'xAI models including Grok',
  },
};

// =============================================================================
// Derived Constants
// =============================================================================

/**
 * All provider IDs in the registry (order matters for UI)
 */
export const ALL_PROVIDER_IDS = Object.keys(PROVIDER_REGISTRY) as string[];

/**
 * Providers with SDK support that can make direct API calls.
 * These are the "builtin" providers in the routing logic.
 */
export const SDK_PROVIDERS = ALL_PROVIDER_IDS.filter(
  (id) => PROVIDER_REGISTRY[id]?.hasSdkSupport
) as SdkProvider[];

export type SdkProvider = 'openrouter' | 'openai' | 'google' | 'xai';

/**
 * Providers that should use models.dev for catalog sync
 */
export const MODELS_DEV_PROVIDERS = ALL_PROVIDER_IDS.filter(
  (id) => PROVIDER_REGISTRY[id]?.catalogSource === 'models.dev'
);

// =============================================================================
// Provider Access Functions
// =============================================================================

/**
 * Get provider config by ID
 * Returns config for known providers, or generates fallback for unknown ones
 */
export function getProviderConfig(id: string): ProviderConfig {
  const registered = PROVIDER_REGISTRY[id];
  if (registered) {
    return registered;
  }

  // Generate fallback for unknown providers (future: custom providers)
  return {
    id,
    name: formatUnknownProviderName(id),
    supportsByok: false,
    isAggregator: false,
    hasSdkSupport: false,
    catalogSource: null,
    defaults: {
      supportsTools: true,
      supportedFormats: ['text'],
    },
  };
}

/**
 * Format an unknown provider ID into a display name
 */
function formatUnknownProviderName(id: string): string {
  return id
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 3 && /^[a-z]+$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Get the display name for a provider
 */
export function displayProviderName(id: string): string {
  return getProviderConfig(id).name;
}

/**
 * Check if a provider is a known/registered provider
 */
export function isKnownProvider(id: string): boolean {
  return id in PROVIDER_REGISTRY;
}

/**
 * Check if a provider supports BYOK
 */
export function providerSupportsByok(id: string): boolean {
  return getProviderConfig(id).supportsByok;
}

/**
 * Check if a provider is an aggregator
 */
export function isAggregatorProvider(id: string): boolean {
  return getProviderConfig(id).isAggregator;
}

/**
 * Check if a provider should use models.dev for catalog sync
 */
export function isModelsDevProvider(id: string): boolean {
  return getProviderConfig(id).catalogSource === 'models.dev';
}

/**
 * Get the models.dev provider ID for a given internal provider ID
 * Returns null if the provider doesn't use models.dev
 */
export function getModelsDevProviderId(internalId: string): string | null {
  const config = PROVIDER_REGISTRY[internalId];
  if (config?.catalogSource === 'models.dev') {
    return config.modelsDevId ?? internalId;
  }
  return null;
}

/**
 * Get internal provider ID from models.dev provider ID
 */
export function getInternalProviderId(modelsDevId: string): string {
  // Check if any provider has this modelsDevId
  for (const config of Object.values(PROVIDER_REGISTRY)) {
    if (config.modelsDevId === modelsDevId) {
      return config.id;
    }
  }
  // Fall back to direct match
  return modelsDevId;
}

/**
 * Get all registered providers
 */
export function getAllProviders(): ProviderConfig[] {
  return ALL_PROVIDER_IDS.map((id) => PROVIDER_REGISTRY[id]);
}
