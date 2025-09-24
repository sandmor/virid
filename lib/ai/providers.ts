import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { parseCompositeModelId } from "./models";

const openRouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY ?? "" });

// Supported first-class provider keys -> factory that returns a model given its provider-local slug
// For openrouter we pass through composite slug portion after provider (e.g. x-ai/grok-4)
const providerFactories: Record<string, (model: string) => any> = {
  google: (model) => google(model),
  openai: (model) => openai(model),
  openrouter: (model) => openRouter(model),
};

function resolveLanguageModel(compositeId: string) {
  const { provider, model } = parseCompositeModelId(compositeId);
  const factory = providerFactories[provider];
  if (!factory) {
    throw new Error(`Unsupported provider '${provider}' for model '${compositeId}'`);
  }
  return factory(model);
}

// Seven curated model IDs surfaced in UI / entitlements.
const KNOWN_MODEL_IDS = [
  "openai:gpt-5",
  "google:gemini-2.5-flash-image-preview",
  "google:gemini-2.5-flash",
  "google:gemini-2.5-pro",
  "openrouter:x-ai/grok-4",
  "openrouter:x-ai/grok-4-fast:free",
  "openrouter:moonshotai/kimi-k2:free",
];

function buildLanguageModels(ids: string[]): Record<string, any> {
  return ids.reduce<Record<string, any>>((acc, id) => {
    acc[id] = resolveLanguageModel(id);
    return acc;
  }, {});
}

export const myProvider = isTestEnvironment
  ? (() => {
      const { artifactModel, chatModel, reasoningModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "openai:gpt-5": chatModel,
          "google:gemini-2.5-flash-image-preview": reasoningModel,
          "google:gemini-2.5-flash": reasoningModel,
          "google:gemini-2.5-pro": reasoningModel,
          "openrouter:x-ai/grok-4": chatModel,
          "openrouter:x-ai/grok-4-fast:free": reasoningModel,
          "openrouter:moonshotai/kimi-k2:free": chatModel,
        },
      });
    })()
  : customProvider({ languageModels: buildLanguageModels(KNOWN_MODEL_IDS) });

export type RegisteredModelId = string;

export function getResolvedProviderModelId(appModelId: string): string | undefined {
  return appModelId;
}
