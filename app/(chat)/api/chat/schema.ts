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
  // Accept any composite provider:model id; entitlement check is enforced server-side.
  // Examples: 'openai:gpt-5', 'google:gemini-2.5-pro', 'openrouter:openai/gpt-5', 'openrouter:x-ai/grok-4-fast:free'
  selectedChatModel: z
    .string()
    .min(3)
    .max(200)
    .refine((v) => v.includes(":"), {
      message: "selectedChatModel must be a composite id of the form 'provider:model'",
    }),
  selectedVisibilityType: z.enum(["public", "private"]),
  regeneratingMessageId: z.string().uuid().optional(),
  // Optional list of archive entry slugs to pin atomically when a brand new chat is created
  // This allows the UI to stage memory pins before the first message is sent (chat row does not yet exist)
  initialPinnedSlugs: z
    .array(
      z
        .string()
        .min(1)
        .max(128)
        .regex(/^[a-zA-Z0-9._:-]+$/, { message: "Slug contains invalid characters" })
    )
    .max(12)
    .optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
