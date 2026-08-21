'use client';

import { useState } from 'react';
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
import Footer from '@/components/Footer';
import GlitchWave from '@/components/shaders/glitch-wave';
import { useIntersectionReveal } from '@/app/use-intersection-reveal';

export default function Home() {
  useIntersectionReveal();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (key) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <header className="hero section">
        <div className="container">
          <div className="hero-grid">
            <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
              <div className="badge badge-blue" style={{ marginBottom: '20px' }}>
                v0.1 · Agent Skill & Validation Toolkit
              </div>
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
                  onClick={() => copyToClipboard('npx skills add Xenonesis/vibe-audit', 'hero-install')}
                >
                  <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  <span>{copiedKey === 'hero-install' ? 'Copied to Clipboard!' : 'Copy skills.sh Install'}</span>
                </button>
              </div>
            </div>

            {/* Terminal Window Preview with GlitchWave Shader */}
            <div className="reveal" style={{ marginTop: '10px' }}>
              <GlitchWave
                className="terminal-glitch-wrapper"
                speed={0.16}
                intensity={0.25}
                colors={['#3B82F6', '#1E40AF', '#0F172A']}
                colorBack="#0B0F19"
              >
                <div className="terminal-window-glitch">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                    <span className="terminal-title">bash — installation & static pre-scan</span>
                    <span className="badge badge-green">PASS 126/126</span>
                  </div>
                  <div className="terminal-body">
                    <div className="terminal-line">
                      <div>
                        <span className="prompt-symbol">$</span> <span className="cmd">npx skills add Xenonesis/vibe-audit</span>
                      </div>
                      <button className="copy-btn" onClick={() => copyToClipboard('npx skills add Xenonesis/vibe-audit', 'term-1')}>
                        <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>{copiedKey === 'term-1' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="output-muted">Fetching skill package from GitHub (Xenonesis/vibe-audit)...</p>
                    <p className="output-highlight">Found 1 skill: vibe-audit (v0.1.0)</p>
                    <p className="output-success">Installed globally for 60+ open-standard agent hosts.</p>
                    <br />
                    <div className="terminal-line">
                      <div>
                        <span className="prompt-symbol">$</span> <span className="cmd">vibe-audit scan</span>
                      </div>
                      <button className="copy-btn" onClick={() => copyToClipboard('vibe-audit scan', 'term-2')}>
                        <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>{copiedKey === 'term-2' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="output-muted">Running Go static scanner across workspace...</p>
                    <p className="output-success">Clean: 0 hardcoded secrets · 0 untrusted lifecycle hooks.</p>
                    <br />
                    <div className="terminal-line">
                      <div>
                        <span className="prompt-symbol">$</span> <span className="cmd">python scripts/validate_skill.py .</span>
                      </div>
                      <button className="copy-btn" onClick={() => copyToClipboard('python scripts/validate_skill.py .', 'term-3')}>
                        <svg className="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>{copiedKey === 'term-3' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="output-success">Passed: 126/126 skill validation rules satisfied.</p>
                  </div>
                </div>
              </GlitchWave>
            </div>
          </div>

          {/* Stats Bar */}
          <StatsBar />
        </div>
      </header>

      <div className="divider"></div>

      {/* Pillar 01: Why Vibe Audit Section */}
      <section id="why" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 01 — Comparison</div>
            <h2 className="serif-title section-heading">Vibe-Coding vs. Vibe Audit</h2>
            <p className="lead-text">
              The problem with vibe-coded apps is rarely code generation — it&apos;s that &ldquo;it works&rdquo; gets mistaken for &ldquo;it&apos;s ready.&rdquo; 
              Vibe Audit encodes missing engineering discipline into a repeatable, evidence-backed process.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <div className="divider"></div>

      {/* Pillar 02: Modes & Profiles Section */}
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
                desc: 'Security-focused audit or fix according to user instructions; avoids expanding into unrelated refactorings or cosmetic cleanup.',
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

          <div className="reveal" style={{ marginTop: '48px', opacity: 1, transform: 'translateY(0)' }}>
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

      {/* Pillar 03: Pipeline Section */}
      <section id="pipeline" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 03 — Execution Lifecycle</div>
            <h2 className="serif-title section-heading">Deterministic 6-Phase Pipeline</h2>
            <p className="lead-text">
              Every audit follows a structured, risk-aware lifecycle that guards repository trust, records pre-existing defects, 
              and ensures fixes are verified before claiming production readiness.
            </p>
          </div>
          <Pipeline />
        </div>
      </section>

      <div className="divider"></div>

      {/* Pillar 04: Risk Gates Section */}
      <section id="risk-gates" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 04 — Governance</div>
            <h2 className="serif-title section-heading">Risk-Gated Change Approvals</h2>
            <p className="lead-text">
              Severity describes the issue; Change Risk describes remediation risk. They are independent. 
              High-risk operations strictly require explicit approval before execution.
            </p>
          </div>
          <RiskGates />
        </div>
      </section>

      <div className="divider"></div>

      {/* Pillar 05: Leaderboard Section */}
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

      {/* Pillar 06: Harnesses Section */}
      <section id="harnesses" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 06 — Multi-Harness Integration</div>
            <h2 className="serif-title section-heading">Multi-Harness Live Model Driver</h2>
            <p className="lead-text">
              <code>scripts/run_harness.py</code> probes binary PATHs, checks authentication status, installs the skill bundle, 
              headlessly executes models, and mechanically grades assertions across all 11 supported agent hosts.
            </p>
          </div>
          <HarnessGrid />
        </div>
      </section>

      <div className="divider"></div>

      {/* Pillar 07: Evals & Toolkit Section */}
      <section id="evals" className="section">
        <div className="container">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 07 — Toolkit & Evals</div>
            <h2 className="serif-title section-heading">Toolkit Inventory & CLI Utilities</h2>
            <p className="lead-text">
              Vibe Audit is fully self-contained. It contains 13 reference playbooks, 10 specialist profiles, 
              22 machine-readable evals, 11 capability TOMLs, and deterministic CLI validation engines.
            </p>
          </div>
          <EvalsTabs />
        </div>
      </section>

      <div className="divider"></div>

      {/* Pillar 08: Installation Section */}
      <section id="install" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 08 — Setup & Install</div>
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

      {/* Pillar 09: Developer Section */}
      <section id="developer" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 09 — Author</div>
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
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="https://github.com/Xenonesis" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.67-.22.67-.5 0-.25-.01-1.41-.01-2.48-2.75.6-3.75-1.38-3.75-1.38-.45-1.16-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.54 2.34 1.09 2.91.84.09-.66.35-1.09.63-1.34-2.23-.25-4.57-1.12-4.57-4.94 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .83-.27 2.72 1.04A9.57 9.57 0 0112 6.84c.85.01 1.71.11 2.5.34 1.89-1.31 2.72-1.04 2.72-1.04.54 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.32.67.94.67 1.9 0 1.38-.01 2.5-.01 2.85 0 .28.17.6.67.5A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"></path>
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

      {/* Pillar 10: FAQ Section */}
      <section id="faq" className="section">
        <div className="container-narrow">
          <div className="reveal" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="mono-sub" style={{ marginBottom: '12px' }}>Pillar 10 — FAQ</div>
            <h2 className="serif-title section-heading">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <Footer />
    </>
  );
}
