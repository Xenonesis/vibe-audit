'use client';

import { useState, useMemo } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const [search, setSearch] = useState('');

  const faqs: FAQItem[] = useMemo(() => [
    {
      question: 'Does Vibe Audit force architectural rewrites on working code?',
      answer:
        "No. One of Vibe Audit's core invariants is that nonstandard but working architecture is NOT a defect. It strictly preserves intended behavior and existing patterns unless code is demonstrably insecure, incorrect, or explicitly approved for redesign by the user.",
    },
    {
      question: 'What is the Phase -1 Repository Trust Boundary?',
      answer:
        'When an unknown or downloaded repository is loaded, Vibe Audit treats all repository files, comments, and build hooks (like postinstall scripts) as untrusted data. It starts in STATIC-ONLY mode by default, denies network egress in sandboxes, and refuses to execute lifecycle hooks merely to obtain a baseline.',
    },
    {
      question: 'How do Risk-Gated Approvals operate?',
      answer:
        'LOW change risk edits (dead code, unused imports, safe type bounds) can auto-fix when safe. MEDIUM risk edits (new validation layers, database indexes, rate limiters) require a planned proposal before execution. HIGH risk operations (auth model changes, DB provider migrations, destructive schema changes, secret rotations) strictly require explicit user consent.',
    },
    {
      question: 'What is the Go Static Scanner & Native MCP Server?',
      answer:
        'Vibe Audit includes a fast, zero-dependency compiled Go binary (cli/main.go). It deterministically pre-scans workspaces for exposed secrets, supply-chain hooks, and environment parity (`vibe-audit scan`, `vibe-audit deps`, `vibe-audit env`), calculates 0–100 production readiness scores (`vibe-audit score`), provides a native stdio MCP server (`vibe-audit mcp`), and exports native rules for Cursor, Windsurf, Copilot, Cline, Aider, Continue, Goose, and Amazon Q.',
    },
    {
      question: 'How does PLAN mode work?',
      answer:
        'PLAN mode performs read-only discovery, baseline capture, and finding identification, and then outputs a prioritized, risk-aware remediation plan detailing exact file changes, approval gates, and verification steps. It leaves the tracked git working tree completely clean with zero file modifications.',
    },
    {
      question: 'Which AI agent harnesses are supported?',
      answer:
        'Vibe Audit includes capability definitions and driver hooks for 21 major harnesses: Pi Agent, Oh My Pi (OMP), Claude Code, Cursor IDE, Windsurf / Cascade, Aider, Cline, Roo Code, OpenHands, Goose, Continue, Codex, Gemini CLI, Copilot CLI, TRAE, Zed AI, Amazon Q Developer, Devin, Kilo Code, OpenCode, and Antigravity.',
    },
    {
      question: 'How do I install Vibe Audit in my workspace?',
      answer:
        'You can install via the VS Code / Cursor / Windsurf Extension (one-click), via NPM with `npx vibe-audit install .`, via Homebrew with `brew install Xenonesis/vibe-audit/vibe-audit`, or globally for all open-standard CLI agents with `npx skills add Xenonesis/vibe-audit`.',
    },
  ], []);

  const toggleIndex = (i: number) => {
    setOpenIndexes(prev => (prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i]));
  };

  const expandAll = () => setOpenIndexes(faqs.map((_, i) => i));
  const collapseAll = () => setOpenIndexes([]);

  const filteredFaqs = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return faqs;
    return faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [faqs, search]);

  return (
    <div className="reveal">
      {/* FAQ Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
        <div className="search-box-wrap" style={{ flex: 1, minWidth: '240px' }}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search questions & answers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch('')}>&times;</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="filter-chip" onClick={expandAll} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
            Expand All
          </button>
          <button className="filter-chip" onClick={collapseAll} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
            Collapse All
          </button>
        </div>
      </div>

      <div className="accordion-list">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIndexes.includes(i);
          return (
            <div key={faq.question} className={`accordion-item ${isOpen ? 'active' : ''}`}>
              <button
                className="accordion-header"
                onClick={() => toggleIndex(i)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className={`accordion-icon ${isOpen ? 'active' : ''}`}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="accordion-content">
                  <p style={{ lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
        {filteredFaqs.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No questions match &ldquo;{search}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
