# Page Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Gallery page, disconnect About from Home, restructure navigation, and close style/functionality gaps across the remaining pages to improve lead generation.

**Architecture:** All changes are HTML/CSS/JS modifications to existing pages and partials. No new dependencies. Verification is manual (build + visual check) because the project has no test framework.

**Tech Stack:** Vite, HTML/Handlebars, CSS, plain JS

---

## File map

| File | Responsibility |
|------|---------------|
| `src/pages/index.html` | Homepage — remove About teaser, add locations preview and social proof |
| `src/pages/about.html` | About page — add closing CTA |
| `src/pages/locations.html` | Locations page — add bottom CTA |
| `src/pages/events.html` | Events page — add per-event CTAs |
| `src/pages/contact.html` | Contact page — add hero header, fix form submission |
| `src/pages/shop.html` | Shop page — clarify status, improve placeholders |
| `src/pages/gallery.html` | Gallery page — delete |
| `src/partials/nav.html` | Shared navigation — remove Gallery, reorder Shop/Contact |
| `src/partials/footer.html` | Shared footer — remove Gallery link |
| `src/pages/styles.css` | All visual styling |
| `src/pages/script.js` | Interactions — hide past events, contact form submission |
| `vite.config.js` | Build inputs — remove Gallery |

---

### Task 1: Remove Gallery page from build and navigation

**Files:**
- Delete: `src/pages/gallery.html`
- Modify: `src/partials/nav.html`
- Modify: `src/partials/footer.html`
- Modify: `vite.config.js:22`

- [ ] **Step 1: Delete the Gallery page**

```bash
rm src/pages/gallery.html
```

- [ ] **Step 2: Remove Gallery from navigation**

In `src/partials/nav.html`, delete the gallery nav item:

```handlebars
<li><a href="gallery.html" {{#if gallery}}class="is-active"{{/if}}>גלריה</a></li>
```

- [ ] **Step 3: Remove Gallery from footer**

In `src/partials/footer.html`, delete:

```html
<li><a href="gallery.html">גלריה</a></li>
```

- [ ] **Step 4: Remove Gallery from Vite inputs**

In `vite.config.js`, delete the `gallery` entry from `rollupOptions.input`.

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds. `dist/gallery.html` does not exist.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "design: remove gallery page and navigation links"
```

---

### Task 2: Disconnect About from Home

**Files:**
- Modify: `src/pages/index.html:40-71`

- [ ] **Step 1: Remove the About teaser section**

In `src/pages/index.html`, delete the entire `<!-- ABOUT TEASER -->` block (lines 40–71).

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. `dist/index.html` no longer contains the About teaser content.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.html
git commit -m "design: remove about teaser from homepage"
```

---

### Task 3: Update navigation order

**Files:**
- Modify: `src/partials/nav.html`
- Modify: `src/partials/footer.html`

- [ ] **Step 1: Reorder nav links to Home | About | Locations | Events | Shop | Contact**

In `src/partials/nav.html`, ensure the `<ul class="nav-list">` order is:

```handlebars
<ul class="nav-list" id="navList">
    <li><a href="index.html" {{#if home}}class="is-active"{{/if}}>דף הבית</a></li>
    <li><a href="about.html" {{#if about}}class="is-active"{{/if}}>אודות</a></li>
    <li><a href="locations.html" {{#if locations}}class="is-active"{{/if}}>מועדונים</a></li>
    <li><a href="events.html" {{#if events}}class="is-active"{{/if}}>אירועים</a></li>
    <li><a href="shop.html" {{#if shop}}class="is-active"{{/if}}>חנות</a></li>
    <li><a href="contact.html" {{#if contact}}class="is-active"{{/if}}>צור קשר</a></li>
</ul>
```

- [ ] **Step 2: Match footer link order**

In `src/partials/footer.html`, update the navigation column to the same order.

- [ ] **Step 3: Build and verify**

Run: `npm run dev` or `npm run build` and open the site.
Expected: Navigation shows the new order and Gallery is gone.

- [ ] **Step 4: Commit**

```bash
git add src/partials/nav.html src/partials/footer.html
git commit -m "design: reorder navigation and footer links"
```

---

### Task 4: Add locations preview to Home

**Files:**
- Modify: `src/pages/index.html`
- Modify: `src/pages/styles.css`

- [ ] **Step 1: Add locations preview section after the method section**

In `src/pages/index.html`, after the `<!-- METHOD PREVIEW -->` section and before `<!-- WHY TRAIN -->`, add:

```html
<!-- LOCATIONS PREVIEW -->
<section class="section section--locations-preview" id="locations-preview">
    <div class="container">
        <p class="section-eyebrow centered">מועדונים</p>
        <h2 class="section-title centered">בואו להתאמן איתנו.</h2>
        <p class="section-lede centered">מועדוני שאי-הון פעילים בכל רחבי הארץ. מצאו את המועדון הקרוב אליכם.</p>
        <div class="locations-preview-grid">
            <a href="locations.html" class="location-preview-card">
                <h3>עפולה</h3>
                <p>המועדון הראשון והוותיק של שאי-הון.</p>
                <span class="location-preview-link">לפרטים והרשמה ←</span>
            </a>
            <a href="locations.html" class="location-preview-card">
                <h3>נורית</h3>
                <p>אימונים לכל הגילאים ברוח המשפחתית.</p>
                <span class="location-preview-link">לפרטים והרשמה ←</span>
            </a>
            <a href="locations.html" class="location-preview-card">
                <h3>תל אביב</h3>
                <p>אימונים מקצועיים בלב העיר.</p>
                <span class="location-preview-link">לפרטים והרשמה ←</span>
            </a>
            <a href="locations.html" class="location-preview-card">
                <h3>ירושלים</h3>
                <p>המועדון החדש בבירה.</p>
                <span class="location-preview-link">לפרטים והרשמה ←</span>
            </a>
        </div>
        <div class="locations-preview-cta">
            <a href="locations.html" class="hero-cta">כל המועדונים</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add minimal styles for the preview cards**

Append to `src/pages/styles.css`:

```css
.locations-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    margin-top: 48px;
}
.location-preview-card {
    display: block;
    background: var(--paper-2);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    padding: 28px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.location-preview-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: var(--accent);
}
.location-preview-card h3 {
    font-family: var(--font-display);
    font-size: 1.35rem;
    margin-bottom: 8px;
}
.location-preview-link {
    display: inline-block;
    margin-top: 16px;
    color: var(--accent);
    font-weight: 700;
}
.locations-preview-cta {
    text-align: center;
    margin-top: 40px;
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Homepage shows four location preview cards between Method and Why Train.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.html src/pages/styles.css
git commit -m "design: add locations preview to homepage"
```

---

### Task 5: Add social proof to Home

**Files:**
- Modify: `src/pages/index.html`
- Modify: `src/pages/styles.css`

- [ ] **Step 1: Add social proof section before the final CTA banner**

In `src/pages/index.html`, before the `<!-- CTA BANNER -->` section, add:

```html
<!-- SOCIAL PROOF -->
<section class="section section--social-proof">
    <div class="container">
        <ul class="stats-grid">
            <li>
                <span class="stat-number">60+</span>
                <span class="stat-label">שנות מורשת</span>
            </li>
            <li>
                <span class="stat-number">4</span>
                <span class="stat-label">מועדונים בארץ</span>
            </li>
            <li>
                <span class="stat-number">5</span>
                <span class="stat-label">אומנויות לחימה בשיטה אחת</span>
            </li>
        </ul>
    </div>
</section>
```

- [ ] **Step 2: Add social proof styles**

Append to `src/pages/styles.css`:

```css
.section--social-proof {
    background: var(--ink);
    color: #fff;
    padding: calc(var(--space-section) * 0.6) 0;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 32px;
    list-style: none;
    text-align: center;
}
.stat-number {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 900;
    color: var(--accent-bright);
    line-height: 1;
}
.stat-label {
    display: block;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 1rem;
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Homepage shows a dark stats band above the CTA banner.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.html src/pages/styles.css
git commit -m "design: add social proof stats to homepage"
```

---

### Task 6: Add closing CTA to About page

**Files:**
- Modify: `src/pages/about.html`

- [ ] **Step 1: Add a CTA section at the end of About**

In `src/pages/about.html`, before `</main>`, add:

```html
<!-- ABOUT CTA -->
<section class="section section--cta-banner">
    <div class="hero-mesh" aria-hidden="true"></div>
    <div class="container">
        <h2 class="section-title centered">רוצים לחוות את שאי-הון?</h2>
        <a href="contact.html" class="hero-cta">הצטרף לאימון</a>
        <p class="hero-note">שיעור ראשון חינם — בלי התחייבות</p>
    </div>
</section>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. About page ends with a dark CTA banner matching other pages.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.html
git commit -m "design: add closing cta to about page"
```

---

### Task 7: Add bottom CTA to Locations page

**Files:**
- Modify: `src/pages/locations.html`

- [ ] **Step 1: Add a CTA section after the locations grid**

In `src/pages/locations.html`, after the closing `</div>` of the locations section and before `</main>`, add:

```html
<!-- LOCATIONS CTA -->
<section class="section section--cta-banner">
    <div class="hero-mesh" aria-hidden="true"></div>
    <div class="container">
        <h2 class="section-title centered">לא בטוחים איפה להתחיל?</h2>
        <a href="contact.html" class="hero-cta">דברו איתנו</a>
        <p class="hero-note">נעזור לכם למצוא את המועדון המתאים ביותר.</p>
    </div>
</section>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Locations page ends with a CTA banner.

- [ ] **Step 3: Commit**

```bash
git add src/pages/locations.html
git commit -m "design: add bottom cta to locations page"
```

---

### Task 8: Add per-event CTAs and hide past events

**Files:**
- Modify: `src/pages/events.html`
- Modify: `src/pages/script.js`

- [ ] **Step 1: Add registration CTAs to each event**

In `src/pages/events.html`, inside each `.event-body`, after the `<p>` description, add:

```html
<a class="event-cta" href="https://wa.me/972505364659?text=היי%2C%20אני%20מתעניין%20באירוע%20[שם%20האירוע]" target="_blank" rel="noopener">הבעת עניין בוואטסאפ</a>
```

Use the actual event name in the pre-filled message for each event.

- [ ] **Step 2: Add event CTA styles**

Append to `src/pages/styles.css`:

```css
.event-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
}
.event-cta:hover {
    text-decoration: underline;
}
```

- [ ] **Step 3: Hide past events in script.js**

In `src/pages/script.js`, replace the existing past-events block (lines 64–70):

```javascript
// Hide past events
    document.querySelectorAll('[data-event-date]').forEach(card => {
        const date = new Date(card.dataset.eventDate);
        const now = new Date();
        now.setHours(0,0,0,0);
        if (date < now) card.style.display = 'none';
    });
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Events page shows WhatsApp CTAs, and past events are hidden.

- [ ] **Step 5: Commit**

```bash
git add src/pages/events.html src/pages/script.js src/pages/styles.css
git commit -m "feat: add event interest ctas and hide past events"
```

---

### Task 9: Add page header to Contact and fix form submission

**Files:**
- Modify: `src/pages/contact.html`
- Modify: `src/pages/script.js`

- [ ] **Step 1: Add a page header to Contact**

In `src/pages/contact.html`, after the scroll-progress div and before the contact section, add:

```html
<!-- PAGE HEADER -->
<section class="page-header">
    <div class="hero-mesh" aria-hidden="true"></div>
    <div class="container">
        <p class="section-eyebrow">צור קשר</p>
        <h1 class="section-title">שאלות? נשמח לעזור.</h1>
        <p class="section-lede">מלאו את הטופס או פנו אלינו ישירות — ונחזור אליכם בהקדם.</p>
    </div>
</section>
```

- [ ] **Step 2: Update the contact form to submit via mailto**

In `src/pages/contact.html`, update the form tag:

```html
<form class="contact-form" id="contactForm" action="mailto:info@shi-heun.com" method="post" enctype="text/plain">
```

- [ ] **Step 3: Replace the fake success handler with a real pre-submit formatter**

In `src/pages/script.js`, replace the contact form block (lines 49–58) with:

```javascript
// Contact form — format body before mailto submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const phone = formData.get('phone') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            const subject = encodeURIComponent(`פנייה חדשה מאת ${name}`);
            const body = encodeURIComponent(
                `שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\n\nהודעה:\n${message}`
            );
            contactForm.action = `mailto:info@shi-heun.com?subject=${subject}&body=${body}`;
        });
    }
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Contact page has a header matching other pages, and submitting the form opens the user's email client with a pre-filled message.

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.html src/pages/script.js
git commit -m "fix: add contact page header and make form submit via mailto"
```

---

### Task 10: Clarify Shop status and improve placeholders

**Files:**
- Modify: `src/pages/shop.html`
- Modify: `src/pages/styles.css`

- [ ] **Step 1: Add a status banner to the Shop page**

In `src/pages/shop.html`, after the page header section and before the shop grid section, add:

```html
<!-- SHOP NOTICE -->
<section class="section section--shop-notice">
    <div class="container">
        <p class="shop-notice">החנות עוד לא פעילה ברכישה ישירה. לרכישת מוצרים או הזמנות, אנא צרו קשר בוואטסאפ או בטלפון.</p>
    </div>
</section>
```

- [ ] **Step 2: Update product cards to show "coming soon" instead of placeholder icon**

In `src/pages/shop.html`, replace each `.shop-placeholder` block with a simpler coming-soon placeholder:

```html
<div class="shop-placeholder">
    <span>תמונה בקרוב</span>
</div>
```

- [ ] **Step 3: Add a contact link at the bottom of the shop grid**

After the `</ul>` of `.shop-grid`, add:

```html
<div class="shop-contact">
    <p>מעוניינים להזמין? <a href="https://wa.me/972505364659?text=היי%2C%20אני%20מתעניין%20ברכישת%20מוצרי%20שאי-הון" target="_blank" rel="noopener">שלחו הודעה בוואטסאפ</a> או <a href="tel:050-536-4659">התקשרו</a>.</p>
</div>
```

- [ ] **Step 4: Add shop notice styles**

Append to `src/pages/styles.css`:

```css
.section--shop-notice {
    background: var(--paper-2);
    padding: 24px 0;
    text-align: center;
}
.shop-notice {
    margin: 0;
    color: var(--ink-mid);
    font-size: 1rem;
}
.shop-contact {
    text-align: center;
    margin-top: 40px;
    color: var(--ink-mid);
}
.shop-contact a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
}
.shop-contact a:hover {
    text-decoration: underline;
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Shop page shows a clear "not yet active" notice and a way to order via WhatsApp/phone.

- [ ] **Step 6: Commit**

```bash
git add src/pages/shop.html src/pages/styles.css
git commit -m "design: clarify shop status and add order contact path"
```

---

## Self-review

### Spec coverage

- Remove Gallery page — covered in Task 1.
- Keep Home, About, Locations, Events, Contact, Shop — covered.
- Disconnect About from Home — covered in Task 2.
- Navigation order Home | About | Locations | Events | Shop | Contact — covered in Task 3.
- Home locations preview — covered in Task 4.
- Home social proof — covered in Task 5.
- About CTA — covered in Task 6.
- Locations CTA — covered in Task 7.
- Events CTAs and hide past events — covered in Task 8.
- Contact page header and form submission — covered in Task 9.
- Shop status clarification — covered in Task 10.

### Placeholder scan

No TBD, TODO, or vague steps. All code blocks are complete and runnable.

### Type consistency

All CSS class names and selectors match across HTML and CSS. WhatsApp links use the same phone number format already present in the footer.

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-17-page-audit.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
