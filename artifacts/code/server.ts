import { streamObject } from 'ai';
import { z } from 'zod';
import type { CoreMessage } from 'ai';
import { codePrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';
import {
  coerceCodeLanguage,
  detectCodeLanguageFromText,
  type CodeLanguage,
} from '@/lib/code/languages';

type CodeDraftMetadata = {
  language: CodeLanguage;
};

const codeSchema = z.object({
  code: z.string(),
  language: z.string().optional(),
});

function getTextFromMessages(messages?: CoreMessage[]): string {
  if (!messages || messages.length === 0) {
    return '';
  }

  const userTexts: string[] = [];

  for (
    let index = messages.length - 1;
    index >= 0 && userTexts.length < 3;
    index -= 1
  ) {
    const message = messages[index];
    if (message.role !== 'user') {
      continue;
    }
    const contentParts = Array.isArray(message.content)
      ? message.content
      : typeof message.content === 'string'
        ? [message.content]
        : [];
    const textParts = contentParts
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (part && typeof part === 'object' && 'type' in part) {
          if (part.type === 'text' && typeof part.text === 'string') {
            return part.text;
          }
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');

    if (textParts.trim().length > 0) {
      userTexts.push(textParts.trim());
    }
  }

  if (userTexts.length === 0) {
    return '';
  }

  return userTexts.reverse().join('\n---\n');
}

function resolveLanguage(
  title: string,
  messages: CoreMessage[] | undefined,
  requested?: CodeLanguage
): CodeLanguage {
  if (requested) {
    return requested;
  }

  const fromMessages = detectCodeLanguageFromText(
    getTextFromMessages(messages)
  );
  if (fromMessages) {
    return fromMessages;
  }

  const fromTitle = detectCodeLanguageFromText(title);
  if (fromTitle) {
    return fromTitle;
  }

  return 'python';
}

function ensureLanguageFromSchema(candidate: unknown): CodeLanguage | null {
  const coerced = coerceCodeLanguage(candidate);
  return coerced ?? null;
}

function buildCodeSystemPrompt(language: CodeLanguage) {
  return `${codePrompt}

Target language: ${language}.
Only change the language if the request explicitly requires a different one.`;
}

function buildGenerationPrompt(
  title: string,
  additionalContext: string
): string {
  if (additionalContext.trim().length === 0) {
    return title;
  }

  return `${title}\n\nAdditional user context:\n${additionalContext}`;
}

export const codeDocumentHandler = createDocumentHandler<'code'>({
  kind: 'code',
  onCreateDocument: async ({
    title,
    dataStream,
    context,
    requestedLanguage,
  }) => {
    let draftContent = '';
    let resolvedLanguage = resolveLanguage(
      title,
      context.messages,
      requestedLanguage
    );

    dataStream.write({
      type: 'data-codeLanguage',
      data: resolvedLanguage,
      transient: true,
    });

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));

    const additionalContext = getTextFromMessages(context.messages);
    const { fullStream } = streamObject({
      model,
      system: buildCodeSystemPrompt(resolvedLanguage),
      prompt: buildGenerationPrompt(title, additionalContext),
      schema: codeSchema,
      ...(context.providerOptions && {
        providerOptions: context.providerOptions,
      }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { code, language } = object;

        const languageFromModel = ensureLanguageFromSchema(language);
        if (languageFromModel && languageFromModel !== resolvedLanguage) {
          resolvedLanguage = languageFromModel;
          dataStream.write({
            type: 'data-codeLanguage',
            data: resolvedLanguage,
            transient: true,
          });
        }

        if (code) {
          dataStream.write({
            type: 'data-codeDelta',
            data: code,
            transient: true,
          });

          draftContent = code;
        }
      }
    }

    return {
      content: draftContent,
      metadata: {
        language: resolvedLanguage,
      } satisfies CodeDraftMetadata,
    };
  },
  onUpdateDocument: async ({ document, description, dataStream, context }) => {
    let draftContent = '';
    const documentLanguage = ensureLanguageFromSchema(
      document.metadata && typeof document.metadata === 'object'
        ? (document.metadata as Record<string, unknown>).language
        : undefined
    );

    let resolvedLanguage =
      documentLanguage ?? resolveLanguage(description, context.messages);

    dataStream.write({
      type: 'data-codeLanguage',
      data: resolvedLanguage,
      transient: true,
    });

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const additionalContext = getTextFromMessages(context.messages);
    const { fullStream } = streamObject({
      model,
      system: `${buildCodeSystemPrompt(resolvedLanguage)}\n\nMaintain the existing language unless the user explicitly asks to change it.\n${updateDocumentPrompt(document.content, 'code')}`,
      prompt: buildGenerationPrompt(description, additionalContext),
      schema: codeSchema,
      ...(context.providerOptions && {
        providerOptions: context.providerOptions,
      }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { code, language } = object;

        const languageFromModel = ensureLanguageFromSchema(language);
        if (languageFromModel && languageFromModel !== resolvedLanguage) {
          resolvedLanguage = languageFromModel;
          dataStream.write({
            type: 'data-codeLanguage',
            data: resolvedLanguage,
            transient: true,
          });
        }

        if (code) {
          dataStream.write({
            type: 'data-codeDelta',
            data: code,
            transient: true,
          });

          draftContent = code;
        }
      }
    }

    return {
      content: draftContent,
      metadata: {
        language: resolvedLanguage,
      } satisfies CodeDraftMetadata,
    };
  },
});
