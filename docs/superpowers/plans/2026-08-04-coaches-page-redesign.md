# Coaches Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing `locations.html` page to display six coach placeholders horizontally on desktop (image right, text left) and stacked on mobile, using a shared template per coach.

**Architecture:** Replace the current `.locations-grid` with a single `.coaches-list` containing six `.coach-card` elements. Each card uses a flex layout that flips direction on mobile. Add scoped CSS classes for the coach card, photo placeholder, info block, and WhatsApp action.

**Tech Stack:** Static HTML, Handlebars partials, plain CSS, Vite build.

## Global Constraints

- Site language: Hebrew, RTL (`dir="rtl"`).
- CSS must live in `src/pages/styles.css`.
- Page markup must live in `src/pages/locations.html`.
- WhatsApp links use `https://wa.me/972...` format.
- Photo placeholders use colored initials inside a circle.
- No JavaScript changes required for this redesign.
- Build must pass with `npm run build`.

---

### Task 1: Replace locations grid with coaches list markup

**Files:**
- Modify: `src/pages/locations.html:24-153`

**Interfaces:**
- Consumes: `{{> head}}`, `{{> nav locations=true}}`, `{{> footer}}` partials.
- Produces: `.coaches-list` container with six `.coach-card` elements using `.coach-photo`, `.coach-info`, `.coach-name`, `.coach-bio`, `.coach-meta`, `.coach-whatsapp` classes.

- [ ] **Step 1: Remove the old locations section**

  Delete everything from `<section class="section section--locations">` through its closing `</section>`.

- [ ] **Step 2: Add the new coaches section**

  Insert the following markup in place of the removed section:

  ```html
  <!-- COACHES -->
  <section class="section section--coaches">
      <div class="container">
          <div class="coaches-list">

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 1</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000001?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ1</span>
                  </div>
              </article>

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 2</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000002?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ2</span>
                  </div>
              </article>

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 3</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000003?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ3</span>
                  </div>
              </article>

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 4</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000004?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ4</span>
                  </div>
              </article>

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 5</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000005?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ5</span>
                  </div>
              </article>

              <article class="coach-card">
                  <div class="coach-info">
                      <h2 class="coach-name">מאמן 6</h2>
                      <p class="coach-bio">פרטים על המאמן יתווספו כאן.</p>
                      <p class="coach-meta">מועדון ___ / עיר ___</p>
                      <a class="coach-whatsapp" href="https://wa.me/972500000006?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          שלח הודעה
                      </a>
                  </div>
                  <div class="coach-photo" aria-hidden="true">
                      <span>מ6</span>
                  </div>
              </article>

          </div>
      </div>
  </section>
  ```

- [ ] **Step 3: Verify the page header text**

  Confirm line 19 reads:

  ```html
  <h1 class="section-title">צוות המאמנים</h1>
  ```

- [ ] **Step 4: Build and verify**

  Run: `npm run build`
  Expected: no errors, `dist/locations.html` exists.

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/locations.html
  git commit -m "feat: replace locations grid with six coach placeholders"
  ```

---

### Task 2: Add coach card CSS

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: existing CSS custom properties (e.g. `--accent`, `--text`, `--muted`, `--bg`, `--surface`, `--radius`).
- Produces: `.section--coaches`, `.coaches-list`, `.coach-card`, `.coach-info`, `.coach-name`, `.coach-bio`, `.coach-meta`, `.coach-whatsapp`, `.coach-photo` classes.

- [ ] **Step 1: Append coach styles after existing card/location styles**

  Add the following block near the end of `styles.css`, before the `@media` queries:

  ```css
  /* Coaches page */
  .section--coaches {
      padding-block: 64px;
  }

  .coaches-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
      max-width: 900px;
      margin-inline: auto;
  }

  .coach-card {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 32px;
      background: var(--surface, #ffffff);
      border: 1px solid var(--border, #dddddd);
      border-radius: var(--radius, 12px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .coach-card:nth-child(even) {
      background: var(--bg, #f5f5f5);
  }

  .coach-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
  }

  .coach-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text, #111111);
      margin: 0;
  }

  .coach-bio,
  .coach-meta {
      margin: 0;
      color: var(--muted, #555555);
      line-height: 1.6;
  }

  .coach-meta {
      font-weight: 500;
      color: var(--text, #111111);
  }

  .coach-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      align-self: flex-start;
      padding: 10px 18px;
      background: #25d366;
      color: #ffffff;
      border-radius: 999px;
      font-weight: 500;
      text-decoration: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .coach-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }

  .coach-photo {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent, #c1121f), #8a0c16);
      color: #ffffff;
      display: grid;
      place-items: center;
      font-size: 1.75rem;
      font-weight: 700;
  }
  ```

- [ ] **Step 2: Add mobile responsive styles**

  Inside the existing `@media (max-width: 768px)` block, append:

  ```css
  .coach-card {
      flex-direction: column;
      text-align: center;
      gap: 24px;
      padding: 24px;
  }

  .coach-info {
      align-items: center;
  }

  .coach-whatsapp {
      align-self: center;
      width: 100%;
      justify-content: center;
  }

  .coach-photo {
      width: 100px;
      height: 100px;
      font-size: 1.5rem;
  }
  ```

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: no errors.

- [ ] **Step 4: Visual check**

  Run: `npm run dev`
  Open `http://localhost:5173/locations.html`.
  Verify:
  - Six coach cards visible.
  - On desktop: photo on the right, text on the left.
  - On mobile (devtools): photo on top, text below, WhatsApp button full width.
  - Alternating background colors between cards.

- [ ] **Step 5: Commit**

  ```bash
  git add src/pages/styles.css
  git commit -m "style: add coach card layout and responsive styles"
  ```

---

### Task 3: Final verification and cleanup

**Files:**
- Review: `src/pages/locations.html`
- Review: `src/pages/styles.css`

- [ ] **Step 1: Confirm no stale location styles break the new page**

  Grep for `.location-card` and `.locations-grid` usage:

  Run: `grep -R "location-card\|locations-grid" src/pages/ src/partials/`
  Expected: no matches (old classes removed in Task 1).

- [ ] **Step 2: Run production build**

  Run: `npm run build`
  Expected: exit code 0.

- [ ] **Step 3: Preview and sanity check**

  Run: `npm run preview`
  Open `http://localhost:4173/locations.html`.
  Verify all six cards render correctly at desktop and mobile widths.

- [ ] **Step 4: Commit final state**

  ```bash
  git add .
  git status
  git commit -m "feat: redesign coaches page with six placeholder coaches"
  ```

---

## Self-Review

| Spec Requirement | Covered By |
|------------------|------------|
| 6 coach placeholders | Task 1 |
| Horizontal layout, image right, text left | Tasks 1 & 2 |
| Stack vertically on mobile | Task 2 |
| Same template for all six | Task 1 |
| Fields: name, bio, location, phone, photo | Task 1 |
| Phone = WhatsApp link only | Task 1 |
| Photo placeholder = colored initials | Task 2 |
| Page header: "צוות המאמנים" | Task 1 |
| Scalable for future coaches | Task 2 (single-column list) |

No placeholders or TODOs remain in the plan.
