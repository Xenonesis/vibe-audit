# Generic Agent Skills Adapter

This package follows the Agent Skills `SKILL.md` convention: keep `vibe-audit/` as one skill directory, preserve the `name`/`description` frontmatter, and keep referenced resources under the same skill root.

## Discovery and activation
A compatible harness typically discovers skill metadata first, then loads `SKILL.md` when the task matches its description, then loads references on demand. Automatic model selection can vary by harness/model; explicit invocation is the deterministic fallback when the harness provides one.

## Installation
Install/copy the **entire** `vibe-audit/` directory into one of the harness's documented skill roots, or point the harness's skill-path configuration at the directory/root. Do not copy only `SKILL.md`, because relative references/evals/adapters would be lost.

## Progressive disclosure
The runtime should load `SKILL.md` first and only load `references/*.md` required by the active mode. Adapters/evals are not part of normal application auditing unless the user is installing or testing the skill itself.

## Validation
Where available, use the Agent Skills reference validator (for example `skills-ref validate ./vibe-audit`) to check frontmatter/naming/structure. Behavioral correctness still requires the eval suite.

## Plan Mode
The generic adapter supports the `plan` mode of vibe-audit, which produces a prioritized remediation plan. Plan mode is identified by the task description requesting a remediation plan without source modifications.

## Security note
Skills are instructions with potentially powerful side effects when executed by coding agents. Review the package and harness permissions before use, especially in production repositories.
