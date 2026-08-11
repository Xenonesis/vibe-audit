#!/usr/bin/env python3
"""Prepare a reproducible behavioral-eval run bundle without invoking a model/harness."""
from __future__ import annotations
import argparse, hashlib, json, platform, shutil, sys
from datetime import datetime, timezone
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from tooling.vcp.evals import load_case, prepare_inputs

ap=argparse.ArgumentParser()
ap.add_argument('root',nargs='?',default='.')
ap.add_argument('--eval',required=True)
ap.add_argument('--harness',required=True)
ap.add_argument('--condition',choices=['with-skill','without-skill','previous-skill'],required=True)
ap.add_argument('--trial',type=int,default=1)
ap.add_argument('--harness-version',default='unavailable')
ap.add_argument('--model',default='unavailable')
ap.add_argument('--sandbox',default='unavailable')
ap.add_argument('--out',default='runs')
a=ap.parse_args()
root=Path(a.root).resolve(); case,policy=load_case(root,a.eval)
run_id=f"eval-{case['id']}-{a.harness}-{a.condition}-trial-{a.trial:02d}"
out=(root/a.out/run_id).resolve(); out.mkdir(parents=True,exist_ok=True)
inputs=prepare_inputs(root,case,out/'inputs')
(out/'prompt.txt').write_text(case['prompt']+'\n',encoding='utf-8')
(out/'assertions.json').write_text(json.dumps(case['assertions'],indent=2)+'\n',encoding='utf-8')
(out/'policy.json').write_text(json.dumps(policy,indent=2)+'\n',encoding='utf-8')
manifest={
 'run_id':run_id,'eval_id':case['id'],'eval_name':case['name'],'condition':a.condition,'trial':a.trial,
 'skill_version':(root/'VERSION').read_text().strip(),'harness':a.harness,'harness_version':a.harness_version,'model':a.model,
 'sandbox_backend':a.sandbox,'network_policy':policy.get('network','none'),'trust':policy.get('trust'),
 'platform':platform.platform(),'python':platform.python_version(),'created_at':datetime.now(timezone.utc).isoformat(),
 'inputs':inputs,'prompt_sha256':hashlib.sha256(case['prompt'].encode()).hexdigest(),
 'behavioral_execution_performed':False,
 'note':'This command prepares evidence/reproducibility files only. Execute the target harness under its approved safety boundary, then store stdout/trace/diff and grade assertions.'
}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
(out/'OBSERVATION_TEMPLATE.json').write_text(json.dumps({'assertions':{x:{'pass':None,'evidence':''} for x in case['assertions']},'notes':''},indent=2)+'\n',encoding='utf-8')
print(out)
