# Add Support for Additional Harnesses

## Summary
Added support for OpenCode, TRAE/TraeCode, and Windsurf/Cascade harnesses to the Vibe Audit skill.

## Current State Analysis
The project already had harness definitions for Pi, OMP, Claude Code, Codex, Gemini CLI, Copilot CLI, and Antigravity. The user requested adding support for other harnesses.

## Proposed Changes
1. Added harness configuration files:
   - `harnesses/opencode.toml`
   - `harnesses/trae.toml` 
   - `harnesses/windsurf.toml`

2. Updated the HarnessGrid component in `nextjs-website/src/components/HarnessGrid.tsx` to include:
   - OpenCode harness entry
   - TRAE/TraeCode harness entry
   - Windsurf/Cascade harness entry
   - Added corresponding SVG icons for each harness

3. Updated documentation:
   - Changed "Supported Harnesses" count from 8 to 11 in index.html stats bar
   - Updated the lead text in the harnesses section to reflect 11 supported agent hosts
   - Updated the FAQ answer to list all 11 supported harnesses

## Assumptions & Decisions
- Used the same pattern as existing harnesses for consistency
- Assumed headless mode is available for all new harnesses
- Used explicit skill invocation as the default mechanism
- Used simple text-based logos for the new harnesses in the UI

## Verification Steps
1. Verify the new harness files exist in the harnesses directory
2. Check that the HarnessGrid component renders the new harness entries
3. Confirm the documentation updates reflect the increased count
4. Validate that the skill still works with existing harnesses