import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// OpenRouter official AI SDK provider.
// NOTE: expects process.env.OPENROUTER_API_KEY to be set. If it's missing we still
// construct the factory; requests will fail lazily with an auth error which upstream
// error handling already surfaces as an offline/unauthorized response.
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

function openRouterLanguageModel(model: string) {
  const m = openrouter(model) as any;
  // Augment with fields our app expects without stripping existing implementation methods.
  m.provider = m.provider ?? "openrouter";
  m.modelId = model;
  if (!("supportedUrls" in m)) m.supportedUrls = [];
  return m;
}

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          gpt5: chatModel,
          gemini25FlashImagePreview: reasoningModel,
          grok4: chatModel,
          grok4FastFree: reasoningModel,
          kimiK2Free: chatModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        gpt5: openRouterLanguageModel("openai/gpt-5"),
        gemini25FlashImagePreview: openRouterLanguageModel(
          "google/gemini-2.5-flash-image-preview"
        ),
        grok4: openRouterLanguageModel("x-ai/grok-4"),
        grok4FastFree: openRouterLanguageModel("x-ai/grok-4-fast:free"),
        kimiK2Free: openRouterLanguageModel("moonshotai/kimi-k2:free"),
        "title-model": openRouterLanguageModel("x-ai/grok-4-fast:free"),
        "artifact-model": openRouterLanguageModel("x-ai/grok-4-fast:free"),
      },
    });
