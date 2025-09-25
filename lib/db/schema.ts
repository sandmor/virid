import type { Prisma } from "../../generated/prisma-client";
import type { AppUsage } from "../usage";
import type { VisibilityType } from "@/components/visibility-selector";
import type { ArtifactKind } from "@/components/artifact";

// Re-export Prisma model types with the same names previously used across the app
export type User = Prisma.UserGetPayload<{}>;
// Override Chat type to narrow JSON lastContext to our runtime shape
export type Chat = Omit<Prisma.ChatGetPayload<{}>, "lastContext" | "visibility"> & {
	lastContext: AppUsage | null;
	visibility: VisibilityType;
};
export type Document = Omit<Prisma.DocumentGetPayload<{}>, "kind"> & {
	kind: ArtifactKind;
};
export type Suggestion = Prisma.SuggestionGetPayload<{}>;
export type Stream = Prisma.StreamGetPayload<{}>;
export type ArchiveEntry = Prisma.ArchiveEntryGetPayload<{}>;
export type ArchiveLink = Prisma.ArchiveLinkGetPayload<{}>;

// Message_v2 is the current message table used by the app
export type DBMessage = Prisma.Message_v2GetPayload<{}>;

// Current vote type used by UI components
export type Vote = Prisma.Vote_v2GetPayload<{}>;
