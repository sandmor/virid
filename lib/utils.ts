import type {
  CoreAssistantMessage,
  CoreToolMessage,
  UIMessage,
  UIMessagePart,
} from 'ai';
import { type ClassValue, clsx } from 'clsx';
import { formatISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import type { DBMessage, Document } from '@/lib/db/schema';
import { ChatSDKError, type ErrorCode } from './errors';
import type { ChatMessage, ChatTools, CustomUIDataTypes } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const { code, cause } = await response.json();
    throw new ChatSDKError(code as ErrorCode, cause);
  }

  return response.json();
};

export async function fetchWithErrorHandlers(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const { code, cause } = await response.json();
      throw new ChatSDKError(code as ErrorCode, cause);
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new ChatSDKError('offline:chat');
    }

    throw error;
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  return [];
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export function getMostRecentUserMessage(messages: UIMessage[]) {
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
}

export function getDocumentTimestampByIndex(
  documents: Document[],
  index: number,
) {
  if (!documents) { return new Date(); }
  if (index > documents.length) { return new Date(); }

  return documents[index].createdAt;
}

export function getTrailingMessageId({
  messages,
}: {
  messages: ResponseMessage[];
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) { return null; }

  return trailingMessage.id;
}

export function sanitizeText(text: string) {
  return text.replace('<has_function_call>', '');
}

/**
 * Convert common LaTeX math delimiters to the forms understood by remark-math.
 * remark-math (as configured in streamdown) supports `$...$` (inline) and `$$...$$` (block) by default.
 * Users (and many models) frequently emit `\( ... \)` and `\[ ... \]` delimiters; we normalize those here.
 *
 * We avoid transforming code blocks / inline code segments. The strategy:
 *  - Split the markdown on code spans & fenced code blocks using a regex capturing group
 *  - Only transform segments that are plain text (i.e., not starting with backticks)
 *  - Inside those segments, replace balanced `\[ ... \]` first (block math) then `\( ... \)` (inline math)
 *
 * Block math is wrapped with blank lines to ensure it renders as display math even if user omitted spacing.
 * We purposefully do not touch existing `$` or `$$` math to avoid double‑converting.
 */
export function normalizeLatexMathDelimiters(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') return markdown;

  const codeLikePattern = /(```[\s\S]*?```|`[^`]*`)/g; // fenced or inline code
  const parts = markdown.split(codeLikePattern);

  for (let i = 0; i < parts.length; i++) {
    const segment = parts[i];
    if (segment.match(codeLikePattern)) continue; // skip code spans / blocks

    // If the segment already contains an inline math dollar pattern, we will not convert \( ... \)
    // to avoid situations where a model mixes notations and we interfere with already-correct parsing.
    const hasInlineDollar = /(^|[^$])\$[^$]+\$/m.test(segment);

    let transformed = segment;

    // Display blocks: \[ ... \] => $$...$$ (with enforced blank lines for remark-math)
    transformed = transformed.replace(/(^|\s)\\\[((?:[^\\]|\\.)*?)\\\]/g, (_m, prefix, inner) => {
      const content = inner.trim();
      if (!content) return prefix; // retain the leading space/newline if empty
      return `${prefix}\n\n$$${content}$$\n\n`;
    });

    if (!hasInlineDollar) {
      // Inline: \( ... \) => $...$
      transformed = transformed.replace(/\\\(((?:[^\\]|\\.)*?)\\\)/g, (_m, inner) => {
        const content = inner.trim();
        if (!content) return '';
        return `$${content}$`;
      });
    }

    parts[i] = transformed;
  }

  return parts.join('');
}

export function convertToUIMessages(messages: DBMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts as UIMessagePart<CustomUIDataTypes, ChatTools>[],
    metadata: {
      createdAt: formatISO(message.createdAt),
    },
  }));
}

export function getTextFromMessage(message: ChatMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}
