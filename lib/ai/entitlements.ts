import type { UserType } from "@/lib/auth/types";

type Entitlements = {
  maxMessagesPerDay: number;
  // provider/model slugs (e.g. "openai/gpt-5")
  availableChatModelIds: string[];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      "openrouter:x-ai/grok-4-fast:free",
      "openrouter:moonshotai/kimi-k2:free",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      "openai:gpt-5",
      "google:gemini-2.5-flash-image-preview",
      "google:gemini-2.5-flash",
      "google:gemini-2.5-pro",
      "openrouter:x-ai/grok-4",
      "openrouter:x-ai/grok-4-fast:free",
      "openrouter:moonshotai/kimi-k2:free",
    ],
  },

  // Additional membership tiers can be appended here (e.g., "pro" | "enterprise") without changing consumer code.
};
