#!/usr/bin/env python3
from __future__ import annotations
import argparse, hashlib, json, zipfile
from pathlib import Path
ap=argparse.ArgumentParser(); ap.add_argument('root',nargs='?',default='.'); ap.add_argument('--output')
a=ap.parse_args(); root=Path(a.root).resolve(); version=(root/'VERSION').read_text().strip()
out=Path(a.output).resolve() if a.output else root/'dist'/f'vibe-coding-polisher-v{version}.zip'
out.parent.mkdir(parents=True,exist_ok=True)
files=[]
for p in root.rglob('*'):
    if not p.is_file() or out in [p]: continue
    if any(part in {'.git','dist','__pycache__','.pytest_cache'} for part in p.parts): continue
    rel=p.relative_to(root); digest=hashlib.sha256(p.read_bytes()).hexdigest(); files.append({'path':str(rel).replace('\\','/'),'sha256':digest,'size':p.stat().st_size})
manifest={'name':'vibe-coding-polisher','version':version,'files':sorted(files,key=lambda x:x['path'])}
manifest_path=root/'release-manifest.json'; manifest_path.write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
# include freshly generated manifest
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for item in sorted(root.rglob('*')):
        if not item.is_file() or item==out: continue
        if any(part in {'.git','dist','__pycache__','.pytest_cache'} for part in item.parts): continue
        z.write(item, Path('vibe-coding-polisher')/item.relative_to(root))
sha=hashlib.sha256(out.read_bytes()).hexdigest()
(out.with_suffix(out.suffix+'.sha256')).write_text(f'{sha}  {out.name}\n',encoding='utf-8')
print(out); print('sha256',sha)
