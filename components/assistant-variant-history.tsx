"use client";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ClockRewind } from "@/components/icons";
import type { ChatMessage } from "@/lib/types";
import { cn, sanitizeText } from "@/lib/utils";

export function AssistantVariantHistory({
  chatId,
  messageId,
  onSelectVariant,
}: {
  chatId: string;
  messageId: string;
  onSelectVariant: (variant: ChatMessage) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/api/assistant-variants?chatId=${chatId}&messageId=${messageId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => setVariants(data.variants || []))
      .catch(() => setVariants([]))
      .finally(() => setLoading(false));
  }, [open, chatId, messageId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6" aria-label="Show response history">
          <ClockRewind size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <div className="mb-2 text-xs font-medium text-muted-foreground">Response history</div>
        {loading && <div className="text-xs text-muted-foreground">Loading...</div>}
        {!loading && variants.length === 0 && (
          <div className="text-xs text-muted-foreground">No previous variants</div>
        )}
        <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
          {variants.map((v, idx) => {
            const text = v.parts?.filter((p: any) => p.type === "text").map((p: any) => p.text).join("\n");
            const short = text?.slice(0, 140) || "(no text)";
            // We requested variants ordered by createdAt desc; treat first element as current.
            const isCurrent = idx === 0;
            return (
              <li key={v.id}>
                <button
                  onClick={() => {
                    onSelectVariant(v as any);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full rounded border p-2 text-left text-xs transition-colors hover:bg-muted",
                    isCurrent ? "border-primary/50" : "border-border"
                  )}
                >
                  <div className="line-clamp-3 whitespace-pre-wrap break-words">{sanitizeText(short)}</div>
                  {isCurrent && <div className="mt-1 text-[10px] font-semibold uppercase text-primary">Current</div>}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
