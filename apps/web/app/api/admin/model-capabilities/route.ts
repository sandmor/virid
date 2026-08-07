import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import {
  getAllCatalogEntries,
  getManagedModels,
  upsertModel,
} from '@/lib/ai/model-capabilities';

// GET /api/admin/model-capabilities
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const include = req.nextUrl.searchParams
      .get('include')
      ?.split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const includeCatalog = include?.includes('catalog');

    const [models, catalog] = await Promise.all([
      getManagedModels(),
      includeCatalog ? getAllCatalogEntries() : Promise.resolve(undefined),
    ]);

    if (includeCatalog) {
      return NextResponse.json({ models, catalog: catalog ?? [] });
    }

    return NextResponse.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

// POST /api/admin/model-capabilities
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const {
      id,
      name,
      creator,
      supportsTools,
      supportedFormats,
      maxOutputTokens,
    } = body;

    // Validate request
    if (!id || !name || !creator) {
      return NextResponse.json(
        { error: 'id, name, and creator are required' },
        { status: 400 }
      );
    }

    await upsertModel({
      id,
      name,
      creator,
      supportsTools: supportsTools ?? true,
      supportedFormats: supportedFormats ?? ['text'],
      maxOutputTokens: maxOutputTokens ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error creating model:', error);
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}
