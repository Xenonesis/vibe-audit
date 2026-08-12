#!/usr/bin/env python3
from __future__ import annotations
import re, subprocess, sys
from pathlib import Path
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
steps=[
 ['python',str(root/'scripts/validate_skill.py'),str(root)],
 ['python',str(root/'scripts/validate_evals.py'),str(root/'evals/evals.json')],
 ['python',str(root/'scripts/run_static_evals.py'),str(root)],
 ['python',str(root/'scripts/secret_scan.py'),str(root)],
]
 
for cmd in steps:
    print('\n$', ' '.join(cmd)); cp=subprocess.run(cmd); 
    if cp.returncode: raise SystemExit(cp.returncode)
 
print('\n$ cd cli && go test -v')
cp = subprocess.run(['go', 'test', '-v'], cwd=str(root/'cli'))
if cp.returncode: raise SystemExit(cp.returncode)
 
# immutable GitHub action pins
bad=[]
for p in (root/'.github/workflows').glob('*.yml'):
    text=p.read_text(encoding='utf-8')
    for line in text.splitlines():
        s=line.strip()
        if s.startswith('uses:') or '- uses:' in s:
            m=re.search(r'uses:\s*[^@\s]+@([^\s#]+)',s)
            if m and not re.fullmatch(r'[0-9a-fA-F]{40}',m.group(1)):
                bad.append(f'{p.name}: {s}')
print('PASS immutable action SHA pins')
print('\nDETERMINISTIC RELEASE GATE PASS')
print('Behavioral harness qualification is separate and must not be inferred from this result.')
