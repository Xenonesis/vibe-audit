# Token Saver & High-Efficiency Profile

Use when auditing under strict token, context, or latency constraints, or when the user requests low-token / lean audit execution.

## Core Rules

1. **High-Signal Diagnostics**: Output findings directly as structured tables or short decisive facts. Skip conversational filler, repeated boilerplate, and speculative narration.
2. **First-Time-Right Surgical Diffs**: For FIX mode, generate complete, line-anchored patches without `// TODO` or `// ... rest unchanged` placeholders to prevent multi-turn correction loops.
3. **No Redundant Repetition**: State each finding and remediation once. Do not repeat the entire file contents when a 5-line diff proves the fix.
4. **Invariant Preservation**: Never compromise on security boundaries, types, tests, or correctness. Compression must strictly apply to communication overhead, not safety or audit depth.
