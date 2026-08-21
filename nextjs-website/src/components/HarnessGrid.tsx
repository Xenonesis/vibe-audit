'use client';

import { useState, useMemo } from 'react';
import { useCopy } from './use-copy';

interface Harness {
  id: string;
  name: string;
  displayName: string;
  status: { text: string; className: string };
  statusType: 'verified' | 'probed' | 'skip';
  description: string;
  cmd: string;
  hasAuth?: boolean;
}

export default function HarnessGrid() {
  const [filter, setFilter] = useState<'all' | 'verified' | 'probed' | 'skip'>('all');
  const [search, setSearch] = useState('');
  const { copy, isCopied } = useCopy();

  const harnesses: Harness[] = useMemo(() => [
    {
      id: 'pi',
      name: 'pi',
      displayName: 'Pi',
      status: { text: 'PASS (0.84.1)', className: 'badge-green' },
      statusType: 'verified',
      description: 'Headless CLI driver verified. Tested Eval 1 with-skill: 80.5s execution, AUDIT mode, CRITICAL IDOR finding confirmed.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness pi --condition with-skill --timeout 300',
    },
    {
      id: 'omp',
      name: 'omp',
      displayName: 'Oh My Pi (OMP)',
      status: { text: 'PASS (17.2.12)', className: 'badge-green' },
      statusType: 'verified',
      description: 'Oh My Pi harness driver verified. Tested Eval 1 with-skill: 40.6s execution, zero source diff, file evidence confirmed.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness omp --condition with-skill --timeout 300',
    },
    {
      id: 'claude-code',
      name: 'claude-code',
      displayName: 'Claude Code',
      status: { text: 'SKIP (Auth)', className: 'badge-yellow' },
      statusType: 'skip',
      description: 'Installed v2.1.227. Automatically detects loggedIn: false and outputs clean skip with claude /login guidance.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness claude-code --condition with-skill --timeout 300',
      hasAuth: true,
    },
    {
      id: 'cursor',
      name: 'cursor',
      displayName: 'Cursor IDE',
      status: { text: 'PROBED (MDC+MCP)', className: 'badge-blue' },
      statusType: 'probed',
      description: 'Native MDC rules (.cursor/rules/vibe-audit.mdc) and MCP server integration verified.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness cursor --condition with-skill --timeout 300',
    },
    {
      id: 'windsurf',
      name: 'windsurf',
      displayName: 'Windsurf / Cascade',
      status: { text: 'PROBED (Rule+MCP)', className: 'badge-blue' },
      statusType: 'probed',
      description: 'Cascade native rules (.windsurfrules) and global MCP config (~/.codeium/windsurf/mcp_config.json) verified.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness windsurf --condition with-skill --timeout 300',
    },
    {
      id: 'trae',
      name: 'trae',
      displayName: 'TRAE / TraeCode',
      status: { text: 'PROBED (Agentic)', className: 'badge-blue' },
      statusType: 'probed',
      description: 'Agentic workspace integration with .trae/ context rules and tool calling support.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness trae --condition with-skill --timeout 300',
    },
    {
      id: 'opencode',
      name: 'opencode',
      displayName: 'OpenCode',
      status: { text: 'PROBED (Open-Std)', className: 'badge-blue' },
      statusType: 'probed',
      description: 'Open-standard CLI harness driver supporting global skills.sh packages and headless evaluation.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness opencode --condition with-skill --timeout 300',
    },
    {
      id: 'codex',
      name: 'codex',
      displayName: 'OpenAI Codex',
      status: { text: 'SKIP (Missing)', className: 'badge-neutral' },
      statusType: 'skip',
      description: 'Binary not found on PATH. Driver probe records clean skip event with documented binary target.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness codex --condition with-skill --timeout 300',
    },
    {
      id: 'gemini',
      name: 'gemini',
      displayName: 'Gemini CLI',
      status: { text: 'PROBED (CLI)', className: 'badge-neutral' },
      statusType: 'probed',
      description: 'Standard CLI driver with system-instruction and tool definition injection support.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness gemini --condition with-skill --timeout 300',
    },
    {
      id: 'copilot',
      name: 'copilot',
      displayName: 'GitHub Copilot CLI',
      status: { text: 'PROBED (Rules)', className: 'badge-neutral' },
      statusType: 'probed',
      description: 'Evaluated against .github/copilot-instructions.md repository rules.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness copilot --condition with-skill --timeout 300',
    },
    {
      id: 'antigravity',
      name: 'antigravity',
      displayName: 'Antigravity (Google)',
      status: { text: 'PROBED (Harness)', className: 'badge-neutral' },
      statusType: 'probed',
      description: 'Native evaluation harness driver and system prompt wrapper testing.',
      cmd: 'python scripts/run_harness.py . --eval 1 --harness antigravity --condition with-skill --timeout 300',
    },
  ], []);

  const filteredHarnesses = useMemo(() => {
    return harnesses.filter(h => {
      const matchesFilter = filter === 'all' || h.statusType === filter;
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || h.displayName.toLowerCase().includes(q) || h.name.toLowerCase().includes(q) || h.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [harnesses, filter, search]);

  const renderIcon = (id: string) => {
    switch (id) {
      case 'pi':
        return <span style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'serif' }}>&pi;</span>;
      case 'omp':
        return (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
      case 'claude-code':
        return <span style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: 'var(--font-mono)' }}>AI</span>;
      case 'cursor':
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 3.5L20.5 11L12.5 13.5L9 21.5L6 3.5Z" />
          </svg>
        );
      case 'windsurf':
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.5h-13L12 6.5z" />
          </svg>
        );
      case 'trae':
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v3H4V6zm2 5h12v3H6v-3zm3 5h6v3H9v-3z" />
          </svg>
        );
      case 'opencode':
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm2 1v14h14V5H5z" />
          </svg>
        );
      case 'codex':
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        );
      default:
        return (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
    }
  };

  return (
    <div style={{ marginTop: '36px' }} className="reveal">
      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div className="filter-chips-wrap">
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Hosts ({harnesses.length})
          </button>
          <button
            className={`filter-chip ${filter === 'verified' ? 'active' : ''}`}
            onClick={() => setFilter('verified')}
          >
            Verified PASS
          </button>
          <button
            className={`filter-chip ${filter === 'probed' ? 'active' : ''}`}
            onClick={() => setFilter('probed')}
          >
            IDE / CLI Probed
          </button>
          <button
            className={`filter-chip ${filter === 'skip' ? 'active' : ''}`}
            onClick={() => setFilter('skip')}
          >
            Clean Skip (Auth/Missing)
          </button>
        </div>

        <div className="search-box-wrap" style={{ minWidth: '220px', maxWidth: '300px' }}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search hosts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {filteredHarnesses.map(h => {
          const copyId = `harness-${h.id}`;
          const copied = isCopied(copyId);
          return (
            <div key={h.id} className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-main)',
                      flexShrink: 0
                    }}>
                      {renderIcon(h.id)}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>
                      {h.displayName}
                    </div>
                  </div>
                  <span className={`badge ${h.status.className}`}>
                    {h.statusType === 'verified' && <span className="status-dot-pulse" />}
                    {h.status.text}
                  </span>
                </div>
                <p className="card-desc" style={{ fontSize: '0.8125rem', lineHeight: 1.5, marginBottom: '18px' }}>
                  {h.description}
                </p>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {h.name}.cmd
                </code>
                <button
                  className={`copy-btn-mini ${copied ? 'copied' : ''}`}
                  onClick={() => copy(h.cmd, copyId)}
                  title="Copy harness eval command"
                >
                  {copied ? (
                    '✓ Copied'
                  ) : (
                    <>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ marginRight: '4px' }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Run Eval
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
