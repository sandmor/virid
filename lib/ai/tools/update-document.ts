import { tool, type CoreMessage, type UIMessageStreamWriter } from 'ai';
import type { AppSession } from '@/lib/auth/session';
import { z } from 'zod';
import {
  documentHandlersByArtifactKind,
  type ArtifactToolContext,
} from '@/lib/artifacts/server';
import { getDocumentById } from '@/lib/db/queries';
import type { ChatMessage } from '@/lib/types';

type UpdateDocumentProps = {
  session: AppSession;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  context: ArtifactToolContext;
};

export const updateDocument = ({
  session,
  dataStream,
  context,
}: UpdateDocumentProps) =>
  tool({
    description: 'Update a document with the given description.',
    inputSchema: z.object({
      id: z.string().describe('The ID of the document to update'),
      description: z
        .string()
        .describe('The description of changes that need to be made'),
    }),
    execute: async ({ id, description }, runtime) => {
      const document = await getDocumentById({ id });

      if (!document) {
        return {
          error: 'Document not found',
        };
      }

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
          documentHandlerByArtifactKind.kind === document.kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${document.kind}`);
      }

      const draftResult = await documentHandler.onUpdateDocument({
        document,
        description,
        dataStream,
        session,
        context,
        invocationMessages,
        assistantPrelude,
      });

      dataStream.write({ type: 'data-finish', data: null, transient: true });

      return {
        id,
        title: document.title,
        kind: document.kind,
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
