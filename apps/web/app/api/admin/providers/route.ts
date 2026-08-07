import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@vero/db';
import { requireAdmin } from '@/lib/auth/admin';
import { forceRefreshProviders } from '@/lib/ai/providers';

const BUILTIN_PROVIDER_IDS = new Set(['openai', 'google', 'openrouter', 'xai']);
const providerIdPattern = /^[a-z][a-z0-9_-]{1,63}$/;

async function authorize() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function GET() {
  const unauthorized = await authorize();
  if (unauthorized) return unauthorized;
  const providers = await prisma.provider.findMany({
    orderBy: { id: 'asc' },
    include: { _count: { select: { modelProviders: true } } },
  });
  return NextResponse.json({
    providers: providers.map(({ apiKey, _count, ...provider }) => ({
      ...provider,
      hasApiKey: Boolean(apiKey),
      modelCount: _count.modelProviders,
    })),
  });
}

export async function POST(req: NextRequest) {
  const unauthorized = await authorize();
  if (unauthorized) return unauthorized;
  const body = (await req.json()) as { id?: string; name?: string; baseUrl?: string; apiKey?: string | null };
  if (!body.id || !providerIdPattern.test(body.id) || BUILTIN_PROVIDER_IDS.has(body.id)) {
    return NextResponse.json({ error: 'Invalid or reserved provider id' }, { status: 400 });
  }
  if (!body.name?.trim() || !body.baseUrl?.trim()) {
    return NextResponse.json({ error: 'name and baseUrl are required' }, { status: 400 });
  }
  try {
    await prisma.provider.create({
      data: { id: body.id, name: body.name.trim(), kind: 'openai-compatible', baseUrl: body.baseUrl.trim(), apiKey: body.apiKey || null },
    });
  } catch {
    return NextResponse.json({ error: 'Provider already exists' }, { status: 409 });
  }
  await forceRefreshProviders();
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const unauthorized = await authorize();
  if (unauthorized) return unauthorized;
  const body = (await req.json()) as { id?: string; name?: string; baseUrl?: string; enabled?: boolean; apiKey?: string | null };
  if (!body.id) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  const data = {
    ...(body.name === undefined ? {} : { name: body.name.trim() }),
    ...(body.baseUrl === undefined ? {} : { baseUrl: body.baseUrl.trim() }),
    ...(body.enabled === undefined ? {} : { enabled: body.enabled }),
    ...(body.apiKey === undefined ? {} : { apiKey: body.apiKey || null }),
  };
  try {
    await prisma.$transaction(async (tx) => {
      const provider = await tx.provider.update({ where: { id: body.id }, data });
      if (body.enabled === false) {
        await tx.modelProvider.updateMany({ where: { providerId: provider.id }, data: { enabled: false, isDefault: false } });
      }
    });
  } catch {
    return NextResponse.json({ error: 'Provider not found or invalid update' }, { status: 404 });
  }
  await forceRefreshProviders();
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const unauthorized = await authorize();
  if (unauthorized) return unauthorized;
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  if (BUILTIN_PROVIDER_IDS.has(id)) return NextResponse.json({ error: 'Built-in providers cannot be deleted' }, { status: 403 });
  const links = await prisma.modelProvider.count({ where: { providerId: id } });
  if (links) return NextResponse.json({ error: 'Remove model links before deleting this provider' }, { status: 409 });
  await prisma.provider.delete({ where: { id } }).catch(() => null);
  await forceRefreshProviders();
  return NextResponse.json({ ok: true });
}
