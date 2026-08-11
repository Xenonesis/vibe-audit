# Accessibility Audit (Optional)

Load when the user asks for accessibility, inclusive UX, WCAG-oriented review, or a full polish where accessibility is explicitly in scope.

## Checks
Review representative user flows for:
- semantic landmarks and heading order
- keyboard access and visible focus
- correct labels, names, roles, and descriptions
- form error association and status announcements
- dialogs/menus/popovers focus behavior
- meaningful alt text and decorative image handling
- color contrast where measurable
- text resizing/zoom and responsive reflow
- motion/animation preferences where relevant
- touch target usability

Prefer native HTML semantics before ARIA. Do not add ARIA that contradicts native behavior.

## Verification
Use existing automated accessibility tooling where available, but do not treat automated scans as proof of WCAG conformance. Pair machine checks with keyboard and representative interaction testing where practical.

Report exact element/route evidence and distinguish automated findings from manually verified behavior.
