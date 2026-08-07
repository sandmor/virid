-- One-way coordinated migration: consolidate platform custom providers/models
-- into the canonical Provider, Model, and ModelProvider tables.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "PlatformCustomProvider" p
    JOIN "Provider" b ON b.id = p.slug
  ) THEN
    RAISE EXCEPTION 'Cannot migrate platform providers: a custom provider slug collides with an existing Provider id';
  END IF;

  IF EXISTS (
    SELECT 1 FROM "PlatformCustomModel" c
    JOIN "Model" m ON m.id = c."modelSlug"
  ) THEN
    RAISE EXCEPTION 'Cannot migrate platform models: a custom model slug collides with an existing Model id';
  END IF;
  IF EXISTS (
    SELECT 1 FROM "ModelProvider" mp
    WHERE regexp_replace(mp."providerId", '^custom:', '') NOT IN (
      SELECT id FROM "Provider"
      UNION SELECT slug FROM "PlatformCustomProvider"
      UNION SELECT unnest(ARRAY['openai', 'google', 'openrouter', 'xai'])
    )
  ) THEN
    RAISE EXCEPTION 'Cannot migrate ModelProvider rows that reference an unknown provider';
  END IF;
  IF EXISTS (
    SELECT 1 FROM "ProviderCatalog" pc
    WHERE pc."providerId" NOT IN (
      SELECT id FROM "Provider"
      UNION SELECT slug FROM "PlatformCustomProvider"
      UNION SELECT unnest(ARRAY['openai', 'google', 'openrouter', 'xai'])
    )
  ) THEN
    RAISE EXCEPTION 'Cannot migrate ProviderCatalog rows that reference an unknown provider';
  END IF;
END $$;

ALTER TABLE "Provider"
  ADD COLUMN "name" VARCHAR(128),
  ADD COLUMN "kind" VARCHAR(32) NOT NULL DEFAULT 'builtin',
  ADD COLUMN "baseUrl" TEXT,
  ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Provider" ALTER COLUMN "apiKey" DROP NOT NULL;

INSERT INTO "Provider" ("id", "name", "kind") VALUES
  ('openai', 'OpenAI', 'builtin'),
  ('google', 'Google', 'builtin'),
  ('openrouter', 'OpenRouter', 'builtin'),
  ('xai', 'xAI', 'builtin')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name";

UPDATE "Provider" SET "name" = id WHERE "name" IS NULL;
ALTER TABLE "Provider" ALTER COLUMN "name" SET NOT NULL;

INSERT INTO "Provider" ("id", "name", "kind", "baseUrl", "apiKey", "enabled", "createdAt", "updatedAt")
SELECT slug, name, 'openai-compatible', "baseUrl", "apiKey", enabled, "createdAt", "updatedAt"
FROM "PlatformCustomProvider";

ALTER TABLE "ModelProvider" ADD COLUMN "providerId_new" VARCHAR(64);
UPDATE "ModelProvider" SET "providerId_new" = regexp_replace("providerId", '^custom:', '')
WHERE "providerId" LIKE 'custom:%';
UPDATE "ModelProvider" SET "providerId_new" = "providerId" WHERE "providerId_new" IS NULL;

INSERT INTO "Model" ("id", "name", "creator", "supportsTools", "supportedFormats", "maxOutputTokens", "createdAt", "updatedAt")
SELECT "modelSlug", "displayName", split_part("modelSlug", ':', 1), "supportsTools", "supportedFormats", "maxOutputTokens", "createdAt", "updatedAt"
FROM "PlatformCustomModel";

INSERT INTO "ModelProvider" ("modelId", "providerId", "providerId_new", "providerModelId", pricing, "isDefault", enabled, "createdAt", "updatedAt")
SELECT c."modelSlug", 'custom:' || p.slug, p.slug, c."providerModelId", c.pricing, true, c.enabled, c."createdAt", c."updatedAt"
FROM "PlatformCustomModel" c JOIN "PlatformCustomProvider" p ON p.id = c."providerId";

ALTER TABLE "ModelProvider" DROP COLUMN "providerId";
ALTER TABLE "ModelProvider" RENAME COLUMN "providerId_new" TO "providerId";
ALTER TABLE "ModelProvider" ALTER COLUMN "providerId" SET NOT NULL;
ALTER TABLE "ModelProvider" DROP COLUMN "customPlatformProviderId";
CREATE UNIQUE INDEX "ModelProvider_modelId_providerId_key" ON "ModelProvider" ("modelId", "providerId");
ALTER TABLE "ModelProvider" ADD CONSTRAINT "ModelProvider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProviderCatalog" ADD CONSTRAINT "ProviderCatalog_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE UNIQUE INDEX "ModelProvider_one_default_per_model" ON "ModelProvider" ("modelId") WHERE "isDefault";

DROP TABLE "PlatformCustomModel";
DROP TABLE "PlatformCustomProvider";
