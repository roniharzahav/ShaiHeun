# Multi-Page Site Redesign — Design Spec

## Overview

Convert the current single-page Shai-Heun website into a **hybrid multi-page site**: a curated homepage with key sections, plus dedicated pages for detailed content. Built with Vite + HTML partials (Handlebars) for shared components.

## Page Structure

| Page | Route | Content |
|------|-------|---------|
| **Home** | `/` | Hero, about teaser, method preview (5 arts), philosophy quote, contact CTA |
| **About** | `/about.html` | Full founder story, history, pull quotes |
| **Gallery** | `/gallery.html` | Full gallery grid with lightbox |
| **Locations** | `/locations.html` | All 4 dojo cards + coach profiles |
| **Events** | `/events.html` | Event list with dates |
| **Shop** | `/shop.html` | Product cards with prices |
| **Contact** | `/contact.html` | Full contact form + details |

## Homepage Sections (in order)

1. **Hero** — Full hero with animated mesh gradient, title, quote, CTA
2. **About Teaser** — Short founder intro + "read more" link to About page
3. **Method Preview** — Compact bento-grid showing the 5 martial arts (links to About page for full detail)
4. **Philosophy Quote** — Large centered quote block
5. **Contact CTA** — Dark banner with "join training" CTA linking to Contact page

## Dedicated Page Content

- **About**: Full founder biography, complete story text, pull quote, family lineage
- **Gallery**: Full 7-image grid with expand/collapse + lightbox
- **Locations**: All 4 location cards with coach info, addresses, phone, Waze links
- **Events**: 3 event cards with dates, tags, descriptions
- **Shop**: 3 product cards with placeholder images and prices
- **Contact**: Full contact form (name, phone, email, message) + contact details sidebar

## Removed Content

- ~~Belt system section~~ — removed entirely

## Shared Components

All pages include these partials:

- `partials/head.html` — Meta tags, fonts preload, CSS link, Open Graph base tags
- `partials/nav.html` — Site header with active page highlighting via Handlebars conditional
- `partials/footer.html` — Site footer with current year

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
│   │   ├── about.html
│   │   ├── gallery.html
│   │   ├── locations.html
│   │   ├── events.html
│   │   ├── shop.html
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
