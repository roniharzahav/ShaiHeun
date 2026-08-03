# Decorative Geometric Accents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add minimal red geometric decorative accents to the homepage without changing the existing color palette, typography, or layout.

**Architecture:** Use CSS pseudo-elements (`::before`, `::after`) on existing DOM nodes to draw thin red corner brackets, a diagonal slash divider, and a hero overlay corner accent. Keep all decorative elements non-interactive and RTL-compatible.

**Tech Stack:** Plain HTML, CSS (custom properties already defined in `src/pages/styles.css`), Vite build.

## Global Constraints
- Use only existing `--accent` (#c1121f) and related variables.
- No new colors, fonts, or font-size changes.
- No animations or transitions.
- Decorative only — not clickable, not focusable.
- RTL-compatible.
- Build must pass (`npm run build`).
- Homepage scope only: `src/pages/index.html` and `src/pages/styles.css`.

---

### Task 1: Add section-title corner brackets

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: `.section-title` class already exists on homepage section headings.
- Produces: `.section-title` will gain `::before` and `::after` pseudo-elements that draw red corner brackets.

- [ ] **Step 1: Inspect current `.section-title` rules**

Read the existing `.section-title` CSS to understand positioning and spacing.

- [ ] **Step 2: Add bracket pseudo-elements**

Add CSS that draws two L-shaped brackets behind each `.section-title`:

```css
.section-title {
    position: relative;
    display: inline-block; /* ensure pseudo-elements size to content */
}

.section-title::before,
.section-title::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-color: var(--accent);
    border-style: solid;
    pointer-events: none;
    z-index: -1;
}

.section-title::before {
    top: -8px;
    right: -12px;
    border-width: 2px 2px 0 0;
}

.section-title::after {
    bottom: -8px;
    left: -12px;
    border-width: 0 0 2px 2px;
}
```

- [ ] **Step 3: Verify on homepage**

Start dev server (`npm run dev`) and confirm both "מה זה שאי הון?" and "למה שאי הון?" titles show brackets.

- [ ] **Step 4: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: add corner brackets to section titles"
```

---

### Task 2: Add diagonal slash divider between sections

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: `.section--what` section already exists immediately before `.section--why`.
- Produces: `.section--what` will gain an `::after` pseudo-element drawing a centered diagonal slash.

- [ ] **Step 1: Add slash divider pseudo-element**

Append the following CSS:

```css
.section--what {
    position: relative;
}

.section--what::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%) rotate(25deg);
    width: 40px;
    height: 2px;
    background: var(--accent);
    opacity: 0.6;
    pointer-events: none;
}
```

- [ ] **Step 2: Verify spacing**

Ensure the slash sits between the two sections without overlapping cards or text. Adjust `bottom` value if needed.

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: add diagonal slash divider between what and why sections"
```

---

### Task 3: Add hero overlay corner accent

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: `.carousel-overlay` already exists as the hero text container.
- Produces: `.carousel-overlay` will gain a `::before` pseudo-element drawing a small corner bracket in the top-right.

- [ ] **Step 1: Add hero corner accent**

Append the following CSS:

```css
.carousel-overlay {
    position: relative;
}

.carousel-overlay::before {
    content: '';
    position: absolute;
    top: -16px;
    right: -16px;
    width: 32px;
    height: 32px;
    border-top: 2px solid var(--accent);
    border-right: 2px solid var(--accent);
    pointer-events: none;
    z-index: -1;
}
```

- [ ] **Step 2: Verify on homepage**

Confirm the accent appears behind the hero text in the top-right of the overlay.

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: add corner accent to hero overlay"
```

---

### Task 4: Build verification

**Files:**
- None.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 2: Check responsive layout**

Resize the browser to mobile width and verify brackets/slash do not overlap text or break layout.

- [ ] **Step 3: Commit if no issues**

No additional files to commit if build passes. If adjustments were needed, commit them with a descriptive message.

---

## Self-Review

1. **Spec coverage:** All three decorative elements (title brackets, slash divider, hero accent) are covered by tasks.
2. **Placeholder scan:** No placeholders; all code blocks are complete.
3. **Type consistency:** CSS only; properties and selectors are consistent with existing stylesheet.
4. **Scope:** Single plan, homepage only, no cross-page dependencies.
