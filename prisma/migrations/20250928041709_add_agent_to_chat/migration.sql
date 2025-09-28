-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "agentId" UUID;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "public"."Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
