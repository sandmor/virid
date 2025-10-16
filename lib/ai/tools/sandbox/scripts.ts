/**
 * Generates JavaScript code that will be executed inside the sandbox.
 * These scripts set up the sandbox environment, API bridges, and user code execution.
 */

import { SANDBOX_CONFIG } from './config';
import type { LocationHints } from './api-bridge';

/**
 * Creates the bootstrap script that sets up the sandbox environment.
 * Initializes console capture and result container.
 */
export function createBootstrapScript(): string {
  return [
    '"use strict";',
    '',
    '// Format helper for console output',
    'function __virid_format__(value) {',
    '  if (value === null || value === undefined) return String(value);',
    '  if (typeof value === "string") return value;',
    '  if (typeof value === "object") {',
    '    try { return JSON.stringify(value); }',
    '    catch { return "[object]"; }',
    '  }',
    '  return String(value);',
    '}',
    '',
    '// Initialize capture arrays',
    'const __virid_stdout__ = [];',
    'const __virid_stderr__ = [];',
    '',
    '// Set up global state',
    'globalThis.__virid_last_result__ = { status: "ok", value: undefined };',
    'globalThis.__virid_stdout__ = __virid_stdout__;',
    'globalThis.__virid_stderr__ = __virid_stderr__;',
    '',
    '// Override console for output capture',
    'globalThis.console = Object.freeze({',
    '  log: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  info: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  warn: (...args) => __virid_stdout__.push(args.map(__virid_format__).join(" ")),',
    '  error: (...args) => __virid_stderr__.push(args.map(__virid_format__).join(" ")),',
    '});',
  ].join('\n');
}

/**
 * Creates the API script that exposes external services to the sandbox.
 * Provides `api.getWeather()` and validates coordinates.
 */
export function createApiScript(locationHints: LocationHints | null): string {
  const hintsLiteral = locationHints ? JSON.stringify(locationHints) : 'null';

  return [
    '(function () {',
    '  "use strict";',
    '',
    `  const hints = ${hintsLiteral};`,
    '  const hostGetWeather = globalThis.__virid_host_get_weather__;',
    '',
    '  // Coordinate validation utilities',
    '  function coerceFiniteNumber(value) {',
    '    if (typeof value === "number") return Number.isFinite(value) ? value : null;',
    '    if (typeof value === "string") {',
    '      const trimmed = value.trim();',
    '      if (!trimmed) return null;',
    '      const parsed = Number.parseFloat(trimmed);',
    '      return Number.isFinite(parsed) ? parsed : null;',
    '    }',
    '    return null;',
    '  }',
    '',
    '  function validateCoordinates(coords) {',
    '    if (!coords || typeof coords !== "object") return null;',
    '    const latitude = coerceFiniteNumber(coords.latitude);',
    '    const longitude = coerceFiniteNumber(coords.longitude);',
    '    if (latitude === null || longitude === null) return null;',
    '    if (latitude < -90 || latitude > 90) return null;',
    '    if (longitude < -180 || longitude > 180) return null;',
    '    return { latitude, longitude };',
    '  }',
    '',
    '  // Expose API to user code',
    '  globalThis.api = Object.freeze({',
    '    /**',
    '     * Fetch data from external URLs (not yet implemented)',
    '     */',
    '    async fetch(url, options = {}) {',
    '      if (typeof url !== "string" || !url) {',
    '        throw new TypeError("URL must be a non-empty string");',
    '      }',
    '      throw new Error("fetch is not yet available in this sandbox");',
    '    },',
    '',
    '    /**',
    '     * Get weather data for specific coordinates',
    '     * @param {Object} coordinates - { latitude: number, longitude: number }',
    '     * @returns {Promise<Object>} Weather data from Open-Meteo',
    '     */',
    '    async getWeather(coordinates) {',
    '      if (typeof hostGetWeather !== "function") {',
    '        throw new Error("Weather API is unavailable in this context");',
    '      }',
    '      const validated = validateCoordinates(coordinates);',
    '      if (!validated) {',
    '        throw new TypeError(',
    '          "Invalid coordinates: latitude must be -90 to 90, longitude must be -180 to 180"',
    '        );',
    '      }',
    '      const payload = JSON.stringify(validated);',
    '      const responseText = await hostGetWeather(payload);',
    '      return JSON.parse(responseText);',
    '    },',
    '  });',
    '})();',
  ].join('\n');
}

/**
 * Creates the execution wrapper script for user code.
 * Attempts to evaluate as an expression first (to capture return values),
 * falling back to statement execution if a SyntaxError occurs.
 */
export function createExecutionScript(code: string): string {
  return [
    '"use strict";',
    '',
    '(async function () {',
    '  try {',
    '    let result;',
    '    // Try evaluating as expression first (captures return values)',
    '    try {',
    '      result = await (async () => (',
    code,
    '      ))();',
    '    } catch (expressionError) {',
    '      // Fall back to statement execution if syntax error',
    '      if (!(expressionError instanceof SyntaxError)) throw expressionError;',
    '      result = await (async () => {',
    code,
    '      })();',
    '    }',
    '    globalThis.__virid_last_result__ = { status: "ok", value: result };',
    '  } catch (error) {',
    '    globalThis.__virid_last_result__ = {',
    '      status: "error",',
    '      error: {',
    '        name: error?.name ? String(error.name) : "Error",',
    '        message: error?.message ? String(error.message) : String(error),',
    '        stack: error?.stack ? String(error.stack) : null,',
    '      },',
    '    };',
    '  }',
    '})();',
  ].join('\n');
}

/**
 * Creates the summary script that collects execution results.
 * Sanitizes output values and handles circular references.
 */
export function createSummaryScript(): string {
  return [
    '(function () {',
    '  "use strict";',
    '',
    '  const seen = new WeakSet();',
    `  const limit = ${SANDBOX_CONFIG.MAX_COLLECTION_ITEMS};`,
    `  const maxDepth = ${SANDBOX_CONFIG.MAX_SERIALIZATION_DEPTH};`,
    '',
    '  function sanitize(value, depth) {',
    '    if (depth > maxDepth) return "[max-depth]";',
    '',
    '    // Primitives',
    '    if (value === null || value === undefined) return null;',
    '    if (typeof value === "string") return value;',
    '    if (typeof value === "number") return value;',
    '    if (typeof value === "boolean") return value;',
    '    if (typeof value === "bigint") return Number(value);',
    '    if (typeof value === "function") return `[function ${value.name || "anonymous"}]`;',
    '    if (value instanceof Date) return value.toISOString();',
    '',
    '    // Circular references',
    '    if (seen.has(value)) return "[circular]";',
    '    seen.add(value);',
    '',
    '    // Arrays',
    '    if (Array.isArray(value)) {',
    '      const slice = value.slice(0, limit).map((item) => sanitize(item, depth + 1));',
    '      if (value.length > limit) slice.push(`[+${value.length - limit} more]`);',
    '      seen.delete(value);',
    '      return slice;',
    '    }',
    '',
    '    // Objects',
    '    const entries = Object.entries(value);',
    '    const result = {};',
    '    for (let i = 0; i < entries.length && i < limit; i++) {',
    '      const [key, val] = entries[i];',
    '      result[key] = sanitize(val, depth + 1);',
    '    }',
    '    if (entries.length > limit) result.__truncated__ = entries.length - limit;',
    '    seen.delete(value);',
    '    return result;',
    '  }',
    '',
    '  const base = globalThis.__virid_last_result__ || { status: "ok", value: undefined };',
    '  const stdout = Array.isArray(globalThis.__virid_stdout__) ? globalThis.__virid_stdout__ : [];',
    '  const stderr = Array.isArray(globalThis.__virid_stderr__) ? globalThis.__virid_stderr__ : [];',
    '',
    `  const stdoutSlice = stdout.slice(0, ${SANDBOX_CONFIG.MAX_LOG_LINES});`,
    `  const stderrSlice = stderr.slice(0, ${SANDBOX_CONFIG.MAX_LOG_LINES});`,
    '',
    '  return JSON.stringify({',
    '    status: base.status === "error" ? "error" : "ok",',
    '    value: base.status === "error" ? null : sanitize(base.value, 0),',
    '    error: base.status === "error" ? sanitize(base.error || { message: "Unknown error" }, 0) : null,',
    '    stdout: stdoutSlice,',
    '    stderr: stderrSlice,',
    '    truncatedStdout: Math.max(stdout.length - stdoutSlice.length, 0),',
    '    truncatedStderr: Math.max(stderr.length - stderrSlice.length, 0),',
    '  });',
    '})()',
  ].join('\n');
}
