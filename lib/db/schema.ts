import type { Prisma } from '../../generated/prisma-client';
import type { AppUsage } from '../usage';
import type { VisibilityType } from '@/components/visibility-selector';
import type { ArtifactKind } from '@/components/artifact';

// Re-export Prisma model types with the same names previously used across the app
export type User = Prisma.UserGetPayload<{}>;
// Override Chat type to narrow JSON lastContext to our runtime shape
// ChatSettings: forward-compatible container for per-chat configuration.
// pinnedEntries: cached list of currently pinned archive entry slugs (authoritative source remains junction table)
// tools.allow: optional allow-list of tool identifiers; if absent => all tools enabled.
// modelId: persistent chat-level model preference (provider:model slug)
// reasoningEffort: controls how much computational effort the model uses for reasoning (low, medium, high)
export interface ChatSettings {
  pinnedEntries?: string[]; // denormalized convenience cache
  tools?: {
    allow?: string[]; // tool ids
  };
  modelId?: string; // composite provider:model id
  reasoningEffort?: 'low' | 'medium' | 'high'; // reasoning effort level
}

export type Chat = Omit<
  Prisma.ChatGetPayload<{ include: { agent: true } }>,
  'lastContext' | 'visibility' | 'settings'
> & {
  lastContext: AppUsage | null;
  visibility: VisibilityType;
  settings: ChatSettings | null;
};
export type Agent = Prisma.AgentGetPayload<{}>;
export type Document = Omit<Prisma.DocumentGetPayload<{}>, 'kind'> & {
  kind: ArtifactKind;
};
export type Suggestion = Prisma.SuggestionGetPayload<{}>;
export type Stream = Prisma.StreamGetPayload<{}>;
export type ArchiveEntry = Prisma.ArchiveEntryGetPayload<{}>;
export type ArchiveLink = Prisma.ArchiveLinkGetPayload<{}>;

// Message is the current message table used by the app
export type DBMessage = Prisma.MessageGetPayload<{}>;

// Current vote type used by UI components
export type Vote = Prisma.VoteGetPayload<{}>;
