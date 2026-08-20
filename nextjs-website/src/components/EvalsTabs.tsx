'use client';

import { useState } from 'react';

export default function EvalsTabs() {
  const [activeTab, setActiveTab] = useState('scripts');

  const tabs = [
    { id: 'scripts', label: 'Deterministic Scripts (15+)' },
    { id: 'references', label: 'Domain References (13)' },
    { id: 'evals', label: 'Machine Evals (22)' },
  ];

  return (
    <div style={{ marginTop: '40px' }} className="reveal">
      <div className="tabs-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Scripts */}
      {activeTab === 'scripts' && (
        <div id="tab-scripts" className="tab-content active">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="terminal-title">python scripts / CLI tools</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Live harness driver for all 8 agent hosts</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">python scripts/run_harness.py . --eval 1 --harness pi --condition with-skill --timeout 300</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText('python scripts/run_harness.py . --eval 1 --harness pi --condition with-skill --timeout 300')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Validate skill integrity and 126/126 rules</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">python scripts/validate_skill.py .</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText('python scripts/validate_skill.py .')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Run 54 static checks across all eval fixtures</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">python scripts/run_static_evals.py .</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText('python scripts/run_static_evals.py .')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
              <br />
              <div className="terminal-line">
                <div>
                  <span className="prompt-symbol"># Package distribution release zip artifact</span>
                  <br />
                  <span className="prompt-symbol">$</span>{' '}
                  <span className="cmd">python scripts/package_release.py . --output dist/vibe-audit-v0.1.zip</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText('python scripts/package_release.py . --output dist/vibe-audit-v0.1.zip')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: References */}
      {activeTab === 'references' && (
        <div id="tab-references" className="tab-content active">
          <div className="bento-grid">
            <div className="bento-card col-6">
              <div className="card-title">references/security.md</div>
              <div className="card-desc">IDOR/BOLA, authentication bypass, SQLi, XSS, SSRF, secret leakage, mass assignment, and tenant isolation playbooks.</div>
            </div>
            <div className="bento-card col-6">
              <div className="card-title">references/execution-safety.md</div>
              <div className="card-desc">Adversarial repository analysis, safe sandboxing boundaries, network egress denial, and prompt injection defenses.</div>
            </div>
            <div className="bento-card col-6">
              <div className="card-title">references/correctness.md</div>
              <div className="card-desc">Financial precision, money math, state machine transitions, concurrent updates, floating point pitfalls, and race conditions.</div>
            </div>
            <div className="bento-card col-6">
              <div className="card-title">references/ai-code-smells.md</div>
              <div className="card-desc">Hallucinated imports, half-implemented stubs, dead code paths, duplicate logic, and unmaintained dependency bloat.</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Evals */}
      {activeTab === 'evals' && (
        <div id="tab-evals" className="tab-content active">
          <div className="comp-table-wrapper">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Eval Title</th>
                  <th>Category</th>
                  <th>Primary Assertion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>eval-1</code></td>
                  <td>IDOR in Express Order Lookup</td>
                  <td><span className="badge badge-red">Security</span></td>
                  <td><code>no_source_modification</code> + evidence check</td>
                </tr>
                <tr>
                  <td><code>eval-2</code></td>
                  <td>Floating Point Currency Inaccuracy</td>
                  <td><span className="badge badge-yellow">Correctness</span></td>
                  <td>Use arbitrary precision / integer cents</td>
                </tr>
                <tr>
                  <td><code>eval-3</code></td>
                  <td>Adversarial postinstall Exfiltration Hook</td>
                  <td><span className="badge badge-red">Execution Safety</span></td>
                  <td>Refuse dynamic execution; keep static-only</td>
                </tr>
                <tr>
                  <td><code>eval-4</code></td>
                  <td>N+1 Prisma Database Query Bottleneck</td>
                  <td><span className="badge badge-yellow">Performance</span></td>
                  <td>Batch query with <code>findMany</code> / include</td>
                </tr>
                <tr>
                  <td><code>eval-5</code></td>
                  <td>Half-Implemented Stubs & Hallucinated Libs</td>
                  <td><span className="badge badge-neutral">AI Smells</span></td>
                  <td>Detect empty callbacks and phantom imports</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}