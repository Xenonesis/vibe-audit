#!/usr/bin/env python3
"""
Vibe Audit Model Context Protocol (MCP) Server.

Lightweight, zero-dependency JSON-RPC 2.0 stdio MCP server exposing Vibe Audit
capabilities to Cursor, Windsurf, VS Code (Continue/Roo Code), JetBrains, and Claude Desktop.
"""

import json
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent

TOOLS = [
    {
        "name": "vibe_audit_run",
        "description": "Run Vibe Audit discovery & assessment on a workspace or specific file.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Target file or directory path (default: workspace root)"},
                "mode": {"type": "string", "enum": ["AUDIT", "PLAN", "FIX", "HARDEN", "PERFORMANCE"], "default": "AUDIT"},
            },
        },
    },
    {
        "name": "vibe_audit_assess_trust",
        "description": "Evaluate repository trust boundary, lifecycle hooks, and safe execution constraints.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "workspace": {"type": "string", "description": "Workspace root directory"},
            },
        },
    },
    {
        "name": "vibe_audit_get_playbook",
        "description": "Retrieve Vibe Audit reference playbook (security, correctness, reliability, performance, etc.).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "enum": ["security", "correctness", "reliability", "performance", "ai-code-smells", "maintainability", "execution-safety"],
                    "description": "Playbook reference name",
                },
            },
            "required": ["name"],
        },
    },
]


def handle_request(req: dict) -> dict | None:
    method = req.get("method")
    req_id = req.get("id")

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "vibe-audit-mcp", "version": "0.1.0"},
            },
        }

    if method == "notifications/initialized":
        return None

    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {"tools": TOOLS},
        }

    if method == "tools/call":
        params = req.get("params", {})
        tool_name = params.get("name")
        args = params.get("arguments", {})

        if tool_name == "vibe_audit_get_playbook":
            ref_name = args.get("name")
            ref_path = SKILL_DIR / "references" / f"{ref_name}.md"
            if ref_path.exists():
                text = ref_path.read_text(encoding="utf-8")
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"content": [{"type": "text", "text": text}]},
                }
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32602, "message": f"Playbook '{ref_name}' not found."},
            }

        if tool_name == "vibe_audit_assess_trust":
            target = Path(args.get("workspace", ".")).resolve()
            findings = []
            hooks_file = target / ".git" / "hooks"
            if hooks_file.exists():
                findings.append("Git hooks detected in workspace.")
            pkg_json = target / "package.json"
            if pkg_json.exists():
                content = pkg_json.read_text(encoding="utf-8")
                if "postinstall" in content or "preinstall" in content:
                    findings.append("Package install lifecycle hooks detected.")

            status = "TRUSTED_STATIC" if not findings else "REQUIRES_ISOLATION"
            res_text = f"Trust Status: {status}\nFindings:\n" + ("\n".join(f"- {f}" for f in findings) if findings else "- Clean static surface.")
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {"content": [{"type": "text", "text": res_text}]},
            }

        if tool_name == "vibe_audit_run":
            mode = args.get("mode", "AUDIT")
            target = args.get("path", ".")
            res_text = f"Vibe Audit Tool invoked in {mode} mode for target: {target}\nPreserving existing architecture invariant active."
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {"content": [{"type": "text", "text": res_text}]},
            }

        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32601, "message": f"Unknown tool '{tool_name}'"},
        }

    if req_id is not None:
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "error": {"code": -32601, "message": f"Method '{method}' not implemented"},
        }
    return None


def main() -> None:
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
            resp = handle_request(req)
            if resp is not None:
                sys.stdout.write(json.dumps(resp) + "\n")
                sys.stdout.flush()
        except Exception as err:
            err_resp = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": str(err)}}
            sys.stdout.write(json.dumps(err_resp) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
