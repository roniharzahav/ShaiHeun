# Decorative Geometric Accents Design

## Goal
Add minimal red geometric decorative accents to the homepage without changing the existing color palette, typography, or layout.

## Scope
- Homepage only (`src/pages/index.html` and `src/pages/styles.css`).
- Three decorative elements:
  1. **Corner brackets** behind each `h2.section-title` (what and why sections).
  2. **Diagonal slash divider** between the two card sections.
  3. **Small corner accent** on the hero overlay, mirroring the bracket style.

## Design Details

### Corner brackets behind section titles
- Thin red lines using existing `--accent` (#c1121f).
- Two L-shaped brackets, one top-right and one bottom-left of the title, framing it.
- Implemented with `::before` and `::after` pseudo-elements on `.section-title`.
- Size: roughly 120% of the title’s width/height, with 2px line thickness.
- Opacity: 1.0 (clean red).
- Must not affect text readability or layout flow.

### Diagonal slash divider
- A single 40px × 2px line, rotated 25°, centered between `#what` and `#why`.
- Color: `--accent` at 60% opacity.
- Implemented as a decorative `::after` pseudo-element on `.section--what` or as a standalone divider element.

### Hero corner accent
- One small L-shaped bracket in the top-right of `.carousel-overlay`.
- Uses same 2px red line style as section title brackets.
- Sits behind the text (z-index below content).

## Constraints
- No new colors, fonts, or font sizes.
- No animations.
- Decorative only — not interactive.
- RTL-compatible.
- Must keep the current clean, white-background aesthetic.

## Acceptance Criteria
- [ ] Both section titles show corner brackets.
- [ ] A diagonal slash divider appears between the two sections.
- [ ] Hero overlay has a small corner accent.
- [ ] Build passes (`npm run build`).
- [ ] Layout remains stable on desktop and mobile.
