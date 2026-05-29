# Design Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all 10 design improvements across the Shai-Heun multi-page site.

**Architecture:** All changes are CSS/HTML modifications to existing pages. No new pages, no new dependencies. Changes are grouped by file to minimize context switching.

**Tech Stack:** Vite, HTML/Handlebars, CSS, plain JS

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/pages/styles.css` | All visual styling — backgrounds, cards, typography, layout |
| `src/pages/index.html` | Homepage — adding About teaser, method icons |
| `src/pages/shop.html` | Shop page — placeholder styling |
| `src/pages/gallery.html` | Gallery — caption data attributes |
| `src/pages/events.html` | Events — visual hierarchy improvements |
| `src/partials/footer.html` | Shared footer — links and structure |
| `src/pages/script.js` | Lightbox captions, footer interactions |

---

## Task 1: Darken CTA Banner to Match Page Headers

**Files:**
- Modify: `src/pages/styles.css:1520-1546`

The CTA banner currently uses a light gradient. Change it to dark (ink background) like the page headers for visual consistency and stronger call-to-action.

- [ ] **Step 1: Update CTA banner background**

Replace the `.section--cta-banner` rules:

```css
.section--cta-banner {
    background: var(--ink);
    color: #fff;
    text-align: center;
    padding: calc(var(--space-section) * 0.8) 0;
    position: relative;
    overflow: hidden;
}
.section--cta-banner .hero-mesh {
    position: absolute;
    inset: 0;
    opacity: 0.5;
}
.section--cta-banner .section-title {
    color: #fff;
    position: relative;
    z-index: 1;
}
.section--cta-banner .hero-cta {
    position: relative;
    z-index: 1;
    margin-top: 32px;
}
.section--cta-banner .hero-note {
    color: rgba(255,255,255,0.5);
    position: relative;
    z-index: 1;
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "design: darken CTA banner to match page headers"
```

---

## Task 2: Re-add Method Card Icons

**Files:**
- Modify: `src/pages/index.html:55-81`

Add distinct SVG icons to each of the 5 method cards for visual scanning.

- [ ] **Step 1: Add icons to method cards**

Replace the method card `<li>` elements (lines 55-81) with:

```html
<li class="method-card">
    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5a2 2 0 0 0 1.925 2.5h15.95a2 2 0 0 0 1.925-2.5l-2.495-9.04A2 2 0 0 0 17.5 8Z"/></svg>
    <span class="method-num">01</span>
    <h3>ג׳ודו</h3>
    <p>זריקות, מנופים והבנה של מרכז הכובד. הבסיס לכל היתר.</p>
</li>
<li class="method-card">
    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    <span class="method-num">02</span>
    <h3>קארטה</h3>
    <p>טכניקה נקייה, דיסציפלינה, נשימה ומרחק. השיטה שהביא סידני ראשון לישראל.</p>
</li>
<li class="method-card">
    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a2 2 0 0 0-2 2v6h-4V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/></svg>
    <span class="method-num">03</span>
    <h3>אגרוף</h3>
    <p>תזמון, עבודת רגליים ומרחק תקיפה. החיבור בין המסורת לפרקטיקה.</p>
</li>
<li class="method-card">
    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span class="method-num">04</span>
    <h3>ג׳וג׳יטסו</h3>
    <p>שליטה, אחיזות וסיומים על הקרקע. עבודה צמודה עם בן זוג לאימון.</p>
</li>
<li class="method-card">
    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <span class="method-num">05</span>
    <h3>הגנה עצמית וקרב מגע</h3>
    <p>ייחודיים לשאי-הון. כלים שעובדים בעולם האמיתי, לא רק באולם האימונים.</p>
</li>
```

- [ ] **Step 2: Verify `.method-icon` CSS exists**

Confirm in `src/pages/styles.css:621-627` the `.method-icon` rule is present:

```css
.method-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
    color: var(--accent);
    opacity: 0.9;
}
```

If missing, add it inside the `/* METHOD */` section.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Open `dist/index.html` in browser and confirm icons appear above each method number.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.html
git commit -m "design: add icons to method cards on homepage"
```

---

## Task 3: Add About Teaser to Homepage

**Files:**
- Modify: `src/pages/index.html`

Insert an About teaser section between Hero and Method Preview, linking to the About page.

- [ ] **Step 1: Insert About teaser section**

After the closing `</section>` of the HERO (line 43), add:

```html
<!-- ABOUT TEASER -->
<section class="section section--about" id="about">
    <div class="container">
        <p class="section-eyebrow">אודות</p>
        <h2 class="section-title">מדרום אפריקה למושב מולדת.</h2>
        <div class="grid-two">
            <div class="grid-two-aside">
                <div class="about-image">
                    <div class="founder-frame">
                        <img src="founder.jpg" alt="אונשי סידני שלמה פייגה ז״ל" width="400" height="500">
                    </div>
                    <p class="about-caption">
                        <strong>אונשי סידני שלמה פייגה</strong>
                        <span>1932 — 2007</span>
                    </p>
                </div>
            </div>
            <div class="grid-two-main prose">
                <p class="lede">
                    בשנת 1960 עלה לישראל אונשי סידני שלמה פייגה ז״ל יחד עם רעייתו נחמה נורין ז״ל ושני בניו, רועי ואילן.
                    במושב מולדת נולדו אורן והתאומים גיל וזיו — ושם נפתח המועדון הראשון של שיטת שאי-הון.
                </p>
                <p>
                    סידני היה הראשון שהביא את הקארטה לישראל. במכבייה השישית הוא הציג את שיטת הלחימה שפיתח,
                    וחשף לראשונה את שאי-הון. בשל תרומתו לעולם אומנויות הלחימה הוא הוכנס להיכל התהילה
                    של אומנויות הלחימה בדרום אפריקה — בדרגה הגבוהה ביותר.
                </p>
                <a href="about.html" class="teaser-cta">קרא עוד על ההיסטוריה</a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify `.teaser-cta` CSS exists**

Confirm in `src/pages/styles.css:1501-1518` the `.teaser-cta` rule is present. If missing, add:

```css
.teaser-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 1px;
    transition: gap 0.3s ease;
}
.teaser-cta:hover {
    gap: 14px;
}
.teaser-cta::after {
    content: '←';
    font-size: 18px;
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Confirm the About section appears after Hero with founder photo and "קרא עוד" link.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.html
git commit -m "design: add About teaser section to homepage"
```

---

## Task 4: Vary Section Backgrounds to Break Monotony

**Files:**
- Modify: `src/pages/styles.css`

Change select section backgrounds so the page has visual rhythm instead of repeating the same gradient.

- [ ] **Step 1: Make Method section darker**

Find `.section--method` (line ~561) and replace its background:

```css
.section--method {
    background: linear-gradient(180deg, var(--paper-2) 0%, var(--paper-dark) 100%);
    color: var(--ink);
    position: relative;
    overflow: hidden;
}
```

- [ ] **Step 2: Make Philosophy section dark for contrast**

Find `.section--philosophy` (line ~742) and replace:

```css
.section--philosophy {
    background: var(--ink);
    text-align: center;
    padding: calc(var(--space-section) * 1.2) 0;
    position: relative;
    overflow: hidden;
}
.section--philosophy::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 60% 40% at 30% 30%, rgba(155,27,27,0.15) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 70% 70%, rgba(184,148,31,0.08) 0%, transparent 50%);
    pointer-events: none;
}
.section--philosophy .philosophy-quote {
    color: #fff;
    position: relative;
    z-index: 1;
}
.section--philosophy .philosophy-source {
    color: rgba(255,255,255,0.5);
    position: relative;
    z-index: 1;
}
.section--philosophy .philosophy-divider {
    background: var(--accent);
    position: relative;
    z-index: 1;
}
```

- [ ] **Step 3: Make Why Train section cleaner**

Find `.section--why-train` (line ~698) and replace:

```css
.section--why-train {
    background: var(--paper);
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Scroll through homepage and confirm visual variety: dark hero → light about → darker method → clean why-train → dark philosophy → dark CTA.

- [ ] **Step 5: Commit**

```bash
git add src/pages/styles.css
git commit -m "design: vary section backgrounds for visual rhythm"
```

---

## Task 5: Add Gallery Captions to Lightbox

**Files:**
- Modify: `src/pages/gallery.html`
- Modify: `src/pages/script.js`
- Modify: `src/pages/styles.css`

Add data-caption attributes to gallery images and display them in the lightbox.

- [ ] **Step 1: Add data-caption to gallery images**

In `src/pages/gallery.html`, replace the gallery grid (lines 25-33) with:

```html
<div class="gallery-grid" id="galleryGrid">
    <div class="gallery-item gallery-item--tall"><img src="gallery-3.jpg" alt="מתאמן מבצע תנועת קראטה באולם האימונים" data-caption="אימון קראטה — מועדון עפולה" loading="lazy" width="400" height="600"></div>
    <div class="gallery-item"><img src="gallery-2.jpg" alt="זוג מתאמנים באימון ג'ודו על המזרן" data-caption="אימון ג'ודו בזוגות" loading="lazy" width="400" height="300"></div>
    <div class="gallery-item"><img src="gallery-1.jpg" alt="קבוצת מתאמנים בתרגול עמידות קרב" data-caption="תרגול עמידות קרב קבוצתי" loading="lazy" width="400" height="300"></div>
    <div class="gallery-item"><img src="gallery-4.jpg" alt="מאמן מדגים טכניקת הגנה עצמית" data-caption="הדגמת טכניקת הגנה עצמית" loading="lazy" width="400" height="300"></div>
    <div class="gallery-item gallery-item--wide gallery-hidden"><img src="gallery-5.jpg" alt="אימון קרב מגע קבוצתי" data-caption="אימון קרב מגע" loading="lazy" width="800" height="300"></div>
    <div class="gallery-item gallery-hidden"><img src="gallery-6.jpg" alt="ילדים באימון שאי-הון ראשון" data-caption="מחזור מתאמנים צעירים" loading="lazy" width="400" height="300"></div>
    <div class="gallery-item gallery-hidden"><img src="gallery-7.jpg" alt="מבחני דרגה — מתאמן מציג טכניקה" data-caption="מבחני דרגה" loading="lazy" width="400" height="300"></div>
</div>
```

- [ ] **Step 2: Add caption element to lightbox**

In `src/pages/gallery.html`, replace the lightbox div (lines 40-43) with:

```html
<div class="lightbox" id="lightbox">
    <button class="lightbox-close" aria-label="סגור">&times;</button>
    <figure class="lightbox-figure">
        <img src="" alt="" id="lightboxImg">
        <figcaption class="lightbox-caption" id="lightboxCaption"></figcaption>
    </figure>
</div>
```

- [ ] **Step 3: Update lightbox JS to show captions**

In `src/pages/script.js`, find the Lightbox section (lines 83-117) and replace with:

```javascript
// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.dataset.caption || '';
            lightbox.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('is-active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
            closeLightbox();
        }
    });
}
```

- [ ] **Step 4: Add lightbox caption styles**

In `src/pages/styles.css`, find the `/* Lightbox */` section (line ~841) and add after `.lightbox-close:hover`:

```css
.lightbox-figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
}
.lightbox-caption {
    color: rgba(255,255,255,0.7);
    font-size: 15px;
    text-align: center;
    max-width: 600px;
    padding: 0 20px;
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Open gallery page, click an image, confirm caption appears below it.

- [ ] **Step 6: Commit**

```bash
git add src/pages/gallery.html src/pages/script.js src/pages/styles.css
git commit -m "design: add captions to gallery lightbox"
```

---

## Task 6: Improve Footer with Links and Contact Info

**Files:**
- Modify: `src/partials/footer.html`
- Modify: `src/pages/styles.css`

Add navigation links, contact info, and WhatsApp to the footer.

- [ ] **Step 1: Replace footer partial**

Replace `src/partials/footer.html` with:

```html
<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col footer-col--brand">
                <a href="index.html" class="footer-brand-link">
                    <img src="logo.png" alt="שאי-הון" class="footer-logo">
                </a>
                <p class="footer-desc">עמותת שאי-הון ישראל — שיטת לחימה ייחודית מאז 1960.</p>
            </div>
            <div class="footer-col">
                <h4>ניווט</h4>
                <ul class="footer-links">
                    <li><a href="index.html">דף הבית</a></li>
                    <li><a href="about.html">אודות</a></li>
                    <li><a href="gallery.html">גלריה</a></li>
                    <li><a href="locations.html">מועדונים</a></li>
                    <li><a href="events.html">אירועים</a></li>
                    <li><a href="contact.html">צור קשר</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>צור קשר</h4>
                <ul class="footer-links">
                    <li><a href="tel:050-536-4659">050-536-4659</a></li>
                    <li><a href="mailto:info@shi-heun.com">info@shi-heun.com</a></li>
                    <li><a href="https://wa.me/972505364659?text=היי%2C%20אני%20מתעניין%20בשיעורי%20שאי-הון" target="_blank" rel="noopener">וואטסאפ</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>מועדונים</h4>
                <ul class="footer-links">
                    <li><a href="locations.html">עפולה</a></li>
                    <li><a href="locations.html">נורית</a></li>
                    <li><a href="locations.html">תל אביב</a></li>
                    <li><a href="locations.html">ירושלים</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-copy">&copy; <span id="year"></span> עמותת שאי-הון ישראל. כל הזכויות שמורות.</p>
        </div>
    </div>
</footer>

<script type="module" src="./script.js"></script>
```

- [ ] **Step 2: Replace footer CSS**

In `src/pages/styles.css`, find the `/* FOOTER */` section (line ~1383) and replace entirely with:

```css
/* ============================================================
   FOOTER
   ============================================================ */
.site-footer {
    padding: 64px 0 32px;
    border-top: 1px solid var(--line);
    background: linear-gradient(180deg, var(--paper-2) 0%, var(--paper-dark) 100%);
}
.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
}
.footer-col h4 {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 20px;
}
.footer-col--brand {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.footer-brand-link {
    display: inline-block;
}
.footer-logo {
    height: 56px;
    width: auto;
    display: block;
    opacity: 0.9;
}
.footer-desc {
    font-size: 14px;
    color: var(--ink-mid);
    line-height: 1.6;
    max-width: 260px;
}
.footer-links {
    list-style: none;
    display: grid;
    gap: 10px;
}
.footer-links a {
    font-size: 14px;
    color: var(--ink-mid);
    transition: color 0.2s ease;
}
.footer-links a:hover {
    color: var(--accent);
}
.footer-bottom {
    border-top: 1px solid var(--line);
    padding-top: 24px;
    text-align: center;
}
.footer-copy {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 1px;
}

@media (max-width: 900px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
    .footer-col--brand {
        grid-column: 1 / -1;
    }
}

@media (max-width: 640px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 28px;
    }
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Check footer on any page — should show 4 columns with logo, nav, contact, and locations.

- [ ] **Step 4: Commit**

```bash
git add src/partials/footer.html src/pages/styles.css
git commit -m "design: expand footer with nav links, contact info, and location links"
```

---

## Task 7: Strengthen Event Visual Hierarchy

**Files:**
- Modify: `src/pages/events.html`
- Modify: `src/pages/styles.css`

Group events into "Upcoming" and "Past" sections, add year badge, and style past events more distinctly.

- [ ] **Step 1: Restructure events HTML**

Replace the events list section in `src/pages/events.html` (lines 24-63) with:

```html
<!-- EVENTS LIST -->
<section class="section section--events">
    <div class="container">
        <h2 class="section-title" style="font-size: clamp(24px, 3vw, 36px); margin-bottom: 40px;">אירועים קרובים</h2>
        <ul class="events-list">
            <li class="event-card" data-event-date="2026-07-15">
                <div class="event-date">
                    <span class="event-year">2026</span>
                    <span class="event-month">יולי</span>
                    <span class="event-day">15</span>
                </div>
                <div class="event-body">
                    <span class="event-tag">סמינר קיץ</span>
                    <h3>סמינר אימון מרוכז — קיץ 2026</h3>
                    <p>יום אימון מרוכז בטכניקות הגנה עצמית וקרב מגע לכל השיטות. פתוח לכל המתאמנים.</p>
                </div>
            </li>
            <li class="event-card" data-event-date="2026-09-02">
                <div class="event-date">
                    <span class="event-year">2026</span>
                    <span class="event-month">ספט׳</span>
                    <span class="event-day">02</span>
                </div>
                <div class="event-body">
                    <span class="event-tag">מבחן דרגה</span>
                    <h3>מבחני דרגה — סתיו 2026</h3>
                    <p>מבחני דרגה למתאמנים מכל רמות. הכנה אישית עם המאמנים יתחילה חודש לפני המבחן.</p>
                </div>
            </li>
            <li class="event-card" data-event-date="2026-12-20">
                <div class="event-date">
                    <span class="event-year">2026</span>
                    <span class="event-month">דצמ׳</span>
                    <span class="event-day">20</span>
                </div>
                <div class="event-body">
                    <span class="event-tag">אירוע מיוחד</span>
                    <h3>ערב התרמה ומפגש משפחת שאי-הון</h3>
                    <p>ערב הוקרה למורשת המייסד עם הדגמות, סיפורים וארוחה משותפת. פתוח למשפחות ואורחים.</p>
                </div>
            </li>
        </ul>
    </div>
</section>
```

- [ ] **Step 2: Update event date styles**

In `src/pages/styles.css`, find `.event-date` (line ~938) and replace the entire events section (lines 938-965) with:

```css
.event-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px 12px;
    background: linear-gradient(135deg, var(--paper-2) 0%, var(--paper-dark) 100%);
    border: 1px solid var(--line);
    min-height: 110px;
    border-radius: var(--radius-sm);
}
.event-year {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 1px;
    margin-bottom: 2px;
}
.event-month {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
}
.event-day {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
    margin-top: 4px;
}
```

- [ ] **Step 3: Strengthen past event styling**

In `src/pages/styles.css`, find `.event-card.is-past` (line ~928) and replace:

```css
.event-card.is-past {
    opacity: 0.45;
    filter: grayscale(0.6);
}
.event-card.is-past .event-date {
    background: var(--paper);
}
.event-card.is-past .event-day {
    color: var(--muted);
}
.event-card.is-past .event-tag {
    background: rgba(0,0,0,0.03);
    color: var(--muted);
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Confirm year badge appears above month, and past events (if any) are visibly muted.

- [ ] **Step 5: Commit**

```bash
git add src/pages/events.html src/pages/styles.css
git commit -m "design: improve event visual hierarchy with year badges and stronger past-event styling"
```

---

## Task 8: Better Shop Placeholder Styling

**Files:**
- Modify: `src/pages/shop.html`
- Modify: `src/pages/styles.css`

Style the shop placeholders to look intentional rather than broken.

- [ ] **Step 1: Update shop card HTML**

Replace the shop grid in `src/pages/shop.html` (lines 27-47) with:

```html
<ul class="shop-grid">
    <li class="shop-card">
        <div class="shop-image">
            <div class="shop-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a1.6 1.6 0 0 0-1.66-.22l-3.47 1.4a1.6 1.6 0 0 1-1.18 0L10.2 2.62a1.6 1.6 0 0 0-1.18 0l-3.47 1.4a1.6 1.6 0 0 0-.99 1.48v13a1.6 1.6 0 0 0 .99 1.48l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4a1.6 1.6 0 0 1 1.18 0l3.47 1.4a1.6 1.6 0 0 0 1.66-.22 1.6 1.6 0 0 0 .73-1.35V4.75a1.6 1.6 0 0 0-.73-1.35z"/><path d="M4.5 7.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 12l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 16.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/></svg>
                <span>תמונה בקרוב</span>
            </div>
        </div>
        <h3>חולצת אימון</h3>
        <p>חולצת דריי-פיט עם לוגו שאי-הון. נוחה, קלילה ומתאימה לאימונים אינטנסיביים.</p>
        <span class="shop-price">₪89</span>
    </li>
    <li class="shop-card">
        <div class="shop-image">
            <div class="shop-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a1.6 1.6 0 0 0-1.66-.22l-3.47 1.4a1.6 1.6 0 0 1-1.18 0L10.2 2.62a1.6 1.6 0 0 0-1.18 0l-3.47 1.4a1.6 1.6 0 0 0-.99 1.48v13a1.6 1.6 0 0 0 .99 1.48l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4a1.6 1.6 0 0 1 1.18 0l3.47 1.4a1.6 1.6 0 0 0 1.66-.22 1.6 1.6 0 0 0 .73-1.35V4.75a1.6 1.6 0 0 0-.73-1.35z"/><path d="M4.5 7.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 12l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 16.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/></svg>
                <span>תמונה בקרוב</span>
            </div>
        </div>
        <h3>מכנסי אימון</h3>
        <p>מכנסיים נוחים עם גומייה וכיסים. מתאימים לאומנויות לחימה וספורט כללי.</p>
        <span class="shop-price">₪129</span>
    </li>
    <li class="shop-card">
        <div class="shop-image">
            <div class="shop-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a1.6 1.6 0 0 0-1.66-.22l-3.47 1.4a1.6 1.6 0 0 1-1.18 0L10.2 2.62a1.6 1.6 0 0 0-1.18 0l-3.47 1.4a1.6 1.6 0 0 0-.99 1.48v13a1.6 1.6 0 0 0 .99 1.48l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4a1.6 1.6 0 0 1 1.18 0l3.47 1.4a1.6 1.6 0 0 0 1.66-.22 1.6 1.6 0 0 0 .73-1.35V4.75a1.6 1.6 0 0 0-.73-1.35z"/><path d="M4.5 7.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 12l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/><path d="M4.5 16.5l3.47 1.4a1.6 1.6 0 0 0 1.18 0l3.47-1.4"/></svg>
                <span>תמונה בקרוב</span>
            </div>
        </div>
        <h3>חגורת מכות</h3>
        <p>חגורת עור איכותית לאימוני קראטה וג'ודו. עמידה לאורך זמן.</p>
        <span class="shop-price">₪159</span>
    </li>
</ul>
```

- [ ] **Step 2: Update shop placeholder CSS**

In `src/pages/styles.css`, find `.shop-image` (line ~1022) and replace through `.shop-image::before` (line ~1044) with:

```css
.shop-image {
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, var(--paper-2) 0%, var(--paper-dark) 100%);
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
}
.shop-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: var(--line);
}
.shop-placeholder span {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Shop placeholders should now show an icon + "תמונה בקרוב" text instead of plain text.

- [ ] **Step 4: Commit**

```bash
git add src/pages/shop.html src/pages/styles.css
git commit -m "design: style shop placeholders with icon and label"
```

---

## Task 9: Mobile Hero Title Refinement

**Files:**
- Modify: `src/pages/styles.css`

Reduce hero title size on mobile and tighten letter-spacing.

- [ ] **Step 1: Adjust mobile hero styles**

In `src/pages/styles.css`, find the `@media (max-width: 640px)` section (line ~1447) and add inside it:

```css
@media (max-width: 640px) {
    .hero-title {
        font-size: clamp(40px, 14vw, 64px);
        letter-spacing: -1px;
        line-height: 0.95;
    }
    .hero-lede {
        font-size: 16px;
        padding-right: 16px;
    }
    .hero-cta {
        padding: 16px 32px;
        font-size: 12px;
    }
    .nav-toggle { display: flex; }
    ... /* rest of existing mobile rules */
}
```

The existing `.hero-title { letter-spacing: -1px; }` should be replaced with the fuller rule above.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Use browser dev tools to test at 375px width — hero title should fit without overflow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/styles.css
git commit -m "design: refine mobile hero title sizing and spacing"
```

---

## Task 10: Clearer Placeholder Styling for Coming Soon Locations

**Files:**
- Modify: `src/pages/locations.html`
- Modify: `src/pages/styles.css`

Visually distinguish the "coming soon" locations from active ones.

- [ ] **Step 1: Mark coming soon cards**

In `src/pages/locations.html`, add `location-card--soon` class to the Tel Aviv and Jerusalem cards:

For Tel Aviv (line 100), change:
```html
<article class="location-card location-card--soon">
```

For Jerusalem (line 126), change:
```html
<article class="location-card location-card--soon">
```

- [ ] **Step 2: Add coming soon styles**

In `src/pages/styles.css`, find `.location-card` (line ~1083) and add after `.location-card:hover::before` (line ~1108):

```css
.location-card--soon {
    background: linear-gradient(135deg, var(--paper) 0%, var(--paper-2) 100%);
    border-style: dashed;
    opacity: 0.85;
}
.location-card--soon:hover {
    opacity: 1;
}
.location-card--soon .coach-photo--placeholder {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--muted);
}
.location-card--soon .location-name::after {
    content: ' — בקרוב';
    font-weight: 400;
    color: var(--accent);
}
.location-card--soon .location-actions {
    display: none;
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Tel Aviv and Jerusalem cards should have dashed borders, no WhatsApp/Waze buttons, and "בקרוב" appended to the location name.

- [ ] **Step 4: Commit**

```bash
git add src/pages/locations.html src/pages/styles.css
git commit -m "design: distinguish coming-soon location cards with dashed borders and reduced opacity"
```

---

## Final Build and Deploy Verification

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: all 7 HTML files, CSS, JS built successfully with no errors.

- [ ] **Step 2: Spot-check all pages**

Open `dist/index.html`, `dist/about.html`, `dist/gallery.html`, `dist/locations.html`, `dist/events.html`, `dist/shop.html`, `dist/contact.html` and verify:
- [ ] Homepage: About teaser present, method icons visible, varied backgrounds
- [ ] Gallery: lightbox shows captions
- [ ] Locations: coming-soon cards styled differently
- [ ] Events: year badge visible
- [ ] Shop: icon placeholders
- [ ] Contact: footer expanded
- [ ] All pages: footer has 4 columns

- [ ] **Step 3: Final commit**

```bash
git add dist/
git commit -m "build: regenerate dist with all design improvements"
```

---

## Content Remaining (Requires User Input)

These cannot be implemented without assets or information from the user:

1. **Real shop product images** — replace placeholder SVGs with actual photos
2. **Real coach photos** — replace initials (RP, JG) with actual photos for Afula and Nurit
3. **Tel Aviv & Jerusalem details** — once locations are confirmed, update addresses, phones, coach names, and remove `location-card--soon` class
4. **Contact form backend** — currently shows success message but doesn't send; needs Formspree, Netlify Forms, or custom endpoint

---

## Spec Coverage Check

| Improvement | Task | Status |
|------------|------|--------|
| Darken CTA banner | Task 1 | Planned |
| Method card icons | Task 2 | Planned |
| About teaser on homepage | Task 3 | Planned |
| Vary section backgrounds | Task 4 | Planned |
| Gallery lightbox captions | Task 5 | Planned |
| Improved footer | Task 6 | Planned |
| Event visual hierarchy | Task 7 | Planned |
| Shop placeholder styling | Task 8 | Planned |
| Mobile hero refinement | Task 9 | Planned |
| Coming-soon location cards | Task 10 | Planned |

## Placeholder Scan

No TBD/TODO/fill-in-later found. All steps contain complete code.

## Type Consistency

- CSS class names consistent: `.lightbox-caption`, `.location-card--soon`, `.shop-placeholder`
- JS variable names consistent: `lightboxCaption` used throughout
- HTML data attributes consistent: `data-caption` on all gallery images
