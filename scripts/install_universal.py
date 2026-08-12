#!/usr/bin/env python3
"""
Vibe Audit Universal Installer.

Auto-detects active workspace IDEs and CLI agents, installs the Agent Skill package,
exports native rule files, and configures MCP servers automatically.
"""

import argparse
import json
import shutil
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SKILL_NAME = "vibe-audit"


def detect_environments(workspace: Path) -> dict[str, bool]:
    home = Path.home()
    return {
        "agents_skills": (home / ".agents" / "skills").exists() or (workspace / ".agents" / "skills").exists(),
        "cursor": (workspace / ".cursor").exists() or (home / ".cursor").exists(),
        "windsurf": (workspace / ".windsurfrules").exists() or (home / ".codeium" / "windsurf").exists(),
        "copilot": (workspace / ".github").exists(),
        "continue": (workspace / ".continue").exists() or (home / ".continue").exists(),
        "cline_roo": (workspace / ".clinerules").exists() or (workspace / ".roomodes").exists(),
        "aider": (workspace / "CONVENTIONS.md").exists(),
        "claude_code": shutil.which("claude") is not None or (home / ".claude").exists(),
        "omp": shutil.which("omp") is not None or (home / ".omp").exists(),
        "pi": shutil.which("pi") is not None or (home / ".pi").exists(),
    }


def install_agent_skill(target_workspace: Path) -> list[str]:
    installed = []
    home = Path.home()

    # 1. Global install to ~/.agents/skills/vibe-audit
    global_dir = home / ".agents" / "skills" / SKILL_NAME
    global_dir.mkdir(parents=True, exist_ok=True)
    for item in ["SKILL.md", "references", "profiles", "evals", "scripts"]:
        src = ROOT_DIR / item
        dst = global_dir / item
        if src.is_file():
            shutil.copy2(src, dst)
        elif src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)
    installed.append(str(global_dir))

    # 2. Local workspace install to .agents/skills/vibe-audit
    local_dir = target_workspace / ".agents" / "skills" / SKILL_NAME
    local_dir.mkdir(parents=True, exist_ok=True)
    for item in ["SKILL.md", "references", "profiles"]:
        src = ROOT_DIR / item
        dst = local_dir / item
        if src.is_file():
            shutil.copy2(src, dst)
        elif src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)
    installed.append(str(local_dir))

    return installed


def configure_mcp(workspace: Path) -> list[str]:
    configured = []
    mcp_script = (ROOT_DIR / "scripts" / "mcp_server.py").resolve()
    py_exec = sys.executable

    # Cursor MCP config
    cursor_dir = workspace / ".cursor"
    cursor_dir.mkdir(parents=True, exist_ok=True)
    mcp_json = cursor_dir / "mcp.json"
    data = {}
    if mcp_json.exists():
        try:
            data = json.loads(mcp_json.read_text(encoding="utf-8"))
        except Exception:
            data = {}
    servers = data.setdefault("mcpServers", {})
    servers["vibe-audit"] = {"command": py_exec, "args": [str(mcp_script)]}
    mcp_json.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    configured.append(str(mcp_json))

    return configured


def main() -> None:
    parser = argparse.ArgumentParser(description="Universal Vibe Audit Installer for all IDEs & CLIs.")
    parser.add_argument("target", nargs="?", default=".", help="Target workspace directory (default: current directory)")
    parser.add_argument("--force", action="store_true", help="Overwrite existing configuration files")
    args = parser.parse_args()

    workspace = Path(args.target).resolve()
    workspace.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print(" Vibe Audit Universal Installer v0.1.0")
    print("=" * 60)
    print(f"Target Workspace: {workspace}\n")

    # Step 1: Detect environments
    env = detect_environments(workspace)
    print("Environment Discovery:")
    for key, active in env.items():
        symbol = "[X]" if active else "[ ]"
        print(f"  {symbol} {key}")
    print()

    # Step 2: Install Agent Skill
    skill_paths = install_agent_skill(workspace)
    print("Agent Skill Installation:")
    for p in skill_paths:
        print(f"  + Installed: {p}")
    print()

    # Step 3: Export Native Rules
    from export_rules import export_rules
    rule_paths = export_rules(workspace, ["cursor", "windsurf", "copilot", "cline", "aider", "continue"])
    print("Native Rule Exports:")
    for r in rule_paths:
        print(f"  + Generated: {r}")
    print()

    # Step 4: Configure MCP Servers
    mcp_paths = configure_mcp(workspace)
    print("MCP Server Configuration:")
    for m in mcp_paths:
        print(f"  + Configured: {m}")
    print()

    print("=" * 60)
    print(" SUCCESS: Vibe Audit successfully configured for all active IDEs & CLIs!")
    print("=" * 60)


if __name__ == "__main__":
    main()
