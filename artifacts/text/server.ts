import { smoothStream, streamText } from 'ai';
import { updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';

export const textDocumentHandler = createDocumentHandler<'text'>({
  kind: 'text',
  onCreateDocument: async ({ title, dataStream, context }) => {
    let draftContent = '';

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = context.providerOptions
      ? { ...context.providerOptions }
      : undefined;
    const { fullStream } = streamText({
      model,
      system:
        'Write about the given topic. Markdown is supported. Use headings wherever appropriate.',
      experimental_transform: smoothStream({ chunking: 'word' }),
      prompt: title,
      ...(providerOptions && { providerOptions }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'text-delta') {
        const { text } = delta;

        draftContent += text;

        dataStream.write({
          type: 'data-textDelta',
          data: text,
          transient: true,
        });
      }
    }

    return { content: draftContent };
  },
  onUpdateDocument: async ({ document, description, dataStream, context }) => {
    let draftContent = '';

    const model =
      (context.model as any) ??
      (await getLanguageModel(ARTIFACT_GENERATION_MODEL));
    const providerOptions = {
      ...(context.providerOptions ?? {}),
      openrouter: {
        ...(context.providerOptions?.openrouter ?? {}),
        prediction: {
          type: 'content',
          content: document.content,
        },
      },
    };

    const { fullStream } = streamText({
      model,
      system: updateDocumentPrompt(document.content, 'text'),
      experimental_transform: smoothStream({ chunking: 'word' }),
      prompt: description,
      providerOptions,
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'text-delta') {
        const { text } = delta;

        draftContent += text;

        dataStream.write({
          type: 'data-textDelta',
          data: text,
          transient: true,
        });
      }
    }

    return { content: draftContent };
  },
});
