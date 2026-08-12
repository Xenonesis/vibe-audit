<div align="center">

# 🛡️ Vibe Audit `v0.1`

**Evidence-first Agent Skill & Deterministic Validation Toolkit**  
*Audit, plan, fix, and verify AI-generated web applications without treating architectural preference as a defect.*

[![skills.sh](https://img.shields.io/badge/skills.sh-Xenonesis%2Fvibe--audit-000000?style=for-the-badge&logo=github)](https://skills.sh/Xenonesis/vibe-audit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Release Gate](https://img.shields.io/badge/Release_Gate-PASS_126%2F126-emerald?style=for-the-badge)](#release-confidence)
[![Harnesses](https://img.shields.io/badge/Supported_Harnesses-8_Agent_Hosts-purple?style=for-the-badge)](#supported-harnesses)

[Overview](#why-vibe-audit) • [Quick Start](#quick-start) • [Pipeline](#execution-pipeline) • [Risk Gates](#risk-gated-approvals) • [Harnesses](#supported-harnesses) • [Integrations](#universal-integrations)

</div>

---

## ⚡ Quick Start

### 1. Global Installation (`skills.sh`)

Installs for all open-standard CLI agent hosts (Claude Code, OMP, Pi, Codex, Gemini CLI, OpenCode):

```bash
npx skills add Xenonesis/vibe-audit
```

 ### 2. Automated Universal Setup (VS Code Extension, NPM, or Homebrew)
 
 Vibe Audit's universal installer detects active workspace IDEs and configures skill packages, native rules, and MCP servers automatically:
 
 #### VS Code / Cursor / Windsurf Extension (Easiest)
 A native extension is available in the `extension/` directory. Once published to the marketplace, simply install **"Vibe Audit for Cursor & Windsurf"** and click "Install" on the prompt when opening any workspace.
 
 #### Using NPM (Node.js)
 ```bash
 npx vibe-audit install .
 ```
 
 #### Using Homebrew (macOS / Linux)
 ```bash
 brew install Xenonesis/vibe-audit/vibe-audit
 vibe-audit install .
 ```
 
 #### From Source (Go)
 ```bash
 cd cli && go build -o vibe-audit
 ./vibe-audit install ..
 ```

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
 
 > 🏆 **See the data**: View our [Agent Safety Leaderboard](https://xenonesis.github.io/vibe-audit/) evaluating top AI models against the 22-case Vibe Audit corpus.

---

## 🔄 Execution Pipeline

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │  Phase -1: Repository Trust Boundary                                  │
  │  Treat repo files, build hooks, & scripts as UNTRUSTED static data     │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
  ┌──────────────────────────────────▼─────────────────────────────────────┐
  │  Phase 0: Stack & Environment Discovery                                │
  │  Detect package managers, frameworks, auth, database, & CI surfaces    │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
  ┌──────────────────────────────────▼─────────────────────────────────────┐
  │  Phase 1: Baseline & Pre-Existing Failure Recording                    │
  │  Record pre-existing lint/typecheck/build state as PRE-EXISTING        │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
  ┌──────────────────────────────────▼─────────────────────────────────────┐
  │  Phases 2-6: Sequential Audit & Risk-Gated Remediation                 │
  │  Security → Correctness → Reliability → Performance → Maintainability │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
  ┌──────────────────────────────────▼─────────────────────────────────────┐
  │  Phase 7: Deterministic Verification & Readiness Report                │
  │  Output evidence-backed findings & status: NOT READY / READY           │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## 🛑 Risk-Gated Approvals

Vibe Audit categorizes remediation operations by risk level:

* 🟢 **LOW Risk**: Confidently safe edits (dead code removal, unused imports, safe bounds checks). **Auto-fix allowed.**
* 🟡 **MEDIUM Risk**: Non-breaking structural additions (validation schemas, database indexes, rate limiters). **Plan proposal required.**
* 🔴 **HIGH Risk**: Critical architectural operations (auth engine migration, database schema rewrite, secret rotation). **Explicit user consent strictly required.**

---

## 💻 Supported Harnesses

Vibe Audit includes verified capability drivers for **8 major AI agent hosts**:

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
| **Copilot CLI** | System | Headless CLI | ⚪ Probed |

</details>

---

## 🔌 Universal Integrations

Vibe Audit works seamlessly across all IDEs, code editors, and CLI platforms:

* 🖥️ **Cursor**: Native MDC Rules (`.cursor/rules/vibe-audit.mdc`) & MCP (`.cursor/mcp.json`)
* 🌊 **Windsurf**: Cascade Rules (`.windsurfrules`) & MCP (`~/.codeium/windsurf/mcp_config.json`)
* ⚡ **VS Code**: Continue.dev (`.continue/`) & Roo Code / Cline (`.clinerules`)
 * ☕ **JetBrains**: Stdio MCP Server (`vibe-audit mcp`)
* ⚡ **Neovim**: `avante.nvim` & `CodeCompanion.nvim` custom rule loaders
* 🌁 **Emacs**: `gptel` directive setup

> 📖 **Complete Setup Guide**: Read [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) for step-by-step instructions.

---

## 🛠️ The Toolkit Structure

| Asset Directory | Files | Primary Purpose |
|---|---|---|
| 📁 **`references/`** | 13 | Domain playbooks (security, correctness, reliability, performance, AI smells, a11y, SEO) |
 | 📁 **`scripts/`** | 12 | Validation, trust assessment, & release gate engines |
 | 📁 **`cli/`**     | 1  | Go-based Native CLI Tool (Installer, Rule Exporter, MCP Server) |
| 📁 **`evals/`** | 22 | Machine-readable eval cases & fixtures (`evals.json`) |
| 📁 **`harnesses/`** | 8 | Capability probes for all supported agent hosts |
| 📁 **`adapters/`** | 12 | Host integration documentation |
| 📁 **`scripts/`** | 16 | Validation, rule export, MCP server, trust assessment, & release gate engines |

---

## 🧪 Local Validation Suite

 # Run integration test suite (Rule exporters, MCP server, Universal installer)
 # Note: Python test suite deprecated in favor of compiled Go binary
 # python scripts/test_integrations.py
# Validate skill structure & formatting
python scripts/validate_skill.py .

# Validate machine-readable evals
python scripts/validate_evals.py evals/evals.json

# Run integration test suite (Rule exporters, MCP server, Universal installer)
python scripts/test_integrations.py

# Run complete release gate suite
python scripts/release_gate.py .
```

---

## 📄 License & Attribution

Designed and engineered by **[Xenonesis](https://github.com/Xenonesis)** under the **MIT License**.
Indexed on **[skills.sh](https://skills.sh/Xenonesis/vibe-audit)**.
