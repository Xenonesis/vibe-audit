<div align="center">

# Vibe Audit — Agent Safety Toolkit

**Evidence-first agent skill & deterministic validation toolkit for AI coding assistants.**

[![skills.sh](https://img.shields.io/badge/skills.sh-Xenonesis%2Fvibe--audit-000000?style=for-the-badge&logo=github)](https://skills.sh/Xenonesis/vibe-audit)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 Core Mission

Turn vibe-coded applications into **production-ready software** with deterministic verification and security boundaries.

| Metric | Value |
|---|---|
| **Skill Validation Rules** | 126/126 PASS |
| **Machine-Readable Evals** | 22 fixtures |
| **Supported Harnesses** | 5 adaptive hosts |
| **Domain Playbooks** | 13 reference guides |
| **Hybrid Engine** | Go CLI + Python static analysis |

---

## 🧪 Machine Evals

| # | Eval | Category | Key Assertion |
|---|---|---|---|
| 1 | trigger-audit | Audit Mode | `no_source_modification + evidence_required` |
| 2 | security-idor | Security | `evidence_required + authorization_checked` |
| 3 | security-secret | Security | `no_auto_revoke + evidence_required` |
| 4 | security-sql | Security | `evidence_required` |
| 14 | full-polish | Full Polish | `approval_gates + architecture_preserved` |

See the full [eval table](./src/app/page.tsx#L286-L328) or run:
```bash
python scripts/validate_evals.py evals/evals.json
```

---

## 🏗️ Toolkit Inventory

| Asset | Description |
|---|---|
| **`cli/`** | Go CLI: `vibe-audit scan` — static secrets & supply-chain scanner |
| **`scripts/`** | Python engines: `validate_skill.py`, `release_gate.py`, `assess_repo_trust.py` |
| **`references/`** | 13 domain playbooks (security, correctness, reliability, performance, a11y, SEO) |
| **`harnesses/`** | 8 host capability drivers (Pi, OMP, Cursor, Windsurf, Claude Code, Codex, Gemini, Copilot) |

---

## 🚀 Local Validation

```bash
# Run complete release gate (126 rules + 54 static evals)
python scripts/release_gate.py .

# Snapshot current repository trust boundary
python scripts/assess_repo_trust.py .

# Validate skill structure meets release criteria
python scripts/validate_skill.py .
```

---

## 🎨 Design System

Built on the **Hallmark** design principles (anti-AI-slop):

- **Genre**: Editorial (technical documentation aesthetic)
- **Theme**: Clinical, high-agency with warm monochrome palette
- **Typography**: `Geist` + `Geist Mono` — no Inter, Roboto, or Arial
- **Colors**: Desaturated pastels for semantic status only
- **Layout**: Asymmetric grids, macro-whitespace `100px` padding

See `DESIGN.md` at the repository root for the full design system.

---

## 📄 License

MIT — Designed and engineered by [Xenonesis](https://github.com/Xenonesis).