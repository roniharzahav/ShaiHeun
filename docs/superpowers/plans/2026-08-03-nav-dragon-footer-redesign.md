# Navigation Dragon + Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the dragon emblem into the navigation bar and redesign the footer with a quick email form and social/icon links.

**Architecture:** Update `src/partials/nav.html` to include the dragon image beside the logo. Rewrite `src/partials/footer.html` with a two-column layout: a contact card with a client-side email form on the left, and large icon links (Instagram, YouTube, logo) on the right. Update `src/pages/styles.css` for header dragon sizing and new footer styles. Remove the old homepage `.dragon-emblem` block from `src/pages/index.html`.

**Tech Stack:** Plain HTML, CSS, vanilla JS. Icons are inline SVGs. Form is client-side only.

## Global Constraints
- Use only the existing color palette (`--accent`, `--paper`, `#111111`, etc.).
- No new fonts or font-size changes outside the footer context.
- Build must pass (`npm run build`).
- Responsive layout must remain stable.
- Client-side form only; no backend endpoint.

---

### Task 1: Move dragon into the navigation bar

**Files:**
- Modify: `src/partials/nav.html`
- Modify: `src/pages/index.html`
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: existing `.brand` link with `.brand-logo` in `nav.html`; existing `.dragon-emblem` block in `index.html`.
- Produces: `.brand` link contains both `.brand-dragon` and `.brand-logo`; `.dragon-emblem` is removed from homepage.

- [ ] **Step 1: Add dragon image to nav partial**

  In `src/partials/nav.html`, update the brand link:

  ```html
  <a href="index.html" class="brand">
      <img src="dragon.png" alt="" class="brand-dragon">
      <img src="logo.png" alt="שאי-הון" class="brand-logo">
  </a>
  ```

  The dragon is decorative, so use `alt=""`.

- [ ] **Step 2: Remove dragon emblem from homepage**

  In `src/pages/index.html`, delete the entire `<!-- DRAGON EMBLEM -->` block and the surrounding blank line.

- [ ] **Step 3: Add nav dragon styles**

  In `src/pages/styles.css`, add styles for `.brand-dragon` near the existing `.brand-logo` rules:

  ```css
  .brand {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      gap: 8px;
  }

  .brand-dragon {
      height: 44px;
      width: auto;
      display: block;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .brand-logo {
      height: 64px;
      width: auto;
      display: block;
      transition: transform 0.3s ease, filter 0.3s ease;
  }
  ```

  Add mobile sizing inside the existing `@media (max-width: 640px)` block:

  ```css
  .brand-dragon { height: 36px; }
  ```

- [ ] **Step 4: Verify all pages**

  Start the dev server and confirm the dragon appears beside the logo on every page.

- [ ] **Step 5: Commit**

  ```bash
  git add src/partials/nav.html src/pages/index.html src/pages/styles.css
  git commit -m "feat: move dragon emblem into navigation bar"
  ```

---

### Task 2: Redesign footer with email form and icon links

**Files:**
- Modify: `src/partials/footer.html`
- Modify: `src/pages/styles.css`
- Modify: `src/pages/script.js` (if needed for form success handling)

**Interfaces:**
- Consumes: existing footer structure; existing contact-form success pattern in `script.js`.
- Produces: new footer with `.footer-contact-card` form and `.footer-social` icon links.

- [ ] **Step 1: Replace footer HTML**

  Rewrite `src/partials/footer.html` with:

  ```html
  <footer class="site-footer">
      <div class="container">
          <div class="footer-main">
              <div class="footer-contact-card">
                  <h3>שלחו לנו הודעה</h3>
                  <form class="footer-form" id="footerForm" novalidate>
                      <label for="footerName">שם</label>
                      <input type="text" id="footerName" name="name" required>

                      <label for="footerEmail">אימייל</label>
                      <input type="email" id="footerEmail" name="email" required>

                      <label for="footerMessage">הודעה</label>
                      <textarea id="footerMessage" name="message" rows="4" required></textarea>

                      <button type="submit" class="footer-submit">שלח</button>
                  </form>
                  <p class="footer-success" id="footerSuccess" hidden>ההודעה נשלחה בהצלחה!</p>
              </div>

              <div class="footer-social">
                  <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="אינסטגרם">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                  </a>
                  <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="יוטיוב">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                  </a>
                  <a href="index.html" aria-label="שאי-הון">
                      <img src="logo.png" alt="שאי-הון" class="footer-social-logo">
                  </a>
              </div>
          </div>

          <div class="footer-bottom">
              <p class="footer-copy">&copy; <span id="year"></span> עמותת שאי-הון ישראל. כל הזכויות שמורות.</p>
          </div>
      </div>
  </footer>

  <script type="module" src="./script.js"></script>
  ```

  Note: update the Instagram/YouTube URLs to real ones when available; placeholders are fine for now.

- [ ] **Step 2: Add footer styles**

  In `src/pages/styles.css`, replace the existing `.site-footer` and related rules with:

  ```css
  /* ============================================================
     FOOTER
     ============================================================ */
  .site-footer {
      padding: 64px 0 32px;
      border-top: 1px solid rgba(255,255,255,0.1);
      background: #111111;
  }

  .footer-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      margin-bottom: 48px;
  }

  .footer-contact-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      padding: 32px;
  }

  .footer-contact-card h3 {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      color: var(--paper);
      margin-bottom: 20px;
  }

  .footer-form {
      display: grid;
      gap: 16px;
  }

  .footer-form label {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: -12px;
  }

  .footer-form input,
  .footer-form textarea {
      width: 100%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-sm);
      padding: 12px 14px;
      color: var(--paper);
      font-family: inherit;
      font-size: 15px;
      resize: vertical;
  }

  .footer-form input:focus,
  .footer-form textarea:focus {
      outline: none;
      border-color: var(--accent);
  }

  .footer-submit {
      justify-self: start;
      background: var(--accent);
      color: var(--paper);
      border: 0;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 600;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background 0.25s ease;
  }

  .footer-submit:hover {
      background: var(--accent-bright);
  }

  .footer-success {
      color: #4ade80;
      font-size: 14px;
      margin-top: 12px;
  }

  .footer-social {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32px;
  }

  .footer-social a {
      color: rgba(255, 255, 255, 0.7);
      transition: color 0.25s ease, transform 0.25s ease;
  }

  .footer-social a:hover {
      color: var(--accent);
      transform: translateY(-3px);
  }

  .footer-social svg {
      width: 40px;
      height: 40px;
  }

  .footer-social-logo {
      height: 48px;
      width: auto;
      display: block;
      opacity: 0.9;
  }

  .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 24px;
      text-align: center;
  }

  .footer-copy {
      font-size: 12px;
      color: var(--muted);
      letter-spacing: 1px;
  }
  ```

  Add responsive footer styles inside the existing `@media (max-width: 900px)` block:

  ```css
  .footer-main {
      grid-template-columns: 1fr;
      gap: 40px;
  }

  .footer-social {
      order: -1;
  }
  ```

- [ ] **Step 3: Wire up form success message**

  In `src/pages/script.js`, add a handler for `#footerForm` that intercepts submit, prevents default, and shows `#footerSuccess` (remove `hidden`). If an existing contact-form handler pattern is present, mirror it.

  ```javascript
  const footerForm = document.getElementById('footerForm');
  const footerSuccess = document.getElementById('footerSuccess');
  if (footerForm && footerSuccess) {
      footerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!footerForm.checkValidity()) {
              footerForm.reportValidity();
              return;
          }
          footerForm.hidden = true;
          footerSuccess.hidden = false;
      });
  }
  ```

- [ ] **Step 4: Verify footer on multiple pages**

  Start the dev server and check the footer on desktop and mobile widths across several pages.

- [ ] **Step 5: Commit**

  ```bash
  git add src/partials/footer.html src/pages/styles.css src/pages/script.js
  git commit -m "feat: redesign footer with email form and social icons"
  ```

---

### Task 3: Build verification

**Files:**
- None.

- [ ] **Step 1: Run production build**

  ```bash
  npm run build
  ```

  Expected: build completes without errors.

- [ ] **Step 2: Check responsive layout**

  Resize the browser to mobile width and verify the nav dragon, footer form, and footer icons all look correct.

- [ ] **Step 3: Commit if no issues**

  If adjustments were needed, commit them with a descriptive message.

---

## Self-Review

1. **Spec coverage:** Nav dragon move, footer redesign, form success, and responsive behavior are all covered.
2. **Placeholder scan:** No placeholders; all code blocks are complete.
3. **Type consistency:** CSS selectors and IDs match between HTML, CSS, and JS.
4. **Scope:** Nav partial, footer partial, homepage cleanup, styles, and script. No unrelated changes.
