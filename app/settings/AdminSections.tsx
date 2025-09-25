import { Suspense } from "react";
import ProvidersSection from "./_providers-section";
import TiersSection from "./_tiers-section";

export default function AdminSections() {
  return (
    <div className="space-y-10 px-2 max-w-5xl mx-auto w-full">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading providers…</p>}>
        <ProvidersSection />
      </Suspense>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading tiers…</p>}>
        <TiersSection />
      </Suspense>
    </div>
  );
}
