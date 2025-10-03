'use client';
import equal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import type { ChatMessage } from '@/lib/types';
import { cn, sanitizeText } from '@/lib/utils';
import { useDataStream } from './data-stream-provider';
import { DocumentToolResult } from './document';
import { DocumentPreview } from './document-preview';
import { MessageContent } from './elements/message';
import { Response } from './elements/response';
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from './elements/tool';
import { Sparkle, Cpu } from 'lucide-react';
import { LogoOpenAI, LogoGoogle, LogoOpenRouter } from './icons';
import { MessageActions } from './message-actions';
import { MessageEditor } from './message-editor';
import { MessageReasoning } from './message-reasoning';
import { PreviewAttachment } from './preview-attachment';
import { Weather } from './weather';
import { DiffView } from './diffview';

const PurePreviewMessage = ({
  chatId,
  message,
  isLoading,
  isReadonly,
  requiresScrollPadding,
  onRegenerateAssistant,
  disableRegenerate,
  onDeleteMessage,
  onDeleteMessageCascade,
  onToggleSelectMessage,
  isSelected,
  isSelectionMode,
}: {
  chatId: string;
  message: ChatMessage;
  isLoading: boolean;
  isReadonly: boolean;
  requiresScrollPadding: boolean;
  onRegenerateAssistant?: (assistantMessageId: string) => void;
  disableRegenerate?: boolean;
  onDeleteMessage?: (messageId: string) => Promise<{ chatDeleted: boolean }>;
  onDeleteMessageCascade?: (
    messageId: string
  ) => Promise<{ chatDeleted: boolean }>;
  onToggleSelectMessage?: (messageId: string) => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const attachmentsFromMessage = message.parts.filter(
    (part) => part.type === 'file'
  );

  useDataStream();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="group/message w-full"
      data-role={message.role}
      data-testid={`message-${message.role}`}
      initial={{ opacity: 0 }}
    >
      <div
        className={cn('flex w-full items-start gap-2 md:gap-3', {
          'justify-end': message.role === 'user' && mode !== 'edit',
          'justify-start': message.role === 'assistant',
        })}
      >
        {message.role === 'assistant' && (
          <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
            {(() => {
              const raw = message.metadata?.model;
              const provider = raw ? raw.split(':')[0] : undefined;
              switch (provider) {
                case 'openai':
                  return <LogoOpenAI size={14} />;
                case 'google':
                  return <LogoGoogle size={14} />;
                case 'openrouter':
                  return <LogoOpenRouter size={14} />;
                default:
                  return raw ? <Cpu size={14} /> : <Sparkle size={14} />;
              }
            })()}
          </div>
        )}

        <div
          className={cn('flex flex-col', {
            'gap-2 md:gap-4': message.parts?.some(
              (p) => p.type === 'text' && p.text?.trim()
            ),
            'min-h-96': message.role === 'assistant' && requiresScrollPadding,
            'w-full':
              (message.role === 'assistant' &&
                message.parts?.some(
                  (p) => p.type === 'text' && p.text?.trim()
                )) ||
              mode === 'edit',
            'max-w-[calc(100%-2.5rem)] sm:max-w-[min(fit-content,80%)]':
              message.role === 'user' && mode !== 'edit',
          })}
        >
          {attachmentsFromMessage.length > 0 && (
            <div
              className="flex flex-row justify-end gap-2"
              data-testid={'message-attachments'}
            >
              {attachmentsFromMessage.map((attachment) => (
                <PreviewAttachment
                  attachment={{
                    name: attachment.filename ?? 'file',
                    contentType: attachment.mediaType,
                    url: attachment.url,
                  }}
                  key={attachment.url}
                />
              ))}
            </div>
          )}

          {message.parts?.map((part, index) => {
            const { type } = part;
            const key = `message-${message.id}-part-${index}`;

            if (type === 'reasoning' && part.text?.trim().length > 0) {
              return (
                <MessageReasoning
                  isLoading={isLoading}
                  key={key}
                  reasoning={part.text}
                />
              );
            }

            if (type === 'text') {
              if (mode === 'view') {
                return (
                  <div key={key}>
                    <MessageContent
                      className={cn({
                        'w-fit break-words rounded-2xl px-3 py-2 text-right text-white':
                          message.role === 'user',
                        'bg-transparent px-0 py-0 text-left':
                          message.role === 'assistant',
                      })}
                      data-testid="message-content"
                      style={
                        message.role === 'user'
                          ? { backgroundColor: '#006cff' }
                          : undefined
                      }
                    >
                      <Response>{sanitizeText(part.text)}</Response>
                    </MessageContent>
                  </div>
                );
              }

              if (mode === 'edit') {
                return (
                  <div
                    className="flex w-full flex-row items-start gap-3"
                    key={key}
                  >
                    <div className="size-8" />
                    <div className="min-w-0 flex-1">
                      <MessageEditor
                        key={message.id}
                        message={message}
                        setMode={setMode}
                      />
                    </div>
                  </div>
                );
              }
            }

            if (type === 'tool-getWeather') {
              const { toolCallId, state } = part;

              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type="tool-getWeather" />
                  <ToolContent>
                    <ToolInput input={part.input ?? {}} />
                    {(state === 'output-available' ||
                      state === 'output-error') && (
                      <ToolOutput
                        errorText={
                          state === 'output-error'
                            ? part.errorText
                            : part.output &&
                                typeof part.output === 'object' &&
                                'error' in part.output
                              ? String(part.output.error)
                              : undefined
                        }
                        output={
                          state === 'output-available' &&
                          part.output &&
                          !(
                            typeof part.output === 'object' &&
                            'error' in part.output
                          ) ? (
                            <Weather weatherAtLocation={part.output} />
                          ) : null
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (
              type === 'tool-archiveCreateEntry' ||
              type === 'tool-archiveReadEntry' ||
              type === 'tool-archiveUpdateEntry' ||
              type === 'tool-archiveDeleteEntry' ||
              type === 'tool-archiveLinkEntries' ||
              type === 'tool-archiveSearchEntries' ||
              type === 'tool-archivePinEntry' ||
              type === 'tool-archiveUnpinEntry'
            ) {
              const { toolCallId, state } = part;
              const output = part.output as any;
              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type={type} />
                  <ToolContent>
                    <ToolInput input={part.input ?? {}} />
                    {(state === 'output-available' ||
                      state === 'output-error') && (
                      <ToolOutput
                        errorText={
                          state === 'output-error'
                            ? part.errorText
                            : output &&
                                typeof output === 'object' &&
                                'error' in output
                              ? String(output.error)
                              : undefined
                        }
                        output={
                          state === 'output-available' &&
                          output &&
                          !(typeof output === 'object' && 'error' in output) ? (
                            <div className="space-y-2 text-xs">
                              <pre className="whitespace-pre-wrap break-words">
                                {JSON.stringify(output, null, 2)}
                              </pre>
                            </div>
                          ) : null
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (type === 'tool-archiveApplyEdits') {
              const { toolCallId, state } = part;
              const output = part.output as any;
              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type={type} />
                  <ToolContent>
                    <ToolInput input={part.input ?? {}} />
                    {(state === 'output-available' ||
                      state === 'output-error') && (
                      <ToolOutput
                        errorText={
                          state === 'output-error'
                            ? part.errorText
                            : output &&
                                typeof output === 'object' &&
                                'error' in output
                              ? String(output.error)
                              : undefined
                        }
                        output={
                          state === 'output-available' &&
                          output &&
                          !(typeof output === 'object' && 'error' in output) ? (
                            <div className="space-y-4">
                              {output.oldBody !== undefined &&
                              output.newBody !== undefined &&
                              output.oldBody !== output.newBody ? (
                                <div>
                                  <h5 className="mb-2 font-medium text-xs uppercase tracking-wide text-muted-foreground">
                                    Body Diff
                                  </h5>
                                  <div className="rounded-md border bg-background p-2">
                                    <DiffView
                                      oldContent={output.oldBody}
                                      newContent={output.newBody}
                                    />
                                  </div>
                                </div>
                              ) : null}
                              <div className="space-y-2">
                                <h5 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">
                                  Summary
                                </h5>
                                <ul className="list-inside list-disc text-xs">
                                  <li>Applied: {output.appliedEdits}</li>
                                  <li>Skipped: {output.skippedEdits}</li>
                                  <li>Updated: {String(output.updated)}</li>
                                  <li>Length: {output.bodyLength}</li>
                                </ul>
                              </div>
                              {Array.isArray(output.edits) && (
                                <div className="space-y-2">
                                  <h5 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">
                                    Edits
                                  </h5>
                                  <div className="max-h-64 overflow-auto rounded-md bg-muted/50 p-2 text-xs">
                                    <table className="w-full text-left">
                                      <thead className="sticky top-0 bg-muted/70 backdrop-blur">
                                        <tr className="text-[10px] uppercase text-muted-foreground">
                                          <th className="px-1 py-1">#</th>
                                          <th className="px-1 py-1">Mode</th>
                                          <th className="px-1 py-1">Target</th>
                                          <th className="px-1 py-1">Status</th>
                                          <th className="px-1 py-1">Reason</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {output.edits.map((e: any) => (
                                          <tr
                                            key={e.index}
                                            className="border-t border-border/50"
                                          >
                                            <td className="px-1 py-1 align-top text-muted-foreground">
                                              {e.index}
                                            </td>
                                            <td className="px-1 py-1 align-top font-mono text-[11px]">
                                              {e.mode}
                                            </td>
                                            <td
                                              className="px-1 py-1 align-top max-w-[220px] truncate"
                                              title={e.target}
                                            >
                                              {e.target}
                                            </td>
                                            <td className="px-1 py-1 align-top">
                                              {e.status}
                                            </td>
                                            <td className="px-1 py-1 align-top text-muted-foreground">
                                              {e.reason || ''}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : null
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (type === 'tool-createDocument') {
              const { toolCallId } = part;

              if (part.output && 'error' in part.output) {
                return (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50"
                    key={toolCallId}
                  >
                    Error creating document: {String(part.output.error)}
                  </div>
                );
              }

              return (
                <DocumentPreview
                  isReadonly={isReadonly}
                  key={toolCallId}
                  result={part.output}
                />
              );
            }

            if (type === 'tool-updateDocument') {
              const { toolCallId } = part;

              if (
                part.output &&
                typeof part.output === 'object' &&
                'error' in part.output
              ) {
                return (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50"
                    key={toolCallId}
                  >
                    Error updating document: {String(part.output.error)}
                  </div>
                );
              }

              return (
                <div className="relative" key={toolCallId}>
                  <DocumentPreview
                    args={
                      part.output
                        ? {
                            title: (part.output as any).title,
                            kind: (part.output as any).kind,
                            isUpdate: true,
                          }
                        : undefined
                    }
                    isReadonly={isReadonly}
                    result={
                      part.output
                        ? {
                            id: (part.output as any).id,
                            title: (part.output as any).title,
                            kind: (part.output as any).kind,
                          }
                        : undefined
                    }
                  />
                </div>
              );
            }

            if (type === 'tool-requestSuggestions') {
              const { toolCallId, state } = part;

              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type="tool-requestSuggestions" />
                  <ToolContent>
                    <ToolInput input={part.input ?? {}} />
                    {(state === 'output-available' ||
                      state === 'output-error') && (
                      <ToolOutput
                        errorText={
                          state === 'output-error'
                            ? part.errorText
                            : part.output &&
                                typeof part.output === 'object' &&
                                'error' in (part.output as any)
                              ? String((part.output as any).error)
                              : undefined
                        }
                        output={
                          state === 'output-available' &&
                          part.output &&
                          !(
                            typeof part.output === 'object' &&
                            'error' in (part.output as any)
                          ) &&
                          (part.output as any).id &&
                          (part.output as any).title &&
                          (part.output as any).kind ? (
                            <DocumentToolResult
                              isReadonly={isReadonly}
                              result={{
                                id: (part.output as any).id,
                                title: (part.output as any).title,
                                kind: (part.output as any).kind,
                              }}
                              type="request-suggestions"
                            />
                          ) : null
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            return null;
          })}

          {!isReadonly && (
            <MessageActions
              chatId={chatId}
              isLoading={isLoading}
              key={`action-${message.id}`}
              message={message}
              setMode={setMode}
              onRegenerate={onRegenerateAssistant}
              disableRegenerate={disableRegenerate}
              onDelete={onDeleteMessage}
              onDeleteCascade={onDeleteMessageCascade}
              onToggleSelect={onToggleSelectMessage}
              isSelected={Boolean(isSelected)}
              isSelectionMode={Boolean(isSelectionMode)}
              modelBadge={
                message.role === 'assistant' && message.metadata?.model ? (
                  <span className="rounded-full bg-muted/30 px-2 py-0.5 text-sm font-medium text-muted-foreground">
                    {(() => {
                      const raw = message.metadata?.model as string | undefined;
                      if (!raw) return '';
                      const parts = raw.split(':');
                      return parts.length > 1 ? parts.slice(1).join(':') : raw;
                    })()}
                  </span>
                ) : null
              }
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    // re-render when loading state changes
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    // always re-render on message id change
    if (prevProps.message.id !== nextProps.message.id) return false;
    // re-render when scroll padding requirement changes
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;

    // re-render if message parts change
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

    // re-render if metadata that affects UI (createdAt or model) changed
    if (
      prevProps.message.metadata?.createdAt !==
      nextProps.message.metadata?.createdAt
    )
      return false;
    if (prevProps.message.metadata?.model !== nextProps.message.metadata?.model)
      return false;
    if (prevProps.isSelected !== nextProps.isSelected) return false;
    if (prevProps.isSelectionMode !== nextProps.isSelectionMode) return false;
    if (prevProps.onToggleSelectMessage !== nextProps.onToggleSelectMessage)
      return false;

    // otherwise skip rerender
    return true;
  }
);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="group/message w-full"
      data-role={role}
      data-testid="message-assistant-loading"
      initial={{ opacity: 0 }}
    >
      <div className="flex items-start justify-start gap-3">
        <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
          <Sparkle size={14} />
        </div>

        <div className="flex w-full flex-col gap-2 md:gap-4">
          <div className="p-0 text-muted-foreground text-sm">
            <LoadingText>Thinking...</LoadingText>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      animate={{ backgroundPosition: ['100% 50%', '-100% 50%'] }}
      className="flex items-center text-transparent"
      style={{
        background:
          'linear-gradient(90deg, hsl(var(--muted-foreground)) 0%, hsl(var(--muted-foreground)) 35%, hsl(var(--foreground)) 50%, hsl(var(--muted-foreground)) 65%, hsl(var(--muted-foreground)) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
};
