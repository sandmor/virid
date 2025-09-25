"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { SUPPORTED_PROVIDERS, displayProviderName } from "@/lib/ai/registry";
import { useRouter } from "next/navigation";

export function ProvidersEditor({ initialKeys }: { initialKeys: Record<string, string | undefined> }) {
  const router = useRouter();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, string>>(Object.fromEntries(
    SUPPORTED_PROVIDERS.map((p) => [p, initialKeys[p] || ""]) as Array<[string, string]>
  ));
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});

  async function save(id: string) {
    setSubmitting((s) => ({ ...s, [id]: true }));
    try {
      const apiKey = keys[id]?.trim();
      if (!apiKey) return;
      await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, apiKey }),
      });
      router.refresh();
    } finally {
      setSubmitting((s) => ({ ...s, [id]: false }));
    }
  }

  async function remove(id: string) {
    setSubmitting((s) => ({ ...s, [id]: true }));
    try {
      await fetch(`/api/admin/providers?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setKeys((k) => ({ ...k, [id]: "" }));
      router.refresh();
    } finally {
      setSubmitting((s) => ({ ...s, [id]: false }));
    }
  }

  return (
    <div className="space-y-2">
      {SUPPORTED_PROVIDERS.map((p) => (
        <Collapsible key={p} open={open[p] ?? false} onOpenChange={(o) => setOpen((s) => ({ ...s, [p]: o }))}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="font-medium">{displayProviderName(p)}</span>
              <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 border rounded-md p-3 space-y-2">
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder={`${displayProviderName(p)} API key`}
                value={keys[p] || ""}
                onChange={(e) => setKeys((k) => ({ ...k, [p]: e.target.value }))}
              />
              <Button onClick={() => save(p)} disabled={submitting[p]}>Save</Button>
              <Button variant="destructive" onClick={() => remove(p)} disabled={submitting[p]}>Delete</Button>
            </div>
            <p className="text-xs text-muted-foreground">This stores an override for {p} in the database. If absent, the app will fall back to environment variables.</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Separator />
    </div>
  );
}
