'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArchiveExplorer } from '../profile/view'; // reuse existing implementation
import { AgentsManagement } from '@/components/agents-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsView({
  defaultTab,
  isAdmin,
  adminContent,
}: {
  defaultTab: 'archive' | 'agents' | 'admin';
  isAdmin: boolean;
  adminContent?: React.ReactNode;
}) {
  const router = useRouter();
  const search = useSearchParams();
  const [tab, setTab] = useState<'archive' | 'agents' | 'admin'>(defaultTab);

  // Keep URL in sync (avoid full page reload; just push shallow)
  useEffect(() => {
    const current = search.get('tab');
    if (current !== tab) {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      router.replace(url.pathname + '?' + url.searchParams.toString());
    }
  }, [tab]);

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as 'archive' | 'agents' | 'admin')}
      className="flex flex-col h-full min-h-0"
    >
      <div className="px-6 pb-3">
        <TabsList className="rounded-full border border-border/60 bg-muted/50 px-1.5 py-1 shadow-sm backdrop-blur">
          <TabsTrigger value="archive" className="rounded-full px-4 py-1.5">
            Archive
          </TabsTrigger>
          <TabsTrigger value="agents" className="rounded-full px-4 py-1.5">
            Agents
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin" className="rounded-full px-4 py-1.5">
              Admin
            </TabsTrigger>
          )}
        </TabsList>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden pt-2">
        <TabsContent
          value="archive"
          className="flex h-full min-h-0 flex-col overflow-hidden"
        >
          {tab === 'archive' && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 1.02, 0.73, 1] }}
              className="flex-1 min-h-0 overflow-hidden"
            >
              <ArchiveExplorer />
            </motion.div>
          )}
        </TabsContent>
        <TabsContent
          value="agents"
          className="flex h-full min-h-0 flex-col overflow-hidden"
        >
          {tab === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 1.02, 0.73, 1] }}
              className="flex-1 min-h-0 overflow-hidden"
            >
              <AgentsManagement />
            </motion.div>
          )}
        </TabsContent>
        {isAdmin && (
          <TabsContent
            value="admin"
            className="flex h-full min-h-0 flex-col overflow-auto"
          >
            {tab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.21, 1.02, 0.73, 1] }}
                className="flex-1"
              >
                {adminContent}
              </motion.div>
            )}
          </TabsContent>
        )}
        {!isAdmin && tab === 'admin' && (
          <div className="p-6 text-sm text-muted-foreground">
            Access denied.
          </div>
        )}
      </div>
    </Tabs>
  );
}
