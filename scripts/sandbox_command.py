#!/usr/bin/env python3
"""Build or execute a hardened Docker/gVisor command. Requires Docker externally."""
from __future__ import annotations
import argparse, os, shlex, subprocess
from pathlib import Path

ap=argparse.ArgumentParser()
ap.add_argument('--backend',choices=['docker','gvisor'],default='docker')
ap.add_argument('--mode',choices=['audit','plan','fix'],default='audit')
ap.add_argument('--workspace',required=True)
ap.add_argument('--image',default='python:3.12-slim')
ap.add_argument('--execute',action='store_true')
ap.add_argument('command',nargs=argparse.REMAINDER)
a=ap.parse_args()
cmd=a.command[1:] if a.command[:1]==['--'] else a.command
if not cmd: raise SystemExit('command required after --')
workspace=Path(a.workspace).resolve()
mount='ro' if a.mode in {'audit','plan'} else 'rw'
run=['docker','run','--rm','--network','none','--cap-drop','ALL','--security-opt','no-new-privileges:true','--pids-limit','256','--memory','1g','--cpus','1.0','--read-only','--tmpfs','/tmp:rw,noexec,nosuid,size=128m']
if a.backend=='gvisor': run += ['--runtime','runsc']
run += ['--mount',f'type=bind,src={workspace},dst=/workspace,{mount}','--workdir','/workspace',a.image] + cmd
print(shlex.join(run))
if a.execute:
    if os.environ.get('VCP_ACK_SANDBOX_EXECUTION')!='1': raise SystemExit('Refusing execution: set VCP_ACK_SANDBOX_EXECUTION=1 after reviewing the command and repository trust.')
    raise SystemExit(subprocess.call(run))
