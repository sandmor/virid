"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChatPinnedArchive } from "./chat-pinned-archive";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";
import { ChatToolSelector } from "./chat-tool-selector";
import { ChatAgentSelector, type AgentPreset } from "./chat-agent-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
  stagedPinnedSlugs,
  onAddStagedPin,
  onRemoveStagedPin,
  chatHasStarted,
  stagedAllowedTools,
  onUpdateStagedAllowedTools,
  selectedAgentId,
  selectedAgentLabel,
  onSelectAgent,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  stagedPinnedSlugs: string[];
  onAddStagedPin: (slug: string) => void;
  onRemoveStagedPin: (slug: string) => void;
  chatHasStarted: boolean;
  stagedAllowedTools?: string[] | undefined;
  onUpdateStagedAllowedTools?: (tools: string[] | undefined) => void;
  selectedAgentId?: string;
  selectedAgentLabel?: string | null;
  onSelectAgent?: (agent: AgentPreset | null) => void;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          variant="outline"
        >
          <Plus size={16} />
          <span className="md:sr-only">New Chat</span>
        </Button>
      )}

      {!isReadonly && (
        <div className="ml-auto flex items-center gap-2">
          <VisibilitySelector
            chatId={chatId}
            className="order-1 md:order-2"
            selectedVisibilityType={selectedVisibilityType}
          />
          <ChatAgentSelector
            chatHasStarted={chatHasStarted}
            selectedAgentId={selectedAgentId}
            selectedAgentLabel={selectedAgentLabel ?? undefined}
            onSelectAgent={onSelectAgent}
          />
          <ChatPinnedArchive
            chatId={chatId}
            stagedPinnedSlugs={stagedPinnedSlugs}
            onAddStagedPin={onAddStagedPin}
            onRemoveStagedPin={onRemoveStagedPin}
            chatHasStarted={chatHasStarted}
          />
          <ChatToolSelector
            chatId={chatId}
            chatHasStarted={chatHasStarted}
            stagedAllowedTools={stagedAllowedTools}
            onUpdateStagedAllowedTools={onUpdateStagedAllowedTools}
          />
        </div>
      )}
    </header>
  );
}

export const ChatHeader = memo(
  PureChatHeader,
  (prevProps, nextProps) =>
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly &&
    prevProps.chatHasStarted === nextProps.chatHasStarted &&
    prevProps.stagedPinnedSlugs.join("|") ===
      nextProps.stagedPinnedSlugs.join("|") &&
    (prevProps.stagedAllowedTools?.join("|") ?? "__all__") ===
      (nextProps.stagedAllowedTools?.join("|") ?? "__all__") &&
    (prevProps.selectedAgentId ?? "__none__") ===
      (nextProps.selectedAgentId ?? "__none__") &&
    (prevProps.selectedAgentLabel ?? "") ===
      (nextProps.selectedAgentLabel ?? "")
);
