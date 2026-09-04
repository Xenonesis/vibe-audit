# Design System: Vibe Audit — Industrial Technical Brutalism

A locked design system for Vibe Audit. All page components and stylesheets read this file before emitting code.

## 1. Genre & Aesthetic Philosophy
* **Genre:** Industrial Brutalism (Technical Blueprint / Terminal Tooling).
* **Atmosphere:** Raw, unapologetic, machine-built precision. Zero delicate rounded pill capsules, zero fuzzy pastel glows, zero generic AI marketing tropes.
* **Rules & Borders:** Heavy `2px` and `3px` solid black rules (`--color-rule`). Zero border-radius (`border-radius: 0px`) everywhere.
* **Shadows:** Hard offset architectural drop shadows (`box-shadow: 3px 3px 0px #000000`, `4px 4px 0px #000000`). No blur radius.
* **Density:** 7/10 (High Information Density — structured data tables, mechanical spec sheets, explicit telemetry).
* **Tactile Feedback:** Decisive mechanical press state (`transform: translate(2px, 2px)` with shadow collapsing to `1px 1px 0px`).

---

## 2. Macrostructure Family
* **Primary Macrostructure:** 05 · Workbench (Industrial Blueprint & Guided CLI Tour).
* **Secondary Influences:** 07 · Manifesto (Declarative bold assertions) + 20 · Ecosystem Index (21 harnesses & 47 evals).
* **Navigation Archetype:** N7 · Brutal Slab (heavy full-width nav, 2px solid bottom border, all-caps tracked links, zero radius, hard button blocks).
* **Footer Archetype:** Ft5 · Statement + Ft8 · Marquee Scroll (industrial monospace specs, status pulse, uppercase statement).

---

## 3. Color Architecture & Tokens

### Neutrals (Stark High-Contrast Canvas)
* **Canvas Paper** (`#F4F4F0` Light / `#0A0B0E` Dark) — Stark architectural drawing sheet.
* **Surface Panel** (`#FFFFFF` Light / `#12141A` Dark) — Elevated technical cards and code consoles.
* **Subtle Header** (`#EAEAE4` Light / `#1A1D24` Dark) — Table headers, terminal top-bars, active tabs.
* **Ink Primary** (`#000000` Light / `#FFFFFF` Dark) — Unyielding maximum-contrast technical text.
* **Body Ink** (`#171717` Light / `#E2E8F0` Dark) — High-legibility technical documentation text.
* **Muted Ink** (`#525252` Light / `#94A3B8` Dark) — Metadata, line numbers, secondary specs.
* **Rule Line** (`#000000` Light / `#334155` Dark) — Heavy structural grid line (`2px` default, `3px` prominent).

### High-Visibility Hazard & Safety Accents
* **Safety Red** (`#DC2626` / `#EF4444`) — Critical severity, IDOR alerts, adversarial blockers.
* **Hazard Amber** (`#F59E0B` / `#FBBF24`) — Warnings, medium risk, baseline status indicators.
* **Terminal Emerald** (`#16A34A` / `#22C55E`) — PASS status, verified rules, low risk.
* **Cobalt Signal** (`#2563EB` / `#38BDF8`) — Audit mode, primary action highlight, CLI flags.

---

## 4. Typography Architecture

* **Display & Headlines:** `Space Grotesk` (Google Fonts) — Heavy industrial grotesque, weights `700` and `800`, tracked uppercase, tight leading (`1.05 - 1.15`), `letter-spacing: -0.02em` to `0.04em`.
* **Body Text:** `Geist` — Clean, legible modern sans-serif. Line height `1.55`.
* **Monospace (Code & Telemetry):** `Geist Mono` — Fixed-width mechanical text for CLI prompts, test counts, JSON assertions, and table keys.
* **Display Ceiling:** Headlines capped at `clamp(2.5rem, 5vw + 0.5rem, 4.25rem)`. Zero italic headings.

---

## 5. Component Archetypes & Rules

### Buttons & CTAs
* **Shape:** Strict `0px` border-radius.
* **Border:** `2px solid #000000` (Light) / `2px solid #FFFFFF` (Dark).
* **Shadow:** `3px 3px 0px #000000` (Light) / `3px 3px 0px #38BDF8` or `#FFFFFF` (Dark).
* **Active Press:** `transform: translate(2px, 2px); box-shadow: 1px 1px 0px;`.
* **Typography:** `Space Grotesk` or `Geist Mono` bold uppercase with tracked spacing.

### Cards & Technical Blocks
* **Border:** `2px solid var(--border-color)`.
* **Radius:** `0px`.
* **Shadow:** `4px 4px 0px var(--shadow-color)`.
* **Header Bar:** Solid color fill, border-bottom `2px solid`, technical category tag.

### Badges & Status Chips
* **Shape:** Hard rectangular blocks with `1.5px` or `2px` black border.
* **Radius:** `0px`.
* **Typography:** Monospace uppercase, `text-xs`, bold.
* **Colors:** High-contrast solid fills (e.g. black text on hazard yellow, white on safety red, white on black).

### Data Tables & Leaderboard
* **Borders:** Visible `2px` black perimeter and divider grid lines.
* **Header:** Monospace all-caps with solid subtle background.
* **Rows:** Mechanical alternating or bordered rows with instant hover highlight and expandable drawers.

---

## 6. Prohibited Anti-Patterns (Banned AI Tells)
1. **NO Rounded Pill Capsules (`border-radius: 9999px`):** All pills replaced with sharp rectangular tags.
2. **NO Fuzzy Gradients or Radial Glows:** Backgrounds are stark, crisp, and architectural.
3. **NO Soft Blurred Drop Shadows:** Only hard geometric offset shadows with 0 blur.
4. **NO Delicate Pastels in High-Impact Zones:** Semantic accents are bold hazard colors with high WCAG contrast.
5. **NO Italic Headers:** Headings are always upright roman.
6. **NO Re-drawn Fake UI Chrome:** Authentic terminal emulator with genuine CLI output.
