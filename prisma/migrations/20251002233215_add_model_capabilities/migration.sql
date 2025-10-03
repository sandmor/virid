-- CreateTable
CREATE TABLE "public"."Model" (
    "id" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "provider" VARCHAR(64) NOT NULL,
    "supportsTools" BOOLEAN NOT NULL DEFAULT true,
    "supportedFormats" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Model_provider_idx" ON "public"."Model"("provider");
