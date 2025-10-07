import { streamObject } from 'ai';
import { z } from 'zod';
import { codePrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';
import {
  coerceCodeLanguage,
  detectCodeLanguageFromText,
  type CodeLanguage,
} from '@/lib/code/languages';
import { buildConversationSummary } from '@/lib/ai/tools/conversation-context';

type CodeDraftMetadata = {
  language: CodeLanguage;
};

const codeSchema = z.object({
  code: z.string(),
  language: z.string().optional(),
});

function resolveLanguage({
  fallback,
  contextSummary,
  recentUserTexts,
  assistantPrelude,
  requested,
}: {
  fallback: string;
  contextSummary?: string;
  recentUserTexts: string[];
  assistantPrelude?: string;
  requested?: CodeLanguage;
}): CodeLanguage {
  if (requested) {
    return requested;
  }

  const orderedUserText = [...recentUserTexts].reverse().join('\n---\n');
  const candidateSegments = [
    orderedUserText,
    contextSummary ?? '',
    assistantPrelude ?? '',
    fallback,
  ];

  for (const segment of candidateSegments) {
    const normalized = typeof segment === 'string' ? segment.trim() : '';
    if (!normalized) {
      continue;
    }

    const detected = detectCodeLanguageFromText(normalized);
    if (detected) {
      return detected;
    }
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
  promptHeading: string,
  contextSummary?: string
): string {
  if (!contextSummary || contextSummary.trim().length === 0) {
    return promptHeading;
  }

  return `${promptHeading}\n\nAdditional user context:\n${contextSummary}`;
}

export const codeDocumentHandler = createDocumentHandler<'code'>({
  kind: 'code',
  onCreateDocument: async ({
    title,
    dataStream,
    context,
    requestedLanguage,
    invocationMessages,
    assistantPrelude,
  }) => {
    let draftContent = '';
    const baseMessages = invocationMessages ?? context.messages;
    const { summary: contextSummary, recentUserTexts } =
      buildConversationSummary({
        messages: baseMessages,
        assistantPrelude,
        recentUserLimit: 3,
      });

    let resolvedLanguage = resolveLanguage({
      fallback: title,
      contextSummary,
      recentUserTexts,
      assistantPrelude,
      requested: requestedLanguage,
    });

    dataStream.write({
      type: 'data-codeLanguage',
      data: resolvedLanguage,
      transient: true,
    });

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));

    const { fullStream } = streamObject({
      model,
      system: buildCodeSystemPrompt(resolvedLanguage),
      prompt: buildGenerationPrompt(title, contextSummary),
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
  onUpdateDocument: async ({
    document,
    description,
    dataStream,
    context,
    invocationMessages,
    assistantPrelude,
  }) => {
    let draftContent = '';
    const documentLanguage = ensureLanguageFromSchema(
      document.metadata && typeof document.metadata === 'object'
        ? (document.metadata as Record<string, unknown>).language
        : undefined
    );

    const baseMessages = invocationMessages ?? context.messages;
    const { summary: contextSummary, recentUserTexts } =
      buildConversationSummary({
        messages: baseMessages,
        assistantPrelude,
        recentUserLimit: 3,
      });

    let resolvedLanguage =
      documentLanguage ??
      resolveLanguage({
        fallback: description,
        contextSummary,
        recentUserTexts,
        assistantPrelude,
      });

    dataStream.write({
      type: 'data-codeLanguage',
      data: resolvedLanguage,
      transient: true,
    });

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const { fullStream } = streamObject({
      model,
      system: `${buildCodeSystemPrompt(resolvedLanguage)}\n\nMaintain the existing language unless the user explicitly asks to change it.\n${updateDocumentPrompt(document.content, 'code')}`,
      prompt: buildGenerationPrompt(description, contextSummary),
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
