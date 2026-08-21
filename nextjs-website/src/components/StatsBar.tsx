export default function StatsBar() {
  return (
    <div className="stats-bar reveal">
      <div className="stat-card">
        <div className="stat-num">126/126</div>
        <div className="stat-label">Skill Validation Rules</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">22</div>
        <div className="stat-label">Machine-Readable Evals</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">11</div>
        <div className="stat-label">Supported Agent Hosts</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">Go + LLM</div>
        <div className="stat-label">Hybrid Static Scanner</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">13</div>
        <div className="stat-label">Domain Playbooks</div>
      </div>
    </div>
  );
}
