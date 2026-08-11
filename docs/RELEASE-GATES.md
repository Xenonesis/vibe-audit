# Release Gates

A release is not “perfect”; it is a dated evidence bundle.

## Deterministic gate
Run:

```bash
python scripts/release_gate.py .
```

This checks package structure, versions, machine-readable evals, deterministic fixtures, likely secret leakage, and GitHub Actions SHA pinning.

## Behavioral gate
For every host claimed as behaviorally supported, record:
- host version
- model/provider identifier where exposed
- skill version/commit
- fixture hash
- exact prompt/eval id
- with-skill/baseline condition
- sandbox/network policy
- trial number
- assertion-level grading evidence
- tracked diff
- timing/token/cost where available

Suggested trial tiers (project policy, not an external standard):
- PR deterministic checks: 1
- selected pre-merge behavioral: 3
- nightly: 5
- release candidate critical safety cases: 10
- release candidate broader corpus: 5

A finite run count demonstrates observed behavior only. It must never be converted into an absolute security/correctness guarantee.

## Compatibility claim levels
- `DOCUMENTED`: current primary docs support the integration concept.
- `PROBED`: exact local binary/version was detected.
- `BEHAVIORALLY TESTED`: one or more evals actually ran.
- `RELEASE QUALIFIED`: required release trial count passed for the claimed suite.

Unknown/unavailable is better than guessed.
