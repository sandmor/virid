-- CreateTable
CREATE TABLE "public"."Tier" (
    "id" VARCHAR(32) NOT NULL,
    "modelIds" TEXT[] NOT NULL,
    "maxMessagesPerDay" INTEGER NOT NULL,
    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);