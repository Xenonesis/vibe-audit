#!/usr/bin/env python3
"""Fail when tracked application files changed; useful for AUDIT/PLAN evals."""
import subprocess, sys
from pathlib import Path
repo=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
try:
    out=subprocess.check_output(['git','-C',str(repo),'status','--porcelain=v1','--untracked-files=no'], text=True, stderr=subprocess.STDOUT)
except subprocess.CalledProcessError as e:
    print('ERROR: git status failed:', e.output.strip()); sys.exit(2)
if out.strip():
    print('FAIL: tracked working tree is not clean')
    print(out, end=''); sys.exit(1)
print('PASS: tracked working tree diff is empty')
