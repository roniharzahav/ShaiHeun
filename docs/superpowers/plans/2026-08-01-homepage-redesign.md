# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the new Shai-Heun homepage per the approved design spec (`docs/superpowers/specs/2026-08-01-homepage-redesign-design.md`), including the hero carousel, two interactive card sections, updated navigation/footer, and removal of the gallery and contact pages.

**Architecture:** Keep the existing Vite + Handlebars + vanilla JS/CSS stack. Update shared partials (`nav.html`, `footer.html`) once so all pages inherit the changes. Rewrite `index.html` with the new structure. Add CSS/JS for the carousel and photo-first hover/toggle cards. Delete `gallery.html` and `contact.html` and update `vite.config.js` accordingly.

**Tech Stack:** Vite, `vite-plugin-handlebars`, vanilla JavaScript, CSS.

## Global Constraints

- Site is Hebrew RTL (`lang="he" dir="rtl"`).
- Color palette: Clean & Light — white `#ffffff`, light gray `#f5f5f5`, black `#111111`, dark gray `#555555`, red `#c1121f`, border gray `#dddddd`.
- No frontend framework; all interactions live in `src/pages/script.js`.
- CSS output must remain `assets/styles.css` (`vite.config.js` `assetFileNames`).
- Bundled JS must remain `script.js` relative to each page (`src/partials/footer.html`).
- Commit after every independently testable task.

---

## File Map

| File | Responsibility |
|------|----------------|
| `src/partials/nav.html` | Top navigation for all pages |
| `src/partials/footer.html` | Footer for all pages |
| `src/pages/index.html` | New homepage markup |
| `src/pages/courses.html` | New placeholder page for "קורסים" |
| `src/pages/styles.css` | All styles including carousel and cards |
| `src/pages/script.js` | Carousel, card toggle, cleanup of removed features |
| `vite.config.js` | Rollup input list (pages emitted during build) |

---

### Task 1: Remove Gallery and Contact Pages

**Files:**
- Delete: `src/pages/gallery.html`
- Delete: `src/pages/contact.html`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: existing Rollup input object
- Produces: input object without `gallery` and `contact` keys

- [ ] **Step 1: Delete the two pages**

```bash
git rm src/pages/gallery.html src/pages/contact.html
```

- [ ] **Step 2: Update `vite.config.js` input list**

Remove the `gallery` and `contact` entries from `rollupOptions.input`. The remaining keys should be: `main`, `about`, `locations`, `events`, `shop`.

```javascript
input: {
  main: resolve(__dirname, 'src/pages/index.html'),
  about: resolve(__dirname, 'src/pages/about.html'),
  locations: resolve(__dirname, 'src/pages/locations.html'),
  events: resolve(__dirname, 'src/pages/events.html'),
  shop: resolve(__dirname, 'src/pages/shop.html')
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`

Expected: build succeeds; `dist/gallery.html` and `dist/contact.html` are no longer present.

- [ ] **Step 4: Commit**

```bash
git add vite.config.js
git commit -m "chore: remove gallery and contact pages

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Update Navigation Partial

**Files:**
- Modify: `src/partials/nav.html`

**Interfaces:**
- Consumes: page flags (`home`, `about`, `locations`, `events`, `shop`, `courses`)
- Produces: updated nav markup for all pages

- [ ] **Step 1: Replace nav list**

Replace the entire `<ul class="nav-list" id="navList">` contents with:

```html
<li><a href="index.html" {{#if home}}class="is-active"{{/if}}>דף הבית</a></li>
<li><a href="about.html" {{#if about}}class="is-active"{{/if}}>מי אנחנו</a></li>
<li><a href="locations.html" {{#if locations}}class="is-active"{{/if}}>מאמנים</a></li>
<li><a href="events.html" {{#if events}}class="is-active"{{/if}}>אירועים</a></li>
<li><a href="courses.html" {{#if courses}}class="is-active"{{/if}}>קורסים</a></li>
<li><a href="shop.html" {{#if shop}}class="is-active"{{/if}}>חנות</a></li>
```

- [ ] **Step 2: Verify visually**

Run: `npm run dev`

Expected: nav shows 6 items (בית, מי אנחנו, מאמנים, אירועים, קורסים, חנות) from right to left; no "גלריה" or "צור קשר".

- [ ] **Step 3: Commit**

```bash
git add src/partials/nav.html
git commit -m "feat: update main navigation per new homepage spec

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Update Footer Partial

**Files:**
- Modify: `src/partials/footer.html`

**Interfaces:**
- Produces: updated footer markup for all pages

- [ ] **Step 1: Update footer navigation links**

Replace the "ניווט" column with:

```html
<h4>ניווט</h4>
<ul class="footer-links">
    <li><a href="index.html">דף הבית</a></li>
    <li><a href="about.html">מי אנחנו</a></li>
    <li><a href="locations.html">מאמנים</a></li>
    <li><a href="events.html">אירועים</a></li>
    <li><a href="courses.html">קורסים</a></li>
    <li><a href="shop.html">חנות</a></li>
</ul>
```

- [ ] **Step 2: Replace contact page link with direct contact details**

Replace the "צור קשר" column with:

```html
<h4>צור קשר</h4>
<ul class="footer-links">
    <li><a href="tel:050-536-4659">050-536-4659</a></li>
    <li><a href="mailto:info@shi-heun.com">info@shi-heun.com</a></li>
    <li><a href="https://wa.me/972505364659?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">וואטסאפ</a></li>
</ul>
```

- [ ] **Step 3: Verify**

Run: `npm run dev`

Expected: footer nav matches new main nav; "צור קשר" column shows phone/email/WhatsApp directly; no links to `gallery.html` or `contact.html`.

- [ ] **Step 4: Commit**

```bash
git add src/partials/footer.html
git commit -m "feat: update footer navigation and contact details

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Create Placeholder Courses Page

**Files:**
- Create: `src/pages/courses.html`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `head.html`, `nav.html`, `footer.html` partials
- Produces: a renderable `courses.html` page

- [ ] **Step 1: Create `src/pages/courses.html`**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    {{> head title="קורסים" description="קורסי שאי-הון — פרטים יעודכנו בקרוב."}}
</head>
<body>
<a href="#main-content" class="skip-link">דלג לתוכן</a>
<div class="scroll-progress" id="scrollProgress"></div>

{{> nav courses=true}}

<main id="main-content" tabindex="-1">
    <section class="section" id="courses">
        <div class="container">
            <p class="section-eyebrow centered">קורסים</p>
            <h2 class="section-title centered">בקרוב</h2>
            <p class="section-lede centered">
                פרטים על קורסי שאי-הון יעודכנו בקרוב. לפרטים נוספים ניתן ליצור קשר בטלפון או בוואטסאפ.
            </p>
        </div>
    </section>
</main>

{{> footer}}
</body>
</html>
```

- [ ] **Step 2: Add to `vite.config.js`**

Add `courses: resolve(__dirname, 'src/pages/courses.html')` to `rollupOptions.input`.

- [ ] **Step 3: Build and verify**

Run: `npm run build`

Expected: `dist/courses.html` exists and renders without errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/courses.html vite.config.js
git commit -m "feat: add placeholder courses page

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Rewrite Homepage Markup

**Files:**
- Modify: `src/pages/index.html`

**Interfaces:**
- Produces: new homepage DOM structure for CSS/JS to target

- [ ] **Step 1: Replace `index.html` body content**

Keep the existing `<head>` invocation of `head.html` and `{{> nav home=true}}`. Replace everything inside `<main>` and remove the About teaser, Method preview, Why train, Philosophy quote, and CTA banner sections.

The new `<main>` should contain:

1. **Hero carousel section**

```html
<section class="hero-carousel" id="top" aria-label="תמונות שאי-הון">
    <div class="carousel-track" id="carouselTrack">
        <div class="carousel-slide is-active" data-index="0">
            <div class="carousel-image carousel-image--placeholder" role="img" aria-label="מתאמן שאי-הון בתנועה"></div>
        </div>
        <div class="carousel-slide" data-index="1">
            <div class="carousel-image carousel-image--placeholder" role="img" aria-label="אימון קבוצתי שאי-הון"></div>
        </div>
        <div class="carousel-slide" data-index="2">
            <div class="carousel-image carousel-image--placeholder" role="img" aria-label="טכניקת הגנה עצמית"></div>
        </div>
    </div>
    <div class="carousel-overlay">
        <p class="eyebrow">עמותת שאי-הון ישראל</p>
        <h1 class="hero-title">
            <span class="title-line">שאי</span>
            <span class="title-line title-line--accent">הון</span>
        </h1>
        <p class="hero-lede">שיטת לחימה ישראלית מאז 1960</p>
    </div>
    <button class="carousel-arrow carousel-arrow--prev" aria-label="שקופית קודמת" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="carousel-arrow carousel-arrow--next" aria-label="שקופית הבאה" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="carousel-dots" id="carouselDots" role="tablist" aria-label="ניווט קרוסלה"></div>
</section>
```

2. **"מה זה שאי הון?" section**

```html
<section class="section section--what" id="what">
    <div class="container">
        <p class="section-eyebrow centered">השיטה</p>
        <h2 class="section-title centered">מה זה שאי הון?</h2>
        <p class="section-lede centered">
            שאי הון היא שיטת לחימה ישראלית, שנוסדה בשנת 1960, המבוססת על ארבעה יסודות של אומנויות לחימה.
        </p>
        <ul class="card-grid">
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('karate.jpg');" role="img" aria-label="קראטה"></div>
                <h3 class="card-title">קראטה</h3>
                <div class="card-body">
                    <p>טקסט מפורט על קראטה בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('judo.jpg');" role="img" aria-label="ג'ודו"></div>
                <h3 class="card-title">ג'ודו</h3>
                <div class="card-body">
                    <p>טקסט מפורט על ג'ודו בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('self-defense.jpg');" role="img" aria-label="הגנה עצמית"></div>
                <h3 class="card-title">הגנה עצמית</h3>
                <div class="card-body">
                    <p>טקסט מפורט על הגנה עצמית בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('boxing.jpg');" role="img" aria-label="אגרוף"></div>
                <h3 class="card-title">אגרוף</h3>
                <div class="card-body">
                    <p>טקסט מפורט על אגרוף בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
        </ul>
    </div>
</section>
```

3. **"למה שאי הון?" section**

```html
<section class="section section--why" id="why">
    <div class="container">
        <p class="section-eyebrow centered">למה כדאי?</p>
        <h2 class="section-title centered">למה שאי הון?</h2>
        <ul class="card-grid">
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('fitness.jpg');" role="img" aria-label="כושר גופני"></div>
                <h3 class="card-title">כושר גופני</h3>
                <div class="card-body">
                    <p>טקסט מפורט על הכושר הגופני בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('confidence.jpg');" role="img" aria-label="ביטחון עצמי"></div>
                <h3 class="card-title">חיזוק ביטחון עצמי</h3>
                <div class="card-body">
                    <p>טקסט מפורט על ביטחון עצמי בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('self-defense-why.jpg');" role="img" aria-label="הגנה עצמית"></div>
                <h3 class="card-title">הגנה עצמית</h3>
                <div class="card-body">
                    <p>טקסט מפורט על הגנה עצמית בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
            <li class="card" data-card aria-expanded="false">
                <div class="card-image" style="background-image: url('community.jpg');" role="img" aria-label="קהילה"></div>
                <h3 class="card-title">קהילה</h3>
                <div class="card-body">
                    <p>טקסט מפורט על הקהילה בשאי-הון יתווסף כאן.</p>
                </div>
            </li>
        </ul>
    </div>
</section>
```

- [ ] **Step 2: Verify structure**

Run: `npm run dev`

Expected: homepage renders with carousel and two card grids; no About teaser, philosophy quote, or CTA banner; no broken images yet (placeholders will show gray).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.html
git commit -m "feat: rewrite homepage with carousel and interactive card sections

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Update Global Styles for Clean & Light Palette

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Produces: updated CSS custom property values and component styles

- [ ] **Step 1: Update `:root` values (keep variable names)**

Find the `:root` block at the top of `styles.css` and change the values (not the names) to:

```css
:root {
    --paper: #ffffff;
    --paper-2: #f5f5f5;
    --paper-dark: #dddddd;
    --ink: #111111;
    --ink-soft: #555555;
    --ink-mid: #777777;
    --muted: #999999;
    --line: #dddddd;
    --line-soft: rgba(221, 221, 221, 0.5);
    --accent: #c1121f;
    --accent-glow: rgba(193, 18, 31, 0.15);
    --accent-bright: #d90429;
    --gold: #b8941f;

    --font-display: 'Rubik', 'Secular One', system-ui, -apple-system, sans-serif;
    --font-body: 'Assistant', 'Heebo', system-ui, -apple-system, 'Segoe UI', sans-serif;

    --maxw: 1200px;
    --gutter: clamp(20px, 4vw, 56px);
    --space-section: clamp(80px, 12vw, 160px);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```

- [ ] **Step 2: Tweak noise overlay if needed**

The `body::before` noise texture may feel heavy on a white background. Optionally reduce its opacity from `0.025` to `0.015` or remove the rule entirely if it conflicts with the clean look.

- [ ] **Step 3: Remove gallery and contact CSS blocks**

Delete the `/* GALLERY */` block and the `/* CONTACT */` block, plus any responsive rules specific to `.gallery-*` or `.contact-*`.

- [ ] **Step 4: Build and verify**

Run: `npm run build`

Expected: build succeeds; no remaining `.gallery-*` or `.contact-*` selectors cause errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: apply Clean & Light palette and remove unused gallery/contact styles

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: Implement Carousel CSS

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Targets: `.hero-carousel`, `.carousel-track`, `.carousel-slide`, `.carousel-image`, `.carousel-overlay`, `.carousel-arrow`, `.carousel-dots`

- [ ] **Step 1: Add carousel styles**

Append to `styles.css`:

```css
/* HERO CAROUSEL */
.hero-carousel {
    position: relative;
    width: 100%;
    height: 70vh;
    min-height: 480px;
    max-height: 800px;
    overflow: hidden;
    background: var(--paper-2);
}

.carousel-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
}

.carousel-slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

.carousel-image--placeholder {
    background: linear-gradient(135deg, #e0e0e0 0%, var(--paper-2) 100%);
}

.carousel-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.55));
    color: var(--paper);
}

.carousel-overlay .hero-title {
    color: var(--paper);
    margin: 16px 0;
}

.carousel-overlay .title-line--accent {
    color: var(--accent-bright);
}

.carousel-overlay .hero-lede {
    font-size: 1.25rem;
    color: var(--paper);
}

.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    color: var(--ink);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, color 0.2s ease;
    z-index: 2;
}

.carousel-arrow:hover {
    background: var(--accent);
    color: var(--paper);
}

.carousel-arrow--prev { right: 16px; }
.carousel-arrow--next { left: 16px; }

.carousel-arrow svg {
    width: 24px;
    height: 24px;
}

.carousel-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 2;
}

.carousel-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--paper);
    background: transparent;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
}

.carousel-dot.is-active,
.carousel-dot:hover {
    background: var(--accent);
    border-color: var(--accent);
}

@media (max-width: 768px) {
    .hero-carousel {
        height: 50vh;
        min-height: 360px;
    }
    .carousel-arrow {
        width: 40px;
        height: 40px;
    }
    .carousel-arrow svg {
        width: 20px;
        height: 20px;
    }
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`

Expected: carousel is full-width, overlay text is centered and white, arrows and dots are positioned correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: add hero carousel styles

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: Implement Interactive Card CSS

**Files:**
- Modify: `src/pages/styles.css`

**Interfaces:**
- Targets: `.card-grid`, `.card`, `.card-image`, `.card-title`, `.card-body`

- [ ] **Step 1: Add card styles**

Append to `styles.css`:

```css
/* INTERACTIVE CARDS */
.card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 48px 0 0;
}

.card {
    position: relative;
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    background: var(--paper-2);
    border: 1px solid var(--line);
}

.card-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: filter 0.3s ease, transform 0.3s ease;
}

.card-title {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--paper);
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.6);
    z-index: 1;
    padding: 16px;
    margin: 0;
    transition: opacity 0.3s ease;
}

.card-body {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(0,0,0,0.65);
    color: var(--paper);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
    text-align: center;
}

.card-body p {
    margin: 0;
    line-height: 1.6;
}

/* Desktop hover */
@media (hover: hover) and (pointer: fine) {
    .card:hover .card-image {
        filter: brightness(0.5);
        transform: scale(1.05);
    }
    .card:hover .card-title {
        opacity: 0;
    }
    .card:hover .card-body {
        opacity: 1;
    }
}

/* Mobile / non-hover */
.card.is-open .card-image {
    filter: brightness(0.5);
    transform: scale(1.05);
}

.card.is-open .card-title {
    opacity: 0;
}

.card.is-open .card-body {
    opacity: 1;
}

@media (max-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
    .card {
        aspect-ratio: 16 / 9;
    }
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`

Expected: 4 cards in a row on desktop; title centered; hover darkens image and reveals body text; on mobile, cards are 1-column with 16:9 aspect ratio.

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "feat: add interactive photo-first card styles

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 9: Implement Carousel JavaScript

**Files:**
- Modify: `src/pages/script.js`

**Interfaces:**
- Targets: `#carouselTrack`, `#carouselDots`, `.carousel-arrow--prev`, `.carousel-arrow--next`, `.hero-carousel`
- Produces: carousel with auto-advance, dots, arrows, pause-on-hover, swipe

- [ ] **Step 1: Add carousel module inside the IIFE**

Add after the mobile nav block:

```javascript
// Hero carousel
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
const carouselPrev = document.querySelector('.carousel-arrow--prev');
const carouselNext = document.querySelector('.carousel-arrow--next');
const heroCarousel = document.querySelector('.hero-carousel');

if (carouselTrack && carouselDots) {
    const slides = Array.from(carouselTrack.children);
    const total = slides.length;
    let current = 0;
    let interval = null;

    const createDots = () => {
        carouselDots.innerHTML = '';
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-label', `שקופית ${i + 1}`);
            btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            btn.type = 'button';
            btn.addEventListener('click', () => goTo(i));
            carouselDots.appendChild(btn);
        });
    };

    const updateSlides = () => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === current);
        });
        carouselTrack.style.transform = `translateX(${current * 100}%)`;
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === current);
            dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
    };

    const goTo = (index) => {
        current = (index + total) % total;
        updateSlides();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const startAuto = () => {
        if (interval) clearInterval(interval);
        interval = setInterval(next, 5000);
    };

    const stopAuto = () => {
        if (interval) clearInterval(interval);
        interval = null;
    };

    createDots();
    updateSlides();
    startAuto();

    if (carouselPrev) carouselPrev.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
    if (carouselNext) carouselNext.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAuto);
        heroCarousel.addEventListener('mouseleave', startAuto);
    }

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    if (heroCarousel) {
        heroCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        heroCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                stopAuto();
                diff > 0 ? next() : prev();
                startAuto();
            }
        }, { passive: true });
    }
}
```

Note: `transform: translateX(${current * 100}%)` moves the track left; because the site is RTL, this still produces the correct visual direction (next slide from the left). If the user wants next from the right, adjust to `translateX(${-current * 100}%)` and test.

- [ ] **Step 2: Verify**

Run: `npm run dev`

Expected: carousel auto-advances every 5 seconds; dots and arrows work; hover pauses; swipe works on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/pages/script.js
git commit -m "feat: add hero carousel JavaScript

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: Implement Card Toggle JavaScript

**Files:**
- Modify: `src/pages/script.js`

**Interfaces:**
- Targets: `[data-card]`
- Produces: hover on desktop, first-press-open/second-press-close on mobile

- [ ] **Step 1: Add card toggle module**

Add after the carousel block:

```javascript
// Interactive cards: hover on desktop, toggle on touch
const cards = document.querySelectorAll('[data-card]');

const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

cards.forEach(card => {
    if (isHoverable) return; // CSS handles hover

    card.addEventListener('click', (e) => {
        e.preventDefault();
        const open = card.classList.toggle('is-open');
        card.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
});
```

- [ ] **Step 2: Verify**

Run: `npm run dev`

Expected: on desktop, CSS hover reveals card body; on mobile, tapping a card opens it, tapping again closes it.

- [ ] **Step 3: Commit**

```bash
git add src/pages/script.js
git commit -m "feat: add mobile toggle for interactive cards

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 11: Clean Up Removed Features from JavaScript

**Files:**
- Modify: `src/pages/script.js`

**Interfaces:**
- Produces: script without gallery/contact logic; reveal selectors updated

- [ ] **Step 1: Remove contact form code**

Delete the block:

```javascript
// Contact form — show success instead of mailto
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm && formSuccess) { ... }
```

- [ ] **Step 2: Remove gallery code**

Delete the block:

```javascript
// Gallery expand/collapse
const galleryToggle = document.getElementById('galleryToggle');
const galleryGrid = document.getElementById('galleryGrid');
if (galleryToggle && galleryGrid) { ... }
```

And the lightbox block that queries `.gallery-item img`.

- [ ] **Step 3: Update reveal-on-scroll selectors**

Replace the existing selector string with:

```javascript
const revealEls = document.querySelectorAll(
    '.section-title, .section-lede, .card, .event-card, .shop-card, ' +
    '.location-card, .philosophy-quote, .philosophy-source, .philosophy-divider'
);
```

- [ ] **Step 4: Verify build and no console errors**

Run: `npm run build`

Expected: build succeeds; no console errors on homepage.

- [ ] **Step 5: Commit**

```bash
git add src/pages/script.js
git commit -m "chore: remove gallery/contact JS and update reveal selectors

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: Final Build, Link Check, and Visual Verification

**Files:**
- All modified files

**Interfaces:**
- Produces: working production build

- [ ] **Step 1: Production build**

Run: `npm run build`

Expected: build completes with no errors.

- [ ] **Step 2: Verify dist contents**

Expected files in `dist/`:
- `index.html`
- `about.html`
- `locations.html`
- `events.html`
- `shop.html`
- `courses.html`
- `assets/styles.css`
- `script.js` (per page)

Not expected:
- `gallery.html`
- `contact.html`

- [ ] **Step 3: Check internal links**

Grep `dist/*.html` for `gallery.html` and `contact.html`.

Expected: zero matches.

- [ ] **Step 4: Visual smoke test**

Run: `npm run preview`

Check:
- Homepage shows carousel + two card sections.
- Nav has 6 items in correct order.
- Footer has direct contact info and updated nav.
- No broken image placeholders (gray placeholders are expected until photos are uploaded).
- Cards hover/toggle correctly.
- Carousel advances and responds to controls.

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "fix: final homepage redesign polish and link cleanup

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review Checklist

- [ ] Spec coverage: every spec requirement maps to at least one task.
- [ ] No placeholders: no "TBD", "TODO", or vague steps remain.
- [ ] Type/interface consistency: class names and IDs match across HTML, CSS, and JS tasks.
- [ ] Build integrity: `vite.config.js`, partials, and deleted pages are handled.
- [ ] Accessibility: carousel has ARIA labels and keyboard support; cards have `aria-expanded`.

## Notes for Implementer

- The carousel currently uses placeholder gray backgrounds. When the user uploads photos, replace the inline `style="background-image: url('...')"` on `.card-image` elements and add real `<img>` tags or background images inside `.carousel-slide` elements.
- Detailed card text placeholders should be replaced when the user provides copy.
- The `courses.html` placeholder page is intentionally minimal; a full design will come later.
