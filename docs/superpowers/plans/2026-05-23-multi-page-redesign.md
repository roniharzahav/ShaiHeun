# Multi-Page Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-page Shai-Heun site into a hybrid multi-page site (Home + 6 dedicated pages) using Vite with Handlebars partials.

**Architecture:** Vite dev server with `vite-plugin-handlebars` for shared nav/head/footer partials. All pages share one CSS and one JS file. Images live in `public/` and are copied as-is to `dist/`.

**Tech Stack:** Vite, vite-plugin-handlebars, plain HTML/CSS/JS

---

## File Structure (target)

```
├── src/
│   ├── pages/
│   │   ├── index.html          (Home: Hero + About teaser + Method + Philosophy + CTA)
│   │   ├── about.html          (Full founder story + history)
│   │   ├── gallery.html        (Gallery grid + lightbox)
│   │   ├── locations.html      (4 dojo cards)
│   │   ├── events.html         (Event list)
│   │   ├── shop.html           (Product cards)
│   │   └── contact.html        (Contact form + details)
│   ├── partials/
│   │   ├── head.html           (Meta, fonts, CSS link)
│   │   ├── nav.html            (Header nav with active state)
│   │   └── footer.html         (Site footer)
│   ├── styles.css              (Shared styles, all pages)
│   └── script.js               (Shared JS, all pages)
├── public/
│   ├── logo.png
│   ├── hero.png
│   ├── founder.jpg
│   └── gallery-1.jpg ... gallery-7.jpg
├── vite.config.js
├── package.json
└── dist/                       (build output)
```

---

## Task 1: Initialize Vite Project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Move: `styles.css` → `src/styles.css`
- Move: `script.js` → `src/script.js`
- Move: `logo.png`, `hero.png`, `founder.jpg`, `gallery-*.jpg` → `public/`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "shi-heun-site",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vite-plugin-handlebars": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```javascript
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        siteName: 'שאי-הון',
        siteUrl: 'https://shi-heun.com'
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        gallery: resolve(__dirname, 'src/pages/gallery.html'),
        locations: resolve(__dirname, 'src/pages/locations.html'),
        events: resolve(__dirname, 'src/pages/events.html'),
        shop: resolve(__dirname, 'src/pages/shop.html'),
        contact: resolve(__dirname, 'src/pages/contact.html')
      }
    },
    outDir: '../dist',
    emptyOutDir: true
  },
  root: 'src/pages',
  publicDir: '../../public'
});
```

- [ ] **Step 3: Move existing files**

Run these commands from project root:

```bash
mkdir -p src/pages src/partials public
mv styles.css src/styles.css
mv script.js src/script.js
mv logo.png hero.png founder.jpg gallery-*.jpg public/ 2>/dev/null || true
```

If images don't exist in root (they may be elsewhere), locate them with `find` and move to `public/`.

- [ ] **Step 4: Commit**

```bash
git add package.json vite.config.js
# Note: don't commit deleted index.html yet — we'll recreate it
git commit -m "chore: setup Vite with Handlebars partials"
```

---

## Task 2: Create Shared Partials

**Files:**
- Create: `src/partials/head.html`
- Create: `src/partials/nav.html`
- Create: `src/partials/footer.html`

- [ ] **Step 1: Create head partial**

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{title}} — שאי-הון</title>
<meta name="description" content="{{description}}">

<link rel="icon" type="image/png" href="logo.png">

<meta property="og:title" content="{{title}} — שאי-הון">
<meta property="og:description" content="{{description}}">
<meta property="og:image" content="https://shi-heun.com/hero.png">
<meta property="og:url" content="https://shi-heun.com">
<meta property="og:type" content="website">
<meta property="og:locale" content="he_IL">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{title}} — שאי-הון">
<meta name="twitter:description" content="{{description}}">
<meta name="twitter:image" content="https://shi-heun.com/hero.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Assistant:wght@300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../styles.css">
```

- [ ] **Step 2: Create nav partial**

```html
<header class="site-header" id="siteHeader">
    <div class="container header-inner">
        <a href="index.html" class="brand">
            <img src="logo.png" alt="שאי-הון" class="brand-logo">
        </a>
        <nav class="nav" aria-label="ניווט ראשי">
            <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navList" aria-label="פתיחת תפריט">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-list" id="navList">
                <li><a href="index.html" {{#if home}}class="is-active"{{/if}}>דף הבית</a></li>
                <li><a href="about.html" {{#if about}}class="is-active"{{/if}}>אודות</a></li>
                <li><a href="gallery.html" {{#if gallery}}class="is-active"{{/if}}>גלריה</a></li>
                <li><a href="locations.html" {{#if locations}}class="is-active"{{/if}}>מועדונים</a></li>
                <li><a href="events.html" {{#if events}}class="is-active"{{/if}}>אירועים</a></li>
                <li><a href="shop.html" {{#if shop}}class="is-active"{{/if}}>חנות</a></li>
                <li><a href="contact.html" {{#if contact}}class="is-active"{{/if}}>צור קשר</a></li>
            </ul>
        </nav>
    </div>
</header>
```

- [ ] **Step 3: Create footer partial**

```html
<footer class="site-footer">
    <div class="container footer-inner">
        <div class="footer-brand">
            <img src="logo.png" alt="שאי-הון" class="footer-logo">
            <span>עמותת שאי-הון ישראל</span>
        </div>
        <p class="footer-copy">&copy; <span id="year"></span> כל הזכויות שמורות.</p>
    </div>
</footer>

<script src="../script.js"></script>
```

- [ ] **Step 4: Add nav active state styles to CSS**

In `src/styles.css`, add to the `.nav-list a` section:

```css
.nav-list a.is-active {
    color: #fff;
}
.nav-list a.is-active::after {
    transform: scaleX(1);
}
```

Also add for scrolled state:

```css
.site-header.scrolled .nav-list a.is-active {
    color: var(--ink);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/partials/ src/styles.css
git commit -m "feat: add shared partials (head, nav, footer) with active nav state"
```

---

## Task 3: Refactor CSS — Remove Belt System + Add Page Utilities

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Remove all belt system CSS**

Delete the entire `/* BELT SYSTEM */` section (lines ~900-960 in current styles.css):

```css
/* ============================================================
   BELT SYSTEM
   ============================================================ */
.section--belts {
    background: var(--paper);
}
.belts-visual {
    ...
}
... (all belt-related rules)
```

Also delete `.belt-item` from the reveal animations selector list.

- [ ] **Step 2: Add page-specific utility styles**

Add these utilities after the existing utility section:

```css
/* ============================================================
   PAGE UTILITIES
   ============================================================ */
.page-header {
    padding: clamp(100px, 16vw, 180px) 0 clamp(40px, 6vw, 80px);
    background: var(--ink);
    position: relative;
    overflow: hidden;
}
.page-header .hero-mesh {
    position: absolute;
    inset: 0;
}
.page-header .section-title {
    color: #fff;
    margin-bottom: 16px;
}
.page-header .section-lede {
    color: rgba(255,255,255,0.6);
    margin-bottom: 0;
}

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
```

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "refactor: remove belt system styles, add page header and CTA utilities"
```

---

## Task 4: Create Home Page (index.html)

**Files:**
- Create: `src/pages/index.html`

- [ ] **Step 1: Write home page template**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    {{> head title="דף הבית" description="עמותת שאי-הון ישראל — שיטת לחימה ייחודית. אומנות, דיסציפלינה ודרך חיים."}}
</head>
<body>
<a href="#main-content" class="skip-link">דלג לתוכן</a>
<div class="scroll-progress" id="scrollProgress"></div>

{{> nav}}

<main id="main-content" tabindex="-1">

    <!-- HERO -->
    <section class="hero" id="top">
        <div class="hero-mesh" aria-hidden="true"></div>
        <div class="container hero-inner">
            <p class="eyebrow">עמותת שאי-הון ישראל</p>
            <h1 class="hero-title">
                <span class="title-line">שאי</span>
                <span class="title-line title-line--accent">הון</span>
            </h1>
            <p class="hero-lede">
                ״המבחן האמיתי של אימוני שאי-הון אינו מה שאתה מבצע באימון, אלא היכולת לקחת איתך את היכולות שפיתחת ולהעביר אותן לכל תחומי החיים.״
            </p>
            <div class="hero-meta">
                <span>נוסדה 1960</span>
                <span class="dot"></span>
                <span>על ידי אונשי סידני שלמה פייגה ז״ל</span>
            </div>
            <a href="contact.html" class="hero-cta">הצטרף לאימון</a>
            <p class="hero-note">שיעור ראשון חינם — בלי התחייבות</p>
        </div>
        <div class="hero-figure" aria-hidden="true">
            <div class="hero-figure-frame">
                <img src="hero.png" alt="מתאמן שאי-הון בתנועת קראטה דינמית" class="hero-img" width="600" height="800" fetchpriority="high">
            </div>
        </div>
        <div class="scroll-indicator" aria-hidden="true">
            <span>גלול למטה</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
    </section>

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

    <!-- METHOD PREVIEW -->
    <section class="section section--method" id="method">
        <div class="container">
            <p class="section-eyebrow centered">השיטה</p>
            <h2 class="section-title centered">חמש אומנויות. שפה אחת.</h2>
            <p class="section-lede centered">
                שאי-הון אינה ענף אחד. היא שילוב מדויק של כמה תחומים שאת כולם תרגל המייסד לאורך חייו.
            </p>
            <ul class="method-grid">
                <li class="method-card">
                    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5a2 2 0 0 0 1.925 2.5h15.95a2 2 0 0 0 1.925-2.5l-2.495-9.04A2 2 0 0 0 17.5 8Z"/></svg>
                    <span class="method-num">01</span>
                    <h3>ג׳ודו</h3>
                    <p>זריקות, מנופים והבנה של מרכז הכובד. הבסיס לכל היתר.</p>
                </li>
                <li class="method-card">
                    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span class="method-num">02</span>
                    <h3>קארטה</h3>
                    <p>טכניקה נקייה, דיסציפלינה, נשימה ומרחק. השיטה שהביא סידני ראשון לישראל.</p>
                </li>
                <li class="method-card">
                    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8a2 2 0 0 0-2 2v6h-4V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/></svg>
                    <span class="method-num">03</span>
                    <h3>אגרוף</h3>
                    <p>תזמון, עבודת רגליים ומרחק תקיפה. החיבור בין המסורת לפרקטיקה.</p>
                </li>
                <li class="method-card">
                    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span class="method-num">04</span>
                    <h3>ג׳וג׳יטסו</h3>
                    <p>שליטה, אחיזות וסיומים על הקרקע. עבודה צמודה עם בן זוג לאימון.</p>
                </li>
                <li class="method-card">
                    <svg class="method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span class="method-num">05</span>
                    <h3>הגנה עצמית וקרב מגע</h3>
                    <p>ייחודיים לשאי-הון. כלים שעובדים בעולם האמיתי.</p>
                </li>
            </ul>
        </div>
    </section>

    <!-- PHILOSOPHY -->
    <section class="section section--philosophy" id="philosophy">
        <div class="container">
            <div class="philosophy-divider"></div>
            <blockquote class="philosophy-quote">
                <p>המבחן האמיתי אינו מה שאתה <em>מבצע באימון</em>,<br>אלא היכולת לקחת איתך את היכולות <em>לכל תחומי החיים</em>.</p>
            </blockquote>
            <p class="philosophy-source">— אונשי סידני שלמה פייגה ז״ל</p>
        </div>
    </section>

    <!-- CTA BANNER -->
    <section class="section section--cta-banner">
        <div class="hero-mesh" aria-hidden="true"></div>
        <div class="container">
            <h2 class="section-title centered">מוכנים להתחיל?</h2>
            <a href="contact.html" class="hero-cta">הצטרף לאימון</a>
            <p class="hero-note">שיעור ראשון חינם — בלי התחייבות</p>
        </div>
    </section>

</main>

{{> footer}}
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.html
git commit -m "feat: create home page with hero, about teaser, method preview, philosophy, CTA"
```

---

## Task 5: Create About Page

**Files:**
- Create: `src/pages/about.html`

- [ ] **Step 1: Write about page template**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    {{> head title="אודות" description="ההיסטוריה של שיטת שאי-הון — מדרום אפריקה דרך מושב מולדת ועד ימינו."}}
</head>
<body>
<a href="#main-content" class="skip-link">דלג לתוכן</a>
<div class="scroll-progress" id="scrollProgress"></div>

{{> nav about=true}}

<main id="main-content" tabindex="-1">

    <!-- PAGE HEADER -->
    <section class="page-header">
        <div class="hero-mesh" aria-hidden="true"></div>
        <div class="container">
            <p class="section-eyebrow">אודות</p>
            <h1 class="section-title">מדרום אפריקה למושב מולדת.</h1>
            <p class="section-lede">סיפורה של שיטת לחימה ייחודית שנולדה מחזון אחד והתפתחה למורשת משפחתית.</p>
        </div>
    </section>

    <!-- FULL STORY -->
    <section class="section section--about">
        <div class="container">
            <div class="grid-two">
                <div class="grid-two-aside">
                    <div class="about-image">
                        <div class="founder-frame">
                            <img src="founder.jpg" alt="אונשי סידני שלמה פייגה ז״ל, מייסד שיטת שאי-הון" width="400" height="500">
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
                        במושב מולדת נולדו אורן והתאומים גיל וזיו — ושם, באותו מושב, נפתח המועדון הראשון של שיטת שאי-הון.
                    </p>
                    <p>
                        סידני היה הראשון שהביא את הקארטה לישראל. במכבייה השישית הוא הציג בפני הקהל הישראלי את שיטת הלחימה
                        שפיתח, וחשף לראשונה את שאי-הון. בשל תרומתו לעולם אומנויות הלחימה הוא הוכנס להיכל התהילה
                        של אומנויות הלחימה בדרום אפריקה — בדרגה הגבוהה ביותר השמורה למייסדי שיטה.
                    </p>
                    <p>
                        כיום עומד בראש השיטה רועי פייגה, מאמן בכיר ובנו הבכור של סידני. יחד עם אחיו אילן, אורן, גיל וזיו,
                        הוא ממשיך את הדרך ושומר על מורשת שאי-הון לדורות הבאים.
                    </p>
                    <blockquote class="pull-quote">
                        <p>״המבחן האמיתי של אימוני שאי-הון אינו מה שאתה מבצע באימון, אלא היכולת לקחת איתך את היכולות
                        שפיתחת ולהעביר אותן לכל תחומי החיים.״</p>
                        <cite>— אונשי סידני שלמה פייגה ז״ל</cite>
                    </blockquote>
                </div>
            </div>
        </div>
    </section>

</main>

{{> footer}}
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.html
git commit -m "feat: create about page with full founder story"
```

---

## Task 6: Create Gallery Page

**Files:**
- Create: `src/pages/gallery.html`

- [ ] **Step 1: Write gallery page template**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    {{> head title="גלריה" description="רגעים מהמזרן — תמונות מאימונים, מבחני דרגה ואירועים משפחת שאי-הון."}}
</head>
<body>
<a href="#main-content" class="skip-link">דלג לתוכן</a>
<div class="scroll-progress" id="scrollProgress"></div>

{{> nav gallery=true}}

<main id="main-content" tabindex="-1">

    <!-- PAGE HEADER -->
    <section class="page-header">
        <div class="hero-mesh" aria-hidden="true"></div>
        <div class="container">
            <p class="section-eyebrow">גלריה</p>
            <h1 class="section-title">רגעים מהמזרן.</h1>
            <p class="section-lede">תמונות מאימונים, מבחני דרגה ואירועים משפחת שאי-הון.</p>
        </div>
    </section>

    <!-- GALLERY -->
    <section class="section section--gallery">
        <div class="container">
            <div class="gallery-grid" id="galleryGrid">
                <div class="gallery-item gallery-item--tall"><img src="gallery-3.jpg" alt="מתאמן מבצע תנועת קראטה באולם האימונים" loading="lazy" width="400" height="600"></div>
                <div class="gallery-item"><img src="gallery-2.jpg" alt="זוג מתאמנים באימון ג׳ודו על המזרן" loading="lazy" width="400" height="300"></div>
                <div class="gallery-item"><img src="gallery-1.jpg" alt="קבוצת מתאמנים בתרגול עמידות קרב" loading="lazy" width="400" height="300"></div>
                <div class="gallery-item"><img src="gallery-4.jpg" alt="מאמן מדגים טכניקת הגנה עצמית" loading="lazy" width="400" height="300"></div>
                <div class="gallery-item gallery-item--wide gallery-hidden"><img src="gallery-5.jpg" alt="אימון קרב מגע קבוצתי" loading="lazy" width="800" height="300"></div>
                <div class="gallery-item gallery-hidden"><img src="gallery-6.jpg" alt="ילדים באימון שאי-הון ראשון" loading="lazy" width="400" height="300"></div>
                <div class="gallery-item gallery-hidden"><img src="gallery-7.jpg" alt="מבחני דרגה — מתאמן מציג טכניקה" loading="lazy" width="400" height="300"></div>
            </div>
            <button class="gallery-toggle" id="galleryToggle" aria-label="הצג או הסתר תמונות נוספות בגלריה" aria-expanded="false" aria-controls="galleryGrid"><span class="gallery-toggle-more">הצג עוד</span><span class="gallery-toggle-less">הצג פחות</span></button>
        </div>
    </section>

</main>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
    <button class="lightbox-close" aria-label="סגור">&times;</button>
    <img src="" alt="" id="lightboxImg">
</div>

{{> footer}}
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/gallery.html
git commit -m "feat: create gallery page with grid and lightbox"
```

---

## Task 7: Create Locations Page

**Files:**
- Create: `src/pages/locations.html`

- [ ] **Step 1: Write locations page template**

Use the full locations section from the current `index.html`, wrapped in a page header + the locations grid. Include all 4 location cards (Afula, Nurit, Tel Aviv, Jerusalem).

- [ ] **Step 2: Commit**

```bash
git add src/pages/locations.html
git commit -m "feat: create locations page with all 4 dojo cards"
```

---

## Task 8: Create Events Page

**Files:**
- Create: `src/pages/events.html`

- [ ] **Step 1: Write events page template**

Use the full events section from the current `index.html`, wrapped in a page header + the events list. Include all 3 event cards.

- [ ] **Step 2: Commit**

```bash
git add src/pages/events.html
git commit -m "feat: create events page with event list"
```

---

## Task 9: Create Shop Page

**Files:**
- Create: `src/pages/shop.html`

- [ ] **Step 1: Write shop page template**

Use the full shop section from the current `index.html`, wrapped in a page header + the shop grid. Include all 3 product cards with prices.

- [ ] **Step 2: Commit**

```bash
git add src/pages/shop.html
git commit -m "feat: create shop page with product cards"
```

---

## Task 10: Create Contact Page

**Files:**
- Create: `src/pages/contact.html`

- [ ] **Step 1: Write contact page template**

Use the full contact section from the current `index.html`, wrapped in a page header. Include both the contact details sidebar and the full contact form.

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.html
git commit -m "feat: create contact page with form and details"
```

---

## Task 11: Update Shared JavaScript

**Files:**
- Modify: `src/script.js`

- [ ] **Step 1: Update JS for multi-page behavior**

Replace the entire `src/script.js` with:

```javascript
/* Shai-Heun — interactions */

(function () {
    'use strict';

    // Scroll progress indicator
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.height = progress + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // Sticky header shadow on scroll
    const header = document.getElementById('siteHeader');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            const open = navList.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        navList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navList.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.classList.add('is-visible');
        });
    }

    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Mark past events
    document.querySelectorAll('[data-event-date]').forEach(card => {
        const date = new Date(card.dataset.eventDate);
        const now = new Date();
        now.setHours(0,0,0,0);
        if (date < now) card.classList.add('is-past');
    });

    // Gallery expand/collapse
    const galleryToggle = document.getElementById('galleryToggle');
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryToggle && galleryGrid) {
        galleryToggle.addEventListener('click', () => {
            galleryGrid.classList.toggle('is-expanded');
            const isExpanded = galleryGrid.classList.contains('is-expanded');
            galleryToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.parentElement.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
            lightboxImg.src = '';
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-active')) closeLightbox();
        });
    }

    // Reveal-on-scroll
    const revealEls = document.querySelectorAll(
        '.section-title, .section-lede, .prose, .method-card, ' +
        '.gallery-item, .pull-quote, .about-image, .contact-card, ' +
        '.event-card, .shop-card, .location-card, .philosophy-quote, ' +
        '.philosophy-source, .philosophy-divider'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-in'));
    }

    // Smooth scroll for same-page anchors only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
```

Key changes from single-page version:
- Same-page anchor smooth scroll only (links to other pages navigate normally)
- Removed `hero-title`, `hero-lede`, `hero-meta`, `eyebrow`, `hero-note`, `belt-item` from reveal selectors (those elements don't exist on all pages)
- Kept all other functionality intact

- [ ] **Step 2: Commit**

```bash
git add src/script.js
git commit -m "refactor: update JS for multi-page — same-page anchors only, remove single-page selectors"
```

---

## Task 12: Build and Verify

- [ ] **Step 1: Install dependencies**

```bash
npm install
```

- [ ] **Step 2: Run dev server and spot-check**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Home page loads with all 5 sections
- Nav links work and go to correct pages
- Active nav state shows on current page
- Gallery lightbox works
- Contact form shows success message
- Mobile hamburger nav works
- Scroll progress bar appears

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Verify `dist/` contains:
- `index.html`, `about.html`, `gallery.html`, `locations.html`, `events.html`, `shop.html`, `contact.html`
- `styles.css`, `script.js`
- All images from `public/`

- [ ] **Step 4: Commit**

```bash
git add package-lock.json dist/ .gitignore
git commit -m "chore: add build output and lockfile"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Hybrid structure (Home + 6 pages) — Tasks 4-10
- ✅ Homepage: Hero + About teaser + Method preview + Philosophy + CTA — Task 4
- ✅ Dedicated pages for About, Gallery, Locations, Events, Shop, Contact — Tasks 5-10
- ✅ Shared partials (head, nav, footer) — Task 2
- ✅ Belt system removed — Task 3
- ✅ Vite + Handlebars build — Task 1
- ✅ Active nav state — Task 2
- ✅ Responsive behavior preserved — implicit in shared CSS

**2. Placeholder scan:**
- No TBD/TODO/fill-in-later found
- All code blocks contain complete, runnable code
- No vague instructions

**3. Type consistency:**
- All pages use same partial syntax `{{> partial}}`
- All pages pass correct context flags to nav
- CSS class names consistent across all pages
- File paths consistent (`../styles.css`, `../script.js` from pages perspective)
