import React, { useCallback } from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';

let requestSyncCalls: Array<[string, string]> = [];
let cachedChats: any[] = [];
let appliedMessages: any[][] = [];
let deletedCount = 0;

mock.module('@/components/encrypted-cache-provider', () => ({
  useEncryptedCache: () => ({
    cachedChats,
  }),
}));

mock.module('@/lib/cache/sync-manager', () => ({
  getSyncManager: () => ({
    requestSync: (source: string, chatId?: string) => {
      if (chatId) requestSyncCalls.push([source, chatId]);
    },
  }),
}));

const { useExternalChatSync } =
  await import('@/components/chat/use-external-chat-sync');

function snapshot(cachedAt: number) {
  return [
    {
      chatId: 'chat-1',
      lastUpdatedAt: cachedAt,
      cachedAt,
      data: {
        bootstrap: {
          kind: 'existing',
          chatId: 'chat-1',
          initialMessages: [
            {
              id: `message-${cachedAt}`,
              chatId: 'chat-1',
              role: 'user',
              parts: [{ type: 'text', text: 'Updated elsewhere' }],
              attachments: [],
              createdAt: new Date(),
              pathText: '_00',
              selectedChildIndex: 0,
            },
          ],
          initialBranchState: { rootMessageIndex: 0 },
        },
      },
    },
  ];
}

function Harness({ isStreaming }: { isStreaming: boolean }) {
  const setMessages = useCallback(
    (updater: (previous: any[]) => any[]) => appliedMessages.push(updater([])),
    []
  );
  const onChatDeleted = useCallback(() => {
    deletedCount += 1;
  }, []);

  useExternalChatSync({
    chatId: 'chat-1',
    messages: [],
    setMessages,
    isStreaming,
    onChatDeleted,
  });
  return null;
}

describe('useExternalChatSync', () => {
  beforeEach(() => {
    requestSyncCalls = [];
    cachedChats = [];
    appliedMessages = [];
    deletedCount = 0;
  });

  afterEach(() => {
    cachedChats = [];
  });

  it('applies an authoritative cached snapshot to the mounted chat', async () => {
    const view = render(<Harness isStreaming={false} />);
    cachedChats = snapshot(1);

    await act(async () => {
      view.rerender(<Harness isStreaming={false} />);
    });

    expect(appliedMessages).toHaveLength(1);
    expect(appliedMessages[0]?.[0]?.id).toBe('message-1');
    view.unmount();
  });

  it('does not replay an interim streaming snapshot before requesting a fresh sync', async () => {
    const view = render(<Harness isStreaming={true} />);
    cachedChats = snapshot(1);

    await act(async () => {
      view.rerender(<Harness isStreaming={true} />);
    });
    expect(appliedMessages).toHaveLength(0);

    await act(async () => {
      view.rerender(<Harness isStreaming={false} />);
    });
    expect(requestSyncCalls).toEqual([['tab-request', 'chat-1']]);
    expect(appliedMessages).toHaveLength(0);

    cachedChats = snapshot(2);
    await act(async () => {
      view.rerender(<Harness isStreaming={false} />);
    });
    expect(appliedMessages[0]?.[0]?.id).toBe('message-2');
    view.unmount();
  });

  it('clears and closes a mounted chat once its authoritative snapshot is deleted', async () => {
    const view = render(<Harness isStreaming={false} />);
    cachedChats = snapshot(1);
    await act(async () => {
      view.rerender(<Harness isStreaming={false} />);
    });

    cachedChats = [];
    await act(async () => {
      view.rerender(<Harness isStreaming={false} />);
    });

    expect(appliedMessages.at(-1)).toEqual([]);
    expect(deletedCount).toBe(1);
    view.unmount();
  });
});
