#!/usr/bin/env python3
"""
Vibe Audit Integration Test Suite.

Verifies:
1. export_rules.py generates all 6 rule formats correctly.
2. mcp_server.py executes JSON-RPC stdio protocol correctly.
3. install_universal.py installs skills, exports rules, and configures MCP servers cleanly.
"""

import json
import subprocess
import tempfile
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent


def test_export_rules() -> None:
    print("[TEST 1/3] Testing export_rules.py...")
    with tempfile.TemporaryDirectory() as tmpdir:
        from export_rules import export_rules, FORMATS

        created = export_rules(Path(tmpdir), list(FORMATS.keys()))
        assert len(created) == len(FORMATS), f"Expected {len(FORMATS)} created files, got {len(created)}"
        for p in created:
            file_path = Path(p)
            assert file_path.exists(), f"File {file_path} does not exist"
            assert file_path.stat().st_size > 50, f"File {file_path} is too small"
    print("  + PASS: All 6 rule formats exported successfully.")


def test_mcp_server() -> None:
    print("[TEST 2/3] Testing mcp_server.py (JSON-RPC stdio)...")
    mcp_script = ROOT_DIR / "scripts" / "mcp_server.py"

    proc = subprocess.Popen(
        [sys.executable, str(mcp_script)],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    reqs = [
        {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}},
        {"jsonrpc": "2.0", "id": 2, "method": "tools/list"},
        {"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "vibe_audit_get_playbook", "arguments": {"name": "security"}}},
    ]

    stdin_data = "\n".join(json.dumps(r) for r in reqs) + "\n"
    stdout, stderr = proc.communicate(input=stdin_data, timeout=5)

    lines = [json.loads(line) for line in stdout.strip().split("\n") if line]
    assert len(lines) == 3, f"Expected 3 responses, got {len(lines)}"

    # Response 1: initialize
    assert lines[0]["id"] == 1
    assert "serverInfo" in lines[0]["result"]

    # Response 2: tools/list
    assert lines[1]["id"] == 2
    tools = lines[1]["result"]["tools"]
    tool_names = [t["name"] for t in tools]
    assert "vibe_audit_run" in tool_names
    assert "vibe_audit_get_playbook" in tool_names

    # Response 3: get_playbook
    assert lines[2]["id"] == 3
    content = lines[2]["result"]["content"][0]["text"]
    assert "Security" in content

    print("  + PASS: MCP JSON-RPC 2.0 stdio protocol verified.")


def test_install_universal() -> None:
    print("[TEST 3/3] Testing install_universal.py...")
    with tempfile.TemporaryDirectory() as tmpdir:
        tmppath = Path(tmpdir)
        cmd = [sys.executable, str(ROOT_DIR / "scripts" / "install_universal.py"), str(tmppath)]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        assert res.returncode == 0, f"Installer failed with returncode {res.returncode}: {res.stderr}"

        # Verify skill installed locally
        local_skill = tmppath / ".agents" / "skills" / "vibe-audit" / "SKILL.md"
        assert local_skill.exists(), "Local SKILL.md not installed"

        # Verify Cursor MDC rule generated
        cursor_mdc = tmppath / ".cursor" / "rules" / "vibe-audit.mdc"
        assert cursor_mdc.exists(), "Cursor MDC rule not generated"

        # Verify Cursor MCP config generated
        cursor_mcp = tmppath / ".cursor" / "mcp.json"
        assert cursor_mcp.exists(), "Cursor MCP json not generated"
        data = json.loads(cursor_mcp.read_text(encoding="utf-8"))
        assert "vibe-audit" in data["mcpServers"]

    print("  + PASS: Universal installer verified in clean workspace.")


def main() -> None:
    print("=" * 60)
    print(" Vibe Audit Universal Integration Test Suite")
    print("=" * 60)
    test_export_rules()
    test_mcp_server()
    test_install_universal()
    print("=" * 60)
    print(" ALL 3 INTEGRATION TEST SUITES PASSED (100% EVIDENCE)")
    print("=" * 60)


if __name__ == "__main__":
    main()
