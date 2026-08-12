# Vibe Audit Universal Integration Guide

This guide details how to integrate and use **Vibe Audit** (`vibe-audit`) across every major IDE, code editor, and AI CLI agent host.

---

## Quick Start (Automated Universal Installer)

Run the universal installer script from the root of your workspace:

```bash
# Automated auto-discovery & multi-tool installer
python scripts/install_universal.py

# Windows Command Prompt / PowerShell shortcut
scripts\run-install-universal.cmd
```

The installer auto-detects your workspace and system tools, and automatically:
1. Installs the Agent Skill package globally to `~/.agents/skills/vibe-audit`.
2. Installs the Agent Skill package locally to `.agents/skills/vibe-audit`.
3. Exports native rules (`.cursor/rules/vibe-audit.mdc`, `.windsurfrules`, `.github/copilot-instructions.md`, `.clinerules`, `CONVENTIONS.md`, `.continue/rules/vibe-audit.md`).
4. Configures Model Context Protocol (MCP) servers (`.cursor/mcp.json`).

---

## 1. Agent Skills Open Standard Hosts

Supported hosts: **Claude Code**, **Oh My Pi (`omp`)**, **Pi (`pi`)**, **OpenCode (`opencode`)**, **Codex**, **Gemini CLI**, **Goose**, **Kilo**.

### Installation

```bash
# Global install via skills CLI
npx skills add Xenonesis/vibe-audit -y
```

### Direct Skill Directory Mapping
Copy the skill package into your agent host directory:
```bash
# Standard location
cp -r . ~/.agents/skills/vibe-audit

# Oh My Pi location
cp -r . ~/.omp/skills/vibe-audit
```

---

## 2. Cursor IDE

Cursor supports both **Native MDC Rules** and **MCP Tooling**.

### A. Native MDC Rule File (`.cursor/rules/vibe-audit.mdc`)

Create `.cursor/rules/vibe-audit.mdc`:
```markdown
---
description: Vibe Audit security, correctness, and readiness rules
globs: "*"
---
# Vibe Audit Rules

- Evidence over assumption. Compatibility over preference.
- AUDIT mode is read-only.
- Require explicit approval before high-risk changes (auth, database, payment, destructive commands).
```

### B. MCP Server (`.cursor/mcp.json`)

Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "vibe-audit": {
      "command": "python",
      "args": ["/path/to/vibe-audit/scripts/mcp_server.py"]
    }
  }
}
```

---

## 3. Windsurf IDE

### A. Cascade Rule File (`.windsurfrules`)

Create `.windsurfrules` in your project root:
```markdown
# Vibe Audit Cascade Rules

- Audit, harden, optimize, and verify codebases without treating architectural preference as a defect.
- High-risk operations require explicit user approval before execution.
```

### B. Windsurf MCP Config (`~/.codeium/windsurf/mcp_config.json`)

```json
{
  "mcpServers": {
    "vibe-audit": {
      "command": "python",
      "args": ["/path/to/vibe-audit/scripts/mcp_server.py"]
    }
  }
}
```

---

## 4. VS Code (Continue.dev & Roo Code / Cline)

### A. Roo Code / Cline (`.clinerules`)

Create `.clinerules`:
```markdown
- Mode Discipline: If user asks to audit or plan, do not edit code.
- Smallest compatible fix: Maintain existing code conventions, UI components, and framework patterns.
```

### B. Continue.dev (`.continue/config.json`)

```json
{
  "experimental": {
    "modelContextProtocolServers": [
      {
        "name": "vibe-audit",
        "command": "python",
        "args": ["/path/to/vibe-audit/scripts/mcp_server.py"]
      }
    ]
  }
}
```

---

## 5. GitHub Copilot (CLI & VS Code / JetBrains Extensions)

Create `.github/copilot-instructions.md` in your repository root:

```markdown
# GitHub Copilot Repository Instructions (Vibe Audit)

1. Evidence-first engineering: verify findings with real static code paths.
2. Preservative cutover: preserve working patterns; prefer small targeted fixes over structural refactors.
3. Safety boundary: do not modify authentication, payment gateways, or database schemas without explicit approval.
```

---

## 6. JetBrains IDEs (IntelliJ, WebStorm, PyCharm)

1. Open **Settings / Preferences -> Tools -> AI Assistant / MCP**.
2. Add a new MCP Server:
   - **Name**: `vibe-audit`
   - **Command**: `python`
   - **Args**: `/path/to/vibe-audit/scripts/mcp_server.py`

---

## 7. Neovim (`avante.nvim` & `CodeCompanion.nvim`)

### Avante.nvim Integration

In `lua/plugins/avante.lua`:
```lua
require('avante').setup({
  system_prompt = function()
    local skill_file = io.open(vim.fn.expand("~/.agents/skills/vibe-audit/SKILL.md"), "r")
    if skill_file then
      local content = skill_file:read("*a")
      skill_file:close()
      return content
    end
    return ""
  end
})
```

### CodeCompanion.nvim Integration

In `lua/plugins/codecompanion.lua`:
```lua
require("codecompanion").setup({
  strategies = {
    chat = {
      slash_commands = {
        ["vibe-audit"] = {
          callback = "strategies.chat.slash_commands.file",
          description = "Load Vibe Audit rules into conversation",
          opts = { file = "~/.agents/skills/vibe-audit/SKILL.md" }
        }
      }
    }
  }
})
```

---

## 8. Emacs (`gptel`)

Add to `.emacs.d/init.el`:

```elisp
(gptel-make-directive
 'vibe-audit
 "Audit and polish web applications following Vibe Audit rules: static-first, risk-gated changes, preserve existing architecture.")
```

---

## 9. Aider CLI

Create `CONVENTIONS.md` in your workspace root:

```markdown
# Aider Conventions (Vibe Audit)

- Do not refactor existing code style or architecture unless repairing a bug or security issue.
- Verify changes before completion.
- Preserve untrusted data boundaries.
```
