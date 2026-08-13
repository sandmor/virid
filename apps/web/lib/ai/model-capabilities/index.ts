/**
 * Model Capabilities Module
 *
 * This module provides functionality for managing model capabilities,
 * provider associations, and syncing with external provider catalogs.
 *
 * Module structure:
 * - types.ts: Type definitions
 * - constants.ts: Configuration constants
 * - utils.ts: Utility functions
 * - db.ts: Database operations for Model/ModelProvider
 * - catalog.ts: Provider catalog operations
 * - sync-openrouter.ts: OpenRouter sync
 * - sync-models-dev.ts: Models.dev sync
 * - models-dev-types.ts: Models.dev API type definitions
 */

export type {
  CatalogEntry,
  ManagedModelCapabilities,
  ModelCapabilities,
  ModelFormat,
  ModelPricing,
  ModelProviderAssociation,
  ResolvedModelCapabilities,
} from './types';

export {
  countEnabledProviders,
  deleteModel,
  ensureDefaultProvider,
  getManagedModels,
  getModelCapabilities,
  getTierIdsForModel,
  removeModelFromTiers,
  removeModelProvider,
  upsertModel,
  upsertModelProvider,
} from './db';

export { getAllCatalogEntries } from './catalog';

export { syncOpenRouterCatalog } from './sync-openrouter';
