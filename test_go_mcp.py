import subprocess
import json

# 1. Start the Go MCP server
proc = subprocess.Popen(
    ['cli/vibe-audit.exe', 'mcp'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    text=True
)

# 2. Craft a real tool call to 'vibe_audit_get_playbook' for 'security'
req = {
    "jsonrpc": "2.0",
    "id": 42,
    "method": "tools/call",
    "params": {
        "name": "vibe_audit_get_playbook",
        "arguments": {
            "name": "security"
        }
    }
}

# 3. Send request and capture response
stdout, _ = proc.communicate(json.dumps(req) + '\n')
print(stdout)
