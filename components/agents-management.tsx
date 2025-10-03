'use client';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useAgents,
  useCreateAgent,
  useUpdateAgent,
  useDeleteAgent,
} from '@/hooks/use-agents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Trash2,
  Edit,
  Plus,
  Play,
  Loader2,
  CheckCircle2,
  CircleAlert,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Agent, ChatSettings } from '@/lib/db/schema';
import { ChatPinnedArchive } from '@/components/chat-pinned-archive';
import { ChatToolSelector } from '@/components/chat-tool-selector';
import { CHAT_TOOL_IDS, type ChatToolId } from '@/lib/ai/tool-ids';
import {
  DEFAULT_AGENT_SETTINGS,
  agentSettingsFromChatSettings,
  agentSettingsIsDefault,
  agentSettingsToChatSettings,
  type AgentSettingsValue,
} from '@/lib/agent-settings';
import { deriveChatModel } from '@/lib/ai/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AgentFormState {
  name: string;
  description: string;
  settings: AgentSettingsValue;
}

type AgentStatusState = 'idle' | 'created' | 'updated' | 'deleted' | 'error';

const DEFAULT_MODEL_VALUE = '__DEFAULT_MODEL__';
const DEFAULT_REASONING_VALUE = '__DEFAULT_REASONING__';

const REASONING_OPTIONS: Array<{
  value: 'low' | 'medium' | 'high';
  label: string;
  description: string;
}> = [
  {
    value: 'low',
    label: 'Low',
    description: 'Faster responses with lighter reasoning depth',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Balanced speed and reasoning quality',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Best reasoning quality with higher latency',
  },
];

function cloneAgentSettings(
  value: AgentSettingsValue = DEFAULT_AGENT_SETTINGS
): AgentSettingsValue {
  return {
    pinnedEntries: [...value.pinnedEntries],
    allowedTools: value.allowedTools ? [...value.allowedTools] : undefined,
    modelId: value.modelId,
    reasoningEffort: value.reasoningEffort,
  };
}

export function AgentsManagement({
  allowedModelIds,
  allowedReasoningEfforts,
}: {
  allowedModelIds: string[];
  allowedReasoningEfforts?: Array<'low' | 'medium' | 'high'>;
}) {
  const { data, isLoading, error, refetch, isFetching } = useAgents();
  const createAgent = useCreateAgent();
  const updateAgent = useUpdateAgent();
  const deleteAgent = useDeleteAgent();
  const [status, setStatus] = useState<AgentStatusState>('idle');
  const statusTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current !== null) {
        window.clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const modelOptions = useMemo(() => {
    const unique = Array.from(new Set(allowedModelIds));
    return unique.map((id) => deriveChatModel(id));
  }, [allowedModelIds]);
  const reasoningOptions = useMemo(() => {
    if (allowedReasoningEfforts === undefined) {
      return REASONING_OPTIONS;
    }
    return REASONING_OPTIONS.filter((option) =>
      allowedReasoningEfforts.includes(option.value)
    );
  }, [allowedReasoningEfforts]);
  const allowedModelIdSet = useMemo(
    () => new Set(modelOptions.map((model) => model.id)),
    [modelOptions]
  );
  const reasoningValueSet = useMemo(
    () =>
      new Set(
        allowedReasoningEfforts && allowedReasoningEfforts.length > 0
          ? allowedReasoningEfforts
          : REASONING_OPTIONS.map((option) => option.value)
      ),
    [allowedReasoningEfforts]
  );

  const sanitizeSettings = useCallback(
    (value: AgentSettingsValue): AgentSettingsValue => {
      const nextModelId =
        value.modelId && allowedModelIdSet.has(value.modelId)
          ? value.modelId
          : undefined;
      const nextReasoningEffort =
        value.reasoningEffort && reasoningValueSet.has(value.reasoningEffort)
          ? value.reasoningEffort
          : undefined;

      if (
        nextModelId === value.modelId &&
        nextReasoningEffort === value.reasoningEffort
      ) {
        return value;
      }

      return {
        ...value,
        modelId: nextModelId,
        reasoningEffort: nextReasoningEffort,
      };
    },
    [allowedModelIdSet, reasoningValueSet]
  );

  const getModelDisplayName = useCallback(
    (modelId: string | undefined) => {
      if (!modelId) return 'Workspace default';
      const option = modelOptions.find((model) => model.id === modelId);
      if (option) return option.name;
      return deriveChatModel(modelId).name;
    },
    [modelOptions]
  );

  const getReasoningLabel = useCallback((value: string | undefined) => {
    if (value !== 'low' && value !== 'medium' && value !== 'high') {
      return 'Workspace default';
    }
    const option = REASONING_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  }, []);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<AgentFormState>(() => ({
    name: '',
    description: '',
    settings: sanitizeSettings(cloneAgentSettings()),
  }));
  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);

  useEffect(() => {
    setFormData((prev) => {
      const nextSettings = sanitizeSettings(prev.settings);
      if (nextSettings === prev.settings) {
        return prev;
      }
      return {
        ...prev,
        settings: nextSettings,
      };
    });
  }, [sanitizeSettings]);

  const resetFormState = () => {
    setFormData({
      name: '',
      description: '',
      settings: sanitizeSettings(cloneAgentSettings()),
    });
  };

  const addPinnedEntry = (slug: string) => {
    const trimmed = slug.trim();
    if (!trimmed) return;
    setFormData((prev) => {
      if (prev.settings.pinnedEntries.includes(trimmed)) return prev;
      if (prev.settings.pinnedEntries.length >= 12) return prev;
      const nextSettings: AgentSettingsValue = {
        ...prev.settings,
        pinnedEntries: [...prev.settings.pinnedEntries, trimmed],
      };
      return { ...prev, settings: nextSettings };
    });
  };

  const removePinnedEntry = (slug: string) => {
    setFormData((prev) => {
      if (!prev.settings.pinnedEntries.includes(slug)) return prev;
      const nextSettings: AgentSettingsValue = {
        ...prev.settings,
        pinnedEntries: prev.settings.pinnedEntries.filter((s) => s !== slug),
      };
      return { ...prev, settings: nextSettings };
    });
  };

  const updateAllowedTools = (tools: string[] | undefined) => {
    const normalized = tools
      ? tools.filter(
          (t): t is ChatToolId =>
            typeof t === 'string' && CHAT_TOOL_IDS.includes(t as ChatToolId)
        )
      : undefined;
    const deduped = normalized ? Array.from(new Set(normalized)) : undefined;
    setFormData((prev) => ({
      ...prev,
      settings: sanitizeSettings({
        ...prev.settings,
        allowedTools: deduped ? [...deduped] : deduped,
      }),
    }));
  };

  const showStatus = useCallback((next: AgentStatusState, ttl = 1800) => {
    if (statusTimerRef.current !== null) {
      window.clearTimeout(statusTimerRef.current);
    }
    if (next === 'idle') {
      setStatus('idle');
      statusTimerRef.current = null;
      return;
    }
    setStatus(next);
    statusTimerRef.current = window.setTimeout(() => {
      setStatus('idle');
      statusTimerRef.current = null;
    }, ttl);
  }, []);

  const handleCreate = async () => {
    if (createAgent.isPending) return;
    const trimmedName = formData.name.trim();
    if (!trimmedName) return;

    try {
      const settingsPayload = agentSettingsToChatSettings(formData.settings);
      await createAgent.mutateAsync({
        name: trimmedName,
        description: formData.description.trim() || undefined,
        settings: agentSettingsIsDefault(formData.settings)
          ? undefined
          : settingsPayload,
      });
      toast.success('Agent created successfully');
      setIsCreateDialogOpen(false);
      resetFormState();
      showStatus('created');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to create agent';
      toast.error(message);
      showStatus('error', 2600);
    }
  };

  const handleUpdate = async () => {
    if (!editingAgent || updateAgent.isPending) return;
    const trimmedName = formData.name.trim();
    if (!trimmedName) return;

    try {
      const settingsPayload = agentSettingsToChatSettings(formData.settings);
      await updateAgent.mutateAsync({
        id: editingAgent.id,
        data: {
          name: trimmedName,
          description: formData.description.trim() || undefined,
          settings: settingsPayload,
        },
      });
      toast.success('Agent updated successfully');
      setEditingAgent(null);
      resetFormState();
      showStatus('updated');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update agent';
      toast.error(message);
      showStatus('error', 2600);
    }
  };

  const handleDelete = async (agent: Agent) => {
    if (deleteAgent.isPending) return;
    if (!confirm(`Are you sure you want to delete "${agent.name}"?`)) return;

    setDeletingAgentId(agent.id);
    try {
      await deleteAgent.mutateAsync(agent.id);
      toast.success('Agent deleted successfully');
      showStatus('deleted');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to delete agent';
      toast.error(message);
      showStatus('error', 2600);
    } finally {
      setDeletingAgentId(null);
    }
  };

  const openEditDialog = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      description: agent.description || '',
      settings: sanitizeSettings(
        cloneAgentSettings(
          agentSettingsFromChatSettings(
            agent.settings as ChatSettings | null | undefined
          )
        )
      ),
    });
  };

  const handleStartChat = (agent: Agent) => {
    // Redirect to chat page with agentId
    window.location.href = `/chat?agentId=${agent.id}`;
  };

  const statusMeta = useMemo(() => {
    if (status === 'idle') return null;
    const meta: Record<
      Exclude<AgentStatusState, 'idle'>,
      {
        label: string;
        tone: string;
        icon: ReactNode;
      }
    > = {
      created: {
        label: 'Agent created',
        tone: 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/30',
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      updated: {
        label: 'Agent updated',
        tone: 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/30',
        icon: <Sparkles className="h-4 w-4" />,
      },
      deleted: {
        label: 'Agent removed',
        tone: 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/30',
        icon: <Trash2 className="h-4 w-4" />,
      },
      error: {
        label: 'Something went wrong',
        tone: 'bg-destructive/10 text-destructive ring-1 ring-destructive/20',
        icon: <CircleAlert className="h-4 w-4" />,
      },
    };

    return meta[status as Exclude<AgentStatusState, 'idle'>];
  }, [status]);

  const isBusy =
    isFetching ||
    createAgent.isPending ||
    updateAgent.isPending ||
    deleteAgent.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading agents…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-6 text-sm text-destructive">
        <span>Failed to load agents.</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Retrying…
            </>
          ) : (
            'Retry'
          )}
        </Button>
      </div>
    );
  }

  const agents = data?.agents || [];

  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <motion.div layout className="space-y-1">
          <motion.h2 layout className="text-lg font-semibold">
            AI Agents
          </motion.h2>
          <motion.p
            layout
            className="text-sm text-muted-foreground"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            Create and manage AI agents with tailored models, memory, and tool
            access.
          </motion.p>
        </motion.div>
        <div className="flex flex-wrap items-center gap-3">
          <AnimatePresence>
            {statusMeta && (
              <motion.span
                key="agents-status"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${statusMeta.tone}`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center gap-1"
                  >
                    {statusMeta.icon}
                    <span>{statusMeta.label}</span>
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            )}
          </AnimatePresence>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (open) {
                setEditingAgent(null);
                resetFormState();
              } else {
                resetFormState();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
                <Plus className="mr-2 h-4 w-4" />
                New Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Agent</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Agent name"
                    maxLength={128}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Description (optional)
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe this agent..."
                    maxLength={1000}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Pinned memory</label>
                  <p className="text-xs text-muted-foreground">
                    Archive entries pinned here are always included when this
                    agent starts a chat.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <AnimatePresence initial={false}>
                      {formData.settings.pinnedEntries.length === 0 ? (
                        <motion.span
                          key="empty-pins"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-muted-foreground"
                        >
                          None
                        </motion.span>
                      ) : (
                        formData.settings.pinnedEntries.map((slug) => (
                          <motion.span
                            key={slug}
                            layout
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                          >
                            <Badge variant="secondary" className="text-[10px]">
                              {slug}
                            </Badge>
                          </motion.span>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-2">
                    <ChatPinnedArchive
                      key="agent-create-pins"
                      chatId="__agent_create__"
                      chatHasStarted={false}
                      stagedPinnedSlugs={formData.settings.pinnedEntries}
                      onAddStagedPin={addPinnedEntry}
                      onRemoveStagedPin={removePinnedEntry}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Allowed tools</label>
                  <p className="text-xs text-muted-foreground">
                    Choose which tools this agent can invoke. Leave as “All
                    tools” to allow everything.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <AnimatePresence initial={false}>
                      {formData.settings.allowedTools === undefined ? (
                        <motion.span
                          key="all-tools"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          <Badge variant="outline" className="text-[10px]">
                            All tools
                          </Badge>
                        </motion.span>
                      ) : formData.settings.allowedTools.length === 0 ? (
                        <motion.span
                          key="no-tools"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          <Badge variant="destructive" className="text-[10px]">
                            No tools
                          </Badge>
                        </motion.span>
                      ) : (
                        formData.settings.allowedTools.map((tool) => (
                          <motion.span
                            key={tool}
                            layout
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                          >
                            <Badge variant="secondary" className="text-[10px]">
                              {tool}
                            </Badge>
                          </motion.span>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-2">
                    <ChatToolSelector
                      key="agent-create-tools"
                      chatId="__agent_create__"
                      chatHasStarted={false}
                      stagedAllowedTools={formData.settings.allowedTools}
                      onUpdateStagedAllowedTools={updateAllowedTools}
                      selectedModelId={
                        formData.settings.modelId === DEFAULT_MODEL_VALUE
                          ? undefined
                          : (formData.settings.modelId ?? undefined)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Base model</label>
                  <p className="text-xs text-muted-foreground">
                    Pick the default language model when chats start with this
                    agent.
                  </p>
                  <div className="mt-2">
                    <Select
                      value={formData.settings.modelId ?? DEFAULT_MODEL_VALUE}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          settings: sanitizeSettings({
                            ...prev.settings,
                            modelId:
                              value === DEFAULT_MODEL_VALUE ? undefined : value,
                          }),
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 w-full justify-between text-left text-sm">
                        <SelectValue placeholder="Workspace default" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DEFAULT_MODEL_VALUE}>
                          Workspace default
                        </SelectItem>
                        {modelOptions.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                {model.name}
                              </span>
                              {model.description && (
                                <span className="text-[11px] text-muted-foreground">
                                  {model.description}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Reasoning effort
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Control how much reasoning time this agent spends by
                    default.
                  </p>
                  <div className="mt-2">
                    <Select
                      value={
                        formData.settings.reasoningEffort ??
                        DEFAULT_REASONING_VALUE
                      }
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          settings: sanitizeSettings({
                            ...prev.settings,
                            reasoningEffort:
                              value === DEFAULT_REASONING_VALUE
                                ? undefined
                                : (value as 'low' | 'medium' | 'high'),
                          }),
                        }));
                      }}
                    >
                      <SelectTrigger className="h-9 w-full justify-between text-left text-sm">
                        <SelectValue placeholder="Workspace default" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DEFAULT_REASONING_VALUE}>
                          Workspace default
                        </SelectItem>
                        {reasoningOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                {option.label}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {option.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (!createAgent.isPending) setIsCreateDialogOpen(false);
                    }}
                    disabled={createAgent.isPending}
                    className="transition-transform active:scale-95"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreate}
                    disabled={!formData.name.trim() || createAgent.isPending}
                    className="shadow-sm transition-transform active:scale-95"
                  >
                    {createAgent.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      'Create'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AnimatePresence>
        {isBusy && (
          <motion.div
            key="agents-progress"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {agents.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-muted/30 py-12 text-center"
          >
            <Sparkles className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No agents yet. Create your first agent to get started.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {agents.map((agent) => {
                const isDeleting =
                  deleteAgent.isPending && deletingAgentId === agent.id;
                return (
                  <motion.div
                    key={agent.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    whileHover={{ translateY: -4 }}
                  >
                    <Card className="group relative overflow-hidden border-border/60 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between gap-2">
                          <span className="text-base font-semibold leading-tight">
                            {agent.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStartChat(agent)}
                              title="Start chat with this agent"
                              className="h-8 w-8 rounded-full transition-transform hover:scale-105 active:scale-95"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(agent)}
                              title="Edit agent"
                              className="h-8 w-8 rounded-full transition-transform hover:scale-105 active:scale-95"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(agent)}
                              title="Delete agent"
                              disabled={isDeleting}
                              aria-busy={isDeleting}
                              className="h-8 w-8 rounded-full transition-transform hover:scale-105 active:scale-95"
                            >
                              {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardTitle>
                        {agent.description && (
                          <CardDescription className="text-sm text-muted-foreground">
                            {agent.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <motion.div
                          layout
                          className="text-xs text-muted-foreground"
                        >
                          Created{' '}
                          {new Date(agent.createdAt).toLocaleDateString()}
                        </motion.div>
                        {(() => {
                          const settings = sanitizeSettings(
                            cloneAgentSettings(
                              agentSettingsFromChatSettings(
                                agent.settings as
                                  | ChatSettings
                                  | null
                                  | undefined
                              )
                            )
                          );
                          const modelLabel = getModelDisplayName(
                            settings.modelId
                          );
                          const reasoningLabel = getReasoningLabel(
                            settings.reasoningEffort
                          );
                          return (
                            <motion.div layout className="space-y-3">
                              <div>
                                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                  Pinned memory
                                </p>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  <AnimatePresence initial={false}>
                                    {settings.pinnedEntries.length === 0 ? (
                                      <motion.span
                                        key="agent-pins-empty"
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        className="text-xs text-muted-foreground"
                                      >
                                        None
                                      </motion.span>
                                    ) : (
                                      settings.pinnedEntries.map((slug) => (
                                        <motion.span
                                          key={slug}
                                          layout
                                          initial={{ opacity: 0, y: 4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -4 }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            className="text-[10px]"
                                          >
                                            {slug}
                                          </Badge>
                                        </motion.span>
                                      ))
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                              <div>
                                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                  Allowed tools
                                </p>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  <AnimatePresence initial={false}>
                                    {settings.allowedTools === undefined ? (
                                      <motion.span
                                        key="agent-tools-all"
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                      >
                                        <Badge
                                          variant="outline"
                                          className="text-[10px]"
                                        >
                                          All tools
                                        </Badge>
                                      </motion.span>
                                    ) : settings.allowedTools.length === 0 ? (
                                      <motion.span
                                        key="agent-tools-none"
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                      >
                                        <Badge
                                          variant="destructive"
                                          className="text-[10px]"
                                        >
                                          No tools
                                        </Badge>
                                      </motion.span>
                                    ) : (
                                      settings.allowedTools.map((tool) => (
                                        <motion.span
                                          key={tool}
                                          layout
                                          initial={{ opacity: 0, y: 4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -4 }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            className="text-[10px]"
                                          >
                                            {tool}
                                          </Badge>
                                        </motion.span>
                                      ))
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <div>
                                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                    Base model
                                  </p>
                                  <div className="mt-1 text-xs text-foreground">
                                    {modelLabel}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                    Reasoning effort
                                  </p>
                                  <div className="mt-1 text-xs text-foreground">
                                    {reasoningLabel}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingAgent}
        onOpenChange={(open) => {
          if (!open) {
            setEditingAgent(null);
            resetFormState();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Agent name"
                maxLength={128}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe this agent..."
                maxLength={1000}
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pinned memory</label>
              <p className="text-xs text-muted-foreground">
                Update which archive entries stay pinned when conversations
                start with this agent.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.settings.pinnedEntries.length === 0 ? (
                  <span className="text-xs text-muted-foreground">None</span>
                ) : (
                  formData.settings.pinnedEntries.map((slug) => (
                    <Badge
                      key={slug}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {slug}
                    </Badge>
                  ))
                )}
              </div>
              <div className="mt-2">
                <ChatPinnedArchive
                  key={`agent-edit-pins-${editingAgent?.id ?? 'unknown'}`}
                  chatId={editingAgent?.id ?? '__agent_edit__'}
                  chatHasStarted={false}
                  stagedPinnedSlugs={formData.settings.pinnedEntries}
                  onAddStagedPin={addPinnedEntry}
                  onRemoveStagedPin={removePinnedEntry}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Allowed tools</label>
              <p className="text-xs text-muted-foreground">
                Adjust the tool allow-list for this agent. All tools remain
                available when left in the default state.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.settings.allowedTools === undefined ? (
                  <Badge variant="outline" className="text-[10px]">
                    All tools
                  </Badge>
                ) : formData.settings.allowedTools.length === 0 ? (
                  <Badge variant="destructive" className="text-[10px]">
                    No tools
                  </Badge>
                ) : (
                  formData.settings.allowedTools.map((tool) => (
                    <Badge
                      key={tool}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {tool}
                    </Badge>
                  ))
                )}
              </div>
              <div className="mt-2">
                <ChatToolSelector
                  key={`agent-edit-tools-${editingAgent?.id ?? 'unknown'}`}
                  chatId={editingAgent?.id ?? '__agent_edit__'}
                  chatHasStarted={false}
                  stagedAllowedTools={formData.settings.allowedTools}
                  onUpdateStagedAllowedTools={updateAllowedTools}
                  selectedModelId={
                    formData.settings.modelId === DEFAULT_MODEL_VALUE
                      ? undefined
                      : (formData.settings.modelId ?? undefined)
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Base model</label>
              <p className="text-xs text-muted-foreground">
                Choose which model the agent prefers when a chat starts.
              </p>
              <div className="mt-2">
                <Select
                  value={formData.settings.modelId ?? DEFAULT_MODEL_VALUE}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      settings: sanitizeSettings({
                        ...prev.settings,
                        modelId:
                          value === DEFAULT_MODEL_VALUE ? undefined : value,
                      }),
                    }));
                  }}
                >
                  <SelectTrigger className="h-9 w-full text-left text-sm justify-between">
                    <SelectValue placeholder="Workspace default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DEFAULT_MODEL_VALUE}>
                      Workspace default
                    </SelectItem>
                    {modelOptions.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {model.name}
                          </span>
                          {model.description && (
                            <span className="text-[11px] text-muted-foreground">
                              {model.description}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Reasoning effort</label>
              <p className="text-xs text-muted-foreground">
                Adjust how much reasoning time this agent should take by
                default.
              </p>
              <div className="mt-2">
                <Select
                  value={
                    formData.settings.reasoningEffort ?? DEFAULT_REASONING_VALUE
                  }
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      settings: sanitizeSettings({
                        ...prev.settings,
                        reasoningEffort:
                          value === DEFAULT_REASONING_VALUE
                            ? undefined
                            : (value as 'low' | 'medium' | 'high'),
                      }),
                    }));
                  }}
                >
                  <SelectTrigger className="h-9 w-full text-left text-sm justify-between">
                    <SelectValue placeholder="Workspace default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DEFAULT_REASONING_VALUE}>
                      Workspace default
                    </SelectItem>
                    {reasoningOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {option.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (updateAgent.isPending) return;
                  setEditingAgent(null);
                  resetFormState();
                }}
                disabled={updateAgent.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.name.trim() || updateAgent.isPending}
              >
                {updateAgent.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
