export const DEFAULT_CHAT_MODEL: string = "gpt5";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "gpt5",
    name: "GPT-5",
    description: "OpenAI frontier model: superior reasoning, coding & multilingual capabilities",
  },
  {
    id: "gemini25FlashImagePreview",
    name: "Gemini 2.5 Flash Image Preview",
    description: "Fast multimodal (image + text) with lightweight preview image generation",
  },
  {
    id: "gemini25Flash",
    name: "Gemini 2.5 Flash",
    description: "Balanced speed + quality multimodal Gemini 2.5 generation",
  },
  {
    id: "gemini25Pro",
    name: "Gemini 2.5 Pro",
    description: "Higher‑capability Gemini 2.5 model optimized for complex reasoning & multimodal synthesis",
  },
  {
    id: "grok4",
    name: "Grok 4",
    description: "xAI flagship model: advanced long-context reasoning & multimodal understanding",
  },
  {
    id: "grok4FastFree",
    name: "Grok 4 Fast (Free)",
    description: "Lower-latency Grok variant optimized for rapid iterations (free tier)",
  },
  {
    id: "kimiK2Free",
    name: "Kimi K2 (Free)",
    description: "Moonshot (Kimi) K2 general model: efficient multilingual + knowledge synthesis",
  },
];
