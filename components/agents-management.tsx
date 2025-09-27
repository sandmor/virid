"use client";
import { useState } from "react";
import {
  useAgents,
  useCreateAgent,
  useUpdateAgent,
  useDeleteAgent,
} from "@/hooks/use-agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Agent, ChatSettings } from "@/lib/db/schema";
import { ChatPinnedArchive } from "@/components/chat-pinned-archive";
import { ChatToolSelector } from "@/components/chat-tool-selector";
import { CHAT_TOOL_IDS, type ChatToolId } from "@/lib/ai/tool-ids";
import {
  DEFAULT_AGENT_SETTINGS,
  agentSettingsFromChatSettings,
  agentSettingsIsDefault,
  agentSettingsToChatSettings,
  type AgentSettingsValue,
} from "@/lib/agent-settings";

interface AgentFormState {
  name: string;
  description: string;
  settings: AgentSettingsValue;
}

function cloneAgentSettings(
  value: AgentSettingsValue = DEFAULT_AGENT_SETTINGS
): AgentSettingsValue {
  return {
    pinnedEntries: [...value.pinnedEntries],
    allowedTools: value.allowedTools ? [...value.allowedTools] : undefined,
  };
}

export function AgentsManagement() {
  const { data, isLoading, error, refetch, isFetching } = useAgents();
  const createAgent = useCreateAgent();
  const updateAgent = useUpdateAgent();
  const deleteAgent = useDeleteAgent();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<AgentFormState>(() => ({
    name: "",
    description: "",
    settings: cloneAgentSettings(),
  }));
  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);

  const resetFormState = () => {
    setFormData({
      name: "",
      description: "",
      settings: cloneAgentSettings(),
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
            typeof t === "string" && CHAT_TOOL_IDS.includes(t as ChatToolId)
        )
      : undefined;
    const deduped = normalized ? Array.from(new Set(normalized)) : undefined;
    setFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        allowedTools: deduped ? [...deduped] : deduped,
      },
    }));
  };

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
      toast.success("Agent created successfully");
      setIsCreateDialogOpen(false);
      resetFormState();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create agent";
      toast.error(message);
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
      toast.success("Agent updated successfully");
      setEditingAgent(null);
      resetFormState();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update agent";
      toast.error(message);
    }
  };

  const handleDelete = async (agent: Agent) => {
    if (deleteAgent.isPending) return;
    if (!confirm(`Are you sure you want to delete "${agent.name}"?`)) return;

    setDeletingAgentId(agent.id);
    try {
      await deleteAgent.mutateAsync(agent.id);
      toast.success("Agent deleted successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete agent";
      toast.error(message);
    } finally {
      setDeletingAgentId(null);
    }
  };

  const openEditDialog = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      description: agent.description || "",
      settings: cloneAgentSettings(
        agentSettingsFromChatSettings(
          agent.settings as ChatSettings | null | undefined
        )
      ),
    });
  };

  const handleStartChat = (agent: Agent) => {
    // Redirect to chat page with agentId
    window.location.href = `/chat?agentId=${agent.id}`;
  };

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
            "Retry"
          )}
        </Button>
      </div>
    );
  }

  const agents = data?.agents || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">AI Agents</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage AI agents with custom settings for your chats.
          </p>
        </div>
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
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                  Choose which tools this agent can invoke. Leave as “All tools”
                  to allow everything.
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
                    key="agent-create-tools"
                    chatId="__agent_create__"
                    chatHasStarted={false}
                    stagedAllowedTools={formData.settings.allowedTools}
                    onUpdateStagedAllowedTools={updateAllowedTools}
                  />
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
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!formData.name.trim() || createAgent.isPending}
                >
                  {createAgent.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No agents yet. Create your first agent to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const isDeleting =
              deleteAgent.isPending && deletingAgentId === agent.id;
            return (
              <Card key={agent.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {agent.name}
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartChat(agent)}
                        title="Start chat with this agent"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(agent)}
                        title="Edit agent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(agent)}
                        title="Delete agent"
                        disabled={isDeleting}
                        aria-busy={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardTitle>
                  {agent.description && (
                    <CardDescription>{agent.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(agent.createdAt).toLocaleDateString()}
                  </div>
                  {(() => {
                    const settings = agentSettingsFromChatSettings(
                      agent.settings as ChatSettings | null | undefined
                    );
                    return (
                      <div className="space-y-2">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            Pinned memory
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {settings.pinnedEntries.length === 0 ? (
                              <span className="text-xs text-muted-foreground">
                                None
                              </span>
                            ) : (
                              settings.pinnedEntries.map((slug) => (
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
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            Allowed tools
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {settings.allowedTools === undefined ? (
                              <Badge variant="outline" className="text-[10px]">
                                All tools
                              </Badge>
                            ) : settings.allowedTools.length === 0 ? (
                              <Badge
                                variant="destructive"
                                className="text-[10px]"
                              >
                                No tools
                              </Badge>
                            ) : (
                              settings.allowedTools.map((tool) => (
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
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

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
        <DialogContent>
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
                  key={`agent-edit-pins-${editingAgent?.id ?? "unknown"}`}
                  chatId={editingAgent?.id ?? "__agent_edit__"}
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
                  key={`agent-edit-tools-${editingAgent?.id ?? "unknown"}`}
                  chatId={editingAgent?.id ?? "__agent_edit__"}
                  chatHasStarted={false}
                  stagedAllowedTools={formData.settings.allowedTools}
                  onUpdateStagedAllowedTools={updateAllowedTools}
                />
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
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
