'use client';

import GlitchWave from '@/components/shaders/glitch-wave';

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

      {/* Banned Actions Callout Box with GlitchWave Shader Effect */}
      <div className="reveal col-12" style={{ gridColumn: 'span 12', marginTop: '32px' }}>
        <GlitchWave
          className="banned-glitch-box"
          speed={0.15}
          intensity={0.28}
          colors={['#EF4444', '#991B1B', '#1C1917']}
          colorBack="#140808"
        >
          <div style={{
            padding: '28px 24px',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            borderRadius: '8px',
            background: 'rgba(20, 8, 8, 0.75)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: '#DC2626', color: '#FFFFFF', border: 'none', fontWeight: 600 }}>
                STRICTLY FORBIDDEN
              </span>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#FEE2E2',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-mono)',
                margin: 0
              }}>
                Banned Autonomous Operations
              </h4>
            </div>
            <p style={{ fontSize: '0.9375rem', color: '#FECACA', lineHeight: 1.6, margin: 0 }}>
              Vibe Audit <strong style={{ color: '#FFFFFF' }}>NEVER</strong> automatically executes: <code style={{ background: 'rgba(0,0,0,0.6)', color: '#FCA5A5', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>DROP DATABASE/TABLE</code>, database reset, unsafe mass deletion, forced migrations, git history rewrites, production secret revocation, deployment publish/destroy commands, or package publication.
            </p>
          </div>
        </GlitchWave>
      </div>
    </div>
  );
}
