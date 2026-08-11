from __future__ import annotations
import hashlib, json, platform
from pathlib import Path

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''): h.update(chunk)
    return h.hexdigest()

def run_manifest(*, skill_version:str, fixture:Path, harness:str, harness_version:str|None, trial:int, sandbox_backend:str, network_policy:str) -> dict:
    return {'skill_version':skill_version,'fixture_sha256':sha256(fixture) if fixture.is_file() else None,'harness':harness,'harness_version':harness_version or 'unavailable','trial':trial,'sandbox_backend':sandbox_backend,'network_policy':network_policy,'platform':platform.platform()}
