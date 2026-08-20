'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/app/use-theme';
import Image from 'next/image';

const navLinks = [
  { href: '#why', label: 'Why Vibe Audit' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#risk-gates', label: 'Risk Gates' },
  { href: '#harnesses', label: 'Harnesses' },
  { href: '#evals', label: 'Evals' },
  { href: '#developer', label: 'Developer' },
  { href: '#install', label: 'Install' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchGitHubStars();
  }, []);

  async function fetchGitHubStars() {
    try {
      const res = await fetch('https://api.github.com/repos/Xenonesis/vibe-audit');
      if (res.ok) {
        const data = await res.json();
        setStars(data.stargazers_count || 1);
      }
    } catch (e) {
      console.log('GitHub API fetch deferred');
    }
  }

  const themeBtns = [
    { id: 'light', title: 'Light Theme', icon: 'M' },
    { id: 'dark', title: 'Dark Theme', icon: 'D' },
    { id: 'system', title: 'System Theme', icon: 'S' },
  ];

  const renderThemeIcon = (type: string) => {
    const size = 18;
    switch (type) {
      case 'light':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'dark':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
    }
  };

  if (!mounted) {
    return (
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <svg className="icon-logo" viewBox="0 0 32 32" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3L4 7v9c0 7.5 5.2 13.1 12 15 6.8-1.9 12-7.5 12-15V7L16 3z"></path>
              <path d="M10 16l4 4 8-9" strokeWidth={2.5}></path>
            </svg>
            <span>vibe-audit</span>
            <span className="badge badge-blue">v0.1.0</span>
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#" className="brand">
          <svg className="icon-logo" viewBox="0 0 32 32" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3L4 7v9c0 7.5 5.2 13.1 12 15 6.8-1.9 12-7.5 12-15V7L16 3z"></path>
            <path d="M10 16l4 4 8-9" strokeWidth={2.5}></path>
          </svg>
          <span>vibe-audit</span>
          <span className="badge badge-blue">v0.1.0</span>
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <a href="https://github.com/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer" className="github-stars-pill">
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.67-.22.67-.5 0-.25-.01-1.41-.01-2.48-2.75.6-3.75-1.38-3.75-1.38-.45-1.16-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.54 2.34 1.09 2.91.84.09-.66.35-1.09.63-1.34-2.23-.25-4.57-1.12-4.57-4.94 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .83-.27 2.72 1.04A9.57 9.57 0 0112 6.84c.85.01 1.71.11 2.5.34 1.89-1.31 2.72-1.04 2.72-1.04.54 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.32.67.94.67 1.9 0 1.38-.01 2.5-.01 2.85 0 .28.17.6.67.5A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"></path>
            </svg>
            <span id="stars-count">{stars} {stars === 1 ? 'star' : 'stars'}</span>
          </a>

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
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="icon" viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}