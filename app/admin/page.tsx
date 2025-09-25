import { isAdmin } from "@/lib/auth/admin";
import { getAppSession } from "@/lib/auth/session";
import { adminEmail } from "@/lib/constants";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { getTier, invalidateTierCache } from "@/lib/ai/tiers";
import { ProvidersEditor } from "@/components/admin/providers-editor";
import { CatalogRefreshButton } from "@/components/admin/catalog-refresh-button";
import { ModelPickerFormFields } from "@/components/admin/model-picker-form";
import { SUPPORTED_PROVIDERS } from "@/lib/ai/registry";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // always fresh for admin updates

async function ProvidersSection() {
  const rows = await prisma.provider.findMany({ orderBy: { id: "asc" } });
  const initialKeys: Record<string, string | undefined> = {};
  for (const p of SUPPORTED_PROVIDERS) {
    initialKeys[p] = rows.find((r) => r.id === p)?.apiKey;
  }
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Providers</h2>
      {/* Client editor with accordions per provider */}
      <ProvidersEditor initialKeys={initialKeys} />
    </div>
  );
}

async function TiersSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tiers</h2>
        <CatalogRefreshButton />
      </div>
      <p className="text-xs text-muted-foreground">Guest = not signed in users. Regular = signed in users.</p>
  <div className="grid gap-6 md:grid-cols-2">
        <UpdateTierForm id="guest" />
        <UpdateTierForm id="regular" />
      </div>
    </div>
  );
}

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
        revalidatePath("/admin");
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

export default async function AdminPage() {
  const session = await getAppSession();
  const allowed = await isAdmin();
  if (!allowed) {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="text-sm text-muted-foreground">Access denied.</p>
      </div>
    );
  }
  return (
  <div className="p-8 space-y-10 max-w-5xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Signed in as {session?.user.email}</p>
      </header>
      <Suspense fallback={<p>Loading providers…</p>}>
        <ProvidersSection />
      </Suspense>
      <Suspense fallback={<p>Loading tiers…</p>}>
        <TiersSection />
      </Suspense>
    </div>
  );
}
