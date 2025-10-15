/**
 * Extensible API bridge system for exposing external services to the sandbox.
 * Provides a clean abstraction for adding new APIs without modifying core code.
 */

import type {
  QuickJSContext,
  QuickJSHandle,
  QuickJSRuntime,
} from 'quickjs-emscripten';
import { fetchWeather, type WeatherCoordinates } from './external-apis';
import { safeDrainRuntimeJobs } from './quickjs-utils';
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
 * Bridge handler function type
 */
type BridgeHandler = (
  context: QuickJSContext,
  runtime: QuickJSRuntime,
  payloadHandle?: QuickJSHandle
) => QuickJSHandle;

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
  const handler: BridgeHandler = (context, runtime, payloadHandle) => {
    const deferred = context.newPromise();

    const scheduleFailure = (message: string, name = 'Error') => {
      const errorHandle = context.newError({ name, message });
      deferred.reject(errorHandle);
      errorHandle.dispose();
      safeDrainRuntimeJobs(runtime, context);
    };

    try {
      const payloadJson =
        payloadHandle && payloadHandle.alive
          ? context.getString(payloadHandle)
          : '';

      let payload: unknown;
      try {
        payload = payloadJson ? JSON.parse(payloadJson) : {};
      } catch {
        scheduleFailure('Invalid JSON payload', 'SyntaxError');
        return deferred.handle;
      }

      const coordinates = validateCoordinates(payload);
      if (!coordinates) {
        scheduleFailure(
          'latitude and longitude must be finite numbers within valid ranges',
          'ValidationError'
        );
        return deferred.handle;
      }

      const remaining = deadlineMs - Date.now();
      if (remaining <= 0) {
        scheduleFailure(
          'Weather request timed out before it could be sent',
          'TimeoutError'
        );
        return deferred.handle;
      }

      void fetchWeather(coordinates, remaining)
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
          : 'Failed to process weather request';
      logger.error('Weather bridge error', {
        message,
        error: error instanceof Error ? error.stack : String(error),
      });
      scheduleFailure(message);
    }

    return deferred.handle;
  };

  return {
    functionName: '__virid_host_get_weather__',
    handler,
  };
}

/**
 * Installs API bridges into the QuickJS context
 */
export function installApiBridges(
  context: QuickJSContext,
  runtime: QuickJSRuntime,
  bridges: ApiBridgeConfig[]
): void {
  for (const bridge of bridges) {
    const bridgeHandle = context.newFunction(
      bridge.functionName,
      (payloadHandle) => bridge.handler(context, runtime, payloadHandle)
    );

    context.setProp(context.global, bridge.functionName, bridgeHandle);
    bridgeHandle.dispose();
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
