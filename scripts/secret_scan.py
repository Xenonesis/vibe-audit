#!/usr/bin/env python3
from __future__ import annotations
import re, sys
from pathlib import Path
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
# Conservative release-package scan; synthetic fixtures use VCP_SYNTHETIC markers and are excluded.
patterns={
 'private-key':re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
 'aws-access-key':re.compile(r'AKIA[0-9A-Z]{16}'),
 'github-token':re.compile(r'gh[pousr]_[A-Za-z0-9]{30,}'),
 'openai-key':re.compile(r'sk-[A-Za-z0-9_-]{20,}'),
}
errors=[]
for p in root.rglob('*'):
    if not p.is_file(): continue
    if any(part in {'.git','dist','__pycache__'} for part in p.parts): continue
    if 'evals' in p.parts and 'fixtures' in p.parts: continue
    if p.stat().st_size > 2_000_000: continue
    try: text=p.read_text(encoding='utf-8')
    except Exception: continue
    for name,rx in patterns.items():
        if rx.search(text): errors.append((str(p.relative_to(root)),name))
if errors:
    for path,name in errors: print('FAIL',name,path)
    raise SystemExit(1)
print('PASS no likely live credential patterns in release-source files')
