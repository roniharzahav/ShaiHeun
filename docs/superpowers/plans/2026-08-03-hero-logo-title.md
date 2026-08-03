# Hero Overlay Logo-Title Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the homepage hero overlay so the brand name "שאי הון" appears on a single line with the association logo inline to its right.

**Architecture:** Replace the two-line title markup with a single-line flex lockup (logo + text) and update the stylesheet to lay it out inline, centered, and responsive. No JavaScript changes are needed.

**Tech Stack:** Vite, Handlebars partials, plain HTML/CSS.

## Global Constraints

- Worktree: `homepage-redesign` (`P:\shi-heun\.claude\worktrees\homepage-redesign`)
- All text is Hebrew/RTL; keep `dir="rtl"` semantics.
- Use existing CSS variables (`--paper`, `--accent-bright`, etc.).
- Logo file is `public/logo.png` and is served at root (`logo.png`).
- Build must succeed with `npm run build`.

---

### Task 1: Update hero title lockup in `src/pages/index.html`

**Files:**
- Modify: `src/pages/index.html:29-32`

**Interfaces:**
- Consumes: Existing `.carousel-overlay` container, `.hero-title` class.
- Produces: New markup structure with `.hero-title-logo`, `.hero-title-text`, and `.hero-title-accent` classes for the CSS task.

- [ ] **Step 1: Replace the two-line title markup**

    Locate the `h1.hero-title` inside `.carousel-overlay`:

    ```html
    <h1 class="hero-title">
        <span class="title-line">שאי</span>
        <span class="title-line title-line--accent">הון</span>
    </h1>
    ```

    Replace it with:

    ```html
    <h1 class="hero-title">
        <img src="logo.png" alt="" class="hero-title-logo">
        <span class="hero-title-text">שאי <span class="hero-title-accent">הון</span></span>
    </h1>
    ```

- [ ] **Step 2: Verify the surrounding overlay is unchanged**

    Confirm that `.eyebrow` and `.hero-lede` remain immediately above and below the `h1`, respectively, and that `.carousel-overlay` still centers its children.

- [ ] **Step 3: Commit**

    ```bash
    git add src/pages/index.html
    git commit -m "feat: add inline logo to hero title lockup

    Co-Authored-By: Claude <noreply@anthropic.com>"
    ```

### Task 2: Style the inline logo-title lockup in `src/pages/styles.css`

**Files:**
- Modify: `src/pages/styles.css:195-211`, `src/pages/styles.css:993-1000`

**Interfaces:**
- Consumes: New classes `.hero-title-logo`, `.hero-title-text`, `.hero-title-accent` from Task 1.
- Produces: Visual layout where logo and title share one centered line.

- [ ] **Step 1: Convert `.hero-title` to a flex row**

    Replace the existing `.hero-title` block (lines 195–211):

    ```css
    .hero-title {
        font-family: var(--font-display);
        font-weight: 900;
        font-size: clamp(52px, 11vw, 150px);
        line-height: 0.9;
        letter-spacing: -3px;
        color: var(--paper);
    }
    .title-line {
        display: block;
    }
    .title-line--accent {
        color: var(--accent-bright);
        font-style: italic;
        font-weight: 500;
        padding-inline-start: clamp(40px, 8vw, 120px);
    }
    ```

    With:

    ```css
    .hero-title {
        font-family: var(--font-display);
        font-weight: 900;
        font-size: clamp(52px, 11vw, 150px);
        line-height: 0.9;
        letter-spacing: -3px;
        color: var(--paper);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35em;
    }

    .hero-title-logo {
        height: 1.1em;
        width: auto;
        flex-shrink: 0;
    }

    .hero-title-text {
        white-space: nowrap;
    }

    .hero-title-accent {
        color: var(--accent-bright);
        font-style: italic;
        font-weight: 500;
    }
    ```

- [ ] **Step 2: Remove the old carousel-overlay title overrides**

    The carousel overlay currently overrides `.title-line--accent` (around lines 993–1000). Remove or replace those overrides so they do not conflict with the new `.hero-title-accent` class. Specifically, remove:

    ```css
    .carousel-overlay .title-line--accent {
        color: var(--accent-bright);
    }
    ```

    The accent color is now handled by `.hero-title-accent`.

- [ ] **Step 3: Build and visually verify**

    Run the dev server:

    ```bash
    npm run dev
    ```

    Open the local URL and verify:

    - Logo appears to the right of "שאי הון" on one line.
    - "הון" is still colored with the accent red.
    - The layout is centered and balanced on desktop.
    - On mobile (narrow viewport), the logo and text stay on one line and scale down proportionally.

- [ ] **Step 4: Run production build**

    ```bash
    npm run build
    ```

    Expected: build completes with no errors.

- [ ] **Step 5: Commit**

    ```bash
    git add src/pages/styles.css
    git commit -m "feat: style inline hero logo-title lockup

    Co-Authored-By: Claude <noreply@anthropic.com>"
    ```

## Self-Review

- **Spec coverage:**
  - Single-line title: Task 1 markup.
  - Logo to the right: Task 1 markup + Task 2 flex layout.
  - Accent on "הון": Task 2 `.hero-title-accent`.
  - Responsive scaling: Task 2 uses `em`-relative logo sizing and existing `clamp()` font size.
  - Build succeeds: Task 2 Step 4.
- **Placeholder scan:** No TBD/TODO or vague steps.
- **Type consistency:** Class names `.hero-title-logo`, `.hero-title-text`, `.hero-title-accent` are produced in Task 1 and consumed in Task 2.
