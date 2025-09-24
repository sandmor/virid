import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Google provider is optional; loaded dynamically to avoid build errors if package not installed.
let googleProviderFactory: ((model: string) => any) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { google } = require("@ai-sdk/google");
  googleProviderFactory = google;
} catch {
  // Silently ignore; fallback to OpenRouter routed Gemini models.
}

/**
 * Provider registry design:
 *  - Each registry entry returns a language model factory given a model key.
 *  - We track model resolution separately (no mutation of provider objects to avoid read-only property errors).
 *  - Adding a new provider requires only appending to `providerSources` modelMap.
 */

type RegistryFactory = (model: string) => any; // AI SDK model instance

interface ProviderSource {
  name: string;
  create: RegistryFactory;
  // Map of app-level model identifiers to concrete provider model name strings.
  modelMap: Record<string, string>;
}

// ---------- Provider Implementations ----------

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY ?? "" });

// We intentionally avoid decorating or mutating model instances; some have read-only getters.
// Instead we expose resolution helpers for downstream code needing provider model IDs.

const openRouterSource: ProviderSource = {
  name: "openrouter",
  create: (model: string) => openrouter(model),
  modelMap: {
    gpt5: "openai/gpt-5",
    gemini25FlashImagePreview: "google/gemini-2.5-flash-image-preview",
    gemini25Flash: "google/gemini-2.5-flash",
    gemini25Pro: "google/gemini-2.5-pro",
    grok4: "x-ai/grok-4",
    grok4FastFree: "x-ai/grok-4-fast:free",
    kimiK2Free: "moonshotai/kimi-k2:free",
    // internal utility models
    "title-model": "x-ai/grok-4-fast:free",
    "artifact-model": "x-ai/grok-4-fast:free",
  },
};

// Google direct provider (Gemini) via @ai-sdk/google.
// We only map the two requested model IDs geminiFlash and geminiPro. (app-level ids: gemini25Flash, gemini25Pro)
const providerSources: ProviderSource[] = (() => {
  const sources: ProviderSource[] = [];
  if (googleProviderFactory) {
    sources.push({
      name: "google",
      create: (model: string) => googleProviderFactory!(model),
      modelMap: {
        gemini25Flash: "gemini-2.5-flash",
        gemini25Pro: "gemini-2.5-pro",
      },
    });
  }
  sources.push(openRouterSource);
  return sources;
})();

// Build languageModels mapping expected by customProvider from registry + app model ids.
function buildLanguageModels() {
  const models: Record<string, any> = {};
  for (const source of providerSources) {
    for (const appId of Object.keys(source.modelMap)) {
      if (models[appId]) continue; // first source wins
      const providerModelName = source.modelMap[appId];
      models[appId] = source.create(providerModelName);
    }
  }
  return models;
}

// Precompute a resolution map (first provider wins for each app model id)
const resolvedModelMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const source of providerSources) {
    for (const [appId, providerModel] of Object.entries(source.modelMap)) {
      if (!map[appId]) map[appId] = providerModel;
    }
  }
  return map;
})();

export function getResolvedProviderModelId(appModelId: string): string | undefined {
  return resolvedModelMap[appModelId];
}

export const myProvider = isTestEnvironment
  ? (() => {
      const { artifactModel, chatModel, reasoningModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          gpt5: chatModel,
          gemini25FlashImagePreview: reasoningModel,
          grok4: chatModel,
          grok4FastFree: reasoningModel,
          kimiK2Free: chatModel,
          gemini25Flash: reasoningModel,
          gemini25Pro: reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: buildLanguageModels(),
    });

export type RegisteredModelId = keyof ReturnType<typeof buildLanguageModels>;
export { resolvedModelMap };
