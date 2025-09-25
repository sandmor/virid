import { CatalogRefreshButton } from "@/components/admin/catalog-refresh-button";
import { prisma } from "@/lib/db/prisma";
import { getTier, invalidateTierCache } from "@/lib/ai/tiers";
import { ModelPickerFormFields } from "@/components/admin/model-picker-form";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function UpdateTierForm({ id }: { id: "guest" | "regular" }) {
  const tier = await getTier(id);
  return (
    <form
      className="rounded-md border p-3 space-y-3"
      action={async (formData: FormData) => {
        "use server";
        const maxMessagesPerDay = Number(formData.get("maxMessagesPerDay"));
        const selected = (formData.getAll("modelIds") as string[]) || [];
        const modelIds = selected.map((s) => s.trim()).filter(Boolean);
        if (!Number.isFinite(maxMessagesPerDay) || modelIds.length === 0) return;
        await prisma.tier.upsert({
          where: { id },
          create: { id, modelIds, maxMessagesPerDay },
          update: { modelIds, maxMessagesPerDay },
        });
        invalidateTierCache(id);
        revalidatePath("/settings");
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium capitalize">{id} tier</span>
      </div>
      <ModelPickerFormFields name="modelIds" defaultValue={tier.modelIds} />
      <Input
        name="maxMessagesPerDay"
        type="number"
        min={1}
        defaultValue={tier.maxMessagesPerDay}
        required
      />
      <input type="hidden" name="id" value={id} />
      <Button type="submit" className="self-start">Save {id}</Button>
    </form>
  );
}

export default async function TiersSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tiers</h2>
        <CatalogRefreshButton />
      </div>
      <p className="text-xs text-muted-foreground">Guest = not signed in users. Regular = signed in users.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <UpdateTierForm id="guest" />
        <UpdateTierForm id="regular" />
      </div>
    </section>
  );
}
