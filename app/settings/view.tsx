"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArchiveExplorer } from "../profile/view"; // reuse existing implementation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsView({ defaultTab, isAdmin, adminContent }: { defaultTab: 'archive' | 'admin'; isAdmin: boolean; adminContent?: React.ReactNode }) {
  const router = useRouter();
  const search = useSearchParams();
  const [tab, setTab] = useState<'archive' | 'admin'>(defaultTab);

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
  <Tabs value={tab} onValueChange={(v)=> setTab(v as 'archive' | 'admin')} className="flex flex-col h-full min-h-0">
      <div className="px-6 pb-2 border-b">
        <TabsList>
          <TabsTrigger value="archive">Archive</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden pt-4">
        <TabsContent value="archive" className="flex h-full min-h-0 flex-col overflow-hidden">
          {tab === 'archive' && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <ArchiveExplorer />
            </div>
          )}
        </TabsContent>
        {isAdmin && (
          <TabsContent value="admin" className="flex h-full min-h-0 flex-col overflow-auto">
            {tab === 'admin' && adminContent}
          </TabsContent>
        )}
        {!isAdmin && tab === 'admin' && (
          <div className="p-6 text-sm text-muted-foreground">Access denied.</div>
        )}
      </div>
    </Tabs>
  );
}
