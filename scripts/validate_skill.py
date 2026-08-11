#!/usr/bin/env python3
"""Deterministic structural validation for vibe-coding-polisher v2."""
from __future__ import annotations
from pathlib import Path
import json, re, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve(); checks=[]
def c(name,ok,detail=''): checks.append((name,bool(ok),detail))
skill=root/'SKILL.md'; text=skill.read_text(encoding='utf-8') if skill.exists() else ''
version=(root/'VERSION').read_text(encoding='utf-8').strip() if (root/'VERSION').exists() else ''
c('SKILL.md exists',skill.is_file()); c('frontmatter starts first',text.startswith('---\n'))
c('frontmatter name',re.search(r'(?m)^name:\s*vibe-coding-polisher\s*$',text) is not None)
c('frontmatter description',re.search(r'(?m)^description:\s*>?',text) is not None)
c('frontmatter license',re.search(r'(?m)^license:\s*MIT\s*$',text) is not None)
c('metadata version matches VERSION',f'version: "{version}"' in text,version)
c('SKILL < 500 lines',len(text.splitlines())<500,str(len(text.splitlines())))
for mode in ['AUDIT','PLAN','FIX','HARDEN','PERFORMANCE','FULL POLISH']: c('mode '+mode,mode in text)
for token in ['CRITICAL','HIGH','MEDIUM','LOW','INFO','CONFIRMED','LIKELY','POTENTIAL','PRE-EXISTING','STATIC-ONLY','untrusted']: c('classification/policy '+token,token.lower() in text.lower())
required=[
 'LICENSE','SECURITY.md','SUPPORT.md','THREAT-MODEL.md','COMPATIBILITY.md','CHANGELOG.md',
 'references/security.md','references/correctness.md','references/reliability.md','references/performance.md','references/ai-code-smells.md','references/maintainability.md','references/verification.md','references/execution-safety.md',
 'references/runtime-ui.md','references/deployment-infra.md','references/ai-app-security.md','references/accessibility.md','references/seo.md',
 'evals/evals.json','evals/evals.schema.json','evals/policy.json','evals/expected-behavior.md','evals/execution-safety-cases.md','evals/accessibility-cases.md','evals/seo-cases.md',
 'metadata/compatibility.json','metadata/freshness.json','metadata/deprecations.json','metadata/release-gates.json','harnesses/capabilities.json',
 'scripts/validate_evals.py','scripts/assess_repo_trust.py','scripts/sandbox_command.py','scripts/probe_harnesses.py','scripts/secret_scan.py','scripts/release_gate.py','scripts/package_release.py','scripts/run_eval.py','scripts/grade_run.py','scripts/benchmark.py'
]
for rel in required: c('required '+rel,(root/rel).is_file())
for rel in ['default.md','safe-audit.md','frontend.md','fullstack.md','api-backend.md','ai-rag.md','payments.md','database-multitenant.md','cicd.md','performance.md']: c('profile '+rel,(root/'profiles'/rel).is_file())
for rel in ['generic.md','codex.md','claude-code.md','antigravity.md','copilot-cli.md','cursor.md','trae.md','gemini-cli.md','opencode.md','windsurf.md','omp.md','pi.md']: c('adapter '+rel,(root/'adapters'/rel).is_file())
for rel in ['codex.toml','claude-code.toml','pi.toml','omp.toml','copilot-cli.toml','cursor.toml','antigravity.toml','gemini-cli.toml']: c('harness '+rel,(root/'harnesses'/rel).is_file())
for target in re.findall(r'\[[^\]]+\]\(([^)]+\.md)\)',text): c('SKILL link '+target,(root/target).is_file())
# Parse machine-readable metadata
for rel in ['evals/evals.json','evals/policy.json','metadata/compatibility.json','metadata/freshness.json','metadata/deprecations.json','metadata/release-gates.json','harnesses/capabilities.json']:
    try: json.loads((root/rel).read_text(encoding='utf-8')); ok=True
    except Exception as exc: ok=False
    c('json parse '+rel,ok)
passed=sum(ok for _,ok,_ in checks)
for name,ok,detail in checks: print(('PASS' if ok else 'FAIL'),name,(f'— {detail}' if detail else ''))
print(f'\nPassed: {passed}/{len(checks)}')
if passed!=len(checks): raise SystemExit(1)
