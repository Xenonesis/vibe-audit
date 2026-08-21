'use client';

import { SVGProps } from 'react';

const ShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3L4 7v9c0 7.5 5.2 13.1 12 15 6.8-1.9 12-7.5 12-15V7L16 3z" />
    <path d="M10 16l4 4 8-9" strokeWidth={2.5} />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-enhanced">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col-brand">
            <div className="brand" style={{ marginBottom: '14px' }}>
              <ShieldIcon width={22} height={22} className="icon-logo" />
              <span>vibe-audit</span>
              <span className="badge badge-blue">v0.1.0</span>
            </div>
            <p className="footer-bio">
              The evidence-first agent skill & deterministic validation toolkit.
              Turns AI-generated web applications into production-ready software without rewriting working architecture.
            </p>
            <div className="footer-status-pill">
              <span className="status-dot-pulse" />
              <span>126/126 Release Rules Passing · Go Scanner Ready</span>
            </div>
          </div>

          {/* Col 2: Architecture & Modes */}
          <div className="footer-col">
            <div className="footer-heading">Operating Modes</div>
            <ul className="footer-links">
              <li><a href="#modes">AUDIT (Read-Only)</a></li>
              <li><a href="#modes">PLAN (Remediation DAG)</a></li>
              <li><a href="#modes">HARDEN (Security Bounds)</a></li>
              <li><a href="#modes">OPTIMIZE (Preserved Perf)</a></li>
              <li><a href="#modes">VERIFY (Evidence Match)</a></li>
              <li><a href="#modes">POLISH (End-to-End)</a></li>
            </ul>
          </div>

          {/* Col 3: Evaluated Harnesses */}
          <div className="footer-col">
            <div className="footer-heading">Agent Harnesses</div>
            <ul className="footer-links">
              <li><a href="#harnesses">Oh My Pi (OMP) — 98.5%</a></li>
              <li><a href="#harnesses">Pi Agent — 98.0%</a></li>
              <li><a href="#harnesses">Cursor IDE (MDC) — 94.2%</a></li>
              <li><a href="#harnesses">Windsurf (Cascade) — 92.8%</a></li>
              <li><a href="#harnesses">Claude Code — 89.5%</a></li>
              <li><a href="#harnesses">TRAE / TraeCode</a></li>
              <li><a href="#harnesses">OpenCode CLI</a></li>
            </ul>
          </div>

          {/* Col 4: Toolkit & Ecosystem */}
          <div className="footer-col">
            <div className="footer-heading">Ecosystem & Source</div>
            <ul className="footer-links">
              <li>
                <a href="https://github.com/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://skills.sh/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer">
                  skills.sh Registry
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/vibe-audit" target="_blank" rel="noopener noreferrer">
                  NPM CLI Package
                </a>
              </li>
              <li>
                <a href="#evals">13 Domain Playbooks</a>
              </li>
              <li>
                <a href="#evals">22 Machine Evals</a>
              </li>
              <li>
                <a href="https://github.com/Xenonesis" target="_blank" rel="noopener noreferrer">
                  Author: Xenonesis
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>&copy; 2026 Xenonesis. Released under MIT License.</span>
            <span className="footer-sep">&bull;</span>
            <span>Zero-dependency compiled Go binary + Open Agent Skills Standard.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
              <span>Back to top</span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
