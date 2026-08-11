#!/usr/bin/env python3
from __future__ import annotations
import argparse, json
from pathlib import Path
ap=argparse.ArgumentParser();ap.add_argument('run_dir');ap.add_argument('--observations',required=True)
a=ap.parse_args(); run=Path(a.run_dir).resolve(); assertions=json.loads((run/'assertions.json').read_text()); obs=json.loads(Path(a.observations).read_text())
rows=[]
for assertion in assertions:
    item=(obs.get('assertions') or {}).get(assertion,{})
    val=item.get('pass')
    rows.append({'assertion':assertion,'pass':val is True,'ungraded':val is None,'evidence':item.get('evidence','')})
passed=sum(x['pass'] for x in rows); ungraded=sum(x['ungraded'] for x in rows)
status='UNVERIFIED' if ungraded else ('PASS' if passed==len(rows) else ('PARTIAL' if passed else 'FAIL'))
out={'status':status,'passed':passed,'total':len(rows),'ungraded':ungraded,'assertions':rows,'notes':obs.get('notes','')}
(run/'grading.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8');print(json.dumps(out,indent=2))
