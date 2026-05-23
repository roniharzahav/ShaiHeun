# Multi-Page Site Redesign — Design Spec

## Overview

Convert the current single-page Shai-Heun website into a 7-page multi-page site using Vite with HTML partials (Handlebars) for shared components.

## Page Structure

| Page | Route | Content |
|------|-------|---------|
| Home | `/` | Hero, method preview (5 arts), "why train" section, CTA |
| Gallery | `/gallery.html` | Full gallery grid with lightbox |
| Locations | `/locations.html` | All 4 dojo cards + coach profiles |
| Events | `/events.html` | Event list with dates |
| Shop | `/shop.html` | Product cards with prices |
| History | `/history.html` | Founder story, full about content, timeline |
| Contact | `/contact.html` | Contact form + details |

## Shared Components

All pages include these partials:

- `partials/head.html` — Meta tags, fonts preload, CSS link, Open Graph base tags
- `partials/nav.html` — Site header with active page highlighting via Handlebars conditional
- `partials/footer.html` — Site footer with current year

## Homepage Content

The homepage is a curated landing page that pulls the most impactful content from across the site:

1. **Hero** — Full hero section with animated mesh gradient, title, quote, CTA
2. **Method Preview** — Compact bento-grid showing the 5 martial arts (links to History page for full detail)
3. **"Why Train" / Philosophy** — Large quote block with founder's core message
4. **CTA Banner** — Dark section with "join training" CTA

Full method explanation, belt system, and detailed founder story live on their dedicated pages.

## Technical Architecture

### Build Tool
- **Vite** with `vite-plugin-handlebars` for HTML partials/includes
- Dev server: `npm run dev`
- Production build: `npm run build` → outputs static files to `dist/`

### File Structure
```
├── src/
│   ├── pages/
│   │   ├── index.html
│   │   ├── gallery.html
│   │   ├── locations.html
│   │   ├── events.html
│   │   ├── shop.html
│   │   ├── history.html
│   │   └── contact.html
│   ├── partials/
│   │   ├── head.html
│   │   ├── nav.html
│   │   └── footer.html
│   ├── styles.css
│   └── script.js
├── public/
│   └── images (logo.png, hero.png, founder.jpg, gallery-*.jpg)
├── vite.config.js
├── package.json
└── dist/ (build output)
```

### Shared Assets
- One `styles.css` file shared across all pages (no page-specific CSS unless needed)
- One `script.js` shared across all pages (page-specific behavior gated by element presence checks)
- Images served from `public/` directory (copied as-is to `dist/`)

### Navigation Active State
The nav partial receives a `page` context variable from each page template. The nav uses Handlebars conditionals to add an `is-active` class to the current page's link.

## Responsive Behavior

Same breakpoints and responsive behavior as current site:
- Desktop: full layout
- Tablet (≤900px): 2-column grids collapse, hero image hidden
- Mobile (≤640px): single column, hamburger nav

## Accessibility

- Skip link present on all pages
- Semantic HTML structure maintained
- ARIA labels on interactive elements
- Focus states preserved
- Hebrew RTL layout maintained

## Deployment

The `dist/` folder contains plain static HTML/CSS/JS files. Can be deployed to any static host (Netlify, Vercel, GitHub Pages, traditional hosting) without server-side requirements.
