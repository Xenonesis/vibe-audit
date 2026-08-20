'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import StatsBar from '@/components/StatsBar';
import ComparisonTable from '@/components/ComparisonTable';
import BentoGrid from '@/components/BentoGrid';
import Pipeline from '@/components/Pipeline';
import RiskGates from '@/components/RiskGates';
import Leaderboard from '@/components/Leaderboard';
import HarnessGrid from '@/components/HarnessGrid';
import EvalsTabs from '@/components/EvalsTabs';
import InstallTabs from '@/components/InstallTabs';
import FAQAccordion from '@/components/FAQAccordion';
import { useIntersectionReveal } from '@/app/use-intersection-reveal';

export default function Home() {
  useIntersectionReveal();

  // Theme init from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('vibe-audit-theme') || 'system';
    const applyTheme = (mode: string) => {
      const root = document.documentElement;
      if (mode === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', systemDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', mode);
      }
    };
    applyTheme(savedTheme);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleTabClick = (tabId: string) => {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
      btn.textContent?.includes(tabId.replace('install-tab-', '').replace('tab-', ''))
    );
    if (activeBtn) activeBtn.classList.add('active');
    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');
  };

  const handleAccordionToggle = (button: HTMLButtonElement) => {
    const item = button.parentElement;
    if (item) item.classList.toggle('active');
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <header className="hero section">
        <div className="container">
          <div className="hero-grid">
            <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
              <div className="badge badge-blue" style={{ marginBottom: '20px' }}>Agent Skill & Validation Toolkit</div>
              <h1 className="serif-title hero-heading">
                Turn vibe-coded applications into production-ready software.
              </h1>
              <p className="lead-text">
                An evidence-first agent skill and deterministic validation engine. Audit, plan, fix, and verify AI-generated web applications — without treating architectural preference as a defect.
              </p>

              <div className="hero-actions">
                <a href="#install" className="btn btn-primary">Get Started</a>
                <button
                  className="btn btn-secondary"
                  onClick={() => copyToClipboard('npx skills add Xenonesis/vibe-audit')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>Copy Install Command</span>
                </button>
              </div>
            </div>

            {/* Terminal Window Preview */}
            <div className="terminal-window reveal" style={{ marginTop: '10px' }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <span className="terminal-title">bash — installation & validation</span>
                <span className="badge badge-green">PASS 126/126</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <div>
                    <span className="prompt-symbol">$</span> <span className="cmd">npx skills add Xenonesis/vibe-audit</span>
                  </div>
                  <button className="copy-btn" onClick={() => copyToClipboard('npx skills add Xenonesis/vibe-audit')}>
                    <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    <span>Copy</span>
                  </button>
                </div>
                <p className="output-muted">Fetching skill package from GitHub (Xenonesis/vibe-audit)...</p>
                <p className="output-highlight">Found 1 skill: vibe-audit (v0.1.0)</p>
                <p className="output-success">Successfully installed vibe-audit globally for 60+ agent hosts.</p>
                <br />
                <div className="terminal-line">
                  <div>
                    <span className="prompt-symbol">$</span> <span className="cmd">python scripts/validate_skill.py .</span>
                  </div>
                  <button className="copy-btn" onClick={() => copyToClipboard('python scripts/validate_skill.py .')}>
                    <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    <span>Copy</span>
                  </button>
                </div>
                <p className="output-success">Passed: 126/126 skill validation rules satisfied.</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <StatsBar />
        </div>
      </header>

      <div className="divider"></div>

      {/* Why Vibe Audit Section */}
      <section id="why" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 01 — Comparison</div>
            <h2 className="serif-title section-heading">Vibe-Coding vs. Vibe Audit</h2>
            <p className="lead-text">
              The problem with vibe-coded apps is rarely code generation — it's that "it works" gets mistaken for "it's ready." 
              Vibe Audit encodes missing engineering discipline into a repeatable, evidence-backed process.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <div className="divider"></div>

      {/* Modes Section */}
      <section id="modes" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 02 — Modes & Profiles</div>
            <h2 className="serif-title section-heading">6 Operating Modes & 10 Specialist Profiles</h2>
            <p className="lead-text">
              Vibe Audit infers the narrowest requested mode. If ambiguous, it defaults to read-only AUDIT. 
              Profiles select domain-specific playbooks without overriding safety rules.
            </p>
          </div>

          <BentoGrid
            cards={[
              {
                badge: 'Read-Only',
                title: 'AUDIT',
                desc: 'Read-only discovery, baseline, findings, and report. Tracked source/config diff stays completely empty. Zero code changes.',
                badgeClass: 'badge-blue',
              },
              {
                badge: 'Read-Only',
                title: 'PLAN',
                desc: 'AUDIT mode plus a prioritized, risk-aware remediation plan detailing exact file changes and approval levels. Zero file modifications.',
                badgeClass: 'badge-blue',
              },
              {
                badge: 'Gated Fixes',
                title: 'FIX',
                desc: 'Audit, plan, apply permitted low/medium-risk fixes, run targeted verification, and generate final readiness report.',
                badgeClass: 'badge-green',
              },
              {
                badge: 'Security Focus',
                title: 'HARDEN',
                desc: 'Security-focused audit or fix according to the user\'s verb; avoids expanding into unrelated refactorings or cosmetic cleanup.',
                badgeClass: 'badge-yellow',
              },
              {
                badge: 'Targeted',
                title: 'PERFORMANCE',
                desc: 'Baseline, measure, optimize targeted bottlenecks, remeasure; no unmeasured claims, blind caching, or arbitrary rewrites.',
                badgeClass: 'badge-yellow',
              },
              {
                badge: 'Full Pipeline',
                title: 'FULL POLISH',
                desc: 'Sequential execution: Security → Correctness → Reliability → Performance → AI Smells → Maintainability → Verification.',
                badgeClass: 'badge-green',
              },
            ]}
          />

          <div className="reveal" style={{ marginTop: "48px", opacity: 1, transform: "translateY(0)" }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>10 Domain-Specific Profiles</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span className="badge badge-neutral">safe-audit (Untrusted Repos)</span>
              <span className="badge badge-neutral">frontend (UI/Client Heavy)</span>
              <span className="badge badge-neutral">fullstack (Next/Svelte/Nuxt)</span>
              <span className="badge badge-neutral">api-backend (REST/GraphQL/gRPC)</span>
              <span className="badge badge-neutral">ai-rag (LLM & Agent Apps)</span>
              <span className="badge badge-neutral">payments (Stripe/Commerce)</span>
              <span className="badge badge-neutral">database-multitenant (ORM/BOLA)</span>
              <span className="badge badge-neutral">cicd (GitHub Actions/Deploy)</span>
              <span className="badge badge-neutral">performance (Bottlenecks)</span>
              <span className="badge badge-neutral">default (General Web)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Pipeline Section */}
      <section id="pipeline" className="section">
        <div className="container">
          <Pipeline />
        </div>
      </section>

      <div className="divider"></div>

      {/* Risk Gates Section */}
      <section id="risk-gates" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 04 — Governance</div>
            <h2 className="serif-title section-heading">Risk-Gated Change Approvals</h2>
            <p className="lead-text">
              Severity describes the issue; Change Risk describes remediation risk. They are independent. 
              High-risk operations require explicit approval before execution.
            </p>
          </div>
          <RiskGates />
        </div>
      </section>

      <div className="divider"></div>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 05 — Verification & Benchmarks</div>
            <h2 className="serif-title section-heading">Agent Safety Leaderboard</h2>
            <p className="lead-text">
              Automated evaluation scores for top AI coding agents executing the 22-case Vibe Audit corpus. 
              Metrics measure strict adherence to static boundaries, correct risk-gating, and architectural preservation.
            </p>
          </div>
          <Leaderboard />
        </div>
      </section>

      <div className="divider"></div>

      {/* Harnesses Section */}
      <section id="harnesses" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 05 — Integration</div>
            <h2 className="serif-title section-heading">Multi-Harness Live Model Driver</h2>
            <p className="lead-text">
              <code>scripts/run_harness.py</code> probes binary PATHs, checks authentication status, installs the skill bundle, 
              headlessly executes models, and mechanically grades assertions across all 8 supported agent hosts.
            </p>
          </div>
          <HarnessGrid />
        </div>
      </section>

      <div className="divider"></div>

      {/* Evals Section */}
      <section id="evals" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 06 — Architecture</div>
            <h2 className="serif-title section-heading">Toolkit Inventory & CLI Utilities</h2>
            <p className="lead-text">
              Vibe Audit is fully self-contained. It contains reference playbooks, specialist profiles, 
              machine-readable evals, capability TOMLs, and deterministic CLI tool scripts.
            </p>
          </div>
          <EvalsTabs />
        </div>
      </section>

      <div className="divider"></div>

      {/* Developer Section */}
      <section id="developer" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 07 — Author</div>
            <h2 className="serif-title section-heading">Developer Information</h2>
            <p className="lead-text">
              Designed and engineered with an evidence-first philosophy to bring deterministic verification and security 
              boundaries to autonomous coding assistants.
            </p>

            <div className="developer-card" style={{ opacity: 1, transform: 'translateY(0)' }}>
              <div className="dev-avatar">X</div>
              <div>
                <div className="dev-name">Xenonesis</div>
                <div className="dev-role">Creator of Vibe Audit & Security Architect</div>
                <p className="dev-bio">
                  Building open-standard agent skills, deterministic model evaluation runners, 
                  and execution-safety boundaries. Focused on turning non-deterministic AI generation 
                  into repeatable software engineering.
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <a href="https://github.com/Xenonesis" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
                      <path d="M11.976.0003a1.541 1.541 0 0 0-1.0928.4526L8.707 2.6287l2.7604 2.7604c.6417-.2166 1.377-.0715 1.8882.4399.514.5145.6583 1.2563.4362 1.9l.9101.9102 3.2768-3.2764L13.0684.4529A1.5394 1.5394 0 0 0 11.976.0003ZM7.638 3.698 5.926 5.4101l4.9095 4.9095c.1535.1536.332.267.5217.3423V8.831a1.8198 1.8198 0 0 1-.6024-.4011c-.5441-.5437-.6749-1.3422-.3958-2.0104Zm10.916 2.24-3.2765 3.2764 1.1743 1.1747c.6436-.2217 1.3862-.0782 1.9001.4366.7185.7183.7185 1.8823 0 2.6008-.7186.7187-1.8823.7187-2.6012 0-.5402-.5407-.674-1.3344-.4003-2l-1.1427-1.1423-.588.588c-.6036.604-.6036 1.5829 0 2.1865l4.9935 4.993 4.9342-4.9342c.6035-.6038.6035-1.5829 0-2.1865l-2.4673-2.4673c-.6035-.6039-1.583-.6039-2.1865 0Zm-7.7303 3.6545L5.6882 14.728l-4.57 4.5694a1.5414 1.5414 0 0 0 0 2.1818l1.3541 1.354a1.5407 1.5407 0 0 0 2.1818 0l4.5699-4.5699 5.1345-5.134-5.2348-5.2346Zm-2.311 9.9431a1.055 1.055 0 1 1 0 2.11 1.055 1.055 0 0 1 0-2.11Z" />
                    </svg>
                    <span>GitHub Profile</span>
                  </a>
                  <a href="https://skills.sh/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                    <span>skills.sh Listing</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Installation Section */}
      <section id="install" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 08 — Setup</div>
            <h2 className="serif-title section-heading">Installation & Multi-System Setup</h2>
            <p className="lead-text">
              Install Vibe Audit across any operating system (Windows, macOS, Linux), IDE, or CLI agent host using 
              automated or manual setup options.
            </p>
          </div>
          <InstallTabs />
        </div>
      </section>

      <div className="divider"></div>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 09 — FAQ</div>
            <h2 className="serif-title section-heading">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>vibe-audit v0.1.0</span>
            <span>—</span>
            <span>Created by Xenonesis under MIT License</span>
          </div>
          <div>
            <a href="https://github.com/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>GitHub Repository</a>
            <span style={{ margin: '0 8px' }}>·</span>
            <a href="https://skills.sh/Xenonesis/vibe-audit" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>skills.sh Directory</a>
          </div>
        </div>
      </footer>
    </>
  );
}