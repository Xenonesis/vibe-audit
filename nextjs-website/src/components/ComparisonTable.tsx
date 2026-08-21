export default function ComparisonTable() {
  const rows = [
    {
      dimension: 'Definition of Done',
      vibeCoded: '"It runs / the demo looks right"',
      withVibeAudit: (
        <>
          <span className="badge badge-green">Evidence-based</span> NOT READY → PARTIALLY READY → READY
        </>
      ),
    },
    {
      dimension: 'Hybrid Scanning',
      vibeCoded: 'LLM hallucinates security without verification',
      withVibeAudit: (
        <>
          <span className="badge badge-blue">Go CLI pre-scans</span> deterministic secrets & supply-chain hooks
        </>
      ),
    },
    {
      dimension: 'Trust Boundary',
      vibeCoded: 'Runs untrusted scripts (`npm install`, build hooks)',
      withVibeAudit: (
        <>
          <span className="badge badge-yellow">Static-only default</span> until repo trust is assessed; egress denied
        </>
      ),
    },
    {
      dimension: 'Change Approvals',
      vibeCoded: 'Agent free-refactors whatever it wants',
      withVibeAudit: 'Risk-gated: LOW auto-fix, MEDIUM plan proposal, HIGH explicit consent',
    },
    {
      dimension: 'Architecture',
      vibeCoded: 'Rewrites large codebases to match preferred tropes',
      withVibeAudit: (
        <>
          <strong>Preserved unless justified</strong> — nonstandard working code is not a defect
        </>
      ),
    },
    {
      dimension: 'Dependencies',
      vibeCoded: 'Added liberally without vetting size or scope',
      withVibeAudit: 'Smallest justified addition; framework-native first; no blind caching',
    },
    {
      dimension: 'Verification',
      vibeCoded: 'Manual click-through or assumed correct',
      withVibeAudit: 'Baseline → change → re-verify; failures labeled PRE-EXISTING vs INTRODUCED',
    },
    {
      dimension: 'Reporting',
      vibeCoded: 'Ephemeral, unreproducible chat summary',
      withVibeAudit: 'Structured findings: severity, confidence, impact, change risk, and file evidence',
    },
  ];

  return (
    <div className="comp-table-wrapper reveal">
      <table className="comp-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Typical Vibe-Coding</th>
            <th>With Vibe Audit Skill & Toolkit</th>
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
