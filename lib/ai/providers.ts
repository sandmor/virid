import { isTestEnvironment } from "../constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { parseCompositeModelId } from "./models";
import { getProviderApiKey } from "./provider-keys";

const TTL_MS = 60_000;
let providerVersion = 0; // increments each rebuild

type ProviderClientEntry = {
  factory: (model: string) => any;
  apiKey: string | undefined;
  fetchedAt: number;
};

const providerClientCache = new Map<string, ProviderClientEntry>();

async function getProviderClient(provider: string): Promise<(model: string) => any> {
  const existing = providerClientCache.get(provider);
  const now = Date.now();
  if (existing && now - existing.fetchedAt < TTL_MS) {
    return existing.factory;
  }
  const apiKey = await getProviderApiKey(provider); // undefined -> fallback to env inside SDK
  let factory: (model: string) => any;
  switch (provider) {
    case "openrouter":
      factory = createOpenRouter({ apiKey: apiKey ?? "" });
      break;
    case "openai":
      factory = createOpenAI({ apiKey });
      break;
    case "google":
      factory = createGoogleGenerativeAI({ apiKey });
      break;
    default:
      throw new Error(`Unsupported provider '${provider}'`);
  }
  providerClientCache.set(provider, { factory, apiKey, fetchedAt: now });
  providerVersion++; // bump version whenever any provider refreshes
  return factory;
}

async function resolveLanguageModel(compositeId: string) {
  const { provider, model } = parseCompositeModelId(compositeId);
  const client = await getProviderClient(provider);
  return client(model);
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

let modelsCache: Record<string, any> | null = null;
let modelsFetchedAt = 0;
let modelsBuildPromise: Promise<Record<string, any>> | null = null;

async function buildModels(): Promise<Record<string, any>> {
  if (isTestEnvironment) {
    const { artifactModel, chatModel, reasoningModel } = require("./models.mock");
    return {
      "openai:gpt-5": chatModel,
      "google:gemini-2.5-flash-image-preview": reasoningModel,
      "google:gemini-2.5-flash": reasoningModel,
      "google:gemini-2.5-pro": reasoningModel,
      "openrouter:x-ai/grok-4": chatModel,
      "openrouter:x-ai/grok-4-fast:free": reasoningModel,
      "openrouter:moonshotai/kimi-k2:free": chatModel,
    } as Record<string, any>;
  }
  const entries = await Promise.all(
    KNOWN_MODEL_IDS.map(async (id) => [id, await resolveLanguageModel(id)] as const)
  );
  return Object.fromEntries(entries);
}

async function ensureModelsFresh(): Promise<Record<string, any>> {
  const now = Date.now();
  if (modelsCache && now - modelsFetchedAt < TTL_MS) return modelsCache;
  if (!modelsBuildPromise) {
    modelsBuildPromise = buildModels().then((m) => {
      modelsCache = m;
      modelsFetchedAt = Date.now();
      return m;
    }).finally(() => {
      modelsBuildPromise = null;
    });
  }
  return modelsBuildPromise;
}
// Async accessors.
export async function getLanguageModel(id: string) {
  const map = await ensureModelsFresh();
  const model = map[id];
  if (!model) throw new Error(`Unknown model id '${id}'`);
  return model;
}

export async function listLanguageModels() {
  const map = await ensureModelsFresh();
  return Object.keys(map);
}

export type RegisteredModelId = string;
export function getResolvedProviderModelId(appModelId: string): string | undefined {
  return appModelId;
}

export function getProviderVersion() {
  return providerVersion;
}

export async function forceRefreshProviders() {
  // Clear caches so next access rebuilds
  providerClientCache.clear();
  modelsCache = null;
  modelsFetchedAt = 0;
  providerVersion++;
}
