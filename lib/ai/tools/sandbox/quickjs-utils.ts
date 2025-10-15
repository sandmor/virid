/**
 * Utility functions and types for working with QuickJS.
 * Handles script execution, promise resolution, and error handling.
 */

import type {
  QuickJSContext,
  QuickJSHandle,
  QuickJSRuntime,
  QuickJSWASMModule,
} from 'quickjs-emscripten';
import { getQuickJS } from 'quickjs-emscripten';
import { SANDBOX_CONFIG } from './config';
import { QuickJSError, TimeoutError } from './errors';
import { logger } from './logger';

/**
 * Singleton instance for the QuickJS module
 */
let quickJSModulePromise: Promise<QuickJSWASMModule> | null = null;

/**
 * Gets or initializes the shared QuickJS module
 */
export async function getSharedQuickJS(): Promise<QuickJSWASMModule> {
  if (!quickJSModulePromise) {
    quickJSModulePromise = getQuickJS();
  }
  return quickJSModulePromise;
}

/**
 * Creates a new QuickJS runtime with configured limits
 */
export function createRuntime(
  quickjs: QuickJSWASMModule,
  deadlineMs: number
): QuickJSRuntime {
  const runtime = quickjs.newRuntime();

  runtime.setMemoryLimit?.(SANDBOX_CONFIG.MEMORY_LIMIT_BYTES);
  runtime.setMaxStackSize?.(SANDBOX_CONFIG.STACK_SIZE_BYTES);
  runtime.setInterruptHandler(() => Date.now() > deadlineMs);

  return runtime;
}

/**
 * Builds a JavaScript Error from a QuickJS error handle
 */
export function buildQuickJSError(
  context: QuickJSContext,
  handle: QuickJSHandle
): Error {
  const nameHandle = context.getProp(handle, 'name');
  const messageHandle = context.getProp(handle, 'message');

  try {
    const name = context.getString(nameHandle) || 'Error';
    const message = context.getString(messageHandle) || 'QuickJS error';
    const error = new QuickJSError(message);
    error.name = name;
    return error;
  } finally {
    nameHandle.dispose();
    messageHandle.dispose();
  }
}

/**
 * Evaluates a script and returns the result handle
 */
export function evaluateScript(
  context: QuickJSContext,
  source: string,
  filename: string
): QuickJSHandle {
  return context.unwrapResult(context.evalCode(source, filename));
}

/**
 * Drains all pending jobs from the runtime
 * @throws {QuickJSError} If a job execution fails
 */
export function drainRuntimeJobs(
  runtime: QuickJSRuntime,
  context: QuickJSContext
): void {
  for (;;) {
    const result = runtime.executePendingJobs();
    try {
      if ('error' in result && result.error) {
        throw buildQuickJSError(context, result.error);
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

/**
 * Safely drains runtime jobs, catching and logging any errors
 */
export function safeDrainRuntimeJobs(
  runtime: QuickJSRuntime,
  context: QuickJSContext
): void {
  try {
    drainRuntimeJobs(runtime, context);
  } catch (error) {
    logger.warn('Failed to execute QuickJS pending jobs', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * Wraps a promise with a timeout
 */
export function promiseWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string
): Promise<T> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return Promise.reject(new TimeoutError(timeoutMs));
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new TimeoutError(timeoutMs));
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

/**
 * Awaits a QuickJS promise, resolving it with a timeout
 */
export async function awaitQuickJSPromise(
  context: QuickJSContext,
  runtime: QuickJSRuntime,
  handle: QuickJSHandle,
  deadlineMs: number,
  timeoutMs: number
): Promise<void> {
  const state = context.getPromiseState(handle);

  if (state.type === 'pending') {
    const remaining = deadlineMs - Date.now();
    const resolution = await promiseWithTimeout(
      context.resolvePromise(handle),
      remaining,
      `Execution timed out after ${timeoutMs} ms`
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
