# Homepage Dragon Emblem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Shi-Heun dragon image as a centered decorative emblem between the hero carousel and the `#what` section on the homepage.

**Architecture:** Insert a standalone emblem block in `src/pages/index.html` between `.hero-carousel` and `.section--what`. Copy the provided PNG into `public/dragon.png` so Vite serves it at root. Style the emblem in `src/pages/styles.css` with a circular accent ring, responsive sizing, and no interactions.

**Tech Stack:** Plain HTML, CSS, Vite build. Image asset lives in `public/`.

## Global Constraints
- Use only existing `--accent` (#c1121f) and related variables.
- No new colors, fonts, or font-size changes except for the emblem itself.
- No animations or transitions on the emblem.
- Decorative only — not clickable, not focusable.
- Build must pass (`npm run build`).
- Homepage scope only: `src/pages/index.html` and `src/pages/styles.css`, plus `public/dragon.png`.

---

### Task 1: Copy dragon image to public/

**Files:**
- Create: `public/dragon.png`

**Interfaces:**
- Consumes: user-provided source image at `c:\Users\ronih\OneDrive\Desktop\shi heun liked pictures\shi-heun_dragon-removebg-preview.png`.
- Produces: `public/dragon.png`, which Vite copies as-is to `dist/dragon.png`.

- [ ] **Step 1: Copy the image file**

  Copy the provided PNG to the repository's `public/` directory and rename it to `dragon.png`.

  ```powershell
  Copy-Item -Path "c:\Users\ronih\OneDrive\Desktop\shi heun liked pictures\shi-heun_dragon-removebg-preview.png" -Destination "P:\shi-heun\public\dragon.png"
  ```

- [ ] **Step 2: Verify the file exists**

  Confirm `public/dragon.png` exists and is a valid PNG.

- [ ] **Step 3: Commit**

  ```bash
  git add public/dragon.png
  git commit -m "assets: add dragon emblem image"
  ```

---

### Task 2: Add HTML emblem between hero and #what

**Files:**
- Modify: `src/pages/index.html`

**Interfaces:**
- Consumes: existing `.hero-carousel` section closes before `#what`; new `.dragon-emblem` block is inserted between them.
- Produces: a centered `<div class="dragon-emblem">` containing the dragon image.

- [ ] **Step 1: Locate the insertion point**

  Find the closing `</section>` tag of `.hero-carousel` and the opening `<section class="section section--what" id="what">` block.

- [ ] **Step 2: Insert the emblem markup**

  Add the following between the two sections:

  ```html
  <!-- DRAGON EMBLEM -->
  <div class="dragon-emblem" aria-hidden="true">
      <img src="dragon.png" alt="">
  </div>
  ```

  The `aria-hidden="true"` keeps the decorative image out of the accessibility tree because the empty `alt` already marks it as decorative.

- [ ] **Step 3: Verify structure**

  Ensure the emblem sits as a direct child of `<main>`, between the hero carousel and the `#what` section.

- [ ] **Step 4: Commit**

  ```bash
  git add src/pages/index.html
  git commit -m "feat: add dragon emblem between hero and what section"
  ```

---

### Task 3: Style the dragon emblem

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: `.dragon-emblem` class and its child `img`.
- Produces: centered circular emblem with accent ring, responsive sizing.

- [ ] **Step 1: Add base emblem styles**

  Append the following CSS after the hero carousel section:

  ```css
  /* ============================================================
     DRAGON EMBLEM
     ============================================================ */
  .dragon-emblem {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px 0;
      margin-top: -48px;
      position: relative;
      z-index: 2;
      pointer-events: none;
  }

  .dragon-emblem img {
      width: 120px;
      height: 120px;
      object-fit: contain;
      border-radius: 50%;
      background: var(--paper);
      border: 2px solid var(--accent);
      padding: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  ```

- [ ] **Step 2: Add responsive sizing**

  Inside the existing `@media (max-width: 640px)` block, add:

  ```css
  .dragon-emblem img {
      width: 80px;
      height: 80px;
  }
  ```

- [ ] **Step 3: Verify visually**

  Start the dev server (`npm run dev`) and confirm the emblem is centered, overlaps the hero bottom slightly (because of the negative margin), and sits above the `#what` section background.

- [ ] **Step 4: Commit**

  ```bash
  git add src/pages/styles.css
  git commit -m "style: add dragon emblem styling"
  ```

---

### Task 4: Build verification

**Files:**
- None.

- [ ] **Step 1: Run production build**

  ```bash
  npm run build
  ```

  Expected: build completes without errors and `dist/dragon.png` is present.

- [ ] **Step 2: Check responsive layout**

  Resize the browser to mobile width and verify the emblem does not overlap text or break the section spacing.

- [ ] **Step 3: Commit if no issues**

  No additional files to commit if build passes. If adjustments were needed, commit them with a descriptive message.

---

## Self-Review

1. **Spec coverage:** Image asset, HTML placement, and CSS styling are all covered.
2. **Placeholder scan:** No placeholders; all code blocks and commands are complete.
3. **Type consistency:** CSS properties and selectors are consistent with existing stylesheet.
4. **Scope:** Single plan, homepage only, no cross-page dependencies.
