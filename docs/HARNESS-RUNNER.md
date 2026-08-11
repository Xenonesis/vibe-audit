# Harness Runner Contract

The package deliberately separates **evaluation orchestration** from **repository code execution**.

`python scripts/run_eval.py ...` prepares a reproducible run directory containing the exact prompt, assertion list, policy, fixture copy, and manifest. It does not silently launch a host CLI because each host's tool permissions, provider credentials, sandbox semantics, and headless flags are version-sensitive.

A harness integration should:
1. probe exact host/version;
2. start a clean/disposable context;
3. load the skill for `with-skill`, disable it for baseline where supported;
4. restrict the target to the prepared input/workspace;
5. ensure any repository-controlled shell/build/test execution happens in the approved execution plane;
6. capture stdout/final answer, structured trace when available, tool/command events, timing/usage, and before/after diff;
7. store evidence beside the run manifest;
8. grade assertions with `scripts/grade_run.py`;
9. aggregate trials with `scripts/benchmark.py`.

This is intentionally safer than a universal `subprocess([harness, prompt])` wrapper that would give a rapidly changing agent CLI uncontrolled host access.
