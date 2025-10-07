import { smoothStream, streamText } from 'ai';
import { updateDocumentPrompt } from '@/lib/ai/prompts';
import { getLanguageModel } from '@/lib/ai/providers';
import { ARTIFACT_GENERATION_MODEL } from '@/lib/ai/models';
import { createDocumentHandler } from '@/lib/artifacts/server';
import { buildConversationSummary } from '@/lib/ai/tools/conversation-context';

export const textDocumentHandler = createDocumentHandler<'text'>({
  kind: 'text',
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
    const generationPrompt = buildCreatePrompt(title, contextSummary);
    const { fullStream } = streamText({
      model,
      system:
        'Write about the given topic. Markdown is supported. Use headings wherever appropriate.',
      experimental_transform: smoothStream({ chunking: 'word' }),
      prompt: generationPrompt,
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

    const { summary: contextSummary } = buildConversationSummary({
      messages: invocationMessages ?? context.messages,
      assistantPrelude,
    });

    const { fullStream } = streamText({
      model,
      system: updateDocumentPrompt(document.content, 'text'),
      experimental_transform: smoothStream({ chunking: 'word' }),
      prompt: buildUpdatePrompt(description, contextSummary),
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

function buildCreatePrompt(title: string, contextSummary?: string) {
  const segments = [
    `Title: ${title}`,
    contextSummary
      ? `Relevant context:
${contextSummary}`
      : undefined,
    'Write the full document for the user. Use clear organization, headings, and any formatting needed to make it easy to read.',
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
