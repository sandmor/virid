import { parse, unparse } from 'papaparse';
import { toast } from 'sonner';
import { Artifact } from '@/components/create-artifact';
import {
  Copy,
  BarChart3 as LineChart,
  Redo,
  Sparkles,
  Undo,
} from 'lucide-react';
import { SpreadsheetEditor } from '@/components/sheet-editor';

type Metadata = any;

export const sheetArtifact = new Artifact<'sheet', Metadata>({
  kind: 'sheet',
  description: 'Useful for working with spreadsheets',
  initialize: () => null,
  onStreamPart: ({ setArtifact, streamPart }) => {
    if (streamPart.type === 'data-sheetDelta') {
      const shouldReplace =
        typeof (streamPart as any).replace === 'boolean'
          ? (streamPart as any).replace
          : false;
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: shouldReplace ? streamPart.data : streamPart.data,
        isVisible: true,
        status: 'streaming',
      }));
    }
  },
  content: ({ content, currentVersionIndex, onSaveContent, status }) => {
    return (
      <SpreadsheetEditor
        content={content}
        currentVersionIndex={currentVersionIndex}
        isCurrentVersion={true}
        saveContent={onSaveContent}
        status={status}
      />
    );
  },
  actions: [
    {
      icon: <Undo size={18} />,
      description: 'View Previous version',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('prev');
      },
      isDisabled: ({ currentVersionIndex }) => {
        if (currentVersionIndex === 0) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <Redo size={18} />,
      description: 'View Next version',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('next');
      },
      isDisabled: ({ isCurrentVersion }) => {
        if (isCurrentVersion) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <Copy size={16} />,
      description: 'Copy as .csv',
      onClick: ({ content }) => {
        const parsed = parse<string[]>(content, { skipEmptyLines: true });

        const nonEmptyRows = parsed.data.filter((row) =>
          row.some((cell) => cell.trim() !== '')
        );

        const cleanedCsv = unparse(nonEmptyRows);

        navigator.clipboard.writeText(cleanedCsv);
        toast.success('Copied csv to clipboard!');
      },
    },
  ],
  toolbar: [
    {
      description: 'Format and clean data',
      icon: <Sparkles size={16} />,
      onClick: ({ sendMessage }) => {
        sendMessage({
          role: 'user',
          parts: [
            { type: 'text', text: 'Can you please format and clean the data?' },
          ],
        });
      },
    },
    {
      description: 'Analyze and visualize data',
      icon: <LineChart size={16} />,
      onClick: ({ sendMessage }) => {
        sendMessage({
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Can you please analyze and visualize the data by creating a new code artifact in python?',
            },
          ],
        });
      },
    },
  ],
});
