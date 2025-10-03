import { useQuery } from '@tanstack/react-query';
import type { ModelCapabilities } from '@/lib/ai/model-capabilities';

export function useModelCapabilities(modelId?: string) {
  return useQuery<ModelCapabilities | null>({
    queryKey: ['model-capabilities', modelId],
    queryFn: async () => {
      if (!modelId) return null;

      const response = await fetch(
        `/api/model-capabilities/${encodeURIComponent(modelId)}`
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.capabilities;
    },
    enabled: !!modelId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
