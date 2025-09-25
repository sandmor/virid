import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/admin";
import { invalidateTierCache } from "@/lib/ai/tiers";
import { revalidatePath } from "next/cache";

export async function GET() {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const tiers = await prisma.tier.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json({ tiers });
}

export async function POST(req: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const body = await req.json();
  const { id, modelIds, maxMessagesPerDay } = body as { id?: string; modelIds?: string[]; maxMessagesPerDay?: number };
  if (!id || !/^[a-z][a-z0-9_-]{1,31}$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  if (!Array.isArray(modelIds) || modelIds.some((m) => typeof m !== "string")) {
    return NextResponse.json({ error: "modelIds must be string[]" }, { status: 400 });
  }
  if (typeof maxMessagesPerDay !== "number" || maxMessagesPerDay <= 0) {
    return NextResponse.json({ error: "maxMessagesPerDay must be > 0" }, { status: 400 });
  }
  await prisma.tier.upsert({
    where: { id },
    create: { id, modelIds, maxMessagesPerDay },
    update: { modelIds, maxMessagesPerDay },
  });
  invalidateTierCache(id);
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.tier.delete({ where: { id } }).catch(() => {});
  invalidateTierCache(id);
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}
