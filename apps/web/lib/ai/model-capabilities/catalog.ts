/**
 * Provider Catalog Operations (Sync Cache)
 */

import { prisma } from '@vero/db';
import { Prisma } from '@vero/db';
import type { CatalogEntry, ModelFormat, ModelPricing } from './types';

// ============================================================================
// Catalog Cleanup Operations
// ============================================================================

/**
 * Delete catalog entries for a provider that are NOT in the given set of model IDs.
 * This is used to clean up stale entries after a sync.
 *
 * @param providerId - The provider ID to clean up
 * @param keepModelIds - Set of providerModelIds to keep (all others will be deleted)
 * @returns The number of entries deleted
 */
export async function deleteCatalogEntriesForProvider(
  providerId: string,
  keepModelIds: Set<string>
): Promise<number> {
  if (keepModelIds.size === 0) {
    return 0;
  }

  const result = await prisma.providerCatalog.deleteMany({
    where: {
      providerId,
      providerModelId: {
        notIn: Array.from(keepModelIds),
      },
    },
  });

  return result.count;
}

/**
 * Get all catalog entries
 */
export async function getAllCatalogEntries(): Promise<CatalogEntry[]> {
  const entries = await prisma.providerCatalog.findMany({
    orderBy: [{ providerId: 'asc' }, { suggestedModelId: 'asc' }],
  });

  return entries.map((e) => ({
    id: e.id,
    providerId: e.providerId,
    providerModelId: e.providerModelId,
    suggestedModelId: e.suggestedModelId,
    suggestedName: e.suggestedName,
    suggestedCreator: e.suggestedCreator,
    supportsTools: e.supportsTools,
    supportedFormats: e.supportedFormats as ModelFormat[],
    pricing: e.pricing as ModelPricing | null,
    lastSynced: e.lastSynced,
  }));
}

/**
 * Upsert a catalog entry (from sync)
 */
export async function upsertCatalogEntry(
  entry: Omit<CatalogEntry, 'id' | 'lastSynced'>
): Promise<void> {
  const pricingData = entry.pricing ? entry.pricing : Prisma.JsonNull;

  await prisma.providerCatalog.upsert({
    where: {
      providerId_providerModelId: {
        providerId: entry.providerId,
        providerModelId: entry.providerModelId,
      },
    },
    create: {
      providerId: entry.providerId,
      providerModelId: entry.providerModelId,
      suggestedModelId: entry.suggestedModelId,
      suggestedName: entry.suggestedName,
      suggestedCreator: entry.suggestedCreator,
      supportsTools: entry.supportsTools,
      supportedFormats: entry.supportedFormats,
      pricing: pricingData,
      lastSynced: new Date(),
    },
    update: {
      suggestedModelId: entry.suggestedModelId,
      suggestedName: entry.suggestedName,
      suggestedCreator: entry.suggestedCreator,
      supportsTools: entry.supportsTools,
      supportedFormats: entry.supportedFormats,
      pricing: pricingData,
      lastSynced: new Date(),
    },
  });
}
