export default function RiskGates() {
  const risks = [
    {
      title: 'LOW Risk',
      badge: 'Auto-Fix Allowed',
      badgeClass: 'badge-green' as const,
      desc: 'Confidently safe edits: unused imports, verified dead code, small type fixes, obvious input bounds, behavior-preserving query batching.',
    },
    {
      title: 'MEDIUM Risk',
      badge: 'Plan Required',
      badgeClass: 'badge-yellow' as const,
      desc: 'Planning required before execution: new validation layer, index addition, rate limiter, caching, moderate dependency upgrades, component extraction.',
    },
    {
      title: 'HIGH Risk',
      badge: 'Explicit Approval Needed',
      badgeClass: 'badge-red' as const,
      desc: 'Requires explicit user consent: auth model migration, DB provider migration, destructive schema changes, payment architecture edits, secret rotation.',
    },
  ];

  return (
    <div className="bento-grid reveal">
      {risks.map(risk => (
        <div key={risk.title} className="bento-card col-4">
          <div>
            <div className={`badge ${risk.badgeClass}`} style={{ marginBottom: '12px' }}>{risk.badge}</div>
            <div className="card-title">{risk.title}</div>
            <div className="card-desc">{risk.desc}</div>
          </div>
        </div>
      ))}

      {/* Banned Actions Callout Box */}
      <div className="reveal" style={{
        background: 'var(--pastel-red-bg)',
        border: '1px solid rgba(159, 47, 45, 0.2)',
        borderRadius: '8px',
        padding: '28px',
        marginTop: '32px'
      }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--pastel-red-text)',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)'
        }}>
          Strictly Forbidden Automatic Actions
        </h4>
        <p style={{ fontSize: '0.9375rem', color: 'var(--pastel-red-text)', lineHeight: 1.6 }}>
          Vibe Audit NEVER automatically executes: <code>DROP DATABASE/TABLE</code>, database reset, unsafe mass deletion, forced migrations, git history rewrites, production secret revocation, deployment publish/destroy commands, or package publication.
        </p>
      </div>
    </div>
  );
}