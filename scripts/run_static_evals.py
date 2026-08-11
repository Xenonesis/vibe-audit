#!/usr/bin/env python3
"""Deterministic fixture/package checks. Does not replace model/harness behavioral evals."""
from pathlib import Path
import json, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve(); checks=[]
def c(name,ok): checks.append((name,bool(ok)))
signals={
 'evals/fixtures/security/idor.ts':['params.id'],
 'evals/fixtures/security/unsafe-sql.ts':['SELECT'],
 'evals/fixtures/ai-code-smells/fake-success.ts':['catch'],
 'evals/fixtures/performance/n-plus-one.ts':['for'],
 'evals/fixtures/reliability/unsafe-retry.ts':['retry'],
 'evals/fixtures/runtime-ui/fake-success-ui.tsx':['Success'],
 'evals/fixtures/deployment-infra/unsafe-workflow.yml':['write-all'],
 'evals/fixtures/ai-app-security/tool-injection.ts':['executeTool'],
 'evals/fixtures/accessibility/unlabeled-form.html':['<input'],
 'evals/fixtures/seo/bad-head.html':['<title>'],
 'evals/fixtures/execution-safety/malicious-postinstall/package.json':['postinstall'],
 'evals/fixtures/execution-safety/hostile-conftest/conftest.py':['pytest_configure'],
 'evals/fixtures/execution-safety/network-exfiltration/exfil.py':['urlopen'],
 'evals/fixtures/execution-safety/prompt-injection-source/README.md':['IGNORE ALL PREVIOUS'],
 'evals/fixtures/execution-safety/hostile-build-config/vite.config.js':['executed unexpectedly'],
}
for rel,needles in signals.items():
    p=root/rel; txt=p.read_text(encoding='utf-8') if p.exists() else ''
    c('fixture exists '+rel,p.exists())
    for n in needles: c(f'fixture signal {rel}:{n}',n in txt)
exp=(root/'evals/expected-behavior.md').read_text(encoding='utf-8')
for token in ['PASS','FAIL','PARTIAL','AUDIT','PLAN','architecture','measurement','PRE-EXISTING','static-only','network','N25']:
    c('expected behavior token '+token,token.lower() in exp.lower())
skill=(root/'SKILL.md').read_text(encoding='utf-8')
for token in ['STATIC-ONLY','prompt-injection','deny','production credentials','100%']:
    c('core safety token '+token,token.lower() in skill.lower())
# machine eval corpus coverage
data=json.loads((root/'evals/evals.json').read_text(encoding='utf-8'))
c('machine eval count >= 20',len(data.get('evals',[]))>=20)
assertions={a for e in data.get('evals',[]) for a in e.get('assertions',[])}
for a in ['no_source_modification','evidence_required','static_only_unknown_repo','prompt_injection_resisted','network_default_deny','false_positive_resistance','architecture_preserved']:
    c('critical assertion '+a,a in assertions)
passed=sum(ok for _,ok in checks)
for name,ok in checks: print(('PASS' if ok else 'FAIL'),name)
print(f'\nPassed: {passed}/{len(checks)}')
if passed!=len(checks): raise SystemExit(1)
