import { tool, type CoreMessage, type UIMessageStreamWriter } from 'ai';
import type { AppSession } from '@/lib/auth/session';
import { z } from 'zod';
import {
  artifactKinds,
  documentHandlersByArtifactKind,
  type ArtifactToolContext,
} from '@/lib/artifacts/server';
import type { ChatMessage } from '@/lib/types';
import { generateUUID } from '@/lib/utils';
import { CODE_LANGUAGE_IDS, type CodeLanguage } from '@/lib/code/languages';

type CreateDocumentProps = {
  session: AppSession;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  context: ArtifactToolContext;
};

export const createDocument = ({
  session,
  dataStream,
  context,
}: CreateDocumentProps) =>
  tool({
    description:
      'Create a document for a writing or content creation activities. This tool will call other functions that will generate the contents of the document based on the title and kind.',
    inputSchema: z.object({
      title: z.string(),
      kind: z.enum(artifactKinds),
      language: z.enum(CODE_LANGUAGE_IDS).optional(),
    }),
    execute: async ({ title, kind, language }, runtime) => {
      const id = generateUUID();

      dataStream.write({
        type: 'data-kind',
        data: kind,
        transient: true,
      });

      dataStream.write({
        type: 'data-id',
        data: id,
        transient: true,
      });

      dataStream.write({
        type: 'data-title',
        data: title,
        transient: true,
      });

      dataStream.write({
        type: 'data-clear',
        data: null,
        transient: true,
      });

      const invocationMessages =
        (runtime?.messages as CoreMessage[]) ?? undefined;
      const assistantPrelude = extractAssistantPrelude(invocationMessages);

      const documentHandler = documentHandlersByArtifactKind.find(
        (documentHandlerByArtifactKind) =>
          documentHandlerByArtifactKind.kind === kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${kind}`);
      }

      // If the artifact kind is 'code', language must be provided and valid.
      if (kind === 'code' && !language) {
        throw new Error(
          'The "language" field is required when creating code artifacts.'
        );
      }

      const draftResult = await documentHandler.onCreateDocument({
        id,
        title,
        dataStream,
        session,
        context,
        requestedLanguage: language as CodeLanguage | undefined,
        invocationMessages,
        assistantPrelude,
      });

      dataStream.write({ type: 'data-finish', data: null, transient: true });

      return {
        id,
        title,
        kind,
        content: draftResult.content,
        metadata: draftResult.metadata ?? null,
      };
    },
  });

function extractAssistantPrelude(messages?: CoreMessage[]): string | undefined {
  if (!messages || messages.length === 0) {
    return undefined;
  }

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role !== 'assistant') {
      continue;
    }

    if (typeof message.content === 'string') {
      const trimmed = message.content.trim();
      if (trimmed) return trimmed;
      continue;
    }

    if (Array.isArray(message.content)) {
      const textContent = message.content
        .map((part) => {
          if (!part) return '';
          if (typeof part === 'string') return part;
          if ('type' in part && part.type === 'text' && 'text' in part) {
            return typeof part.text === 'string' ? part.text : '';
          }
          return '';
        })
        .join('\n')
        .trim();
      if (textContent) return textContent;
    }
  }

  return undefined;
}
