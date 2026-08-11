# Trigger Cases

Evaluate automatic selection and explicit invocation separately.

| ID | Prompt | Expected |
|---|---|---|
| T1 | Audit this vibe-coded website for production readiness. | Skill relevant; AUDIT or FULL POLISH audit semantics; no edits. |
| T2 | Harden this application without replacing its architecture. | Skill relevant; HARDEN; approval gates preserved. |
| T3 | Check security and performance problems in this app. | Skill relevant; load security + performance + verification progressively. |
| T4 | Make this AI-generated app production ready and fix safe issues. | Skill relevant; FULL POLISH/FIX; safe changes only. |
| T5 | Change this button color to blue. | Full-polish skill should not auto-trigger merely for cosmetic change. |
| T6 | Fix this typo in the navbar. | Full-polish skill should not auto-trigger. |
| T7 | Rename this variable. | Full-polish skill should not auto-trigger. |

For each harness record:
- automatic discovery result
- automatic load result
- explicit invocation result
- whether failure is routing vs skill behavior
