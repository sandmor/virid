import { NextRequest, NextResponse } from 'next/server';
import { getModelCapabilities } from '@/lib/ai/model-capabilities';

export async function GET(
  req: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    const modelId = decodeURIComponent(params.modelId);
    const capabilities = await getModelCapabilities(modelId);

    if (!capabilities) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    return NextResponse.json({ capabilities });
  } catch (error) {
    console.error('Error fetching model capabilities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model capabilities' },
      { status: 500 }
    );
  }
}
