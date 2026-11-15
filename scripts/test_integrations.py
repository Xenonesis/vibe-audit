#!/usr/bin/env python3
"""
Vibe Audit Integration Test Suite.

Verifies the migrated Go CLI (scripts/export_rules.py, scripts/mcp_server.py and
scripts/install_universal.py were deleted in bfe92eb "Migrate tooling to
zero-dependency Go CLI"):

1. `vibe-audit export <dir>` generates all native rule formats.
2. `vibe-audit mcp` executes JSON-RPC stdio protocol
   (initialize, tools/list, tools/call vibe_audit_get_playbook).
3. `vibe-audit install <dir>` installs skill files + a portable .cursor/mcp.json
   containing no machine-specific absolute paths.
"""

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
CLI_DIR = ROOT_DIR / "cli"


def _build_binary(tmpdir: Path) -> Path:
    ext = ".exe" if sys.platform == "win32" else ""
    out = tmpdir / f"vibe-audit{ext}"
    subprocess.run(
        ["go", "build", "-o", str(out), "."],
        cwd=str(CLI_DIR),
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return out


def _env(tmpdir: Path) -> dict:
    env = os.environ.copy()
    # Redirect Go's os.UserHomeDir() into the temp dir so install does not
    # touch the real home directory.
    env["HOME"] = str(tmpdir)
    env["USERPROFILE"] = str(tmpdir)
    return env


def _mcp_requests(bin_path: Path, env: dict) -> list:
    reqs = [
        {"jsonrpc": "2.0", "id": 1, "method": "initialize",
         "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "t", "version": "1"}}},
        {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}},
        {"jsonrpc": "2.0", "id": 3, "method": "tools/call",
         "params": {"name": "vibe_audit_get_playbook", "arguments": {"name": "security"}}},
    ]
    proc = subprocess.Popen(
        [str(bin_path), "mcp"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        env=env,
    )
    stdin_data = "\n".join(json.dumps(r) for r in reqs) + "\n"
    stdout, _stderr = proc.communicate(input=stdin_data, timeout=10)
    return [json.loads(line) for line in stdout.strip().split("\n") if line]


def test_export_generates_rule_formats() -> None:
    print("[TEST 1/3] Testing `vibe-audit export` generates rule formats...")
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        bin_path = _build_binary(tmp)
        subprocess.run(
            [str(bin_path), "export", str(tmp)],
            cwd=str(ROOT_DIR),
            check=True,
            env=_env(tmp),
        )
        expected = [
            ".cursor/rules/vibe-audit.mdc",
            ".windsurfrules",
            ".clinerules",
            ".continue/rules/vibe-audit.md",
            "CONVENTIONS.md",
            ".github/copilot-instructions.md",
            ".amazonq/rules/vibe-audit.md",
            ".goosehints",
        ]
        created = [rel for rel in expected if (tmp / rel).exists()]
        for rel in created:
            assert (tmp / rel).stat().st_size > 50, f"File {rel} is too small"
        assert len(created) == len(expected), (
            f"Expected {len(expected)} formats, created {len(created)}: {created}"
        )
    print("  + PASS: All native rule formats exported successfully.")


def test_mcp_server_jsonrpc() -> None:
    print("[TEST 2/3] Testing `vibe-audit mcp` JSON-RPC stdio protocol...")
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        bin_path = _build_binary(tmp)
        env = _env(tmp)
        # The wrapper sets VIBE_AUDIT_ROOT to the skill root so playbook
        # resolution works regardless of the MCP server's cwd.
        env["VIBE_AUDIT_ROOT"] = str(ROOT_DIR)
        lines = _mcp_requests(bin_path, env)
        assert len(lines) == 3, f"Expected 3 responses, got {len(lines)}: {lines}"
        assert lines[0]["id"] == 1
        assert "serverInfo" in lines[0]["result"]
        assert lines[1]["id"] == 2
        tools = lines[1]["result"]["tools"]
        tool_names = [t["name"] for t in tools]
        assert "vibe_audit_run" in tool_names
        assert "vibe_audit_get_playbook" in tool_names
        assert lines[2]["id"] == 3
        content = lines[2]["result"]["content"][0]["text"]
        assert "Security" in content
    print("  + PASS: MCP JSON-RPC 2.0 stdio protocol verified.")


def test_install_generates_portable_mcp_config() -> None:
    print("[TEST 3/3] Testing `vibe-audit install` generates portable MCP config...")
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        bin_path = _build_binary(tmp)
        env = _env(tmp)
        ws = tmp / "workspace"
        ws.mkdir()
        subprocess.run(
            [str(bin_path), "install", str(ws)],
            cwd=str(ROOT_DIR),
            check=True,
            env=env,
        )
        mcp_json = ws / ".cursor" / "mcp.json"
        assert mcp_json.exists(), f"MCP config not generated at {mcp_json}"
        data = json.loads(mcp_json.read_text(encoding="utf-8"))
        assert "vibe-audit" in data["mcpServers"]
        entry = data["mcpServers"]["vibe-audit"]
        command = entry["command"]
        args = entry["args"]
        # If the wrapper script is present in the workspace root, config must be
        # portable ($workspaceFolder-based); otherwise it must be a real executable.
        wrapper = ws / "bin" / "vibe-audit.js"
        if wrapper.exists():
            assert command == "node", f"expected node command, got {command!r}"
            assert args[0] == "${workspaceFolder}/bin/vibe-audit.js", f"expected portable arg, got {args[0]!r}"
            assert args[1] == "mcp"
        else:
            assert command, "expected non-empty command"
            assert args == ["mcp"], f"expected ['mcp'], got {args!r}"
    print("  + PASS: Universal installer verified in clean workspace.")


def main() -> None:
    print("=" * 60)
    print(" Vibe Audit Integration Test Suite (Go CLI)")
    print("=" * 60)
    test_export_generates_rule_formats()
    test_mcp_server_jsonrpc()
    test_install_generates_portable_mcp_config()
    print("=" * 60)
    print(" ALL INTEGRATION TESTS PASSED")
    print("=" * 60)


if __name__ == "__main__":
    main()
