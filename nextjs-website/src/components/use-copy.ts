'use client';

import { useState, useCallback } from 'react';

export function useCopy(timeout = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(async (text: string, id: string = 'default') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(prev => (prev === id ? null : prev));
      }, timeout);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  }, [timeout]);

  const isCopied = useCallback((id: string = 'default') => copiedId === id, [copiedId]);

  return { copy, isCopied, copiedId };
}
