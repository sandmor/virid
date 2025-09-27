-- CreateTable
CREATE TABLE "public"."Agent" (
    "id" UUID NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" TEXT,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
