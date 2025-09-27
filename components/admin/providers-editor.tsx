"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/components/toast";
import { SUPPORTED_PROVIDERS, displayProviderName } from "@/lib/ai/registry";

export function ProvidersEditor({
  initialKeys,
}: {
  initialKeys: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, string>>(
    Object.fromEntries(
      SUPPORTED_PROVIDERS.map((p) => [p, initialKeys[p] || ""]) as Array<
        [string, string]
      >
    )
  );

  const saveMutation = useMutation({
    mutationFn: async ({ id, apiKey }: { id: string; apiKey: string }) => {
      const response = await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, apiKey }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to save provider override");
      }

      return { id };
    },
    onSuccess: (_, variables) => {
      toast({
        type: "success",
        description: `${displayProviderName(variables.id)} saved`,
      });
      router.refresh();
    },
    onError: (error, variables) => {
      toast({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : `Failed to save ${displayProviderName(variables.id)}`,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(
        `/api/admin/providers?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to delete provider override");
      }

      return { id };
    },
    onSuccess: (_, variables) => {
      setKeys((k) => ({ ...k, [variables.id]: "" }));
      toast({
        type: "success",
        description: `${displayProviderName(variables.id)} removed`,
      });
      router.refresh();
    },
    onError: (error, variables) => {
      toast({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : `Failed to delete ${displayProviderName(variables.id)}`,
      });
    },
  });

  async function save(id: string) {
    const apiKey = keys[id]?.trim();

    if (!apiKey) {
      toast({ type: "error", description: "Enter an API key before saving." });
      return;
    }

    try {
      await saveMutation.mutateAsync({ id, apiKey });
    } catch {
      // handled via onError
    }
  }

  async function remove(id: string) {
    try {
      await deleteMutation.mutateAsync({ id });
    } catch {
      // handled via onError
    }
  }

  return (
    <div className="space-y-2">
      {SUPPORTED_PROVIDERS.map((p) => {
        const trimmedValue = keys[p]?.trim() ?? "";
        const isSaving =
          saveMutation.isPending && saveMutation.variables?.id === p;
        const isDeleting =
          deleteMutation.isPending && deleteMutation.variables?.id === p;

        return (
          <Collapsible
            key={p}
            open={open[p] ?? false}
            onOpenChange={(o) => setOpen((s) => ({ ...s, [p]: o }))}
          >
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
                  onChange={(e) =>
                    setKeys((k) => ({ ...k, [p]: e.target.value }))
                  }
                />
                <Button
                  onClick={() => save(p)}
                  disabled={isSaving || isDeleting || trimmedValue.length === 0}
                >
                  {isSaving && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => remove(p)}
                  disabled={isDeleting}
                >
                  {isDeleting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This stores an override for {p} in the database. If absent, the
                app will fall back to environment variables.
              </p>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
      <Separator />
    </div>
  );
}
