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
        parentChatId: (c as any).parentChatId ?? null,
        forkedFromMessageId: (c as any).forkedFromMessageId ?? null,
        forkDepth: (c as any).forkDepth ?? 0,
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
        parentChatId: (c as any).parentChatId ?? null,
        forkedFromMessageId: (c as any).forkedFromMessageId ?? null,
        forkDepth: (c as any).forkDepth ?? 0,
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
        parentChatId: (c as any).parentChatId ?? null,
        forkedFromMessageId: (c as any).forkedFromMessageId ?? null,
        forkDepth: (c as any).forkDepth ?? 0,
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

// Save the very first assistant message (non-regeneration) with lineage root fields.
export async function saveAssistantInitialMessage({
  id,
  chatId,
  parts,
  attachments = [],
}: {
  id: string;
  chatId: string;
  parts: unknown;
  attachments?: unknown;
}) {
  try {
    await prisma.message_v2.create({
      data: {
        id,
        chatId,
        role: "assistant",
        parts: parts as Prisma.InputJsonValue,
        attachments: attachments as Prisma.InputJsonValue,
        createdAt: new Date(),
        baseId: id, // root of its variant chain
        previousVersionId: null,
        supersededById: null,
        regenerationGroupId: id,
        parentBaseId: null,
      } as any,
    });
  } catch (error) {
    // Fallback: if migration not applied yet, insert without lineage fields
    try {
      await prisma.message_v2.create({
        data: {
          id,
          chatId,
          role: "assistant",
          parts: parts as Prisma.InputJsonValue,
          attachments: attachments as Prisma.InputJsonValue,
          createdAt: new Date(),
        },
      });
    } catch {
      throw new ChatSDKError("bad_request:database", "Failed to save assistant message (initial)");
    }
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

// Return only active (non-superseded) message versions in chronological order
export async function getActiveMessagesByChatId({ id }: { id: string }) {
  try {
    // Active assistant messages: those not superseded. User/tool messages have no supersession so always included.
    const rows = await prisma.message_v2.findMany({
      where: { chatId: id },
      orderBy: { createdAt: "asc" },
    });
    return rows.filter((m: any) => m.role !== "assistant" || m.supersededById === null);
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get active messages by chat id"
    );
  }
}

// Insert a new assistant variant preserving previous version
export async function insertAssistantVariant({
  chatId,
  previousAssistantMessageId,
  parts,
  attachments = [],
}: {
  chatId: string;
  previousAssistantMessageId: string;
  parts: unknown;
  attachments?: unknown;
}) {
  try {
    const prev: any = await prisma.message_v2.findUnique({ where: { id: previousAssistantMessageId } });
    if (!prev) throw new ChatSDKError("not_found:database", "Assistant message to regenerate not found");
    if (prev.role !== "assistant") throw new ChatSDKError("bad_request:database", "Previous message not assistant");

    const baseId = prev.baseId || prev.id; // if first variant, baseId points to itself
    const newId = generateUUID();

    await prisma.message_v2.update({
      where: { id: prev.id },
      data: { supersededById: newId },
    });

    const created = await prisma.message_v2.create({
      data: {
        id: newId,
        chatId,
        role: "assistant",
        parts: parts as Prisma.InputJsonValue,
        attachments: attachments as Prisma.InputJsonValue,
        createdAt: new Date(),
        baseId: baseId,
        previousVersionId: prev.id,
        regenerationGroupId: prev.regenerationGroupId || baseId,
        parentBaseId: prev.parentBaseId || null,
      },
    });
    return created;
  } catch (error) {
    if (error instanceof ChatSDKError) throw error;
    throw new ChatSDKError("bad_request:database", "Failed to insert assistant variant");
  }
}

// Fork chat placeholder (full logic to be implemented when wiring edit flows)
export async function forkChat({
  sourceChatId,
  fromMessageId,
  userId,
}: {
  sourceChatId: string;
  fromMessageId: string;
  userId: string;
}) {
  try {
    const sourceChat: any = await prisma.chat.findUnique({ where: { id: sourceChatId } });
    if (!sourceChat) throw new ChatSDKError("not_found:database", "Source chat not found");

    const active = await getActiveMessagesByChatId({ id: sourceChatId });
    const pivotIndex = active.findIndex((m: any) => m.id === fromMessageId);
    if (pivotIndex === -1) throw new ChatSDKError("not_found:database", "Pivot message not found in active path");

    const prefix = active.slice(0, pivotIndex); // exclude pivot itself, replaced by edited

    const newChatId = generateUUID();
    await prisma.chat.create({
      data: {
        id: newChatId,
        createdAt: new Date(),
        userId,
        title: sourceChat.title + " (fork)",
        visibility: sourceChat.visibility as any,
        lastContext: sourceChat.lastContext as Prisma.InputJsonValue,
        parentChatId: sourceChat.parentChatId || sourceChat.id,
        forkedFromMessageId: fromMessageId,
        forkDepth: (sourceChat.forkDepth || 0) + 1,
      } as any,
    });

    if (prefix.length > 0) {
      await prisma.message_v2.createMany({
        data: prefix.map((m: any) => ({
          id: generateUUID(),
          chatId: newChatId,
          role: m.role,
          parts: m.parts as Prisma.InputJsonValue,
          attachments: m.attachments as Prisma.InputJsonValue,
          createdAt: m.createdAt,
          baseId: (m as any).baseId || m.id,
          previousVersionId: (m as any).previousVersionId || null,
          supersededById: (m as any).supersededById || null,
          regenerationGroupId: (m as any).regenerationGroupId || ((m as any).baseId || m.id),
          parentBaseId: (m as any).parentBaseId || null,
        })),
      });
    }

    return { newChatId };
  } catch (error) {
    if (error instanceof ChatSDKError) throw error;
    throw new ChatSDKError("bad_request:database", "Failed to fork chat");
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

// Retrieve all assistant variants (including current) for a given assistant message id.
// Uses baseId if present, otherwise falls back to the message's own id.
export async function getAssistantVariantsByMessageId({ messageId }: { messageId: string }) {
  try {
    const msg: any = await prisma.message_v2.findUnique({ where: { id: messageId } });
    if (!msg || msg.role !== "assistant") {
      return [];
    }
    const baseId = msg.baseId || msg.id;
    const variants: any[] = await prisma.message_v2.findMany({
      where: { chatId: msg.chatId, role: "assistant", OR: [{ baseId }, { id: baseId }] },
      orderBy: { createdAt: "desc" },
    });
    return variants;
  } catch (_error) {
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to get assistant variants"
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
