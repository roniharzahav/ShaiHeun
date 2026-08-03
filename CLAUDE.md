# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static, multi-page Hebrew (RTL) website for עמותת שאי-הון ישראל, a martial-arts association. Built with Vite and `vite-plugin-handlebars`. No frontend framework — plain HTML, CSS, and a small vanilla-JS bundle.

## Development commands

All commands run from the repository root.

- `npm install` — install dependencies.
- `npm run dev` — start Vite dev server.
- `npm run build` — production build into `dist/`.
- `npm run preview` — preview the production build locally.

There is no test runner, linter, or formatter configured at this time.

## Architecture

### Build setup

- `vite.config.js` configures Vite with `vite-plugin-handlebars`.
- `root: 'src/pages'` — Vite serves pages from `src/pages/`.
- `publicDir: '../../public'` — files in `public/` are copied as-is to `dist/`.
- `build.outDir: '../../dist'` — production output lands in repo-root `dist/`.
- `base: './'` — relative paths are used so the site works on GitHub Pages.
- Rollup `input` lists every HTML page so they are all emitted during build.
- CSS output is forced to `assets/styles.css` via `assetFileNames`.

### Source layout

- `src/pages/` — page templates and the single JS/CSS bundle.
  - `index.html`, `about.html`, `gallery.html`, `locations.html`, `events.html`, `shop.html`, `contact.html`
  - `styles.css` — all site styles (~1,600 lines).
  - `script.js` — all interactions (mobile nav, lightbox, gallery expand, scroll reveal, contact form).
- `src/partials/` — Handlebars partials included by every page:
  - `head.html` — meta tags, OG/Twitter cards, Google Fonts, stylesheet link.
  - `nav.html` — site header and navigation; active state set via page flags (`home`, `about`, etc.).
  - `footer.html` — footer and shared `<script type="module" src="./script.js">` tag.
- `public/` — static assets copied directly to `dist/`: images, `logo.png`, `hero.png`, gallery images, `founder.jpg`.
- `assets/` — committed build artifacts from earlier builds. The canonical source of truth is `src/pages/styles.css` and `src/pages/script.js`; Vite rebuilds `dist/assets/` on every `npm run build`.

### Page conventions

- Every page is `<html lang="he" dir="rtl">`.
- Each page invokes partials like:
  ```handlebars
  {{> head title="דף הבית" description="..."}}
  {{> nav home=true}}
  {{> footer}}
  ```
- Page-specific active nav state is passed as boolean flags to `nav.html`.
- Shared context (`siteName`, `siteUrl`) is injected in `vite.config.js` and available in templates.

### Interactions

`src/pages/script.js` is the only JavaScript file. It handles:

- Scroll-progress bar and sticky-header shadow.
- Mobile navigation toggle.
- Contact form success state (form is client-side only; no backend endpoint).
- Footer current year.
- Event cards: elements with `data-event-date` are dimmed when the date is in the past.
- Gallery expand/collapse and image lightbox with captions from `data-caption`.
- Reveal-on-scroll animations via `IntersectionObserver`.
- Smooth scrolling for same-page anchors.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` (and via `workflow_dispatch`). It runs `npm ci` and `npm run build`, then uploads `dist/`.

## Project documentation

Design plans and specs live in `docs/superpowers/`:

- `docs/superpowers/plans/` — implementation plans (e.g., `2026-05-29-design-improvements.md`).
- `docs/superpowers/specs/` — focused design specs (e.g., `2026-05-29-hero-founder-removal.md`).

When asked to implement design changes, check these documents first; they often contain the exact files, selectors, and intended behavior.

## Important file relationships

- `src/partials/head.html` links to `./assets/styles.css`, so every built page expects CSS at `assets/styles.css`. Do not rename the stylesheet output without updating `vite.config.js`.
- `src/partials/footer.html` loads `./script.js`, so the bundled JS must remain at `script.js` relative to each page.
- Gallery lightbox captions are driven by `data-caption` attributes on `.gallery-item img` elements (`gallery.html`).
- Event past/future styling is driven by ISO dates in `data-event-date` attributes (`events.html`).
