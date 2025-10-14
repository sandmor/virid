import { tool } from 'ai';
import { z } from 'zod';
import {
  getQuickJS,
  type QuickJSContext,
  type QuickJSHandle,
  type QuickJSRuntime,
  type QuickJSWASMModule,
} from 'quickjs-emscripten';
import type { RequestHints } from '@/lib/ai/prompts';

const MAX_CODE_LENGTH = 12_000;
const DEFAULT_TIMEOUT_MS = 1_500;
const MAX_TIMEOUT_MS = 5_000;
const MAX_LOG_LINES = 120;
const MAX_COLLECTION_ITEMS = 200;

let quickJSModulePromise: Promise<QuickJSWASMModule> | null = null;

async function getSharedQuickJS() {
  if (!quickJSModulePromise) {
    quickJSModulePromise = getQuickJS();
  }
  return quickJSModulePromise;
}

type LocationHints = {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  country: string | null;
};

type QuickJSExecutionSummary = {
  status: 'ok' | 'error';
  value: unknown;
  error: unknown;
  stdout: string[];
  stderr: string[];
  truncatedStdout: number;
  truncatedStderr: number;
};

type RunCodeOptions = {
  requestHints: RequestHints;
};

function coerceFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return null;
    }
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeText(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  if (value.length === 0) {
    return null;
  }
  try {
    return value.normalize('NFC');
  } catch (_) {
    return value;
  }
}

function extractLocationHints(hints: RequestHints): LocationHints | null {
  const latitude = coerceFiniteNumber(hints.latitude);
  const longitude = coerceFiniteNumber(hints.longitude);
  const city = normalizeText(hints.city);
  const country = normalizeText(hints.country);

  if (
    latitude === null &&
    longitude === null &&
    city === null &&
    country === null
  ) {
    return null;
  }

  return {
    latitude,
    longitude,
    city,
    country,
  };
}

function evaluateScript(
  context: QuickJSContext,
  source: string,
  filename: string
): QuickJSHandle {
  return context.unwrapResult(context.evalCode(source, filename));
}

function runScript(
  context: QuickJSContext,
  source: string,
  filename: string
): QuickJSHandle {
  return evaluateScript(context, source, filename);
}

function createBootstrapScript() {
  return [
    '"use strict";',
    'const __virid_stdout__ = [];',
    'const __virid_stderr__ = [];',
    'function __virid_format__(value) {',
    '  if (value === null || value === undefined) return String(value);',
    '  if (typeof value === "string") return value;',
    '  if (typeof value === "object") {',
    '    try {',
    '      return JSON.stringify(value);',
    '    } catch (_) {',
    '      return "[object]";',
    '    }',
    '  }',
    '  return String(value);',
    '}',
    'globalThis.__virid_last_result__ = { status: "ok", value: undefined };',
    'globalThis.__virid_stdout__ = __virid_stdout__;',
    'globalThis.__virid_stderr__ = __virid_stderr__;',
    'globalThis.console = Object.freeze({',
    '  log: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  info: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  warn: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  error: (...args) => __virid_stderr__.push(args.map(__virid_format__).join(" ")),',
    '});',
  ].join('\n');
}

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_REQUEST_TIMEOUT_MS = 7_500;

async function fetchWeatherText(
  latitude: number,
  longitude: number,
  timeoutMs?: number
) {
  const requestedTimeout =
    typeof timeoutMs === 'number' && Number.isFinite(timeoutMs)
      ? Math.max(timeoutMs, 0)
      : WEATHER_REQUEST_TIMEOUT_MS;
  const effectiveTimeout = Math.min(
    requestedTimeout,
    WEATHER_REQUEST_TIMEOUT_MS
  );
  if (effectiveTimeout <= 0) {
    throw new Error('Weather request timed out before it could be sent');
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), effectiveTimeout);
  try {
    const url = new URL(WEATHER_BASE_URL);
    url.searchParams.set('latitude', latitude.toString());
    url.searchParams.set('longitude', longitude.toString());
    url.searchParams.set('current', 'temperature_2m');
    url.searchParams.set('hourly', 'temperature_2m');
    url.searchParams.set('daily', 'sunrise,sunset');
    url.searchParams.set('timezone', 'auto');

    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      const snippet = body.slice(0, 200);
      throw new Error(
        snippet.length > 0
          ? `Weather provider responded with status ${response.status}: ${snippet}`
          : `Weather provider responded with status ${response.status}`
      );
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Weather request timed out after ${effectiveTimeout} ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function buildQuickJSError(context: QuickJSContext, handle: QuickJSHandle) {
  const nameHandle = context.getProp(handle, 'name');
  const messageHandle = context.getProp(handle, 'message');
  try {
    const name = context.getString(nameHandle) || 'Error';
    const message = context.getString(messageHandle) || 'QuickJS error';
    const error = new Error(message);
    error.name = name;
    return error;
  } finally {
    nameHandle.dispose();
    messageHandle.dispose();
  }
}

function drainRuntimeJobs(runtime: QuickJSRuntime, context: QuickJSContext) {
  for (;;) {
    const result = runtime.executePendingJobs();
    try {
      if ('error' in result && result.error) {
        const quickJsError = buildQuickJSError(context, result.error);
        throw quickJsError;
      }

      const count =
        'value' in result && typeof result.value === 'number'
          ? result.value
          : 0;
      if (count === 0) {
        break;
      }
    } finally {
      result.dispose();
    }
  }
}

function safeDrainRuntimeJobs(
  runtime: QuickJSRuntime,
  context: QuickJSContext
) {
  try {
    drainRuntimeJobs(runtime, context);
  } catch (error) {
    console.warn('Failed to execute QuickJS pending jobs', error);
  }
}

function promiseWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string
): Promise<T> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    const error = new Error(message);
    error.name = 'TimeoutError';
    return Promise.reject(error);
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error(message);
      error.name = 'TimeoutError';
      reject(error);
    }, timeoutMs);
  });

  return Promise.race([
    promise.finally(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }),
    timeout,
  ]);
}

async function awaitQuickJSPromise(
  context: QuickJSContext,
  runtime: QuickJSRuntime,
  handle: QuickJSHandle,
  deadlineMs: number,
  timeoutMs: number
) {
  const timeoutMessage = `Execution timed out after ${timeoutMs} ms`;
  const state = context.getPromiseState(handle);
  if (state.type === 'pending') {
    const remaining = deadlineMs - Date.now();
    const resolution = await promiseWithTimeout(
      context.resolvePromise(handle),
      remaining,
      timeoutMessage
    );
    try {
      if ('error' in resolution && resolution.error) {
        throw buildQuickJSError(context, resolution.error);
      }
    } finally {
      resolution.dispose();
    }
  } else if (state.type === 'rejected') {
    throw buildQuickJSError(context, state.error);
  }

  drainRuntimeJobs(runtime, context);
}

function installWeatherBridge(
  context: QuickJSContext,
  runtime: QuickJSRuntime,
  deadlineMs: number
) {
  const bridgeHandle = context.newFunction(
    '__virid_host_get_weather__',
    (payloadHandle?: QuickJSHandle) => {
      const deferred = context.newPromise();

      const scheduleFailure = (message: string, name = 'Error') => {
        const errorHandle = context.newError({ name, message });
        deferred.reject(errorHandle);
        errorHandle.dispose();
        safeDrainRuntimeJobs(runtime, context);
      };

      console.log('Weather bridge invoked with payload', {
        payload:
          payloadHandle && payloadHandle.alive
            ? context.getString(payloadHandle)
            : null,
      });

      try {
        const payloadJson =
          payloadHandle && payloadHandle.alive
            ? context.getString(payloadHandle)
            : '';
        const payload = payloadJson ? JSON.parse(payloadJson) : {};
        const latitude = coerceFiniteNumber(payload?.latitude);
        const longitude = coerceFiniteNumber(payload?.longitude);

        if (latitude === null || longitude === null) {
          scheduleFailure(
            'latitude and longitude must be finite numbers',
            'TypeError'
          );
          return deferred.handle;
        }

        const remaining = deadlineMs - Date.now();
        if (remaining <= 0) {
          scheduleFailure(
            `Weather request timed out before it could be sent`,
            'Error'
          );
          return deferred.handle;
        }

        void fetchWeatherText(latitude, longitude, remaining)
          .then((text) => {
            const textHandle = context.newString(text);
            deferred.resolve(textHandle);
            textHandle.dispose();
            safeDrainRuntimeJobs(runtime, context);
          })
          .catch((error) => {
            const message =
              error instanceof Error
                ? error.message
                : String(error ?? 'Unknown error');
            const name = error instanceof Error ? error.name : 'Error';
            scheduleFailure(message, name);
          });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to parse weather request payload';
        console.error('Weather bridge error', { message, error });
        scheduleFailure(message);
      }

      return deferred.handle;
    }
  );

  context.setProp(context.global, '__virid_host_get_weather__', bridgeHandle);
  bridgeHandle.dispose();
}

function createApiScript(hints: LocationHints | null) {
  const hintsLiteral = hints ? JSON.stringify(hints) : 'null';

  return [
    '(function () {',
    `  const hints = ${hintsLiteral};`,
    '  const hostGetWeather = globalThis.__virid_host_get_weather__;',
    '  const state = { location: null };',
    '  const clone = (value) => (value === null ? null : JSON.parse(JSON.stringify(value)));',
    '  function normalizeText(value) {',
    '    if (typeof value !== "string" || value.length === 0) {',
    '      return null;',
    '    }',
    '    try {',
    '      return value.normalize("NFC");',
    '    } catch (_) {',
    '      return value;',
    '    }',
    '  }',
    '  function coerceFiniteNumber(value) {',
    '    if (typeof value === "number") {',
    '      return Number.isFinite(value) ? value : null;',
    '    }',
    '    if (typeof value === "string") {',
    '      const trimmed = value.trim();',
    '      if (trimmed.length === 0) {',
    '        return null;',
    '      }',
    '      const parsed = Number.parseFloat(trimmed);',
    '      return Number.isFinite(parsed) ? parsed : null;',
    '    }',
    '    return null;',
    '  }',
    '  function resolveLocation() {',
    '    if (!hints) {',
    '      return null;',
    '    }',
    '    if (state.location !== null) {',
    '      return state.location;',
    '    }',
    '    state.location = Object.freeze({',
    '      latitude: coerceFiniteNumber(hints.latitude),',
    '      longitude: coerceFiniteNumber(hints.longitude),',
    '      city: normalizeText(hints.city),',
    '      country: normalizeText(hints.country),',
    '    });',
    '    return state.location;',
    '  }',
    '  const api = Object.freeze({',
    '    getEstimatedLocation() {',
    '      const location = resolveLocation();',
    '      if (location === null) {',
    '        throw new Error("Estimated location is unavailable for this request");',
    '      }',
    '      return clone(location);',
    '    },',
    '    async getWeather(options = {}) {',
    '      if (typeof hostGetWeather !== "function") {',
    '        throw new Error("Weather fetch is unavailable for this request");',
    '      }',
    '      const request = { latitude: null, longitude: null };',
    '      if (options && typeof options === "object") {',
    '        request.latitude = coerceFiniteNumber(options.latitude);',
    '        request.longitude = coerceFiniteNumber(options.longitude);',
    '      }',
    '      if (request.latitude === null || request.longitude === null) {',
    '        const location = resolveLocation();',
    '        if (!location || location.latitude === null || location.longitude === null) {',
    '          throw new Error("Weather coordinates are required");',
    '        }',
    '        request.latitude = location.latitude;',
    '        request.longitude = location.longitude;',
    '      }',
    '      const payload = JSON.stringify({',
    '        latitude: request.latitude,',
    '        longitude: request.longitude,',
    '      });',
    '      const responseText = await hostGetWeather(payload);',
    '      return JSON.parse(responseText);',
    '    },',
    '  });',
    '  globalThis.api = api;',
    '})();',
  ].join('\n');
}

function createExecutionScript(code: string) {
  const lines: string[] = [
    '"use strict";',
    '(async function () {',
    '  const api = globalThis.api;',
    '  try {',
    '    const result = await (async function __virid_user_entry__() {',
    code,
    '    })();',
    '    globalThis.__virid_last_result__ = { status: "ok", value: result };',
    '  } catch (error) {',
    '    globalThis.__virid_last_result__ = {',
    '      status: "error",',
    '      error: {',
    '        name: error && error.name ? String(error.name) : "Error",',
    '        message: error && error.message ? String(error.message) : String(error),',
    '        stack: error && error.stack ? String(error.stack) : null,',
    '      },',
    '    };',
    '  }',
    '})();',
  ];
  return lines.join('\n');
}

function createSummaryScript() {
  return [
    '(function () {',
    '  const seen = new WeakSet();',
    `  const limit = ${MAX_COLLECTION_ITEMS};`,
    '  function sanitize(value, depth) {',
    '    if (depth > 6) {',
    '      return "[max-depth]";',
    '    }',
    '    if (value === null || typeof value === "number" || typeof value === "string" || typeof value === "boolean") {',
    '      return value;',
    '    }',
    '    if (typeof value === "bigint") {',
    '      return Number(value);',
    '    }',
    '    if (typeof value === "undefined") {',
    '      return null;',
    '    }',
    '    if (typeof value === "function") {',
    '      return `[function ${' + "value.name || 'anonymous'" + '}]`;',
    '    }',
    '    if (value instanceof Date) {',
    '      return value.toISOString();',
    '    }',
    '    if (seen.has(value)) {',
    '      return "[circular]";',
    '    }',
    '    seen.add(value);',
    '    if (Array.isArray(value)) {',
    '      const slice = value.slice(0, limit).map((entry) => sanitize(entry, depth + 1));',
    '      if (value.length > limit) {',
    '        slice.push(`[+${' + 'value.length - limit' + '} more]`);',
    '      }',
    '      seen.delete(value);',
    '      return slice;',
    '    }',
    '    const entries = Object.entries(value);',
    '    const result = {};',
    '    for (let index = 0; index < entries.length && index < limit; index += 1) {',
    '      const [key, entryValue] = entries[index];',
    '      result[key] = sanitize(entryValue, depth + 1);',
    '    }',
    '    if (entries.length > limit) {',
    '      result.__truncated__ = entries.length - limit;',
    '    }',
    '    seen.delete(value);',
    '    return result;',
    '  }',
    '  const base = globalThis.__virid_last_result__ || { status: "ok", value: undefined };',
    '  const stdout = Array.isArray(globalThis.__virid_stdout__) ? globalThis.__virid_stdout__ : [];',
    '  const stderr = Array.isArray(globalThis.__virid_stderr__) ? globalThis.__virid_stderr__ : [];',
    `  const stdoutSlice = stdout.slice(0, ${MAX_LOG_LINES});`,
    `  const stderrSlice = stderr.slice(0, ${MAX_LOG_LINES});`,
    '  const payload = {',
    '    status: base.status === "error" ? "error" : "ok",',
    '    value: base.status === "error" ? null : sanitize(base.value, 0),',
    '    error: base.status === "error" ? sanitize(base.error || { message: "Unknown error" }, 0) : null,',
    '    stdout: stdoutSlice,',
    '    stderr: stderrSlice,',
    '    truncatedStdout: Math.max(stdout.length - stdoutSlice.length, 0),',
    '    truncatedStderr: Math.max(stderr.length - stderrSlice.length, 0),',
    '  };',
    '  return JSON.stringify(payload);',
    '})()',
  ].join('\n');
}

function ensureLanguage(language: string) {
  if (language !== 'javascript') {
    throw new Error('Only the "javascript" language is supported');
  }
}

function clampTimeout(timeoutMs?: number) {
  if (typeof timeoutMs !== 'number' || Number.isNaN(timeoutMs)) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.min(Math.max(Math.floor(timeoutMs), 250), MAX_TIMEOUT_MS);
}

function describeEnvironment(
  timeoutMs: number,
  locationHints: LocationHints | null,
  warnings: string[]
) {
  return {
    language: 'javascript',
    runtime: 'quickjs-emscripten',
    timeoutMs,
    limits: {
      maxCodeLength: MAX_CODE_LENGTH,
      maxLogLines: MAX_LOG_LINES,
      maxCollectionItems: MAX_COLLECTION_ITEMS,
    },
    locationHints,
    warnings,
  } as const;
}

export function runCode({ requestHints }: RunCodeOptions) {
  return tool({
    description:
      'Execute sandboxed JavaScript using QuickJS (Promises supported). Use the global `api` helpers (`getEstimatedLocation()`, `getWeather()`) to reach outside data. Console output is captured and returned.',
    inputSchema: z.object({
      language: z.literal('javascript').optional().default('javascript'),
      code: z.string().min(1).max(MAX_CODE_LENGTH),
      timeoutMs: z.number().int().min(250).max(MAX_TIMEOUT_MS).optional(),
    }),
    execute: async ({ language = 'javascript', code, timeoutMs }) => {
      ensureLanguage(language);
      const effectiveTimeout = clampTimeout(timeoutMs);
      const quickjs = await getSharedQuickJS();
      const runtime = quickjs.newRuntime();
      runtime.setMemoryLimit?.(16 * 1024 * 1024);
      runtime.setMaxStackSize?.(512 * 1024);

      const start = Date.now();
      const deadline = start + effectiveTimeout;
      runtime.setInterruptHandler(() => Date.now() > deadline);

      const locationHints = extractLocationHints(requestHints);
      const warnings: string[] = [];
      if (!locationHints) {
        warnings.push(
          'Location hints are unavailable; provide explicit coordinates to api.getWeather().'
        );
      } else if (
        locationHints.latitude === null ||
        locationHints.longitude === null
      ) {
        warnings.push(
          'Estimated coordinates are incomplete; provide latitude and longitude to api.getWeather().'
        );
      }

      console.log('Sandbox run start', { codeSize: code.length, warnings });
      console.log('Code:', code);

      const context = runtime.newContext();

      installWeatherBridge(context, runtime, deadline);

      try {
        runScript(context, createBootstrapScript(), 'bootstrap.js').dispose();
        runScript(context, createApiScript(locationHints), 'api.js').dispose();
        const executionHandle = runScript(
          context,
          createExecutionScript(code),
          'execute.js'
        );
        try {
          await awaitQuickJSPromise(
            context,
            runtime,
            executionHandle,
            deadline,
            effectiveTimeout
          );
        } finally {
          executionHandle.dispose();
        }
        const summaryHandle = evaluateScript(
          context,
          createSummaryScript(),
          'summary.js'
        );
        const summaryJson = context.getString(summaryHandle);
        summaryHandle.dispose();

        const summary = JSON.parse(summaryJson) as QuickJSExecutionSummary;
        const runtimeMs = Date.now() - start;

        console.log('Execution summary:', { ...summary, runtimeMs });

        const environment = describeEnvironment(
          effectiveTimeout,
          locationHints,
          warnings
        );

        console.log('Sandbox run complete', {
          status: summary.status,
          runtimeMs,
          stdout: summary.stdout.length,
          stderr: summary.stderr.length,
        });

        return {
          status: summary.status,
          result: summary.status === 'ok' ? summary.value : null,
          error: summary.status === 'error' ? summary.error : null,
          stdout: summary.stdout,
          stderr: summary.stderr,
          truncatedStdout: summary.truncatedStdout,
          truncatedStderr: summary.truncatedStderr,
          runtimeMs,
          codeSize: code.length,
          environment,
        };
      } catch (error) {
        const runtimeMs = Date.now() - start;
        const message =
          error instanceof Error
            ? error.message || 'Execution failed'
            : 'Execution failed';
        const name = error instanceof Error ? error.name : 'Error';
        const normalized = message.toLowerCase();
        const isTimeoutError =
          (error instanceof Error && error.name === 'TimeoutError') ||
          normalized.includes('interrupted') ||
          normalized.includes('execution timed out');
        const friendlyMessage = isTimeoutError
          ? `Execution timed out after ${effectiveTimeout} ms`
          : message;

        console.log('Sandbox run error', { name, message, runtimeMs });
        return {
          status: 'error' as const,
          result: null,
          error: {
            name,
            message: friendlyMessage,
          },
          stdout: [],
          stderr: [],
          truncatedStdout: 0,
          truncatedStderr: 0,
          runtimeMs,
          codeSize: code.length,
          environment: describeEnvironment(
            effectiveTimeout,
            locationHints,
            warnings
          ),
        };
      } finally {
        context.dispose();
        runtime.dispose();
      }
    },
  });
}
