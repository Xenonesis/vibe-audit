<div align="center">

# 🛡️ Vibe Audit `v0.2`

**Evidence-first Agent Skill & Deterministic Validation Toolkit**  
*Audit, plan, fix, and verify AI-generated web applications without treating architectural preference as a defect.*

[![skills.sh](https://img.shields.io/badge/skills.sh-Xenonesis%2Fvibe--audit-000000?style=for-the-badge&logo=github)](https://skills.sh/Xenonesis/vibe-audit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Release Gate](https://img.shields.io/badge/Release_Gate-PASS_163%2F163-emerald?style=for-the-badge)](#release-confidence)
[![Harnesses](https://img.shields.io/badge/Supported_Harnesses-21_Agent_Hosts-purple?style=for-the-badge)](#supported-harnesses)

[Overview](#why-vibe-audit) • [Quick Start](#quick-start) • [Toolkit](#toolkit-structure) • [Risk Gates](#risk-gated-approvals) • [Harnesses](#supported-harnesses) • [Deployments](#deployed-websites)

</div>

---

## ⚡ Quick Start

### 1. Global Installation (`skills.sh`)

Installs for all open-standard CLI agent hosts (Claude Code, OMP, Pi, Codex, Gemini CLI, OpenCode):

```bash
npx skills add Xenonesis/vibe-audit
```

### 2. Visit the Deployed Website

The Vibe Audit toolkit website is deployed to GitHub Pages and serves as a living showcase:

**🌐 https://xenonesis.github.io/vibe-audit/**

Built with Next.js (app router, server components, static export), it demonstrates production-ready AI auditing workflows.

---

## 🎯 Why Vibe Audit?

The core problem with vibe-coded applications is rarely code generation — **it's that *"it works"* gets mistaken for *"it's production-ready."***

Vibe Audit encodes engineering discipline directly into your agent host, utilizing a **Hybrid AI Architecture** that bridges deterministic static analysis with contextual LLM remediation.

| Dimension | Normal Vibe-Coding | With Vibe Audit |
|---|---|---|
| 🏁 **Definition of Done** | *"The demo looks right"* | `NOT READY → PARTIALLY READY → READY` |
| 🔍 **Hybrid Scanning** | LLM hallucinates security | **Go CLI pre-scans** for secrets & supply-chain hooks |
| 🔒 **Security Boundary** | None, or panic fix post-breach | Dedicated security pass with evidence |
| 🛡️ **Repository Trust** | Runs untrusted scripts (`npm install`) | **Static-only by default** until trust assessed |
| ⚖️ **Change Approvals** | Free-refactors whatever it wants | Risk-gated: `LOW` auto, `MEDIUM` plan, `HIGH` consent |
| 🏗️ **Architecture** | Rewrites large chunks on preference | **Preserved unless justified** |
| 📊 **Reporting** | Ephemeral chat summary | Structured findings with severity & impact |

> 🏆 **See the data**: View our [Agent Safety Leaderboard](https://xenonesis.github.io/vibe-audit/leaderboard) evaluating top AI models against the 22-case Vibe Audit corpus.

---

## 🔧 Toolkit Structure

| Asset Directory | Files | Primary Purpose |
|---|---|---|
| 📁 **`cli/`** | 3 | Go-based Native CLI Tool (Scanner, Dependency Time-Bomb, Env Parity, Scorecard, MCP Server) |
| 📁 **`scripts/`** | 12 | Python validation, trust assessment, & release gate engines |
| 📁 **`references/`** | 21 | Domain playbooks (security, correctness, reliability, performance, observability, DB risks, test quality, deployment gate, extension MV3, mobile, desktop, SaaS webhooks, AI smells, a11y, SEO) |
| 📁 **`profiles/`** | 17 | Specialist profiles (frontend, fullstack, API, payments, extension, mobile, desktop, saas-billing, RAG, multitenant, CI/CD, GDPR, HIPAA, SOC2-lite, etc.) |
| 📁 **`harnesses/`** | 21 | Capability probes for all supported agent hosts |
| 📁 **`adapters/`** | 22 | Host integration documentation |
| 📁 **`evals/`** | 44 | Machine-readable eval cases & fixtures (`evals.json`) |
## 🛑 Risk-Gated Approvals

Vibe Audit categorizes remediation operations by risk level:

* 🟢 **LOW Risk**: Confidently safe edits (dead code removal, unused imports, safe bounds checks). **Auto-fix allowed.**
* 🟡 **MEDIUM Risk**: Non-breaking structural additions (validation schemas, database indexes, rate limiters). **Plan proposal required.**
* 🔴 **HIGH Risk**: Critical architectural operations (auth engine migration, database schema rewrite, secret rotation). **Explicit user consent strictly required.**

---

## 🌐 Deployed Websites

| Repository | Description |
|---|---|
| **[nextjs-website](https://github.com/Xenonesis/vibe-audit/tree/main/nextjs-website)** | Vibe Audit toolkit showcase site (https://xenonesis.github.io/vibe-audit/) |

---

## 💻 Supported Harnesses

Vibe Audit includes verified capability drivers and adapters for **21 major AI agent hosts**:

<details>
<summary><b>Click to expand Harness Compatibility Matrix (21 Hosts)</b></summary>

<br>

| Harness | Category | Integration Method | Driver Status |
|---|---|---|---|
| **Pi Agent** | CLI Agent | Headless CLI (`pi -p`) | ✅ Verified PASS |
| **Oh My Pi (OMP)** | CLI Agent | Headless CLI (`omp -p`) | ✅ Verified PASS |
| **Claude Code** | CLI Agent | Headless CLI (`claude -p`) | 🟡 Probed (Auth Gated) |
| **Cursor IDE** | IDE Agent | Native MDC (`.cursor/rules/`) / MCP | ✅ MDC + MCP Ready |
| **Windsurf IDE** | IDE Agent | Cascade Rules (`.windsurfrules`) / MCP | ✅ Rule + MCP Ready |
| **Aider** | Pair CLI | Conventions (`CONVENTIONS.md`) / Config | ✅ Export Ready |
| **Cline** | IDE Agent | Rules (`.clinerules`) / MCP | ✅ Rule + MCP Ready |
| **Roo Code** | Multi-Mode Agent | Modes (`.roomodes`) / Rules / MCP | ✅ Multi-mode Ready |
| **OpenHands** | Autonomous Sandbox | Microagents / `AGENTS.md` | ⚪ Probed |
| **Goose (Block)** | CLI / Desktop Agent | Hints (`.goosehints`) / MCP | ⚪ Probed |
| **Continue** | IDE Assistant | Rules (`.continue/rules/`) / MCP | ⚪ Probed |
| **Codex** | CLI Agent | Headless CLI | ⚪ Probed |
| **Gemini CLI** | CLI Agent | Headless CLI | ⚪ Probed |
| **Copilot CLI** | CLI / IDE | Instructions / Stdio MCP | ⚪ Probed |
| **Antigravity** | Agent Driver | Harness Driver | ⚪ Probed |
| **OpenCode** | Open CLI | Open Standard CLI (`.agents/skills/`) | ⚪ Probed |
| **TRAE / TraeCode** | IDE Agent | Agentic Integration | ⚪ Probed |
| **Zed AI** | Editor Agent | Context Providers / System Prompt | ⚪ Probed |
| **Amazon Q Developer** | Cloud CLI | Rules (`.amazonq/rules/`) | ⚪ Probed |
| **Devin (Cognition)** | Cloud Autonomous | `AGENTS.md` / Cloud Sandbox | ⚪ Probed |
| **Kilo Code** | Terminal Agent | Open Skills (`.agents/skills/`) | ⚪ Probed |

</details>

---

## 🕹️ Local Validation Suite

```bash
# Go CLI: Static scanner for secrets & supply-chain hooks
cd cli && go run main.go scan ..

# Python: Validate skill structure & release gates
python scripts/validate_skill.py .
python scripts/release_gate.py .
python scripts/assess_repo_trust.py .
```

---

## 🖥️ Next.js Website

The toolkit showcase website is a Next.js 16+ App Router project with:
- Static export to GitHub Pages
- 21 adaptive harnesses (Cursor, Claude Code, Windsurf, Aider, Cline, Roo Code, Goose, OpenHands, Devin, etc.)
- Interactive eval explorer with 22 machine-readable fixtures
- Risk-gated change approval visualization
- Agent safety leaderboard across evaluated model drivers
### Development

```bash
cd nextjs-website
npm install
npm run dev    # http://localhost:3000
npm run build  # Exports to ./out/
```

---

## 📄 License & Attribution

Designed and engineered by **[Xenonesis](https://github.com/Xenonesis)** under the **MIT License**.  
Indexed on **[skills.sh](https://skills.sh/Xenonesis/vibe-audit)**.