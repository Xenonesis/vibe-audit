'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Section' | 'Playbook' | 'Eval' | 'Install' | 'Action';
  href?: string;
  action?: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeCycle?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onThemeCycle }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: PaletteItem[] = useMemo(() => [
    // Sections
    { id: 'sec-why', title: 'Why Vibe Audit', subtitle: 'Pillar 01 — Comparison vs vanilla vibe coding', category: 'Section', href: '#why' },
    { id: 'sec-modes', title: '6 Operating Modes', subtitle: 'Pillar 02 — AUDIT, PLAN, HARDEN, OPTIMIZE, VERIFY, POLISH', category: 'Section', href: '#modes' },
    { id: 'sec-pipe', title: 'The 6-Phase Pipeline', subtitle: 'Pillar 03 — Trust boundary, baseline, review & cutover', category: 'Section', href: '#pipeline' },
    { id: 'sec-risk', title: 'Risk Gates & Approvals', subtitle: 'Pillar 04 — LOW auto-fix, MEDIUM plan, HIGH consent', category: 'Section', href: '#risk-gates' },
    { id: 'sec-lb', title: 'Agent Safety Leaderboard', subtitle: 'Pillar 05 — 22-fixture evaluation results across 11 harnesses', category: 'Section', href: '#leaderboard' },
    { id: 'sec-harness', title: 'Harness Matrix', subtitle: 'Pillar 06 — Pi, OMP, Cursor, Windsurf, Claude Code, Trae, OpenCode', category: 'Section', href: '#harnesses' },
    { id: 'sec-evals', title: 'Toolkit & Evals', subtitle: 'Pillar 07 — Go CLI scanner, 13 playbooks & 22 machine test cases', category: 'Section', href: '#evals' },
    { id: 'sec-install', title: 'Install & Setup', subtitle: 'Pillar 08 — VS Code extension, NPM wrapper, Homebrew, skills.sh', category: 'Section', href: '#install' },
    { id: 'sec-dev', title: 'Developer Info', subtitle: 'Pillar 09 — Xenonesis creator profile and links', category: 'Section', href: '#developer' },
    { id: 'sec-faq', title: 'Frequently Asked Questions', subtitle: 'Pillar 10 — Trust boundaries, MCP servers, and architecture preservation', category: 'Section', href: '#faq' },

    // Playbooks
    { id: 'pb-sec', title: 'Security Playbook', subtitle: 'IDOR, Auth bypass, SQLi, secrets & prompt injection defense', category: 'Playbook', href: '#evals' },
    { id: 'pb-perf', title: 'Performance Playbook', subtitle: 'N+1 queries, hydration mismatch, memory leak isolation', category: 'Playbook', href: '#evals' },
    { id: 'pb-correct', title: 'Business Logic Correctness', subtitle: 'Float money precision, race conditions, inventory bounds', category: 'Playbook', href: '#evals' },
    { id: 'pb-exec', title: 'Adversarial Code & Execution', subtitle: 'Untrusted repository sandbox & network default deny', category: 'Playbook', href: '#evals' },

    // Install Quick Jumps
    { id: 'inst-npm', title: 'Install via NPM', subtitle: 'npx vibe-audit install .', category: 'Install', href: '#install' },
    { id: 'inst-skills', title: 'Install via skills.sh', subtitle: 'npx skills add Xenonesis/vibe-audit', category: 'Install', href: '#install' },
    { id: 'inst-brew', title: 'Install via Homebrew', subtitle: 'brew install Xenonesis/vibe-audit/vibe-audit', category: 'Install', href: '#install' },
    { id: 'inst-cursor', title: 'Export Cursor Rules', subtitle: 'vibe-audit export cursor', category: 'Install', href: '#install' },

    // Actions
    {
      id: 'act-theme',
      title: 'Toggle Color Theme',
      subtitle: 'Cycle between Light, Dark, and System theme',
      category: 'Action',
      action: onThemeCycle
    },
    {
      id: 'act-github',
      title: 'Open GitHub Repository',
      subtitle: 'github.com/Xenonesis/vibe-audit (Source & Releases)',
      category: 'Action',
      action: () => window.open('https://github.com/Xenonesis/vibe-audit', '_blank')
    },
  ], [onThemeCycle]);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(it => it.title.toLowerCase().includes(q) || it.subtitle.toLowerCase().includes(q) || it.category.toLowerCase().includes(q));
  }, [items, query]);

  const handleSelect = useCallback((item: PaletteItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  }, [onClose]);


  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette-modal" onClick={e => e.stopPropagation()}>
        <div className="palette-search-header">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="palette-input"
            placeholder="Type a section, command, playbook, or action..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>

        <div className="palette-results">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className={`palette-item ${idx === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {item.title}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.subtitle}
                </div>
              </div>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)' }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No matches found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        <div className="palette-footer">
          <span><kbd className="palette-kbd">&uarr;</kbd> <kbd className="palette-kbd">&darr;</kbd> to navigate</span>
          <span><kbd className="palette-kbd">&crarr;</kbd> to select</span>
          <span><kbd className="palette-kbd">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
