from __future__ import annotations
import json, shutil
from pathlib import Path

def load_case(root: Path, eval_id: str|int) -> tuple[dict,dict]:
    corpus=json.loads((root/'evals/evals.json').read_text(encoding='utf-8'))
    policy=json.loads((root/'evals/policy.json').read_text(encoding='utf-8'))
    case=next((e for e in corpus['evals'] if str(e['id'])==str(eval_id)),None)
    if not case: raise KeyError(f'unknown eval id: {eval_id}')
    return case, policy['cases'][str(case['id'])]

def prepare_inputs(root: Path, case: dict, dest: Path) -> list[str]:
    dest.mkdir(parents=True,exist_ok=True)
    copied=[]
    for rel in case.get('files',[]):
        src=root/rel
        target=dest/Path(rel).name
        shutil.copy2(src,target)
        copied.append(target.name)
    return copied
