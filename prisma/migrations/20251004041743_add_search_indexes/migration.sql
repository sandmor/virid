-- Add GIN index for full-text search on Chat title
CREATE INDEX IF NOT EXISTS "Chat_title_gin_idx" ON "Chat" USING gin(to_tsvector('simple', title));

-- Add regular index on Chat userId and createdAt for efficient sorting/filtering
CREATE INDEX IF NOT EXISTS "Chat_userId_createdAt_idx" ON "Chat"("userId", "createdAt" DESC);

-- Add index on Message chatId for efficient joins
CREATE INDEX IF NOT EXISTS "Message_chatId_idx" ON "Message"("chatId");