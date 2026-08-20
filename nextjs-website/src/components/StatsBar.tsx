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
        <div className="stat-label">Supported Harnesses</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">Static-First</div>
        <div className="stat-label">Trust & Safety Boundary</div>
      </div>
    </div>
  );
}