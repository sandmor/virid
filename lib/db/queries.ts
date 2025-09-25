import "server-only";

import { prisma } from "./prisma";
import type { Prisma } from "../../generated/prisma-client";
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

// ===================== Archive (Memory) =====================
import { slugify, appendSuffix, normalizeTags } from "../archive/utils";
import { mapPrismaError } from "./prisma-error";

export async function createArchiveEntry({
  userId,
  entity,
  slug: requestedSlug,
  body = "",
  tags,
}: {
  userId: string;
  entity: string;
  slug?: string;
  body?: string;
  tags?: string[];
}) {
  try {
    const base = slugify(requestedSlug || entity);
    if (!base) {
      throw new ChatSDKError("bad_request:database", "Empty slug after normalization");
    }
    let slug = base;
    let collisions = 0;
    while (true) {
  const existing = await prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } });
      if (!existing) break;
      collisions += 1;
      if (collisions > 100) {
        throw new ChatSDKError("bad_request:database", "Too many slug collisions");
      }
      slug = appendSuffix(base, collisions);
    }
  const created = await prisma.archiveEntry.create({
      data: {
        userId,
        slug,
        entity: entity.slice(0, 512),
        body,
        tags: normalizeTags(tags),
      },
    });
    return { entry: created, adjusted: collisions > 0, base };
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveEntry", operation: "create" });
  }
}

export async function getArchiveEntryBySlug({ userId, slug }: { userId: string; slug: string; }) {
  try {
    return await prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } });
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveEntry", operation: "read" });
  }
}

export async function updateArchiveEntry({
  userId,
  slug,
  newEntity,
  addTags,
  removeTags,
  body,
  appendBody,
}: {
  userId: string;
  slug: string;
  newEntity?: string;
  addTags?: string[];
  removeTags?: string[];
  body?: string;
  appendBody?: string;
}) {
  if (body && appendBody) {
    throw new ChatSDKError("bad_request:database", "Provide body or appendBody, not both");
  }
  try {
    const current = await prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } });
    if (!current) return null;

    const noIncomingChanges =
      newEntity === undefined &&
      addTags === undefined &&
      removeTags === undefined &&
      body === undefined &&
      appendBody === undefined;
    if (noIncomingChanges) return current;

    let nextBody = current.body;
    if (body !== undefined) nextBody = body;
    else if (appendBody) nextBody = current.body + appendBody;

    let nextTags = current.tags;
    if (addTags?.length) {
      const incoming = normalizeTags(addTags);
      if (incoming.length) {
        const set = new Set(nextTags);
        for (const t of incoming) set.add(t);
        nextTags = Array.from(set);
      }
    }
    if (removeTags?.length) {
      const remove = new Set(normalizeTags(removeTags));
      if (remove.size) {
        nextTags = nextTags.filter((t: string) => !remove.has(t));
      }
    }

    const nextEntity = newEntity !== undefined ? newEntity.slice(0, 512).trim() : current.entity;
    const effectiveNoChange =
      nextEntity === current.entity &&
      nextBody === current.body &&
      JSON.stringify([...nextTags].sort()) === JSON.stringify([...current.tags].sort());
    if (effectiveNoChange) return current;

    try {
      return await prisma.archiveEntry.update({
        where: { userId_slug: { userId, slug } },
        data: { entity: nextEntity, body: nextBody, tags: nextTags },
      });
    } catch (err) {
      throw mapPrismaError(err, { model: "ArchiveEntry", operation: "update" });
    }
  } catch (outer) {
    throw mapPrismaError(outer, { model: "ArchiveEntry", operation: "update" });
  }
}

export async function deleteArchiveEntry({ userId, slug }: { userId: string; slug: string; }) {
  try {
    const existing = await prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } });
    if (!existing) return { deleted: false, removedLinks: 0 };
    const removedLinks = await prisma.archiveLink.deleteMany({ where: { OR: [{ sourceId: existing.id }, { targetId: existing.id }] } });
    await prisma.archiveEntry.delete({ where: { userId_slug: { userId, slug } } });
    return { deleted: true, removedLinks: removedLinks.count };
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveEntry", operation: "delete" });
  }
}

export async function linkArchiveEntries({
  userId,
  sourceSlug,
  targetSlug,
  type,
  bidirectional = true,
}: {
  userId: string;
  sourceSlug: string;
  targetSlug: string;
  type: string;
  bidirectional?: boolean;
}) {
  if (sourceSlug === targetSlug) {
    throw new ChatSDKError("bad_request:database", "Cannot link an entry to itself");
  }
  try {
    const [source, target] = await Promise.all([
      prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug: sourceSlug } } }),
      prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug: targetSlug } } }),
    ]);
    if (!source || !target) return { error: "One or both entries not found" } as const;
    const existing = await prisma.archiveLink.findFirst({
      where: {
        OR: [
          { sourceId: source.id, targetId: target.id, type, bidirectional },
          bidirectional ? { sourceId: target.id, targetId: source.id, type, bidirectional: true } : { id: "__skip__" },
        ],
      },
    });
    if (existing) {
      return { created: false, existing: true, bidirectional: existing.bidirectional, type: existing.type } as const;
    }
    const created = await prisma.archiveLink.create({
      data: { sourceId: source.id, targetId: target.id, type: type.slice(0, 64), bidirectional },
    });
    return { created: true, existing: false, bidirectional: created.bidirectional, type: created.type } as const;
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveLink", operation: "link" });
  }
}

export async function unlinkArchiveEntries({
  userId,
  sourceSlug,
  targetSlug,
  type,
}: {
  userId: string;
  sourceSlug: string;
  targetSlug: string;
  type: string;
}) {
  try {
    const [source, target] = await Promise.all([
      prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug: sourceSlug } } }),
      prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug: targetSlug } } }),
    ]);
    if (!source || !target) return { removed: 0 } as const;
    const removed = await prisma.archiveLink.deleteMany({
      where: {
        OR: [
          { sourceId: source.id, targetId: target.id, type },
          { sourceId: target.id, targetId: source.id, type },
        ],
      },
    });
    return { removed: removed.count } as const;
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveLink", operation: "unlink" });
  }
}

export async function getLinksForEntry({ entryId }: { entryId: string }) {
  try {
    const [outgoing, incoming] = await Promise.all([
      prisma.archiveLink.findMany({ where: { sourceId: entryId } }),
      prisma.archiveLink.findMany({ where: { targetId: entryId, bidirectional: true } }),
    ]);
    return { outgoing, incoming };
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveLink", operation: "read" });
  }
}

export async function searchArchiveEntries({
  userId,
  tags,
  matchMode = "any",
  query,
  limit = 10,
}: {
  userId: string;
  tags?: string[];
  matchMode?: "any" | "all";
  query?: string;
  limit?: number;
}) {
  try {
    const constraints: any = { userId };
    if (tags?.length) {
      const normalized = normalizeTags(tags);
      if (normalized.length) {
        constraints.tags = matchMode === "all" ? { hasEvery: normalized } : { hasSome: normalized };
      }
    }
    const where: any = { ...constraints };
    if (query) {
      where.AND = [
        {
          OR: [
            { entity: { contains: query, mode: "insensitive" } },
            { body: { contains: query, mode: "insensitive" } },
          ],
        },
      ];
    }
  const rows = await prisma.archiveEntry.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: Math.min(Math.max(limit, 1), 50),
    });
    return rows;
  } catch (e) {
    throw mapPrismaError(e, { model: "ArchiveEntry", operation: "search" });
  }
}

// Batch helper to map entry ids to slugs (for link resolution without N+1)
export async function getArchiveEntriesByIds({ ids }: { ids: string[] }) {
  if (!ids.length) return [] as any[];
  try {
    const rows = await prisma.archiveEntry.findMany({ where: { id: { in: ids } } });
    return rows;
  } catch (_) {
    throw new ChatSDKError("bad_request:database", "Failed to map archive entry ids");
  }
}

// ----- Chat pinned archive entries -----
export async function pinArchiveEntryToChat({ userId, chatId, slug }: { userId: string; chatId: string; slug: string; }) {
  try {
    const [chat, entry] = await Promise.all([
      prisma.chat.findUnique({ where: { id: chatId } }),
      prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } }),
    ]);
    if (!chat) throw new ChatSDKError("not_found:database", "Chat not found");
    if (chat.userId !== userId) throw new ChatSDKError("forbidden:database", "Chat ownership mismatch");
    if (!entry) throw new ChatSDKError("not_found:database", "Archive entry not found");
    // Idempotent create
    const existing = await prisma.chatPinnedArchiveEntry.findFirst({ where: { chatId, archiveEntryId: entry.id } });
    if (existing) return { pinned: false, already: true } as const;
    await prisma.chatPinnedArchiveEntry.create({ data: { chatId, archiveEntryId: entry.id, userId } });
    return { pinned: true, already: false } as const;
  } catch (e) {
    if (e instanceof ChatSDKError) throw e;
    throw new ChatSDKError("bad_request:database", "Failed to pin archive entry");
  }
}

export async function unpinArchiveEntryFromChat({ userId, chatId, slug }: { userId: string; chatId: string; slug: string; }) {
  try {
    const entry = await prisma.archiveEntry.findUnique({ where: { userId_slug: { userId, slug } } });
    if (!entry) return { removed: 0 } as const; // nothing to do
    const removed = await prisma.chatPinnedArchiveEntry.deleteMany({ where: { chatId, archiveEntryId: entry.id } });
    return { removed: removed.count } as const;
  } catch (e) {
    throw new ChatSDKError("bad_request:database", "Failed to unpin archive entry");
  }
}

export async function getPinnedArchiveEntriesForChat({ userId, chatId }: { userId: string; chatId: string; }) {
  try {
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) return [] as const;
    if (chat.userId !== userId) return [] as const; // do not leak
    const rows: any[] = await prisma.chatPinnedArchiveEntry.findMany({
      where: { chatId },
      include: { archiveEntry: true },
      orderBy: { pinnedAt: "asc" },
    });
    return rows.map((r: any) => ({
      slug: r.archiveEntry.slug,
      entity: r.archiveEntry.entity,
      tags: r.archiveEntry.tags,
      body: r.archiveEntry.body,
      updatedAt: r.archiveEntry.updatedAt,
      pinnedAt: r.pinnedAt,
    }));
  } catch (e) {
    throw new ChatSDKError("bad_request:database", "Failed to load pinned archive entries");
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
