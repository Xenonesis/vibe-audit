'use client';

import { useState, useEffect, useSyncExternalStore, useCallback } from 'react';
import { useTheme } from '@/app/use-theme';
import CommandPalette from './CommandPalette';

// Curated primary links for desktop header
const desktopNavLinks = [
  { href: '#why', label: 'Overview', id: 'why' },
  { href: '#modes', label: 'Modes', id: 'modes' },
  { href: '#leaderboard', label: 'Leaderboard', id: 'leaderboard' },
  { href: '#harnesses', label: 'Harnesses', id: 'harnesses' },
  { href: '#evals', label: 'Toolkit & Evals', id: 'evals' },
  { href: '#install', label: 'Install', id: 'install' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
];

// Full granular list for mobile navigation drawer
const allNavLinks = [
  { href: '#why', label: '01. Why Vibe Audit', id: 'why' },
  { href: '#modes', label: '02. 6 Operating Modes', id: 'modes' },
  { href: '#pipeline', label: '03. 6-Phase Pipeline', id: 'pipeline' },
  { href: '#risk-gates', label: '04. Risk Gates & Approvals', id: 'risk-gates' },
  { href: '#leaderboard', label: '05. Safety Leaderboard', id: 'leaderboard' },
  { href: '#harnesses', label: '06. Harness Matrix', id: 'harnesses' },
  { href: '#evals', label: '07. Toolkit & Evals', id: 'evals' },
  { href: '#install', label: '08. Install & Setup', id: 'install' },
  { href: '#developer', label: '09. Developer Info', id: 'developer' },
  { href: '#faq', label: '10. FAQ', id: 'faq' },
];

function subscribeEmpty() {
  return () => {};
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [stars, setStars] = useState(1);
  const mounted = useSyncExternalStore(subscribeEmpty, () => true, () => false);

  // GitHub Stars fetch
  useEffect(() => {
    async function loadStars() {
      try {
        const res = await fetch('https://api.github.com/repos/Xenonesis/vibe-audit');
        if (res.ok) {
          const data = await res.json();
          if (data.stargazers_count !== undefined) {
            setStars(data.stargazers_count);
          }
        }
      } catch {
        // Fallback
      }
    }
    loadStars();
  }, []);

  // Keyboard Shortcuts (T for theme, ⌘K or / for palette, Esc for menu)
  const cycleTheme = useCallback(() => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const nextIdx = (order.indexOf(theme) + 1) % order.length;
    setTheme(order[nextIdx]);
  }, [theme, setTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setPaletteOpen(true);
      } else if ((e.key === 't' || e.key === 'T') && !isInput && !paletteOpen) {
        cycleTheme();
      } else if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycleTheme, paletteOpen]);

  const themeBtns = [
    { id: 'light', title: 'Light Theme' },
    { id: 'dark', title: 'Dark Theme' },
    { id: 'system', title: 'System Theme' },
  ];

  const renderThemeIcon = (type: string) => {
    const size = 14;
    if (type === 'light') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    }
    if (type === 'dark') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    }
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  };

  if (!mounted) {
    return (
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <svg className="icon-logo" viewBox="0 0 32 32" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3L4 7v9c0 7.5 5.2 13.1 12 15 6.8-1.9 12-7.5 12-15V7L16 3z" />
              <path d="M10 16l4 4 8-9" strokeWidth={2.5} />
            </svg>
            <span>vibe-audit</span>
            <span className="badge badge-blue">v0.1.0</span>
          </a>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          {/* Brand Logo & Tag */}
          <a href="#" className="brand">
            <svg className="icon-logo" viewBox="0 0 32 32" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3L4 7v9c0 7.5 5.2 13.1 12 15 6.8-1.9 12-7.5 12-15V7L16 3z" />
              <path d="M10 16l4 4 8-9" strokeWidth={2.5} />
            </svg>
            <span>vibe-audit</span>
            <span className="badge badge-blue">v0.1.0</span>
          </a>

          {/* Desktop Streamlined Navigation Links */}
          <ul className="nav-links-desktop">
            {desktopNavLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Controls */}
          <div className="nav-controls">
            {/* Quick Search Palette Trigger */}
            <button
              className="palette-trigger-btn"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              title="Search and jump (⌘K or /)"
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="palette-trigger-label">Search</span>
              <kbd className="palette-trigger-kbd">&#8984;K</kbd>
            </button>

            {/* GitHub Stars Link */}
            <a href="https://github.com/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer" className="github-stars-pill">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.67-.22.67-.5 0-.25-.01-1.41-.01-2.48-2.75.6-3.75-1.38-3.75-1.38-.45-1.16-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.54 2.34 1.09 2.91.84.09-.66.35-1.09.63-1.34-2.23-.25-4.57-1.12-4.57-4.94 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .83-.27 2.72 1.04A9.57 9.57 0 0112 6.84c.85.01 1.71.11 2.5.34 1.89-1.31 2.72-1.04 2.72-1.04.54 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.32.67.94.67 1.9 0 1.38-.01 2.5-.01 2.85 0 .28.17.6.67.5A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
              <span id="stars-count">{stars} {stars === 1 ? 'star' : 'stars'}</span>
            </a>

            {/* Segmented Theme Switcher */}
            <div className="theme-switch" role="radiogroup" aria-label="Color Theme">
              {themeBtns.map(btn => (
                <button
                  key={btn.id}
                  className={`theme-btn ${theme === btn.id ? 'active' : ''}`}
                  onClick={() => setTheme(btn.id as 'light' | 'dark' | 'system')}
                  title={btn.title}
                  aria-pressed={theme === btn.id}
                >
                  {renderThemeIcon(btn.id)}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="icon" viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Navigation Index
              </div>
              {allNavLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onThemeCycle={cycleTheme}
      />
    </>
  );
}
