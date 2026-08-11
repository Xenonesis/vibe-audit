# Design System: Vibe Audit

## 1. Visual Theme & Atmosphere
A clinical, high-agency, document-style workspace interface that balances warm gallery-like whitespace with technical precision. The design avoids generic SaaS tropes in favor of an editorial, high-contrast monochrome aesthetic punctuated by desaturated pastel semantic indicators.

* **Density:** 4/10 (Art Gallery Balanced — spacious sections with macro-whitespace `100px` padding, constrained text containers `760px` max-width).
* **Variance:** 8/10 (Offset Asymmetric — split-screen heroes, staggered bento box grids, inline type visual punctuations, non-symmetric column splits).
* **Motion:** 6/10 (Fluid Spring Physics — quiet sophistication, scroll entry fades, tactile push states, zero linear easing).

---

## 2. Color Palette & Roles
Color is treated as a scarce semantic resource. Accent colors are strictly desaturated pastels reserved for status badges, tags, and inline metadata indicators.

### Neutrals (Warm Monochrome Base)
* **Warm Canvas Background** (`#FBFBFA` Light / `#0E0E10` Dark) — Primary page backdrop with subtle radial light falloff.
* **Pure Surface** (`#FFFFFF` Light / `#161618` Dark) — Elevated card fills, code blocks, and container surfaces.
* **Subtle Fill** (`#F7F6F3` Light / `#1F1F22` Dark) — Terminal headers, table heads, `<kbd>` keys, and hover highlights.
* **Structural Border** (`#EAEAEA` Light / `#2E2E32` Dark) — Crisp `1px` container dividers and card outlines.
* **Border Hover** (`#D4D4D4` Light / `#44444A` Dark) — Micro-interaction border highlight state.
* **Charcoal Ink (Primary Text)** (`#111111` Light / `#F4F4F5` Dark) — High-contrast headlines, titles, and active labels. Never pure black (`#000000`).
* **Slate Body** (`#2F3437` Light / `#D4D4D8` Dark) — Generous leading (`1.6`) body text.
* **Muted Steel (Secondary Text)** (`#787774` Light / `#A1A1AA` Dark) — Captions, labels, timestamps, and metadata.

### Muted Pastels (Semantic Indicators)
* **Pale Blue** (`#E1F3FE` bg / `#1F6C9F` text — Dark: `#1A2C38` / `#7DD3FC`) — Audit mode, skill tags, primary badges.
* **Pale Green** (`#EDF3EC` bg / `#346538` text — Dark: `#1B3121` / `#86EFAC`) — Fix mode, PASS status, low change risk.
* **Pale Yellow** (`#FBF3DB` bg / `#956400` text — Dark: `#332912` / `#FDE047`) — Warnings, medium risk, baseline notes.
* **Pale Red** (`#FDEBEC` bg / `#9F2F2D` text — Dark: `#381A1C` / `#FCA5A5`) — Critical vulnerabilities, high change risk, banned actions.

*Constraint:* Maximum 1 active accent per section. Neon glows, purple gradients, and saturated primary background fills are strictly BANNED.

---

## 3. Typography Architecture
Hierarchy is achieved through extreme typographic contrast between modern editorial serifs and geometric monospace fonts, not just massive scale changes.

* **Display / Headlines:** `Newsreader` (or `Instrument Serif` / `Playfair Display`) — Serif with tight tracking (`letter-spacing: -0.03em`), tight line-height (`1.1`), and medium weight (`500`). Used exclusively for section headings and hero statements.
* **Body & Navigation:** `Geist` (or `SF Pro Display` / `Switzer`) — Neutral geometric sans-serif. Line height `1.6`, maximum 65 characters per line (`65ch`).
* **Monospace (Code & Meta):** `Geist Mono` (or `JetBrains Mono` / `SF Mono`) — Used for terminal commands, keystrokes, manifest data, table headers, and numerical metrics.
* **Banned Typefaces:** `Inter`, `Roboto`, `Open Sans`, `Times New Roman`, `Georgia`, `Arial`.
* **Dashboard / Code Constraints:** Serif fonts are BANNED in code blocks, tables, and pure data displays. High-density metrics must use `Geist Mono`.

---

## 4. Hero Section Architecture
The Hero section establishes immediate creative authority through asymmetric spatial arrangement:

* **Inline Image Typography:** Small, rounded contextual visual chips (e.g., SVG badges or mini mockups) sit directly inline with headline text at font-height, acting as visual punctuation.
* **Spatial Isolation:** No element overlaps another. Text, buttons, and terminal preview cards occupy clean, dedicated grid zones.
* **Asymmetric Grid Split:** Left-aligned text column (`60%` width) paired with an offset code terminal window (`40%` width). Centered hero text is BANNED.
* **CTA Restraint:** Exactly one primary button (`#111111` solid background, `#FFFFFF` text) paired with one secondary outline button or copy snippet button. No competing links.
* **Zero Bounce Chevrons:** Bouncing arrows, "Scroll to explore" text, and filler UI elements are strictly BANNED.

---

## 5. Component Stylings

### Buttons
* **Primary Button:** Solid `#111111` fill (Light) / `#F4F4F5` fill (Dark), `#FFFFFF` text, crisp `6px` border-radius. No box shadow. Active state applies `transform: scale(0.98)`.
* **Secondary Button:** Surface fill, `1px solid #EAEAEA`, charcoal text. Hover transitions background to `#F7F6F3`.
* **Copy Button:** Compact monospace button (`text-xs`) with inline clipboard SVG. On click, transforms to Pale Green background with "Copied!" checkmark feedback for 2000ms.

### Cards & Bento Box Grids
* **Bento Grid Layout:** Asymmetric 12-column grid (`col-4`, `col-6`, `col-8`, `col-12`).
* **Card Frame:** `1px solid #EAEAEA` border, `8px` or `12px` crisp border radius. Generous internal padding (`32px`).
* **Elevation:** Flat by default. Hover state applies an ultra-diffuse whisper shadow (`box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04)`) over `200ms`. Heavy drop-shadows (`shadow-lg`) are BANNED.

### Faux-OS Window Chrome
* **Header Bar:** `#F9F9F8` fill, `1px solid #EAEAEA` bottom border, 3 light gray circle dots (`10px` size), monospace window title on center.
* **Window Body:** Monospace code display with distinct token coloring (`cmd`, `prompt-symbol`, `output-muted`, `output-success`, `output-highlight`).

### Tags & Badges
* **Pill Shape:** `border-radius: 9999px`, padding `4px 10px`, font size `11px` (`0.6875rem`), monospace uppercase with `0.05em` letter spacing. Muted pastel background matching semantic role.

### Accordion FAQs
* **Container:** No outer card box. Items separated exclusively by `border-bottom: 1px solid #EAEAEA`.
* **Toggle:** Minimalist `+` and `-` toggle icons using `Geist Mono` font. Content expands via `max-height` transition (`600ms cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 6. Layout Principles
* **Macro-Whitespace:** Vertical padding between major sections is strictly `100px` (`py-24` equivalent).
* **Max Width Containment:** Main content constrained to `1140px` centered; narrow editorial containers constrained to `860px`.
* **No Flexbox Percentage Hacks:** CSS Grid (`grid-template-columns: repeat(12, 1fr)`) used for all multi-column layouts.
* **Full-Height Sections:** Use `min-height: 100dvh` — never `height: 100vh` (prevents mobile Safari viewport jumping).

---

## 7. Responsive Architecture & Rules
* **Mobile-First Collapse (< 768px):** Every multi-column bento card grid and hero split collapses to a clean single column.
* **No Horizontal Overflow:** `overflow-x: hidden` enforced on page container. Touch targets minimum `44px`.
* **Fluid Typography:** Headlines scale smoothly using `clamp(2.75rem, 5vw, 4.25rem)`. Body text remains `1rem` minimum.
* **Navigation:** Sticky top navbar collapses to compact brand mark and theme control on narrow viewports.

---

## 8. Motion Philosophy & Micro-Interactions
* **Spring Physics Engine:** Transitions use `cubic-bezier(0.16, 1, 0.3, 1)` (equivalent to spring `stiffness: 100, damping: 20`). Linear easing is BANNED.
* **Viewport Scroll Entry:** Elements fade in gently as they enter the viewport using `IntersectionObserver` (`translateY(12px)` + `opacity: 0 → 1` over `600ms`).
* **Hardware Acceleration:** Animations restricted exclusively to `transform` and `opacity`. No layout reflow animation (`width`, `height`, `margin`, `top`).
* **Theme Switching:** Smooth `0.25s` background and text color transitions when toggling Light, Dark, or System modes.

---

## 9. Strictly Forbidden Anti-Patterns (Banned AI Tells)
1. **NO Emojis:** Zero emojis in code, markup, headings, text, or buttons. Use SVG icons or monospace indicators.
2. **NO Inter Font:** `Inter`, `Roboto`, `Open Sans` are BANNED. Use `Geist` + `Newsreader` + `Geist Mono`.
3. **NO Pure Black:** Never use `#000000` for background or text. Use `#111111` / `#0E0E10`.
4. **NO Heavy Drop Shadows:** No default `shadow-md`, `shadow-lg`, `shadow-xl`. Shadows must be diffuse (< 0.05 opacity) or crisp `1px` borders.
5. **NO Neon / Purple Glows:** Banned AI purple/blue neon gradients or glowing outer borders.
6. **NO Symmetric Equal 3-Cards:** Banned 3 equal horizontal card grids. Use asymmetrical 12-column Bento layouts.
7. **NO AI Copywriting Clichés:** Never use "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve".
8. **NO Centered Hero Layouts:** Hero must be split-screen or left-aligned with asymmetric whitespace.
9. **NO Generic Names:** Never use "John Doe" or "Acme Corp". Use real technical metrics and actual package names (`vibe-audit`, `Xenonesis`).
10. **NO Unspaced Overlapping Elements:** Text must never overlap images or cards. Every element maintains its spatial domain.
