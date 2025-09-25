"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Combobox, type ComboOption } from "@/components/ui/combobox";
import { SUPPORTED_PROVIDERS, displayProviderName } from "@/lib/ai/registry";

export function ModelPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (models: string[]) => void;
}) {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [optionsByProvider, setOptionsByProvider] = useState<Record<string, ComboOption[]>>({});
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState<Record<string, any> | null>(null);

  // Shared fetch function
  async function fetchCatalog(force = false) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/models${force ? "?refresh=1" : ""}`);
      if (!res.ok) return;
      const cat = (await res.json()) as Record<string, any>;
      setCatalog(cat);
      const map: Record<string, ComboOption[]> = {};
      for (const p of SUPPORTED_PROVIDERS) {
        const entry = cat[p];
        const modelIds = entry?.models ? Object.keys(entry.models).sort() : [];
        map[p] = modelIds.map((m: string) => ({ value: `${p}:${m}`, label: m }));
      }
      setOptionsByProvider(map);
    } finally {
      setLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    fetchCatalog(false);
  }, []);

  // Listen for global refresh event dispatched elsewhere in the admin UI
  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent)?.detail as { force?: boolean } | undefined;
      fetchCatalog(!!detail?.force);
    }
    window.addEventListener("catalog:refresh", handler as EventListener);
    return () => window.removeEventListener("catalog:refresh", handler as EventListener);
  }, []);

  const selectedSet = useMemo(() => new Set(value), [value]);

  function addModel(id: string | null) {
    if (!id) return;
    if (selectedSet.has(id)) return;
    onChange([...value, id]);
  }

  function removeModel(id: string) {
    onChange(value.filter((m) => m !== id));
  }

  function addAllForProvider(p: string) {
    const opts = optionsByProvider[p] || [];
    const ids = opts.map((o) => o.value);
    const next = new Set(value);
    ids.forEach((id) => next.add(id));
    onChange(Array.from(next));
  }

  function removeAllForProvider(p: string) {
    const opts = optionsByProvider[p] || [];
    const idSet = new Set(opts.map((o) => o.value));
    onChange(value.filter((id) => !idSet.has(id)));
  }

  function addAllProviders() {
    const next = new Set(value);
    for (const p of SUPPORTED_PROVIDERS) {
      const opts = optionsByProvider[p] || [];
      opts.forEach((o) => next.add(o.value));
    }
    onChange(Array.from(next));
  }

  function removeAllProviders() {
    onChange([]);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Choose models for this tier</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
        {value.map((id) => (
          <Badge key={id} variant="secondary" className="text-xs">
            {id}
            <Button variant="ghost" size="sm" className="ml-2 h-5 px-1" onClick={() => removeModel(id)}>
              ✕
            </Button>
          </Badge>
        ))}
        {value.length === 0 && (
          <span className="text-xs text-muted-foreground">No models selected</span>
        )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={addAllProviders} disabled={loading}>
            Add all
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={removeAllProviders} disabled={loading}>
            Remove all
          </Button>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        {SUPPORTED_PROVIDERS.map((p) => {
          const open = openStates[p] ?? false;
          const opts = optionsByProvider[p] || [];
          const entry = catalog?.[p];
          const providerName = entry?.name || displayProviderName(p);
          const doc = entry?.doc as string | undefined;
          return (
            <Collapsible key={p} open={open} onOpenChange={(o) => setOpenStates((s) => ({ ...s, [p]: o }))}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="font-medium">
                    {providerName}
                    {doc && (
                      <a
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-xs underline text-muted-foreground hover:text-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Docs
                      </a>
                    )}
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 border rounded-md p-3 space-y-3">
                {opts.length > 0 ? (
                  <Combobox
                    options={opts}
                    value={null}
                    onChange={(v) => addModel(v)}
                    placeholder={`Add ${p} model…`}
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {loading ? "Loading models…" : "No models found. Use the global refresh."}
                  </p>
                )}
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{opts.length} models</span>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="secondary" onClick={() => addAllForProvider(p)} disabled={loading || opts.length === 0}>
                      Add all {p}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => removeAllForProvider(p)} disabled={loading || opts.length === 0}>
                      Remove all {p}
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
