#!/usr/bin/env python3
from __future__ import annotations
import argparse,json,statistics
from pathlib import Path
ap=argparse.ArgumentParser();ap.add_argument('runs',nargs='?',default='runs');ap.add_argument('--output',default='benchmark.json')
a=ap.parse_args();root=Path(a.runs).resolve();records=[]
for g in root.rglob('grading.json'):
    run=g.parent; grade=json.loads(g.read_text()); manifest=json.loads((run/'manifest.json').read_text())
    records.append({'run_id':manifest['run_id'],'eval_id':manifest['eval_id'],'harness':manifest['harness'],'condition':manifest['condition'],'status':grade['status'],'score':grade['passed']/grade['total'] if grade['total'] else 0})
summary={}
for r in records:
    key=f"{r['harness']}::{r['condition']}";summary.setdefault(key,[]).append(r['score'])
out={'runs':records,'summary':{k:{'count':len(v),'mean_score':statistics.fmean(v)} for k,v in summary.items()}}
Path(a.output).write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8');print(json.dumps(out,indent=2))
