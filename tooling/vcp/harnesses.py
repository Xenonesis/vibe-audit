from __future__ import annotations
import shutil, subprocess
from dataclasses import dataclass
@dataclass
class ProbeResult:
    binary:str|None; version:str|None; available:bool

def probe(candidates:list[str]) -> ProbeResult:
    for name in candidates:
        path=shutil.which(name)
        if not path: continue
        try:
            cp=subprocess.run([path,'--version'],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,timeout=8)
            return ProbeResult(path,(cp.stdout or '').strip().splitlines()[0][:300],True)
        except Exception:
            return ProbeResult(path,None,True)
    return ProbeResult(None,None,False)
