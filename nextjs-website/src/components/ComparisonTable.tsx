export default function ComparisonTable() {
  const rows = [
    {
      dimension: 'Definition of Done',
      vibeCoded: '"It runs / demo looks right"',
      withVibeAudit: (
        <>
          <span className="badge badge-green">Evidence-based</span> NOT READY → PARTIALLY READY → READY
        </>
      ),
    },
    {
      dimension: 'Security & Auth',
      vibeCoded: 'None, or panic fix after a breach',
      withVibeAudit: 'Dedicated security pass; IDOR, BOLA, SQLi, and Auth boundary checks',
    },
    {
      dimension: 'Trust Boundary',
      vibeCoded: 'Blindly runs repo scripts (`npm install`, build hooks)',
      withVibeAudit: (
        <>
          <span className="badge badge-yellow">Static-only default</span> until trust is assessed; sandbox required
        </>
      ),
    },
    {
      dimension: 'Change Risk',
      vibeCoded: 'Agent free-refactors whatever it wants',
      withVibeAudit: 'Risk-gated: LOW auto-fix, MEDIUM plan first, HIGH explicit approval',
    },
    {
      dimension: 'Architecture',
      vibeCoded: 'Agent rewrites code to match preferred patterns',
      withVibeAudit: (
        <>
          <strong>Preserved unless justified</strong> — nonstandard working code is not a defect
        </>
      ),
    },
    {
      dimension: 'Dependencies',
      vibeCoded: 'Added liberally while building',
      withVibeAudit: 'Smallest justified addition; framework-native first; no blind Redis/cache',
    },
    {
      dimension: 'Verification',
      vibeCoded: 'Manual click-through, if any',
      withVibeAudit: 'Baseline → change → re-verify; failures labeled PRE-EXISTING vs INTRODUCED',
    },
    {
      dimension: 'Reporting',
      vibeCoded: 'Unreproducible chat summary',
      withVibeAudit: 'Structured findings: severity, confidence, impact, change risk, evidence',
    },
  ];

  return (
    <div className="comp-table-wrapper reveal">
      <table className="comp-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Typical Vibe-Coded Workflow</th>
            <th>With Vibe Audit Skill</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.dimension}>
              <td><strong>{row.dimension}</strong></td>
              <td>{row.vibeCoded}</td>
              <td>{row.withVibeAudit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}