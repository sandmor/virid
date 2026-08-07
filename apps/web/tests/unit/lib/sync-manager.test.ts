import { SyncManager } from '@/lib/cache/sync-manager';
import { afterEach, describe, expect, it } from 'bun:test';

const managers: SyncManager[] = [];

function createManager(onSync: ConstructorParameters<typeof SyncManager>[0]['onSync']) {
  const manager = new SyncManager({ onSync, debounceMs: 0 });
  // Leader election is tested separately; these tests exercise the sync
  // coordinator's cache-completeness behavior deterministically.
  (manager as any).isLeader = () => true;
  managers.push(manager);
  return manager;
}

afterEach(() => {
  for (const manager of managers.splice(0)) {
    manager.destroy();
  }
  window.localStorage.clear();
});

describe('SyncManager cache completeness', () => {
  it('passes a complete manual sync request to the cache callback', async () => {
    let syncOptions: unknown;
    const manager = createManager(async (options) => {
      syncOptions = options;
    });

    await manager.forceSync();

    expect(syncOptions).toEqual({ force: true, source: 'manual' });
  });

  it('queues a local refresh when publishing a message invalidation', async () => {
    let syncCount = 0;
    const manager = createManager(async () => {
      syncCount += 1;
    });

    manager.notifyMessagesUpdated('chat-1');
    await manager.forceSync();

    expect(syncCount).toBe(1);
  });
});
