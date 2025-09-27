import type { InferUITool, UIMessage } from 'ai';
import { z } from 'zod';
import type { ArtifactKind } from '@/components/artifact';
import type { createDocument } from './ai/tools/create-document';
import type { getWeather } from './ai/tools/get-weather';
import type { requestSuggestions } from './ai/tools/request-suggestions';
import type { updateDocument } from './ai/tools/update-document';
import type { archiveCreateEntry } from './ai/tools/archive-create-entry';
import type { archiveReadEntry } from './ai/tools/archive-read-entry';
import type { archiveUpdateEntry } from './ai/tools/archive-update-entry';
import type { archiveDeleteEntry } from './ai/tools/archive-delete-entry';
import type { archiveLinkEntries } from './ai/tools/archive-link-entries';
import type { archiveSearchEntries } from './ai/tools/archive-search-entries';
import type { archiveApplyEdits } from './ai/tools/archive-apply-edits';
import type { archivePinEntry } from './ai/tools/archive-pin-entry';
import type { archiveUnpinEntry } from './ai/tools/archive-unpin-entry';
import type { Suggestion } from './db/schema';
import type { AppUsage } from './usage';

export type DataPart = { type: 'append-message'; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;
type createDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
type updateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
type requestSuggestionsTool = InferUITool<
  ReturnType<typeof requestSuggestions>
>;
type archiveCreateEntryTool = InferUITool<
  ReturnType<typeof archiveCreateEntry>
>;
type archiveReadEntryTool = InferUITool<ReturnType<typeof archiveReadEntry>>;
type archiveUpdateEntryTool = InferUITool<
  ReturnType<typeof archiveUpdateEntry>
>;
type archiveDeleteEntryTool = InferUITool<
  ReturnType<typeof archiveDeleteEntry>
>;
type archiveLinkEntriesTool = InferUITool<
  ReturnType<typeof archiveLinkEntries>
>;
type archiveSearchEntriesTool = InferUITool<
  ReturnType<typeof archiveSearchEntries>
>;
type archiveApplyEditsTool = InferUITool<ReturnType<typeof archiveApplyEdits>>;
type archivePinEntryTool = InferUITool<ReturnType<typeof archivePinEntry>>;
type archiveUnpinEntryTool = InferUITool<ReturnType<typeof archiveUnpinEntry>>;

export type ChatTools = {
  getWeather: weatherTool;
  createDocument: createDocumentTool;
  updateDocument: updateDocumentTool;
  requestSuggestions: requestSuggestionsTool;
  archiveCreateEntry: archiveCreateEntryTool;
  archiveReadEntry: archiveReadEntryTool;
  archiveUpdateEntry: archiveUpdateEntryTool;
  archiveDeleteEntry: archiveDeleteEntryTool;
  archiveLinkEntries: archiveLinkEntriesTool;
  archiveSearchEntries: archiveSearchEntriesTool;
  archiveApplyEdits: archiveApplyEditsTool;
  archivePinEntry: archivePinEntryTool;
  archiveUnpinEntry: archiveUnpinEntryTool;
};

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  usage: AppUsage;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export type Attachment = {
  name: string;
  url: string;
  contentType: string;
};
