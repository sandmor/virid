import type { InferUITool, UIMessage } from 'ai';
import { z } from 'zod';
import type { getWeather } from './ai/tools/get-weather';
import type { readArchive } from './ai/tools/readArchive';
import type { writeArchive } from './ai/tools/writeArchive';
import type { manageChatPins } from './ai/tools/manageChatPins';
import type { runCode } from './ai/tools/run-code';

import type { AppUsage } from './usage';

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
  model: z.string().optional(),
  siblingIndex: z.number(),
  siblingsCount: z.number(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;

type readArchiveTool = InferUITool<ReturnType<typeof readArchive>>;
type writeArchiveTool = InferUITool<ReturnType<typeof writeArchive>>;
type manageChatPinsTool = InferUITool<ReturnType<typeof manageChatPins>>;
type runCodeTool = InferUITool<ReturnType<typeof runCode>>;

export type ChatTools = {
  getWeather: weatherTool;

  readArchive: readArchiveTool;
  writeArchive: writeArchiveTool;
  manageChatPins: manageChatPinsTool;
  runCode: runCodeTool;
};

export type CustomUIDataTypes = {
  init: { chatId: string; createdNewChat: boolean; modelId: string };
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
