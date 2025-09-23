import "server-only";

import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";
import type { ArtifactKind } from "@/components/artifact";
import type { VisibilityType } from "@/components/visibility-selector";
import { ChatSDKError } from "../errors";
import type { AppUsage } from "../usage";
import { generateUUID } from "../utils";
import { type Chat, type Suggestion, type User, type Document } from "./schema";

// Optionally, if not using email/pass login, you can use an Auth.js adapter.

// All database access is routed through Prisma Client

export async function getUser(email: string): Promise<User[]> {
  try {
    return await prisma.user.findMany({ where: { email } });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get user by email"
    );
  }
}


export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
}) {
  try {
    await prisma.chat.create({
      data: { id, createdAt: new Date(), userId, title, visibility },
    });
    return;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save chat");
  }
}

export async function deleteChatById({ id }: { id: string }): Promise<Chat> {
  try {
    // Cascades are not defined; delete manually in correct order.
    await prisma.vote_v2.deleteMany({ where: { chatId: id } });
    await prisma.message_v2.deleteMany({ where: { chatId: id } });
    await prisma.stream.deleteMany({ where: { chatId: id } });

    const deleted = await prisma.chat.delete({ where: { id } });
    const { lastContext, visibility, ...rest } = deleted as typeof deleted & { visibility: string };
    return {
      ...rest,
      visibility: visibility as Chat["visibility"],
      lastContext: (lastContext as unknown) as Chat["lastContext"],
    };
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete chat by id"
    );
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

  let filteredChats: Chat[] = [];

    if (startingAfter) {
      const selectedChat = await prisma.chat.findUnique({ where: { id: startingAfter } });

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${startingAfter} not found`
        );
      }
      const rows = await prisma.chat.findMany({
        where: { userId: id, createdAt: { gt: selectedChat.createdAt } },
        orderBy: { createdAt: "desc" },
        take: extendedLimit,
      });
      filteredChats = rows.map((c) => ({
        id: c.id,
        createdAt: c.createdAt,
        title: c.title,
        userId: c.userId,
        visibility: c.visibility as Chat["visibility"],
        lastContext: (c.lastContext as unknown) as Chat["lastContext"],
      }));
    } else if (endingBefore) {
      const selectedChat = await prisma.chat.findUnique({ where: { id: endingBefore } });

      if (!selectedChat) {
        throw new ChatSDKError(
          "not_found:database",
          `Chat with id ${endingBefore} not found`
        );
      }
      const rows = await prisma.chat.findMany({
        where: { userId: id, createdAt: { lt: selectedChat.createdAt } },
        orderBy: { createdAt: "desc" },
        take: extendedLimit,
      });
      filteredChats = rows.map((c) => ({
        id: c.id,
        createdAt: c.createdAt,
        title: c.title,
        userId: c.userId,
        visibility: c.visibility as Chat["visibility"],
        lastContext: (c.lastContext as unknown) as Chat["lastContext"],
      }));
    } else {
      const rows = await prisma.chat.findMany({
        where: { userId: id },
        orderBy: { createdAt: "desc" },
        take: extendedLimit,
      });
      filteredChats = rows.map((c) => ({
        id: c.id,
        createdAt: c.createdAt,
        title: c.title,
        userId: c.userId,
        visibility: c.visibility as Chat["visibility"],
        lastContext: (c.lastContext as unknown) as Chat["lastContext"],
      }));
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get chats by user id"
    );
  }
}

export async function getChatById({ id }: { id: string }): Promise<Chat | null> {
  try {
    const selectedChat = await prisma.chat.findUnique({ where: { id } });
    if (!selectedChat) {
      return null;
    }

    const { lastContext, visibility, ...rest } = selectedChat as typeof selectedChat & { visibility: string };
    return {
      ...rest,
      visibility: visibility as Chat["visibility"],
      lastContext: (lastContext as unknown) as Chat["lastContext"],
    };
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to get chat by id");
  }
}

// Narrow input type for saving messages to avoid leaking Prisma.JsonValue typing upstream
type SaveMessageInput = {
  id: string;
  chatId: string;
  role: string;
  parts: unknown;
  attachments: unknown;
  createdAt: Date;
};

export async function saveMessages({ messages }: { messages: SaveMessageInput[] }) {
  try {
    await prisma.message_v2.createMany({
      data: messages.map((m) => ({
        id: m.id,
        chatId: m.chatId,
        role: m.role,
        // Ensure JSON-safe payloads for Prisma
        parts: m.parts as Prisma.InputJsonValue,
        attachments: m.attachments as Prisma.InputJsonValue,
        createdAt: m.createdAt,
      })),
    });
    return;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save messages");
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await prisma.message_v2.findMany({
      where: { chatId: id },
      orderBy: { createdAt: "asc" },
    });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get messages by chat id"
    );
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const existingVote = await prisma.vote_v2.findUnique({
      where: { chatId_messageId: { chatId, messageId } },
    });

    if (existingVote) {
      await prisma.vote_v2.update({
        where: { chatId_messageId: { chatId, messageId } },
        data: { isUpvoted: type === "up" },
      });
      return;
    }
    await prisma.vote_v2.create({
      data: { chatId, messageId, isUpvoted: type === "up" },
    });
    return;
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to vote message");
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await prisma.vote_v2.findMany({ where: { chatId: id } });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get votes by chat id"
    );
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    const created = await prisma.document.create({
      data: { id, title, kind, content, userId, createdAt: new Date() },
    });
    const mapped: Document = { ...created, kind: created.kind as Document["kind"] };
    return [mapped as any];
  } catch (_error) {
    throw new ChatSDKError("bad_request:database", "Failed to save document");
  }
}

export async function getDocumentsById({ id }: { id: string }): Promise<Document[]> {
  try {
    const documents = await prisma.document.findMany({
      where: { id },
      orderBy: { createdAt: "asc" },
    });
    return documents.map((d) => ({ ...d, kind: d.kind as Document["kind"] }));
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get documents by id"
    );
  }
}

export async function getDocumentById({ id }: { id: string }): Promise<Document | null> {
  try {
    const selectedDocument = await prisma.document.findFirst({
      where: { id },
      orderBy: { createdAt: "desc" },
    });
    return selectedDocument
      ? ({ ...selectedDocument, kind: selectedDocument.kind as Document["kind"] } as Document)
      : null;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get document by id"
    );
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}): Promise<Document[]> {
  try {
  // Capture the documents we will delete so we can return them after deletion
    const toDeleteRaw = await prisma.document.findMany({
      where: { id, createdAt: { gt: timestamp } },
      orderBy: { createdAt: "asc" },
    });
    const toDelete: Document[] = toDeleteRaw.map((d) => ({
      ...d,
      kind: d.kind as Document["kind"],
    }));

    // Delete suggestions linked to documents after timestamp
    await prisma.suggestion.deleteMany({
      where: {
        documentId: id,
        documentCreatedAt: { gt: timestamp },
      },
    });

    await prisma.document.deleteMany({
      where: { id, createdAt: { gt: timestamp } },
    });
  return toDelete;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete documents by id after timestamp"
    );
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Suggestion[];
}) {
  try {
    await prisma.suggestion.createMany({ data: suggestions });
    return;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to save suggestions"
    );
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await prisma.suggestion.findMany({ where: { documentId } });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get suggestions by document id"
    );
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const msg = await prisma.message_v2.findUnique({ where: { id } });
    return msg ? ([msg] as any) : ([] as any);
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get message by id"
    );
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await prisma.message_v2.findMany({
      where: { chatId, createdAt: { gte: timestamp } },
      select: { id: true },
    });

    const messageIds = (messagesToDelete as Array<{ id: string }>).map(({ id }) => id);

    if (messageIds.length > 0) {
      await prisma.vote_v2.deleteMany({ where: { chatId, messageId: { in: messageIds } } });
      await prisma.message_v2.deleteMany({ where: { chatId, id: { in: messageIds } } });
    }
    return;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to delete messages by chat id after timestamp"
    );
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    await prisma.chat.update({ where: { id: chatId }, data: { visibility } });
    return;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to update chat visibility by id"
    );
  }
}

export async function updateChatLastContextById({
  chatId,
  context,
}: {
  chatId: string;
  // Store merged server-enriched usage object
  context: AppUsage;
}) {
  try {
    await prisma.chat.update({ where: { id: chatId }, data: { lastContext: context as Prisma.InputJsonValue } });
    return;
  } catch (error) {
    console.warn("Failed to update lastContext for chat", chatId, error);
    return;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000
    );

    const stats = await prisma.message_v2.count({
      where: {
        role: "user",
        createdAt: { gte: twentyFourHoursAgo },
        chat: { userId: id },
      },
    });

    return stats ?? 0;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get message count by user id"
    );
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await prisma.stream.create({ data: { id: streamId, chatId, createdAt: new Date() } });
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to create stream id"
    );
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await prisma.stream.findMany({
      where: { chatId },
      select: { id: true },
      orderBy: { createdAt: "asc" },
    });
    return (streamIds as Array<{ id: string }>).map(({ id }) => id);
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get stream ids by chat id"
    );
  }
}
