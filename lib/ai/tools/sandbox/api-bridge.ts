/**
 * Extensible API bridge system for exposing external services to the sandbox.
 * Provides a clean abstraction for adding new APIs without modifying core code.
 */

import type { VMContext } from './vm-utils';
import { setContextValue, getContextValue } from './vm-utils';
import { fetchWeather, type WeatherCoordinates } from './external-apis';
import {
  coerceFiniteNumber,
  normalizeText,
  validateCoordinates,
} from './type-utils';
import { logger } from './logger';
import { ValidationError } from './errors';

/**
 * Location hints that may be available from the request context
 */
export interface LocationHints {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  country: string | null;
}

/**
 * Extract location hints from request data
 */
export function extractLocationHints(hints: {
  latitude?: unknown;
  longitude?: unknown;
  city?: unknown;
  country?: unknown;
}): LocationHints | null {
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

  return { latitude, longitude, city, country };
}

/**
 * Bridge handler function type for VM context
 */
type BridgeHandler = (
  vmContext: VMContext,
  payload?: unknown
) => Promise<unknown>;

/**
 * API bridge configuration
 */
export interface ApiBridgeConfig {
  /** Name of the function exposed to the sandbox */
  functionName: string;
  /** Handler implementation */
  handler: BridgeHandler;
}

/**
 * Creates a weather API bridge handler
 */
export function createWeatherBridge(deadlineMs: number): ApiBridgeConfig {
  const handler: BridgeHandler = async (vmContext, payload) => {
    try {
      const coordinates = validateCoordinates(payload);
      if (!coordinates) {
        throw new ValidationError(
          'latitude and longitude must be finite numbers within valid ranges'
        );
      }

      const remaining = deadlineMs - Date.now();
      if (remaining <= 0) {
        throw new Error('Weather request timed out before it could be sent');
      }

      const text = await fetchWeather(coordinates, remaining);
      return text;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to process weather request';
      logger.error('Weather bridge error', {
        message,
        error: error instanceof Error ? error.stack : String(error),
      });
      throw error;
    }
  };

  return {
    functionName: '__virid_host_get_weather__',
    handler,
  };
}

/**
 * Installs API bridges into the VM context
 * Creates async bridge functions that can be called from within the sandbox
 */
export function installApiBridges(
  vmContext: VMContext,
  bridges: ApiBridgeConfig[]
): void {
  // Store bridge handlers in a map accessible from the VM
  const bridgeMap = new Map<string, BridgeHandler>();

  for (const bridge of bridges) {
    bridgeMap.set(bridge.functionName, bridge.handler);

    // Create a wrapper function in the VM context that returns a promise
    // The actual handler runs in the host environment with full access
    const wrapperFn = async (payloadJson: string) => {
      const handler = bridgeMap.get(bridge.functionName);
      if (!handler) {
        throw new Error(`Bridge function ${bridge.functionName} not found`);
      }

      let payload: unknown;
      try {
        payload = payloadJson ? JSON.parse(payloadJson) : {};
      } catch {
        throw new SyntaxError('Invalid JSON payload');
      }

      return await handler(vmContext, payload);
    };

    // Set the wrapper function in the VM context
    setContextValue(vmContext, bridge.functionName, wrapperFn);
  }
}

/**
 * API metadata for documentation generation
 */
export interface ApiMethodMetadata {
  name: string;
  signature: string;
  description: string;
  returnType: string;
}

/**
 * Returns metadata about available sandbox APIs
 */
export function getApiMetadata(): ApiMethodMetadata[] {
  return [
    {
      name: 'fetch',
      signature: '(url: string, options?: RequestInit): Promise<Response>',
      description: 'Fetch data from external URLs using the standard Fetch API',
      returnType: 'Promise<Response>',
    },
    {
      name: 'getWeather',
      signature:
        '(coordinates: { latitude: number; longitude: number }): Promise<WeatherData>',
      description:
        'Fetch weather data from Open-Meteo API for the specified coordinates',
      returnType: 'Promise<WeatherData>',
    },
  ];
}
