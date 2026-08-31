export default function StatsBar() {
  return (
    <div className="stats-bar reveal">
      <div className="stat-card">
        <div className="stat-num">163/163</div>
        <div className="stat-label">Skill Validation Rules</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">40</div>
        <div className="stat-label">Machine-Readable Evals</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">21</div>
        <div className="stat-label">Supported Agent Hosts</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">5</div>
        <div className="stat-label">Adaptive Harnesses (Live)</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">17</div>
        <div className="stat-label">Domain Playbooks</div>
      </div>
    </div>
  );
}
