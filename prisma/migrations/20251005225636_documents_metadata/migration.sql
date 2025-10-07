-- DropIndex
DROP INDEX "public"."Chat_userId_createdAt_idx";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "metadata" JSONB;
