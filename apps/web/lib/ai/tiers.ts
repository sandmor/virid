import { prisma, Prisma } from '@vero/db';

export type TierRecord = {
  id: string;
  modelIds: string[];
  bucketCapacity: number;
  bucketRefillAmount: number;
  bucketRefillIntervalSeconds: number;
};

export type TierRecordWithModels = TierRecord & {
  models: {
    id: string;
    name: string;
    creator: string;
    supportsTools: boolean;
    supportedFormats: string[];
  }[];
};

type TierInclude = Prisma.TierInclude;
type TierResult<T extends TierInclude> = Prisma.TierGetPayload<{ include: T }>;

async function fetchTierRow<T extends TierInclude>(id: string, include: T): Promise<TierResult<T>> {
  const row = await prisma.tier.findUnique({ where: { id }, include });
  if (!row) throw new Error(`Tier '${id}' is not configured in the database`);
  return row;
}

export async function getTier(id: string): Promise<TierRecord> {
  const row = await fetchTierRow(id, { models: { select: { modelId: true } } });
  return {
    id: row.id,
    modelIds: row.models.map((model) => model.modelId),
    bucketCapacity: row.bucketCapacity,
    bucketRefillAmount: row.bucketRefillAmount,
    bucketRefillIntervalSeconds: row.bucketRefillIntervalSeconds,
  };
}

export async function getTierWithModels(id: string): Promise<TierRecordWithModels> {
  const row = await fetchTierRow(id, {
    models: { include: { model: { select: { id: true, name: true, creator: true, supportsTools: true, supportedFormats: true } } } },
  });
  const models = row.models.map(({ model }) => ({
    id: model.id,
    name: model.name,
    creator: model.creator,
    supportsTools: model.supportsTools,
    supportedFormats: model.supportedFormats,
  }));
  return {
    id: row.id,
    modelIds: models.map((model) => model.id),
    bucketCapacity: row.bucketCapacity,
    bucketRefillAmount: row.bucketRefillAmount,
    bucketRefillIntervalSeconds: row.bucketRefillIntervalSeconds,
    models,
  };
}
