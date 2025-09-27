// Canonical list of chat tool identifiers (must match server registrations in /api/chat route)
export const CHAT_TOOL_IDS = [
  'getWeather',
  'createDocument',
  'updateDocument',
  'requestSuggestions',
  'archiveCreateEntry',
  'archiveReadEntry',
  'archiveUpdateEntry',
  'archiveDeleteEntry',
  'archiveLinkEntries',
  'archiveSearchEntries',
  'archiveApplyEdits',
  'archivePinEntry',
  'archiveUnpinEntry',
] as const;
export type ChatToolId = (typeof CHAT_TOOL_IDS)[number];
