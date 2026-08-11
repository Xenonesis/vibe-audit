from __future__ import annotations
from dataclasses import dataclass
@dataclass(frozen=True)
class ExecutionPolicy:
    trust: str = 'T0_UNKNOWN'
    network: str = 'none'
    allow_project_execution: bool = False
    allow_production_secrets: bool = False

def default_unknown_repo_policy() -> ExecutionPolicy:
    return ExecutionPolicy()
