# UX Laws & Cognitive Heuristics Reference

Load when auditing user interfaces, conducting frontend polish, evaluating user journey flows, or when the user requests a UX/UI heuristic review.

## Purpose

Audit web and mobile applications against established cognitive psychology principles (Laws of UX / Nielsen Norman Group heuristics). Catch unintuitive interactions, cognitive overload, sluggish feedback, ergonomic flaws, and broken mental models before production release.

---

## 1. Ergonomic & Physical Interaction Laws

### Fitts's Law
*The time to acquire a target is a function of the distance to and size of the target.*
- **Check**: Touch/click targets must meet minimum size guidelines.
  - Mobile touch targets: minimum $48 \times 48\text{px}$ (Android) or $44 \times 44\text{px}$ (iOS/WCAG 2.5.5).
  - Web targets: minimum $24 \times 24\text{px}$ (WCAG 2.5.8), recommended $\ge 36\text{px}$ height for buttons/inputs.
  - Check clickable icon-only buttons (`<button>`, `<a>`) for sufficient padding.
- **Code Smell**: Icon button without padding: `<button className="p-0 text-sm"><Icon /></button>`.
- **Remediation**: Add minimum bounding box and hit area: `<button className="min-h-[44px] min-w-[44px] p-2 flex items-center justify-center">`.
- **Severity**: `MEDIUM` | **Change Risk**: `LOW`

---

## 2. Performance & Response Laws

### Doherty Threshold
*Productivity soars when a computer and its users interact at a pace (<400ms) that ensures neither has to wait on the other.*
- **Check**: Asynchronous actions (API queries, mutations, navigations) taking $>400\text{ms}$ must provide immediate visual feedback.
  - Form submit buttons must show spinner or pending state on click.
  - Route transitions or data-heavy tables must render skeleton states instead of blank screens.
  - Optimistic UI updates should be used for simple toggles (e.g., likes, bookmarks, switches).
- **Code Smell**: Asynchronous submit handler with no loading indicator:
  ```tsx
  const handleSubmit = async () => {
    await api.post('/data'); // UI freezes with no spinner
  };
  ```
- **Remediation**: Bind loading state or use React 19 / TanStack Query `isPending`:
  ```tsx
  <button disabled={isPending}>
    {isPending ? <Spinner className="animate-spin" /> : 'Save'}
  </button>
  ```
- **Severity**: `HIGH` | **Change Risk**: `LOW`

---

## 3. Cognitive Load & Decision Laws

### Hick's Law
*The time it takes to make a decision increases with the number and complexity of choices.*
- **Check**: Avoid choice paralysis.
  - Menus/dropdowns with $>7$ items must be categorized, grouped, or searchable.
  - Multi-tiered settings or onboarding forms must use progressive disclosure or wizard steps.
  - Default options should be pre-selected for common use cases.
- **Code Smell**: Flat list of 20+ `<option>` elements in raw `<select>` without `<optgroup>` or autocomplete.
- **Remediation**: Group options or implement combobox with search filter.
- **Severity**: `LOW` | **Change Risk**: `MEDIUM`

### Miller's Law
*The average person can only keep $7 \pm 2$ items in their working memory.*
- **Check**: Chunk complex information sets into logical groupings.
  - Phone numbers, credit card numbers, verification codes must have input masks and visual chunking.
  - Dashboards should group related metrics into cards rather than unbroken walls of numbers.
- **Code Smell**: Unformatted continuous numeric input for payment card or phone number:
  `<input type="text" maxLength={16} placeholder="1234567812345678" />`
- **Remediation**: Use masked input (e.g., `#### #### #### ####`).
- **Severity**: `LOW` | **Change Risk**: `LOW`

### Tesler's Law (Law of Conservation of Complexity)
*For any system there is an inherent amount of complexity that cannot be reduced; design/code must absorb it rather than dumping it on the user.*
- **Check**: Avoid forcing the user to do repetitive parsing or manual conversions (e.g., timezone calculations, currency conversions, manual address splitting).
- **Severity**: `LOW` | **Change Risk**: `MEDIUM`

---

## 4. Mental Models & Expectations

### Jakob's Law
*Users spend most of their time on other sites. They expect your site to work like familiar sites.*
- **Check**:
  - Logo in header must navigate to `/` (home).
  - Search input should reside at top navigation or be accessible via `Cmd+K` / `Ctrl+K`.
  - Cart / Profile / Notification icons should reside at top right.
  - Form inputs must follow standard tab order and respond to `Enter` for submission.
- **Code Smell**: Header logo wrapped in `<div onClick={...}>` without `<a>` or linking to external page.
- **Remediation**: Wrap header logo in `<Link href="/">`.
- **Severity**: `MEDIUM` | **Change Risk**: `LOW`

### Postel's Law (Robustness Principle)
*Be liberal in what you accept, and conservative in what you send.*
- **Check**: Form validation should tolerate minor variations (e.g. whitespace in phone numbers, lowercase letters in promo codes, trailing slashes in URLs). Auto-format input where safe.
- **Severity**: `LOW` | **Change Risk**: `LOW`

---

## 5. Visual Perception & Gestalt Principles

### Law of Proximity & Common Region
*Elements near each other or bounded within a region are perceived as a group.*
- **Check**:
  - Form inputs must be closer to their respective `<label>` than to adjacent fields.
  - Distinct cards or list items must have distinct background, border, or spacing separation.
- **Code Smell**: Equal vertical spacing between labels, inputs, and neighboring fields causing ambiguity.
- **Severity**: `MEDIUM` | **Change Risk**: `LOW`

### Law of Similarity & Uniform Connectedness
*Elements with identical visual styling are perceived to share the same function.*
- **Check**: Primary button styles must not be applied to secondary/neutral actions. Destructive actions must visually signal danger (e.g., red/destructive variant).
- **Severity**: `LOW` | **Change Risk**: `LOW`

---

## 6. Memory & Emotional Biases

### Peak-End Rule
*People judge an experience largely based on how they felt at its peak and at its end.*
- **Check**:
  - Critical milestones (checkout complete, onboarding finished) must have clear, positive confirmation states.
  - Error states (404, 500, network offline) must provide clear recovery paths (retry button, go home link).
  - Destructive operations (delete account, drop database) must require explicit confirmation modals/dialogs.
- **Code Smell**: Direct delete without confirmation:
  `<button onClick={() => deleteResource(id)}>Delete</button>`
- **Remediation**: Wrap destructive action in confirmation dialog or require typing resource name.
- **Severity**: `HIGH` | **Change Risk**: `LOW`

### Von Restorff Effect (Isolation Effect)
*When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.*
- **Check**: Ensure one unambiguous primary CTA per screen/view. Avoid competing primary buttons.
- **Severity**: `LOW` | **Change Risk**: `LOW`

### Zeigarnik Effect & Goal-Gradient Effect
*Users remember unfinished tasks and accelerate effort as they approach completion.*
- **Check**: Multi-step workflows (onboarding, checkout) must provide clear progress indicators (e.g., "Step 2 of 4", progress bar).
- **Severity**: `LOW` | **Change Risk**: `LOW`

---

## Audit Finding Model

When reporting UX heuristic findings:
- **Finding**: Name specific law (e.g. `[FITTS-LAW] Interactive icon button below touch target size`).
- **Evidence**: Component file, line number, element selector.
- **Severity**: `HIGH` (Doherty/Peak-End data loss) | `MEDIUM` (Fitts/Jakob) | `LOW` (Chunking/Hick).
- **Remediation**: Direct JSX/CSS/Tailwind adjustment snippet.
