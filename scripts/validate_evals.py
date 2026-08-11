#!/usr/bin/env python3
from __future__ import annotations
import json, sys
from pathlib import Path

path = Path(sys.argv[1] if len(sys.argv) > 1 else 'evals/evals.json').resolve()
root = path.parent.parent
errors=[]
try:
    data=json.loads(path.read_text(encoding='utf-8'))
except Exception as exc:
    print(f'FAIL parse {path}: {exc}')
    raise SystemExit(1)
if data.get('skill_name')!='vibe-audit': errors.append('skill_name mismatch')
if not isinstance(data.get('evals'), list) or not data['evals']: errors.append('evals must be non-empty list')
seen=set()
for e in data.get('evals',[]):
    for key in ('id','name','prompt','expected_output','files','assertions'):
        if key not in e: errors.append(f"eval {e.get('id')} missing {key}")
    if e.get('id') in seen: errors.append(f"duplicate id {e.get('id')}")
    seen.add(e.get('id'))
    if not e.get('assertions'): errors.append(f"eval {e.get('id')} has no assertions")
    for rel in e.get('files',[]):
        if not (root/rel).is_file(): errors.append(f"eval {e.get('id')} missing fixture {rel}")
policy_path=path.parent/'policy.json'
if not policy_path.is_file(): errors.append('policy.json missing')
else:
    policy=json.loads(policy_path.read_text(encoding='utf-8'))
    for eid in seen:
        if str(eid) not in policy.get('cases',{}): errors.append(f'policy missing eval {eid}')
if errors:
    for x in errors: print('FAIL',x)
    raise SystemExit(1)
print(f'PASS eval corpus: {len(seen)} cases, all fixtures/policies present')
