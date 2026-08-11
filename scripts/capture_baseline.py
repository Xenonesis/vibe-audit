#!/usr/bin/env python3
"""Capture non-secret repository/architecture baseline metadata as JSON."""
from pathlib import Path
import json, subprocess, sys, hashlib
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
def sh(args):
    try: return subprocess.check_output(args, text=True, stderr=subprocess.DEVNULL).strip()
    except Exception: return None
files=['package.json','pyproject.toml','requirements.txt','go.mod','Cargo.toml','composer.json','Gemfile','prisma/schema.prisma']
manifest={}
for rel in files:
    p=root/rel
    if p.is_file():
        manifest[rel]={'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'size': p.stat().st_size}
data={
 'root': str(root),
 'git_head': sh(['git','-C',str(root),'rev-parse','HEAD']),
 'git_status': sh(['git','-C',str(root),'status','--porcelain=v1']),
 'manifests': manifest,
 'markers': {
   'next': (root/'next.config.js').exists() or (root/'next.config.mjs').exists() or (root/'next.config.ts').exists(),
   'supabase': (root/'supabase').exists(),
   'prisma': (root/'prisma').exists(),
   'docker': (root/'Dockerfile').exists(),
   'github_actions': (root/'.github/workflows').exists(),
 }
}
print(json.dumps(data, indent=2))
