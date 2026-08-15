# #why Cards Expand-on-Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each `#why` section card reveal its full text on hover or press by expanding above its neighbors, capped at a max height.

**Architecture:** Restructure the `#why` card grid so each `li` becomes a positioning wrapper while the `.card` element pops out of flow on expansion. Keep the existing `data-card` / `is-open` / `aria-expanded` JavaScript behavior unchanged; only add CSS rules scoped to `#why`.

**Tech Stack:** Plain HTML, CSS, and vanilla JS. Built with Vite and `vite-plugin-handlebars`. No test runner is configured; verify with `npm run dev` and `npm run build`.

## Global Constraints
- Apply changes **only** to `#why` cards in `src/pages/index.html`.
- Keep `#what` card behavior unchanged.
- Re-use existing `data-card`, `aria-expanded`, `is-open`, and keyboard/click handlers in `src/pages/script.js`.
- Do not rename or break the existing `./script.js` or `assets/styles.css` output contracts.

---

### Task 1: Wrap #why cards in `.card-wrapper`

**Files:**
- Modify: `src/pages/index.html:112-141`

**Interfaces:**
- Consumes: existing `.card` markup, existing `.card-grid` list.
- Produces: `.card-wrapper` list items containing `.card` elements.

- [ ] **Step 1: Open `src/pages/index.html` and locate the `#why` section card grid (`<ul class="card-grid">`).**

- [ ] **Step 2: Wrap each `.card` `li` in a `.card-wrapper` container.**

Change each item from:

```html
<li class="card" data-card aria-expanded="false" tabindex="0" role="button">
    ...
</li>
```

To:

```html
<li class="card-wrapper">
    <div class="card" data-card aria-expanded="false" tabindex="0" role="button">
        ...
    </div>
</li>
```

Apply this to all four `#why` cards (כושר וחיזוק הגוף, ביטחון עצמי, הגנה עצמית, קהילתיות).

- [ ] **Step 3: Verify the markup is valid.**

Ensure:
- The `<ul class="card-grid">` still contains four `li` children.
- Each `li` has class `card-wrapper`.
- Each `.card` retains `data-card`, `aria-expanded="false"`, `tabindex="0"`, and `role="button"`.
- Image `aria-label` values match the updated titles from the previous content change.

- [ ] **Step 4: Commit.**

```bash
git add src/pages/index.html
git commit -m "refactor: wrap #why cards in .card-wrapper"
```

---

### Task 2: Add `.card-wrapper` and expanded-state CSS

**Files:**
- Modify: `src/pages/styles.css:1239-1344` (card grid/card rules area)

**Interfaces:**
- Consumes: `.card-wrapper` markup from Task 1, existing `.card` / `.card-body` / `.card-image` / `.card-title` classes.
- Produces: new `.card-wrapper`, `.section--why .card`, and `.section--why .card.is-open` / `.section--why .card:hover` rules.

- [ ] **Step 1: Add `.card-wrapper` rules right after `.card-grid`.**

```css
.card-wrapper {
    position: relative;
}
```

- [ ] **Step 2: Scope existing `.card` default rules so they also apply inside `#why`.**

Keep the existing global `.card` rule as-is (it is still used by `#what`).

Add a scoped override for `#why` cards below the global `.card` rule:

```css
.section--why .card {
    position: relative;
    width: 100%;
    height: 100%;
}
```

This ensures the card fills its wrapper before expansion.

- [ ] **Step 3: Add expanded-state rules scoped to `#why`.**

Below the existing mobile/non-hover `.card.is-open` rules, add:

```css
/* #why cards expand and float above neighbors */
.section--why .card.is-open {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    aspect-ratio: auto;
    height: auto;
    max-height: 420px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.section--why .card.is-open .card-body {
    position: relative;
    inset: auto;
    display: block;
    overflow-y: auto;
    max-height: 100%;
    opacity: 1;
}

.section--why .card.is-open .card-image {
    filter: brightness(0.4);
    transform: scale(1.05);
}

.section--why .card.is-open .card-title {
    opacity: 0;
}

@media (hover: hover) and (pointer: fine) {
    .section--why .card:hover {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 10;
        aspect-ratio: auto;
        height: auto;
        max-height: 420px;
        overflow: hidden;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
    }

    .section--why .card:hover .card-body {
        position: relative;
        inset: auto;
        display: block;
        overflow-y: auto;
        max-height: 100%;
        opacity: 1;
    }

    .section--why .card:hover .card-image {
        filter: brightness(0.4);
        transform: scale(1.05);
    }

    .section--why .card:hover .card-title {
        opacity: 0;
    }
}
```

- [ ] **Step 4: Add mobile max-height override.**

Inside the existing `@media (max-width: 640px)` block, after `.card { aspect-ratio: 16 / 9; }`, add:

```css
.section--why .card.is-open {
    max-height: 380px;
}

@media (hover: hover) and (pointer: fine) {
    .section--why .card:hover {
        max-height: 380px;
    }
}
```

- [ ] **Step 5: Run the dev server and verify.**

```bash
npm run dev
```

Check:
1. The `#why` section still shows four cards in a grid.
2. Hovering a desktop card expands it, dims the image, hides the title, shows the body, and the card floats over neighbors without pushing them.
3. If the fitness card text exceeds the max-height, the body scrolls internally.
4. On a mobile viewport (or touch emulation), tapping a card toggles it open via the existing `is-open` class.
5. Keyboard focus + `Enter`/`Space` toggles a card open.
6. `#what` cards behave exactly as before.

- [ ] **Step 6: Run the production build and verify no errors.**

```bash
npm run build
```

Expected: build completes with no errors and `dist/` is generated.

- [ ] **Step 7: Commit.**

```bash
git add src/pages/styles.css
git commit -m "feat: expand #why cards on hover/press with floating overlay"
```

---

## Self-Review

**1. Spec coverage:**
- Wrap `#why` cards in `.card-wrapper` → Task 1.
- Expanded card floats above neighbors → Task 2 Step 3 (`position: absolute`, `z-index: 10`).
- Max-height cap with internal scroll → Task 2 Step 3 (`max-height`, `overflow-y: auto`).
- Keep existing interaction JS → no task needed, CSS-only change.
- Responsive behavior → Task 2 Step 4.

**2. Placeholder scan:**
- No TBD/TODO.
- All code blocks contain concrete selectors and values.
- File paths and line ranges are specified.

**3. Type consistency:**
- CSS classes `.card-wrapper`, `.section--why .card`, `.section--why .card.is-open` are consistent between HTML and CSS tasks.
