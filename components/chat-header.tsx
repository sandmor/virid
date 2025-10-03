'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ChatPinnedArchive } from './chat-pinned-archive';
import { useSidebar } from './ui/sidebar';
import { VisibilitySelector, type VisibilityType } from './visibility-selector';
import { ChatToolSelector } from './chat-tool-selector';
import { ChatAgentSelector, type AgentPreset } from './chat-agent-selector';
import { motion } from 'framer-motion';
import type { ChatModelCapabilitiesSummary } from '@/lib/ai/models';

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
  selectedModelId,
  selectedModelCapabilities,
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
  selectedModelId?: string;
  selectedModelCapabilities?: ChatModelCapabilitiesSummary | null;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2"
    >
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
          onClick={() => {
            router.push('/');
            router.refresh();
          }}
          variant="outline"
        >
          <Plus size={16} />
          <span className="sr-only md:not-sr-only md:ml-2">New Chat</span>
        </Button>
      )}

      {!isReadonly && (
        <div className="ml-auto flex items-center gap-1 md:gap-2">
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
            selectedModelId={selectedModelId}
            selectedModelCapabilities={selectedModelCapabilities}
          />
        </div>
      )}
    </motion.header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  if (prevProps.chatId !== nextProps.chatId) return false;
  if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
    return false;
  if (prevProps.isReadonly !== nextProps.isReadonly) return false;
  if (prevProps.chatHasStarted !== nextProps.chatHasStarted) return false;
  if (
    prevProps.stagedPinnedSlugs.join('|') !==
    nextProps.stagedPinnedSlugs.join('|')
  )
    return false;
  if (
    (prevProps.stagedAllowedTools?.join('|') ?? '__all__') !==
    (nextProps.stagedAllowedTools?.join('|') ?? '__all__')
  ) {
    return false;
  }
  if (
    (prevProps.selectedAgentId ?? '__none__') !==
    (nextProps.selectedAgentId ?? '__none__')
  )
    return false;
  if (
    (prevProps.selectedAgentLabel ?? '') !==
    (nextProps.selectedAgentLabel ?? '')
  )
    return false;
  if ((prevProps.selectedModelId ?? '') !== (nextProps.selectedModelId ?? ''))
    return false;

  const prevCaps = prevProps.selectedModelCapabilities;
  const nextCaps = nextProps.selectedModelCapabilities;
  if ((prevCaps?.supportsTools ?? true) !== (nextCaps?.supportsTools ?? true))
    return false;

  const prevFormats = prevCaps?.supportedFormats ?? [];
  const nextFormats = nextCaps?.supportedFormats ?? [];
  if (prevFormats.length !== nextFormats.length) return false;
  for (let i = 0; i < prevFormats.length; i++) {
    if (prevFormats[i] !== nextFormats[i]) return false;
  }

  return true;
});
