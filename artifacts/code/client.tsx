import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { CodeEditor } from '@/components/code-editor';
import {
  Console,
  type ConsoleOutput,
  type ConsoleOutputContent,
} from '@/components/console';
import { Artifact } from '@/components/create-artifact';
import {
  Copy,
  FileText as Logs,
  MessageSquare as Message,
  Play,
  Redo,
  Undo,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { generateUUID } from '@/lib/utils';
import {
  CODE_LANGUAGES,
  coerceCodeLanguage,
  detectCodeLanguageFromText,
  isExecutionSupported,
  type CodeLanguage,
} from '@/lib/code/languages';

const OUTPUT_HANDLERS = {
  matplotlib: `
    import io
    import base64
    from matplotlib import pyplot as plt

    # Clear any existing plots
    plt.clf()
    plt.close('all')

    # Switch to agg backend
    plt.switch_backend('agg')

    def setup_matplotlib_output():
        def custom_show():
            if plt.gcf().get_size_inches().prod() * plt.gcf().dpi ** 2 > 25_000_000:
                print("Warning: Plot size too large, reducing quality")
                plt.gcf().set_dpi(100)

            png_buf = io.BytesIO()
            plt.savefig(png_buf, format='png')
            png_buf.seek(0)
            png_base64 = base64.b64encode(png_buf.read()).decode('utf-8')
            print(f'data:image/png;base64,{png_base64}')
            png_buf.close()

            plt.clf()
            plt.close('all')

        plt.show = custom_show
  `,
  basic: `
    # Basic output capture setup
  `,
};

function detectRequiredHandlers(code: string): string[] {
  const handlers: string[] = ['basic'];

  if (code.includes('matplotlib') || code.includes('plt.')) {
    handlers.push('matplotlib');
  }

  return handlers;
}

function buildDefaultMetadata(metadata?: Metadata | null): Metadata {
  return {
    outputs: metadata?.outputs ?? [],
    language: metadata?.language ?? 'python',
  };
}

type Metadata = {
  outputs: ConsoleOutput[];
  language: CodeLanguage;
};

export const codeArtifact = new Artifact<'code', Metadata>({
  kind: 'code',
  description:
    'Useful for multi-language code generation. Execution is available for Python snippets.',
  initialize: ({ setMetadata }) => {
    setMetadata((current) => buildDefaultMetadata(current as Metadata | null));
  },
  onStreamPart: ({ streamPart, setArtifact, setMetadata }) => {
    if (streamPart.type === 'data-codeLanguage') {
      const language = (streamPart.data as CodeLanguage) ?? 'python';
      setMetadata((metadata) => ({
        ...buildDefaultMetadata(metadata as Metadata | null),
        language,
      }));
      return;
    }

    if (streamPart.type === 'data-codeDelta') {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: streamPart.data,
        isVisible:
          draftArtifact.status === 'streaming' &&
          draftArtifact.content.length > 300 &&
          draftArtifact.content.length < 310
            ? true
            : draftArtifact.isVisible,
        status: 'streaming',
      }));
    }
  },
  content: ({ metadata, setMetadata, content, ...props }) => {
    const resolvedMetadata = buildDefaultMetadata(metadata);
    const effectiveLanguage = useMemo(() => {
      const metadataLanguage = coerceCodeLanguage(resolvedMetadata.language);
      if (metadataLanguage) {
        return metadataLanguage;
      }

      const detected = detectCodeLanguageFromText(content);
      return detected ?? 'python';
    }, [content, resolvedMetadata.language]);

    const languageLabel =
      CODE_LANGUAGES.find((definition) => definition.id === effectiveLanguage)
        ?.label ?? effectiveLanguage;

    useEffect(() => {
      if (resolvedMetadata.language !== effectiveLanguage) {
        setMetadata((current) => ({
          ...buildDefaultMetadata(current as Metadata | null),
          language: effectiveLanguage,
        }));
      }
    }, [effectiveLanguage, resolvedMetadata.language, setMetadata]);

    return (
      <>
        <div className="flex items-center justify-between px-4 pb-2 pt-3 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-mono uppercase">
            {languageLabel}
          </Badge>
          {!isExecutionSupported(resolvedMetadata.language) && (
            <span>Execution available for Python only</span>
          )}
        </div>
        <div className="px-1">
          <CodeEditor
            {...props}
            content={content}
            language={effectiveLanguage}
          />
        </div>

        {resolvedMetadata.outputs.length > 0 && (
          <Console
            consoleOutputs={resolvedMetadata.outputs}
            setConsoleOutputs={() =>
              setMetadata((current) => ({
                ...buildDefaultMetadata(current as Metadata | null),
                outputs: [],
              }))
            }
          />
        )}
      </>
    );
  },
  actions: [
    {
      icon: <Play size={18} />,
      label: 'Run',
      description: 'Execute code',
      onClick: async ({ content, setMetadata, metadata }) => {
        const resolvedMetadata = buildDefaultMetadata(
          metadata as Metadata | null
        );

        if (!isExecutionSupported(resolvedMetadata.language)) {
          toast.info('Execution is currently available only for Python code.');
          return;
        }

        const runId = generateUUID();
        const outputContent: ConsoleOutputContent[] = [];

        setMetadata((current) => {
          const nextMetadata = buildDefaultMetadata(current as Metadata | null);
          return {
            ...nextMetadata,
            outputs: [
              ...nextMetadata.outputs,
              {
                id: runId,
                contents: [],
                status: 'in_progress',
              },
            ],
          };
        });

        try {
          // @ts-expect-error - loadPyodide is not defined
          const currentPyodideInstance = await globalThis.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
          });

          currentPyodideInstance.setStdout({
            batched: (output: string) => {
              outputContent.push({
                type: output.startsWith('data:image/png;base64')
                  ? 'image'
                  : 'text',
                value: output,
              });
            },
          });

          await currentPyodideInstance.loadPackagesFromImports(content, {
            messageCallback: (message: string) => {
              setMetadata((current) => {
                const nextMetadata = buildDefaultMetadata(
                  current as Metadata | null
                );
                return {
                  ...nextMetadata,
                  outputs: [
                    ...nextMetadata.outputs.filter(
                      (output) => output.id !== runId
                    ),
                    {
                      id: runId,
                      contents: [{ type: 'text', value: message }],
                      status: 'loading_packages',
                    },
                  ],
                };
              });
            },
          });

          const requiredHandlers = detectRequiredHandlers(content);
          for (const handler of requiredHandlers) {
            if (OUTPUT_HANDLERS[handler as keyof typeof OUTPUT_HANDLERS]) {
              await currentPyodideInstance.runPythonAsync(
                OUTPUT_HANDLERS[handler as keyof typeof OUTPUT_HANDLERS]
              );

              if (handler === 'matplotlib') {
                await currentPyodideInstance.runPythonAsync(
                  'setup_matplotlib_output()'
                );
              }
            }
          }

          await currentPyodideInstance.runPythonAsync(content);

          setMetadata((current) => {
            const nextMetadata = buildDefaultMetadata(
              current as Metadata | null
            );
            return {
              ...nextMetadata,
              outputs: [
                ...nextMetadata.outputs.filter((output) => output.id !== runId),
                {
                  id: runId,
                  contents: outputContent,
                  status: 'completed',
                },
              ],
            };
          });
        } catch (error: any) {
          setMetadata((current) => {
            const nextMetadata = buildDefaultMetadata(
              current as Metadata | null
            );
            return {
              ...nextMetadata,
              outputs: [
                ...nextMetadata.outputs.filter((output) => output.id !== runId),
                {
                  id: runId,
                  contents: [{ type: 'text', value: error.message }],
                  status: 'failed',
                },
              ],
            };
          });
        }
      },
    },
    {
      icon: <Undo size={18} />,
      description: 'View Previous version',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('prev');
      },
      isDisabled: ({ currentVersionIndex }) => currentVersionIndex === 0,
    },
    {
      icon: <Redo size={18} />,
      description: 'View Next version',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('next');
      },
      isDisabled: ({ isCurrentVersion }) => isCurrentVersion,
    },
    {
      icon: <Copy size={18} />,
      description: 'Copy code to clipboard',
      onClick: ({ content }) => {
        navigator.clipboard.writeText(content);
        toast.success('Copied to clipboard!');
      },
    },
  ],
  toolbar: [
    {
      icon: <Message size={16} />,
      description: 'Add comments',
      onClick: ({ sendMessage }) => {
        sendMessage({
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Add comments to the code snippet for understanding',
            },
          ],
        });
      },
    },
    {
      icon: <Logs size={16} />,
      description: 'Add logs',
      onClick: ({ sendMessage }) => {
        sendMessage({
          role: 'user',
          parts: [
            {
              type: 'text',
              text: 'Add logs to the code snippet for debugging',
            },
          ],
        });
      },
    },
  ],
});
