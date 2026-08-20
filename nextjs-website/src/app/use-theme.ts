import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('vibe-audit-theme') || 'system';
    setTheme(savedTheme as 'light' | 'dark' | 'system');
    
    const applyTheme = (mode: 'light' | 'dark' | 'system') => {
      const root = document.documentElement;
      if (mode === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', systemDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', mode);
      }
    };

    applyTheme(savedTheme as 'light' | 'dark' | 'system');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('vibe-audit-theme') === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setThemeStored = (mode: 'light' | 'dark' | 'system') => {
    localStorage.setItem('vibe-audit-theme', mode);
    setTheme(mode);
    
    const root = document.documentElement;
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', mode);
    }
  };

  return { theme, setTheme: setThemeStored };
}