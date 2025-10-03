'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAgents } from '@/hooks/use-agents';
import type { Agent } from '@/lib/db/schema';
import { Badge } from '@/components/ui/badge';
import { Check, Loader, Sparkles, User } from 'lucide-react';

export type AgentPreset = Pick<
  Agent,
  'id' | 'name' | 'description' | 'settings'
>;

interface ChatAgentSelectorProps {
  selectedAgentId?: string;
  selectedAgentLabel?: string;
  chatHasStarted: boolean;
  // agent: selected agent (or null for default)
  // options.userInitiated: true when user clicked in UI; false when parent is syncing props
  onSelectAgent?: (
    agent: AgentPreset | null,
    options?: { userInitiated?: boolean }
  ) => void | Promise<void>;
}

export function ChatAgentSelector({
  selectedAgentId,
  selectedAgentLabel,
  chatHasStarted: _chatHasStarted,
  onSelectAgent,
}: ChatAgentSelectorProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useAgents();

  const agents = useMemo<AgentPreset[]>(
    () =>
      (data?.agents ?? []).map((agent) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        settings: agent.settings,
      })),
    [data?.agents]
  );

  const effectiveSelected = useMemo(() => {
    if (!selectedAgentId) return undefined;
    return agents.find((agent) => agent.id === selectedAgentId);
  }, [agents, selectedAgentId]);

  const displayLabel =
    effectiveSelected?.name ?? selectedAgentLabel ?? 'Default';

  const canModify = Boolean(onSelectAgent);
  const [isApplying, setIsApplying] = useState(false);
  const buttonDisabled = !canModify || isApplying;
  const syncedAgentRef = useRef<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (!canModify) return;
    setOpen(next);
  };

  const chooseAgent = async (agent: AgentPreset | null) => {
    if (!onSelectAgent) return;
    const result = onSelectAgent(agent, { userInitiated: true });
    // If caller returned a promise, await it and show spinner
    if (result && typeof (result as Promise<void>).then === 'function') {
      try {
        setIsApplying(true);
        await result;
        // mark synced only after successful apply
        syncedAgentRef.current = agent ? agent.id : null;
      } catch (e) {
        // swallow here; caller is expected to show errors
      } finally {
        setIsApplying(false);
      }
    } else {
      // synchronous handler
      syncedAgentRef.current = agent ? agent.id : null;
    }
    setOpen(false);
  };

  useEffect(() => {
    // Sync ref when selectedAgentId changes from parent
    syncedAgentRef.current = selectedAgentId ?? null;
  }, [selectedAgentId]);

  return (
    <Popover
      open={canModify ? open : false}
      onOpenChange={handleOpenChange}
      modal={false}
    >
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-2"
          disabled={buttonDisabled}
        >
          {/* mobile: icon only */}
          <User size={16} className="md:hidden" />
          {/* desktop: label + badge */}
          <span className="hidden md:inline text-xs font-medium">Agent</span>
          <Badge
            variant="secondary"
            className="hidden md:inline max-w-[110px] truncate text-[10px] leading-none px-1 py-0"
          >
            {displayLabel}
          </Badge>
          {isLoading && canModify && (
            <span className="animate-spin">
              <Loader size={12} />
            </span>
          )}
          {isApplying && (
            <span className="animate-spin">
              <Loader size={12} />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0 shadow-lg">
        <div className="flex items-center justify-between border-b px-3 py-2 text-xs font-medium">
          <span>Agents</span>
          {isLoading && (
            <span className="text-[10px] text-muted-foreground">Loading…</span>
          )}
          {isApplying && (
            <span className="text-[10px] text-muted-foreground">Applying…</span>
          )}
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2 flex flex-col gap-1">
          <button
            type="button"
            className={cn(
              'flex items-center justify-between gap-3 rounded-md border px-2 py-1 text-xs hover:bg-accent',
              !selectedAgentId ? 'bg-accent/60' : 'bg-background'
            )}
            onClick={() => chooseAgent(null)}
            disabled={isApplying}
          >
            <div className="flex items-center gap-2 truncate">
              <Sparkles size={12} className="text-primary" />
              <span className="truncate">Default settings</span>
            </div>
            {!selectedAgentId && <Check size={12} />}
          </button>
          {agents.length === 0 && !isLoading ? (
            <div className="rounded-md border border-dashed px-3 py-4 text-center text-[11px] text-muted-foreground">
              No agents available yet.
            </div>
          ) : (
            agents.map((agent) => {
              const isActive = agent.id === selectedAgentId;
              return (
                <button
                  key={agent.id}
                  type="button"
                  className={cn(
                    'flex flex-col gap-1 rounded-md border px-3 py-2 text-left text-xs hover:bg-accent',
                    isActive ? 'bg-accent/60' : 'bg-background'
                  )}
                  onClick={() => chooseAgent(agent)}
                  disabled={isApplying}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate" title={agent.name}>
                      {agent.name}
                    </span>
                    {isActive && <Check size={12} />}
                  </div>
                  {agent.description && (
                    <p
                      className="text-[10px] text-muted-foreground truncate"
                      title={agent.description}
                    >
                      {agent.description}
                    </p>
                  )}
                </button>
              );
            })
          )}
        </div>
        {error && (
          <div className="border-t px-3 py-2 text-[11px] text-destructive">
            Failed to load agents. Please retry later.
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
