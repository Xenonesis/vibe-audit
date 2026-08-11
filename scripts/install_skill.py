#!/usr/bin/env python3
"""Copy this skill to an explicit destination or documented project-local preset."""
from pathlib import Path
import argparse, shutil, sys
p=argparse.ArgumentParser()
p.add_argument('--host', choices=['agents','codex','claude','cursor','gemini','opencode','windsurf','copilot'])
p.add_argument('--dest', help='Explicit skills root; overrides --host')
p.add_argument('--project', default='.', help='Project root for project-local presets')
a=p.parse_args()
project=Path(a.project).resolve()
presets={
 'agents': project/'.agents/skills',
 'codex': project/'.agents/skills',
 'claude': project/'.claude/skills',
 'cursor': project/'.cursor/skills',
 'gemini': project/'.gemini/skills',
 'opencode': project/'.opencode/skills',
 'windsurf': project/'.windsurf/skills',
 'copilot': project/'.github/skills',
}
if not a.dest and not a.host:
    p.error('provide --dest or --host')
dest_root=Path(a.dest).expanduser().resolve() if a.dest else presets[a.host]
src=Path(__file__).resolve().parents[1]
dest=dest_root/'vibe-audit'
if dest.exists():
    print(f'ERROR: destination exists: {dest}', file=sys.stderr); sys.exit(1)
dest_root.mkdir(parents=True, exist_ok=True)
shutil.copytree(src, dest, ignore=shutil.ignore_patterns('.git','__pycache__','*.pyc','node_modules','dist','runs'))
print(dest)
