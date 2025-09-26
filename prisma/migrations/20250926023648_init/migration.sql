-- CreateTable
CREATE TABLE "public"."Provider" (
    "id" VARCHAR(64) NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tier" (
    "id" VARCHAR(32) NOT NULL,
    "modelIds" TEXT[],
    "bucketCapacity" INTEGER NOT NULL,
    "bucketRefillAmount" INTEGER NOT NULL,
    "bucketRefillIntervalSeconds" INTEGER NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" VARCHAR(191) NOT NULL,
    "email" VARCHAR(128) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRateLimit" (
    "userId" VARCHAR(191) NOT NULL,
    "tokens" INTEGER NOT NULL,
    "lastRefill" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRateLimit_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "lastContext" JSONB,
    "parentChatId" UUID,
    "forkedFromMessageId" UUID,
    "forkDepth" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "parts" JSONB NOT NULL,
    "attachments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vote" (
    "chatId" UUID NOT NULL,
    "messageId" UUID NOT NULL,
    "isUpvoted" BOOLEAN NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("chatId","messageId")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'text',
    "userId" VARCHAR(191) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id","createdAt")
);

-- CreateTable
CREATE TABLE "public"."Suggestion" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "documentCreatedAt" TIMESTAMP(3) NOT NULL,
    "originalText" TEXT NOT NULL,
    "suggestedText" TEXT NOT NULL,
    "description" TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "userId" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stream" (
    "id" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArchiveEntry" (
    "id" UUID NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "entity" TEXT NOT NULL,
    "tags" TEXT[],
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArchiveEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatPinnedArchiveEntry" (
    "id" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "archiveEntryId" UUID NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "pinnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatPinnedArchiveEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArchiveLink" (
    "id" UUID NOT NULL,
    "sourceId" UUID NOT NULL,
    "targetId" UUID NOT NULL,
    "type" VARCHAR(64) NOT NULL,
    "bidirectional" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchiveLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chat_parentChatId_idx" ON "public"."Chat"("parentChatId");

-- CreateIndex
CREATE INDEX "Message_chatId_idx" ON "public"."Message"("chatId");

-- CreateIndex
CREATE INDEX "ArchiveEntry_userId_slug_idx" ON "public"."ArchiveEntry"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ArchiveEntry_userId_slug_key" ON "public"."ArchiveEntry"("userId", "slug");

-- CreateIndex
CREATE INDEX "ChatPinnedArchiveEntry_chatId_idx" ON "public"."ChatPinnedArchiveEntry"("chatId");

-- CreateIndex
CREATE INDEX "ChatPinnedArchiveEntry_archiveEntryId_idx" ON "public"."ChatPinnedArchiveEntry"("archiveEntryId");

-- CreateIndex
CREATE INDEX "ChatPinnedArchiveEntry_userId_idx" ON "public"."ChatPinnedArchiveEntry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatPinnedArchiveEntry_chatId_archiveEntryId_key" ON "public"."ChatPinnedArchiveEntry"("chatId", "archiveEntryId");

-- CreateIndex
CREATE INDEX "ArchiveLink_sourceId_idx" ON "public"."ArchiveLink"("sourceId");

-- CreateIndex
CREATE INDEX "ArchiveLink_targetId_idx" ON "public"."ArchiveLink"("targetId");

-- CreateIndex
CREATE INDEX "ArchiveLink_type_idx" ON "public"."ArchiveLink"("type");

-- AddForeignKey
ALTER TABLE "public"."UserRateLimit" ADD CONSTRAINT "UserRateLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Suggestion" ADD CONSTRAINT "Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Suggestion" ADD CONSTRAINT "Suggestion_documentId_documentCreatedAt_fkey" FOREIGN KEY ("documentId", "documentCreatedAt") REFERENCES "public"."Document"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArchiveEntry" ADD CONSTRAINT "ArchiveEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatPinnedArchiveEntry" ADD CONSTRAINT "ChatPinnedArchiveEntry_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatPinnedArchiveEntry" ADD CONSTRAINT "ChatPinnedArchiveEntry_archiveEntryId_fkey" FOREIGN KEY ("archiveEntryId") REFERENCES "public"."ArchiveEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatPinnedArchiveEntry" ADD CONSTRAINT "ChatPinnedArchiveEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArchiveLink" ADD CONSTRAINT "ArchiveLink_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."ArchiveEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArchiveLink" ADD CONSTRAINT "ArchiveLink_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "public"."ArchiveEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
