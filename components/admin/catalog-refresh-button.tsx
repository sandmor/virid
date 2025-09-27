'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/toast';

export function CatalogRefreshButton() {
  const [loading, setLoading] = useState(false);
  const lastClickRef = useRef<number>(0);
  async function refresh(force = true) {
    const now = Date.now();
    // 1.5s debounce window
    if (now - lastClickRef.current < 1500) {
      toast({
        type: 'error',
        description: 'Please wait before refreshing again',
      });
      return;
    }
    lastClickRef.current = now;
    setLoading(true);
    try {
      window.dispatchEvent(
        new CustomEvent('catalog:refresh', { detail: { force } })
      );
      toast({ type: 'success', description: 'Refreshing model catalog…' });
    } finally {
      // Keep spinner visible briefly for UX consistency
      setTimeout(() => setLoading(false), 400);
    }
  }
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => refresh(true)}
      disabled={loading}
    >
      {loading ? 'Refreshing…' : 'Refresh model catalog'}
    </Button>
  );
}
