# Hero Carousel Title Red Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the entire brand name "שאי-הון" in the homepage hero carousel overlay red using the existing accent red color.

**Architecture:** Update one CSS rule in `src/pages/styles.css` so `.carousel-overlay .hero-title` uses `var(--accent-bright)` instead of `var(--paper)`. No HTML or JavaScript changes are needed.

**Tech Stack:** Vite, plain HTML/CSS.

## Global Constraints

- All text is Hebrew/RTL; keep `dir="rtl"` semantics.
- Use existing CSS variables (`--paper`, `--accent-bright`).
- The red shade must match the existing "הון" accent color (`var(--accent-bright)`).
- Build must succeed with `npm run build`.

---

### Task 1: Change carousel hero title color in `src/pages/styles.css`

**Files:**
- Modify: `src/pages/styles.css:972-973`

**Interfaces:**
- Consumes: Existing `.carousel-overlay .hero-title` rule and `.hero-title-accent` rule.
- Produces: Carousel hero title text inherits red from its parent; accent span remains red.

- [ ] **Step 1: Update the color declaration**

    Locate the existing rule (around line 972):

    ```css
    .carousel-overlay .hero-title {
        color: var(--paper);
        margin: 16px 0;
    }
    ```

    Change it to:

    ```css
    .carousel-overlay .hero-title {
        color: var(--accent-bright);
        margin: 16px 0;
    }
    ```

- [ ] **Step 2: Verify the accent span remains styled**

    Confirm `.hero-title-accent` still has:

    ```css
    .hero-title-accent {
        color: var(--accent-bright);
        font-style: italic;
        font-weight: 500;
    }
    ```

    No change is needed here; "הון" stays red and keeps its italic/weight styling.

- [ ] **Step 3: Run dev server and visually verify**

    Run:

    ```bash
    npm run dev
    ```

    Open the local URL and verify:

    - "שאי-" is now red.
    - "הון" remains red.
    - The eyebrow and lede text are unchanged.
    - The layout is still centered and readable on desktop and mobile.

- [ ] **Step 4: Run production build**

    ```bash
    npm run build
    ```

    Expected: build completes with no errors.

- [ ] **Step 5: Commit**

    ```bash
    git add src/pages/styles.css
    git commit -m "feat: make carousel hero title fully red

    Co-Authored-By: Claude <noreply@anthropic.com>"
    ```

## Self-Review

- **Spec coverage:**
  - Entire "שאי-הון" is red: Task 1 Step 1 changes parent color to `var(--accent-bright)`.
  - "הון" keeps existing red: `.hero-title-accent` unchanged.
  - Scoped to carousel overlay: only `.carousel-overlay .hero-title` is modified.
  - Build succeeds: Task 1 Step 4.
- **Placeholder scan:** No TBD/TODO or vague steps.
- **Type consistency:** CSS selectors match existing classes; no new classes introduced.
