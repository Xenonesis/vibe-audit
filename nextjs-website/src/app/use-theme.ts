'use client';

import { useSyncExternalStore, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

function getThemeSnapshot(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('vibe-audit-theme') as ThemeMode) || 'system';
}

function getThemeServerSnapshot(): ThemeMode {
  return 'system';
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'vibe-audit-theme') {
      applyTheme((e.newValue as ThemeMode) || 'system');
      callback();
    }
  };

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = () => {
    const current = (localStorage.getItem('vibe-audit-theme') as ThemeMode) || 'system';
    if (current === 'system') {
      applyTheme('system');
      callback();
    }
  };

  window.addEventListener('storage', handleStorage);
  mediaQuery.addEventListener('change', handleMediaChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    mediaQuery.removeEventListener('change', handleMediaChange);
  };
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', systemDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', mode);
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem('vibe-audit-theme', mode);
    applyTheme(mode);
    window.dispatchEvent(new StorageEvent('storage', { key: 'vibe-audit-theme', newValue: mode }));
  }, []);

  return { theme, setTheme };
}
