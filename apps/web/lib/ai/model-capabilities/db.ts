/**
 * Database Operations for Model and ModelProvider tables
 */

import { prisma, Prisma } from '@vero/db';
import type {
  ManagedModelCapabilities,
  ModelCapabilities,
  ModelFormat,
  ModelPricing,
  ResolvedModelCapabilities,
} from './types';

// ============================================================================
// Model CRUD Operations
// ============================================================================

/**
 * Get a model with all its provider associations
 */
export async function getModelWithProviders(
  modelId: string
): Promise<ModelCapabilities | null> {
  const model = await prisma.model.findUnique({
    where: { id: modelId },
    include: { providers: true },
  });

  if (!model) return null;

  return {
    ...model,
    supportedFormats: model.supportedFormats as ModelFormat[],
    maxOutputTokens: model.maxOutputTokens,
    providers: model.providers.map((p) => ({
      id: p.id,
      providerId: p.providerId,
      providerModelId: p.providerModelId,
      pricing: p.pricing as ModelPricing | null,
      isDefault: p.isDefault,
      enabled: p.enabled,
    })),
  };
}

/**
 * Get model capabilities resolved for a specific provider (for API calls)
 * If no provider specified, uses the default provider for the model
 */
export async function getModelCapabilities(
  modelId: string,
  preferredProvider?: string
): Promise<ResolvedModelCapabilities | null> {
  const model = await prisma.model.findUnique({
    where: { id: modelId },
    include: {
      providers: {
        where: { enabled: true },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
      },
    },
  });

  if (!model) return null;

  // Find the provider to use
  let providerAssoc = model.providers[0]; // Default to first (default provider)

  if (preferredProvider) {
    const preferred = model.providers.find(
      (p) => p.providerId === preferredProvider
    );
    if (preferred) providerAssoc = preferred;
  }

  if (!providerAssoc) return null;

  return {
    id: model.id,
    name: model.name,
    creator: model.creator,
    supportsTools: model.supportsTools,
    supportedFormats: model.supportedFormats as ModelFormat[],
    maxOutputTokens: model.maxOutputTokens,
    provider: providerAssoc.providerId,
    providerModelId: providerAssoc.providerModelId,
    pricing: providerAssoc.pricing as ModelPricing | null,
  };
}

/**
 * Create or update a model (without provider associations)
 */
export async function upsertModel(data: {
  id: string;
  name: string;
  creator: string;
  supportsTools?: boolean;
  supportedFormats?: ModelFormat[];
  maxOutputTokens?: number | null;
}): Promise<void> {
  await prisma.model.upsert({
    where: { id: data.id },
    create: {
      id: data.id,
      name: data.name,
      creator: data.creator,
      supportsTools: data.supportsTools ?? true,
      supportedFormats: data.supportedFormats ?? ['text'],
      maxOutputTokens: data.maxOutputTokens ?? null,
    },
    update: {
      name: data.name,
      creator: data.creator,
      supportsTools: data.supportsTools,
      supportedFormats: data.supportedFormats,
      maxOutputTokens: data.maxOutputTokens,
    },
  });
}

/**
 * Delete a model and all its provider associations
 */
export async function deleteModel(modelId: string): Promise<void> {
  await prisma.model.delete({ where: { id: modelId } });
}

/**
 * Remove a model from all tiers. Safe to call even if not present.
 */
export async function removeModelFromTiers(modelId: string): Promise<number> {
  const result = await prisma.tierModel.deleteMany({ where: { modelId } });
  return result.count;
}

/**
 * Get tier IDs that currently reference a model.
 */
export async function getTierIdsForModel(modelId: string): Promise<string[]> {
  const rows = await prisma.tierModel.findMany({
    where: { modelId },
    select: { tierId: true },
  });
  return rows.map((r) => r.tierId);
}

/**
 * Count enabled providers for a model (excluding a specific provider if provided).
 */
export async function countEnabledProviders(
  modelId: string,
  excludeProviderId?: string
): Promise<number> {
  const count = await prisma.modelProvider.count({
    where: {
      modelId,
      enabled: true,
      providerId: excludeProviderId ? { not: excludeProviderId } : undefined,
    },
  });
  return count;
}

/**
 * Ensure a model has a default provider set if any remain.
 */
export async function ensureDefaultProvider(modelId: string): Promise<void> {
  const providers = await prisma.modelProvider.findMany({
    where: { modelId },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
  });

  if (providers.length === 0) return;

  const hasDefault = providers.some((p) => p.isDefault);
  if (hasDefault) return;

  const firstEnabled = providers.find((p) => p.enabled) ?? providers[0];
  await prisma.modelProvider.update({
    where: {
      modelId_providerId: { modelId, providerId: firstEnabled.providerId },
    },
    data: { isDefault: true },
  });
}

/**
 * Get all models from database
 */
export async function getAllModels(): Promise<ModelCapabilities[]> {
  const models = await prisma.model.findMany({
    include: { providers: true },
    orderBy: [{ creator: 'asc' }, { name: 'asc' }],
  });

  return models.map((m) => ({
    ...m,
    supportedFormats: m.supportedFormats as ModelFormat[],
    maxOutputTokens: m.maxOutputTokens,
    providers: m.providers.map((p) => ({
      id: p.id,
      providerId: p.providerId,
      providerModelId: p.providerModelId,
      pricing: p.pricing as ModelPricing | null,
      isDefault: p.isDefault,
      enabled: p.enabled,
    })),
  }));
}

// ============================================================================
// ModelProvider CRUD Operations
// ============================================================================

/**
 * Add or update a provider association for a model.
 *
 * @param modelId - The canonical model ID
 * @param data - Provider association data
 */
export async function upsertModelProvider(
  modelId: string,
  data: {
    providerId: string;
    providerModelId: string;
    pricing?: ModelPricing | null;
    isDefault?: boolean;
    enabled?: boolean;
  }
): Promise<void> {
  const pricingData = data.pricing ? data.pricing : Prisma.JsonNull;

  // If setting as default, unset other defaults first
  if (data.isDefault) {
    await prisma.modelProvider.updateMany({
      where: { modelId, isDefault: true },
      data: { isDefault: false },
    });
  }

  await prisma.modelProvider.upsert({
    where: {
      modelId_providerId: { modelId, providerId: data.providerId },
    },
    create: {
      modelId,
      providerId: data.providerId,
      providerModelId: data.providerModelId,
      pricing: pricingData,
      isDefault: data.isDefault ?? false,
      enabled: data.enabled ?? true,
    },
    update: {
      providerModelId: data.providerModelId,
      pricing: pricingData,
      isDefault: data.isDefault,
      enabled: data.enabled,
    },
  });
}

/**
 * Remove a provider association from a model
 */
export async function removeModelProvider(
  modelId: string,
  providerId: string
): Promise<void> {
  await prisma.modelProvider.deleteMany({
    where: { modelId, providerId },
  });
}

// ============================================================================
// Tier Integration
// ============================================================================

/**
 * Collect the set of model ids referenced by all tiers (via TierModel join table)
 */
export async function getTierModelIds(): Promise<string[]> {
  // Get model IDs from the TierModel join table
  const tierModels = await prisma.tierModel.findMany({
    select: { modelId: true },
  });

  const modelIds = new Set<string>();
  for (const tm of tierModels) {
    modelIds.add(tm.modelId);
  }

  return Array.from(modelIds);
}

/**
 * Get managed model capabilities with tier coverage and provider metadata
 */
export async function getManagedModels(): Promise<ManagedModelCapabilities[]> {
  const [dbModels, tierModelIds] = await Promise.all([
    prisma.model.findMany({
      include: {
        providers: true,
      },
      orderBy: [{ creator: 'asc' }, { name: 'asc' }],
    }),
    getTierModelIds(),
  ]);

  const tierSet = new Set(tierModelIds);

  return dbModels.map((model) => ({
    ...model,
    supportedFormats: model.supportedFormats as ModelFormat[],
    maxOutputTokens: model.maxOutputTokens,
    providers: model.providers.map((p) => ({
      id: p.id,
      providerId: p.providerId,
      providerModelId: p.providerModelId,
      pricing: p.pricing as ModelPricing | null,
      isDefault: p.isDefault,
      enabled: p.enabled,
    })),
    isPersisted: true,
    inUse: tierSet.has(model.id),
    // A model can be added to tiers only if it has at least one provider
    canBeInTier: model.providers.length > 0,
  }));
}

/**
 * Get all models that can be added to tiers (have at least one provider)
 */
export async function getModelsForTierSelection(): Promise<
  ManagedModelCapabilities[]
> {
  const models = await getManagedModels();
  return models.filter((m) => m.providers.length > 0);
}

/**
 * Get all models available for BYOK (all models in the registry, with or without providers)
 */
export async function getModelsForByok(): Promise<ManagedModelCapabilities[]> {
  return getManagedModels();
}
