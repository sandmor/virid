import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import {
  getManagedModels,
  getModelCapabilities,
  removeUnusedModels,
  syncOpenRouterModels,
  upsertModelCapabilities,
} from '@/lib/ai/model-capabilities';
import { revalidatePath } from 'next/cache';

// GET /api/admin/model-capabilities - Get all models
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const models = await getManagedModels();
    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

// POST /api/admin/model-capabilities - Update or sync models
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, modelIds, capabilities, modelId } = body;

    if (action === 'sync-openrouter') {
      // Sync OpenRouter models that already exist in the database
      const result = await syncOpenRouterModels({ modelIds });
      revalidatePath('/settings');
      return NextResponse.json(result);
    }

    if (action === 'reset-openrouter' && typeof modelId === 'string') {
      const result = await syncOpenRouterModels({
        modelIds: [modelId],
        allowCreate: true,
      });

      if (result.synced === 0 && result.errors.length > 0) {
        return NextResponse.json(
          { error: result.errors.join('\n') },
          { status: 400 }
        );
      }

      const updated = await getModelCapabilities(modelId);
      revalidatePath('/settings');
      return NextResponse.json({ model: updated, errors: result.errors });
    }

    if (action === 'update' && capabilities) {
      // Update single model capabilities
      const updated = await upsertModelCapabilities(capabilities);
      revalidatePath('/settings');
      return NextResponse.json({ model: updated });
    }

    if (action === 'remove-unused') {
      const removed = await removeUnusedModels();
      revalidatePath('/settings');
      return NextResponse.json({ removed });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating models:', error);
    return NextResponse.json(
      { error: 'Failed to update models' },
      { status: 500 }
    );
  }
}
