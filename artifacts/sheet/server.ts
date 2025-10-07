import { streamObject } from 'ai';
import { z } from 'zod';
import { sheetPrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';

export const sheetDocumentHandler = createDocumentHandler<'sheet'>({
  kind: 'sheet',
  onCreateDocument: async ({ title, dataStream, context }) => {
    let draftContent = '';

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = context.providerOptions
      ? { ...context.providerOptions }
      : undefined;
    const { fullStream } = streamObject({
      model,
      system: sheetPrompt,
      prompt: title,
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
  onUpdateDocument: async ({ document, description, dataStream, context }) => {
    let draftContent = '';

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = context.providerOptions
      ? { ...context.providerOptions }
      : undefined;
    const { fullStream } = streamObject({
      model,
      system: updateDocumentPrompt(document.content, 'sheet'),
      prompt: description,
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
