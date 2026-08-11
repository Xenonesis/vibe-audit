#!/usr/bin/env python3
"""Compare two JSON outputs from capture_baseline.py for architecture-sensitive drift."""
import json, sys
if len(sys.argv)!=3:
    print('usage: compare_architecture.py before.json after.json'); sys.exit(2)
a=json.load(open(sys.argv[1], encoding='utf-8')); b=json.load(open(sys.argv[2], encoding='utf-8'))
changes=[]
for k in sorted(set(a.get('manifests',{}))|set(b.get('manifests',{}))):
    if a.get('manifests',{}).get(k)!=b.get('manifests',{}).get(k): changes.append(f'manifest changed: {k}')
for k in sorted(set(a.get('markers',{}))|set(b.get('markers',{}))):
    if a.get('markers',{}).get(k)!=b.get('markers',{}).get(k): changes.append(f'architecture marker changed: {k}: {a.get("markers",{}).get(k)} -> {b.get("markers",{}).get(k)}')
if changes:
    print('REVIEW REQUIRED')
    print('\n'.join(changes)); sys.exit(1)
print('PASS: no tracked architecture marker/manifest drift detected')
