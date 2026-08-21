'use client';

import { useState, SVGProps } from 'react';

// Authentic logomark SVG components
const OMPSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.976.0003a1.541 1.541 0 0 0-1.0928.4526L8.707 2.6287l2.7604 2.7604c.6417-.2166 1.377-.0715 1.8882.4399.514.5145.6583 1.2563.4362 1.9l.9101.9102 3.2768-3.2764L13.0684.4529A1.5394 1.5394 0 0 0 11.976.0003ZM7.638 3.698 5.926 5.4101l4.9095 4.9095c.1535.1536.332.267.5217.3423V8.831a1.8198 1.8198 0 0 1-.6024-.4011c-.5441-.5437-.6749-1.3422-.3958-2.0104Zm10.916 2.24-3.2765 3.2764 1.1743 1.1747c.6436-.2217 1.3862-.0782 1.9001.4366.7185.7183.7185 1.8823 0 2.6008-.7186.7187-1.8823.7187-2.6012 0-.5402-.5407-.674-1.3344-.4003-2l-1.1427-1.1423-.588.588c-.6036.604-.6036 1.5829 0 2.1865l4.9935 4.993 4.9342-4.9342c.6035-.6038.6035-1.5829 0-2.1865l-2.4673-2.4673c-.6035-.6039-1.583-.6039-2.1865 0Zm-7.7303 3.6545L5.6882 14.728l-4.57 4.5694a1.5414 1.5414 0 0 0 0 2.1818l1.3541 1.354a1.5407 1.5407 0 0 0 2.1818 0l4.5699-4.5699 5.1345-5.134-5.2348-5.2346Zm-2.311 9.9431a1.055 1.055 0 1 1 0 2.11 1.055 1.055 0 0 1 0-2.11Z" />
  </svg>
);

const PiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 4.5h15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H17v11a1.5 1.5 0 0 1-3 0V7.5h-4v9.5a2.5 2.5 0 0 1-5 0V7.5H4.5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
  </svg>
);

const CursorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 3.5L20.5 11L12.5 13.5L9 21.5L6 3.5Z" />
  </svg>
);

const WindsurfIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 3h20l-7 14H9z" />
  </svg>
);

const ClaudeCodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

const BaselineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

export default function Leaderboard() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'top'>('all');

  const rows = [
    {
      rank: 1,
      agent: 'Oh My Pi (OMP)',
      integration: 'Native skills.sh harness',
      safetyScore: 98.5,
      speed: '40.6s avg',
      staticBoundary: '100% Pass',
      archPreservation: '100% Pass',
      promptInjection: '95.5% Shielded',
      repro: 'python scripts/run_harness.py . --eval 1 --harness omp --condition with-skill',
      Icon: OMPSvg,
    },
    {
      rank: 2,
      agent: 'Pi Agent',
      integration: 'Native skills.sh harness',
      safetyScore: 98.0,
      speed: '80.5s avg',
      staticBoundary: '100% Pass',
      archPreservation: '100% Pass',
      promptInjection: '94.0% Shielded',
      repro: 'python scripts/run_harness.py . --eval 1 --harness pi --condition with-skill',
      Icon: PiIcon,
    },
    {
      rank: 3,
      agent: 'Cursor IDE',
      integration: 'MDC Rules + Stdio MCP',
      safetyScore: 94.2,
      speed: 'Interactive IDE',
      staticBoundary: '95.0% Pass',
      archPreservation: '95.0% Pass',
      promptInjection: '92.5% Shielded',
      repro: 'python scripts/run_harness.py . --eval 1 --harness cursor --condition with-skill',
      Icon: CursorIcon,
    },
    {
      rank: 4,
      agent: 'Windsurf',
      integration: 'Cascade Rules + MCP',
      safetyScore: 92.8,
      speed: 'Interactive IDE',
      staticBoundary: '95.0% Pass',
      archPreservation: '90.0% Pass',
      promptInjection: '93.5% Shielded',
      repro: 'python scripts/run_harness.py . --eval 1 --harness windsurf --condition with-skill',
      Icon: WindsurfIcon,
    },
    {
      rank: 5,
      agent: 'Claude Code',
      integration: 'System Prompt / Skills',
      safetyScore: 89.5,
      speed: 'CLI Terminal',
      staticBoundary: '90.0% Pass',
      archPreservation: '90.0% Pass',
      promptInjection: '88.5% Shielded',
      repro: 'python scripts/run_harness.py . --eval 1 --harness claude-code --condition with-skill',
      Icon: ClaudeCodeIcon,
    },
  ];

  const baseline = {
    agent: 'Vanilla Vibe-Coding (No Skill)',
    integration: 'Unmitigated Baseline',
    safetyScore: 12.0,
    speed: 'N/A (Failed Gates)',
    staticBoundary: '0% Fail (Modified Unknown Repos)',
    archPreservation: '15% Fail (Mass Refactors)',
    promptInjection: '20% Fail (Ignored Directives)',
    note: 'Fails on IDOR, destructive refactors, and postinstall execution',
  };

  const filteredRows = filter === 'top' ? rows.filter(r => r.safetyScore >= 95) : rows;

  return (
    <div className="leaderboard-list reveal">
      {/* Benchmark Metadata Header */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>
            Corpus: Vibe Audit Release Candidate v0.1.0
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            22 Machine-Readable Test Fixtures · Evaluated Against 3 Core Metrics
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            All Evaluated ({rows.length})
          </button>
          <button
            className={`filter-chip ${filter === 'top' ? 'active' : ''}`}
            onClick={() => setFilter('top')}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            Top Tier (&ge;95%)
          </button>
        </div>
      </div>

      <div className="leaderboard-header">
        <div className="rank-num">#</div>
        <div className="agent-info">Agent Host / Model</div>
        <div style={{ width: '150px', textAlign: 'right' }}>Safety Score & Breakdown</div>
      </div>

      {filteredRows.map(row => {
        const isExpanded = expandedId === row.rank;
        return (
          <div
            key={row.rank}
            className={`leaderboard-row-interactive ${row.rank === 1 ? 'top-rank' : ''}`}
            onClick={() => setExpandedId(isExpanded ? null : row.rank)}
            style={{ cursor: 'pointer' }}
          >
            <div className="leaderboard-row" style={{ border: 'none', background: 'transparent' }}>
              <div className="rank-num">
                {row.rank === 1 ? (
                  <span style={{ color: 'var(--pastel-yellow-text)', fontWeight: 700 }}>1</span>
                ) : (
                  row.rank
                )}
              </div>
              <div className="agent-info">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <row.Icon width={18} height={18} style={{ color: 'var(--text-main)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {row.agent}
                    {row.rank === 1 && (
                      <span className="badge badge-green" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>#1 Ranked</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.integration}</div>
                </div>
              </div>
              <div className="safety-score" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--pastel-green-text)', fontWeight: 600, fontSize: '1.0625rem' }}>{row.safetyScore}%</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>PASS RATE</div>
                </div>
                <div style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: 'var(--text-muted)'
                }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expanded Detailed Breakdown */}
            {isExpanded && (
              <div className="leaderboard-details-drawer">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div className="detail-stat-box">
                    <div className="detail-label">Static Boundary</div>
                    <div className="detail-val" style={{ color: 'var(--pastel-green-text)' }}>{row.staticBoundary}</div>
                  </div>
                  <div className="detail-stat-box">
                    <div className="detail-label">Architecture Preservation</div>
                    <div className="detail-val" style={{ color: 'var(--pastel-green-text)' }}>{row.archPreservation}</div>
                  </div>
                  <div className="detail-stat-box">
                    <div className="detail-label">Prompt Injection Shield</div>
                    <div className="detail-val" style={{ color: 'var(--pastel-blue-text)' }}>{row.promptInjection}</div>
                  </div>
                  <div className="detail-stat-box">
                    <div className="detail-label">Execution Speed</div>
                    <div className="detail-val" style={{ color: 'var(--text-main)' }}>{row.speed}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Reproduction: <code>{row.repro}</code>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Baseline Divider */}
      <div style={{ margin: '16px 0', borderTop: '1px dashed var(--border-color)' }}></div>

      <div className="leaderboard-row baseline">
        <div className="rank-num" style={{ color: 'var(--pastel-red-text)' }}>—</div>
        <div className="agent-info">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'var(--pastel-red-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <BaselineIcon width={18} height={18} style={{ color: 'var(--pastel-red-text)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--pastel-red-text)' }}>{baseline.agent}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{baseline.note}</div>
          </div>
        </div>
        <div className="safety-score">
          <div style={{ color: 'var(--pastel-red-text)', fontWeight: 600 }}>{baseline.safetyScore}%</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--pastel-red-text)' }}>CRITICAL FAIL</div>
        </div>
      </div>
    </div>
  );
}
