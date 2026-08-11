#!/usr/bin/env python3
"""Static executable-surface assessor. It never executes target repository code."""
from __future__ import annotations
import json, sys
from pathlib import Path

target=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
findings=[]
def add(path, kind, detail): findings.append({'path':str(path.relative_to(target)),'kind':kind,'detail':detail})

# Node lifecycle/scripts
p=target/'package.json'
if p.is_file():
    try:
        data=json.loads(p.read_text(encoding='utf-8'))
        for name,cmd in (data.get('scripts') or {}).items():
            if name in {'preinstall','install','postinstall','prepare','prepublish','prepublishOnly'}:
                add(p,'node-lifecycle-script',f'{name}: {cmd}')
            elif name in {'test','build','lint','dev','start'}:
                add(p,'node-project-script',f'{name}: {cmd}')
    except Exception as exc: add(p,'parse-error',str(exc))

patterns={
 'setup.py':'python-build-executable','conftest.py':'pytest-executable-config','tox.ini':'test-runner-config','noxfile.py':'test-runner-executable',
 'build.rs':'rust-build-script','Makefile':'make-executable','Dockerfile':'container-build-script','docker-compose.yml':'container-orchestration',
 'compose.yml':'container-orchestration','build.gradle':'gradle-build-script','build.gradle.kts':'gradle-build-script','pom.xml':'maven-build-config',
 'Rakefile':'ruby-task-script','Gemfile':'ruby-dependency-config','composer.json':'php-dependency-config','go.mod':'go-module-config'
}
for path in target.rglob('*'):
    if not path.is_file(): continue
    if any(part in {'.git','node_modules','.venv','vendor','target','dist','build'} for part in path.parts): continue
    kind=patterns.get(path.name)
    if kind: add(path,kind,'review before dynamic execution')
    if path.name in {'pyproject.toml','.npmrc','.yarnrc.yml','.pnpmfile.cjs'}: add(path,'dependency-or-build-config','review hooks/plugins/build backend')
    if '.github' in path.parts and 'workflows' in path.parts and path.suffix in {'.yml','.yaml'}: add(path,'ci-workflow','may execute arbitrary commands')

result={
 'target':str(target),'trust_level':'T0_UNKNOWN','dynamic_execution_allowed':False,
 'note':'This tool detects executable surfaces; it does not prove safety. Inspect findings, then use an approved sandbox if dynamic execution is needed.',
 'executable_surfaces':findings
}
print(json.dumps(result,indent=2))
