import { z } from "zod";

const textPartSchema = z.object({
  type: z.enum(["text"]),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(["file"]),
  mediaType: z.enum(["image/jpeg", "image/png"]),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(["user"]),
    parts: z.array(partSchema),
  }),
  selectedChatModel: z.enum([
  "openai:gpt-5",
    "google:gemini-2.5-flash-image-preview",
    "google:gemini-2.5-flash",
    "google:gemini-2.5-pro",
    "openrouter:x-ai/grok-4",
    "openrouter:x-ai/grok-4-fast:free",
    "openrouter:moonshotai/kimi-k2:free",
  ]),
  selectedVisibilityType: z.enum(["public", "private"]),
  regeneratingMessageId: z.string().uuid().optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
