#!/usr/bin/env python3
from __future__ import annotations
import json, shutil, subprocess, sys
from pathlib import Path
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
data=json.loads((root/'metadata/compatibility.json').read_text(encoding='utf-8'))
results=[]
for h in data['hosts']:
    binary=h.get('binary')
    candidates=[binary] if binary else []
    candidates += h.get('fallback_binaries',[])
    found=None
    for c in candidates:
        if c and shutil.which(c): found=c; break
    item={'id':h['id'],'documented_confidence':h.get('documented_confidence'),'binary':found,'probed':False,'version':None}
    if found:
        try:
            cp=subprocess.run([found,'--version'],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,timeout=8)
            item['probed']=True; item['version']=(cp.stdout or '').strip().splitlines()[0][:300]; item['returncode']=cp.returncode
        except Exception as exc: item['error']=str(exc)
    results.append(item)
print(json.dumps({'package_version':data['package_version'],'results':results},indent=2))
