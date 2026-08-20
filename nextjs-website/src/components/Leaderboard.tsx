import { SVGProps } from 'react';

// Safe SVG path components (properly escaped and simplified where possible)
const OMPsvg = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

const ClaudeCodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.976.0003a1.541 1.541 0 0 0-1.0928.4526L8.707 2.6287l2.7604 2.7604c.6417-.2166 1.377-.0715 1.8882.4399.514.5145.6583 1.2563.4362 1.9l.9101.9102 3.2768-3.2764L13.0684.4529A1.5394 1.5394 0 0 0 11.976.0003ZM7.638 3.698 5.926 5.4101l4.9095 4.9095c.1535.1536.332.267.5217.3423V8.831a1.8198 1.8198 0 0 1-.6024-.4011c-.5441-.5437-.6749-1.3422-.3958-2.0104Zm10.916 2.24-3.2765 3.2764 1.1743 1.1747c.6436-.2217 1.3862-.0782 1.9001.4366.7185.7183.7185 1.8823 0 2.6008-.7186.7187-1.8823.7187-2.6012 0-.5402-.5407-.674-1.3344-.4003-2l-1.1427-1.1423-.588.588c-.6036.604-.6036 1.5829 0 2.1865l4.9935 4.993 4.9342-4.9342c.6035-.6038.6035-1.5829 0-2.1865l-2.4673-2.4673c-.6035-.6039-1.583-.6039-2.1865 0Zm-7.7303 3.6545L5.6882 14.728l-4.57 4.5694a1.5414 1.5414 0 0 0 0 2.1818l1.3541 1.354a1.5407 1.5407 0 0 0 2.1818 0l4.5699-4.5699 5.1345-5.134-5.2348-5.2346Zm-2.311 9.9431a1.055 1.055 0 1 1 0 2.11 1.055 1.055 0 0 1 0-2.11Z" />
  </svg>
);

const BaselineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

export default function Leaderboard() {
  const rows = [
    {
      rank: '#1',
      name: 'Oh My Pi (OMP)',
      integration: 'Native Skills',
      score: '98.5%',
      integrationClass: 'badge-green' as const,
      Logo: OMPsvg,
    },
    {
      rank: '#2',
      name: 'Pi Agent',
      integration: 'Native Skills',
      score: '98.0%',
      integrationClass: 'badge-green' as const,
      Logo: PiIcon,
    },
    {
      rank: '#3',
      name: 'Cursor IDE',
      integration: 'MDC + MCP',
      score: '94.2%',
      integrationClass: 'badge-blue' as const,
      Logo: CursorIcon,
    },
    {
      rank: '#4',
      name: 'Windsurf',
      integration: 'Cascade + MCP',
      score: '92.8%',
      integrationClass: 'badge-blue' as const,
      Logo: WindsurfIcon,
    },
    {
      rank: '#5',
      name: 'Claude Code',
      integration: 'System Prompt',
      score: '89.5%',
      integrationClass: 'badge-yellow' as const,
      Logo: ClaudeCodeIcon,
    },
  ];

  const baseline = {
    name: 'Vanilla Vibe-Coding (No Audit)',
    integration: 'Baseline' as const,
    score: '12.0%',
  };

  return (
    <div className="leaderboard-list reveal">
      {/* Table Header */}
      <div className="leaderboard-header">
        <div>Rank</div>
        <div>Agent Host</div>
        <div className="col-integration">Integration</div>
        <div style={{ textAlign: 'right' }}>Safety Score</div>
      </div>

      {/* Leaderboard Rows */}
      {rows.map(row => (
        <div key={row.name} className="leaderboard-row">
          <div className="rank-num">{row.rank}</div>
          <div className="agent-info">
            <row.Logo width={18} height={18} fill="currentColor" />
            <span className="agent-name">{row.name}</span>
          </div>
          <div className="col-integration">
            <span className={`badge ${row.integrationClass}`}>{row.integration}</span>
          </div>
          <div className="safety-score">{row.score}</div>
        </div>
      ))}

      {/* Baseline Row */}
      <div className="leaderboard-row baseline">
        <div className="rank-num">-</div>
        <div className="agent-info" style={{ color: 'var(--text-muted)' }}>
          <BaselineIcon width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} />
          <span className="agent-name">{baseline.name}</span>
        </div>
        <div className="col-integration">
          <span className="badge badge-red">{baseline.integration}</span>
        </div>
        <div className="safety-score" style={{ color: 'var(--pastel-red-text)' }}>{baseline.score}</div>
      </div>
    </div>
  );
}