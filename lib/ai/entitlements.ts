import type { UserType } from "@/lib/auth/types";
import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      "grok4FastFree",
      "kimiK2Free",
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      "gpt5",
      "gemini25FlashImagePreview",
      "gemini25Flash",
      "gemini25Pro",
      "grok4",
      "grok4FastFree",
      "kimiK2Free",
    ],
  },

  // Additional membership tiers can be appended here (e.g., "pro" | "enterprise") without changing consumer code.
};
