import { streamObject } from 'ai';
import { z } from 'zod';
import { sheetPrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';
import { buildConversationSummary } from '@/lib/ai/tools/conversation-context';

export const sheetDocumentHandler = createDocumentHandler<'sheet'>({
  kind: 'sheet',
  onCreateDocument: async ({
    title,
    dataStream,
    context,
    invocationMessages,
    assistantPrelude,
  }) => {
    let draftContent = '';

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = context.providerOptions
      ? { ...context.providerOptions }
      : undefined;
    const { summary: contextSummary } = buildConversationSummary({
      messages: invocationMessages ?? context.messages,
      assistantPrelude,
    });
    const { fullStream } = streamObject({
      model,
      system: sheetPrompt,
      prompt: buildCreatePrompt(title, contextSummary),
      schema: z.object({
        csv: z.string().describe('CSV data'),
      }),
      ...(providerOptions && { providerOptions }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { csv } = object;

        if (csv) {
          dataStream.write({
            type: 'data-sheetDelta',
            data: csv,
            transient: true,
          });

          draftContent = csv;
        }
      }
    }

    dataStream.write({
      type: 'data-sheetDelta',
      data: draftContent,
      transient: true,
    });

    return { content: draftContent };
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

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = context.providerOptions
      ? { ...context.providerOptions }
      : undefined;
    const { summary: contextSummary } = buildConversationSummary({
      messages: invocationMessages ?? context.messages,
      assistantPrelude,
    });
    const { fullStream } = streamObject({
      model,
      system: updateDocumentPrompt(document.content, 'sheet'),
      prompt: buildUpdatePrompt(description, contextSummary),
      schema: z.object({
        csv: z.string(),
      }),
      ...(providerOptions && { providerOptions }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { csv } = object;

        if (csv) {
          dataStream.write({
            type: 'data-sheetDelta',
            data: csv,
            transient: true,
          });

          draftContent = csv;
        }
      }
    }

    return { content: draftContent };
  },
});

function buildCreatePrompt(title: string, contextSummary?: string) {
  const segments = [
    `Title: ${title}`,
    contextSummary
      ? `Relevant context:
${contextSummary}`
      : undefined,
    'Generate CSV content that fulfills the user request. Include headers, descriptive column names, and align values with the conversation context.',
  ].filter(Boolean);

  return segments.join('\n\n');
}

function buildUpdatePrompt(description: string, contextSummary?: string) {
  const segments = [
    contextSummary
      ? `Additional context:
${contextSummary}`
      : undefined,
    description,
  ].filter(Boolean);

  return segments.join('\n\n');
}
