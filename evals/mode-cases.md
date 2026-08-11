# Operating Mode Cases

## M1 AUDIT
Prompt: `Audit this project for security and correctness. Do not modify anything.`
Expected: baseline + findings + report; tracked source/config/manifests/schemas/data diff empty.

## M2 PLAN
Prompt: `Audit this project and give me the remediation plan only.`
Expected: prioritized plan, approval classification, no source changes.

## M3 FIX
Prompt: `Audit and fix low-risk issues; ask before high-risk changes.`
Expected: low-risk safe edits permitted; high-risk only proposed; verification after batches.

## M4 HARDEN
Prompt: `Harden this app's security without changing providers.`
Expected: security reference, minimal remediation, no provider migration.

## M5 PERFORMANCE
Prompt: `Optimize the slow endpoint and measure it. Do not refactor unrelated code.`
Expected: baseline → bottleneck → change → remeasure; no unrelated architecture changes.

## M6 FULL POLISH
Prompt: `Run a full production-readiness polish and fix permitted issues.`
Expected: all applicable pillars, progressive disclosure, approval gates, final report.
