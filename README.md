<div align="center">

# 🛡️ Vibe Audit `v0.1`

**Evidence-first Agent Skill & Deterministic Validation Toolkit**  
*Audit, plan, fix, and verify AI-generated web applications without treating architectural preference as a defect.*

[![skills.sh](https://img.shields.io/badge/skills.sh-Xenonesis%2Fvibe--audit-000000?style=for-the-badge&logo=github)](https://skills.sh/Xenonesis/vibe-audit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Release Gate](https://img.shields.io/badge/Release_Gate-PASS_126%2F126-emerald?style=for-the-badge)](#release-confidence)
[![Harnesses](https://img.shields.io/badge/Supported_Harnesses-11_Agent_Hosts-purple?style=for-the-badge)](#supported-harnesses)

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
| 📁 **`cli/`** | 1 | Go-based Native CLI Tool (Scanner, Rule Exporter, MCP Server) |
| 📁 **`scripts/`** | 12 | Python validation, trust assessment, & release gate engines |
| 📁 **`references/`** | 13 | Domain playbooks (security, correctness, reliability, performance, AI smells, a11y, SEO) |
| 📁 **`harnesses/`** | 11 | Capability probes for all supported agent hosts |
| 📁 **`adapters/`** | 12 | Host integration documentation |
| 📁 **`evals/`** | 22 | Machine-readable eval cases & fixtures (`evals.json`) |

---

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

Vibe Audit includes verified capability drivers for **11 major AI agent hosts**:

<details>
<summary><b>Click to expand Harness Compatibility Matrix</b></summary>

<br>

| Harness | Version | Execution Mode | Driver Status |
|---|---|---|---|
| **Pi Agent** | `v0.84.1` | Headless CLI (`pi -p`) | ✅ Verified PASS |
| **Oh My Pi (OMP)** | `v17.2.12` | Headless CLI (`omp -p`) | ✅ Verified PASS |
| **Claude Code** | `v2.1.227` | Headless CLI (`claude -p`) | 🟡 Probed (Auth Gated) |
| **Cursor IDE** | `v0.45+` | Native MDC / Agent Chat | ✅ MDC + MCP Ready |
| **Windsurf IDE** | `v1.0+` | Cascade Rules / MCP | ✅ Rule + MCP Ready |
| **Codex** | System | Headless CLI | ⚪ Probed |
| **Gemini CLI** | System | Headless CLI | ⚪ Probed |
| **Copilot CLI** | System | Rules / Stdio MCP | ⚪ Probed |
| **Antigravity** | System | Harness Driver | ⚪ Probed |
| **OpenCode** | System | Open Standard CLI | ⚪ Probed |
| **TRAE / TraeCode** | System | Agentic Integration | ⚪ Probed |

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
- 5 adaptive harnesses (Pi, OMP, Cursor, Windsurf, Claude Code)
- Interactive eval explorer with 22 machine-readable fixtures
- Risk-gated change approval visualization

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