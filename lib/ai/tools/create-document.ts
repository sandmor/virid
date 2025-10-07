import { tool, type UIMessageStreamWriter } from 'ai';
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
      language: z.enum(CODE_LANGUAGE_IDS),
    }),
    execute: async ({ title, kind, language }) => {
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

      const documentHandler = documentHandlersByArtifactKind.find(
        (documentHandlerByArtifactKind) =>
          documentHandlerByArtifactKind.kind === kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${kind}`);
      }

      await documentHandler.onCreateDocument({
        id,
        title,
        dataStream,
        session,
        context,
        requestedLanguage: language as CodeLanguage,
      });

      dataStream.write({ type: 'data-finish', data: null, transient: true });

      return {
        id,
        title,
        kind,
        content: 'A document was created and is now visible to the user.',
      };
    },
  });
