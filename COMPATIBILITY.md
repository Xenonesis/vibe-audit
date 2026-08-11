# Compatibility Matrix — v2.0.0

This file describes **intended/documented integration**, not a guarantee that every current host version has been behaviorally tested.

| Host | Native skill concept | Preferred project location / discovery | Explicit fallback | Behavioral status in this build |
|---|---|---|---|---|
| Generic Agent Skills | Yes | host-defined; `.agents/skills/` when supported | host-defined | Not run here |
| Codex | Yes | `.agents/skills/` | `/skills` / explicit mention | Not run here |
| Claude Code | Yes | `.claude/skills/` | `/vibe-coding-polisher` | Not run here |
| Google Antigravity | Yes | `.agents/skills/` | host skill control / explicit prompt | Not run here |
| GitHub Copilot CLI | Yes | `.agents/skills/` or host-supported skill install | explicit skill workflow | Not run here |
| Cursor | Yes | `.agents/skills/` / `.cursor/skills/` | `/` skill search | Not run here |
| TRAE | Host-specific | see adapter | explicit host invocation | Not run here |
| Gemini CLI | Yes | `.agents/skills/` / `.gemini/skills/` where supported | current CLI skill command | Not run here |
| OpenCode | Host-specific | `.agents/skills/` / native location | explicit prompt/tool | Not run here |
| Windsurf/Cascade | Host-specific | `.agents/skills/` / native location | explicit mention | Not run here |
| OMP | Yes/host-specific | see `adapters/omp.md` | explicit skill invocation | Not run here |
| Pi | Yes | `.pi/skills/`, `.agents/skills/`, global paths | `/skill:vibe-coding-polisher` / `--skill` | Not run here |

See `metadata/compatibility.json` for machine-readable confidence and `scripts/probe_harnesses.py` for local version detection.

Automatic routing and explicit invocation are separate capabilities. Never treat automatic selection as guaranteed.
