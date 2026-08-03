# Dragon Emblem in Homepage Design

## Goal
Add the Shi-Heun dragon image as a centered decorative emblem between the hero carousel and the "מה זה שאי הון?" section on the homepage.

## Scope
- Homepage only (`src/pages/index.html` and `src/pages/styles.css`).
- One decorative emblem element placed between `.hero-carousel` and `#what`.

## Design Details

### Placement
- Insert a new block immediately after the closing `</section>` of `.hero-carousel` and before the `<section class="section section--what" id="what">` block.
- Center the emblem horizontally.

### Image
- Source file: `shi-heun_dragon-removebg-preview.png` (provided by user).
- Copy to `public/dragon.png` so Vite copies it to `dist/` and it is served at root.
- Use a transparent-friendly format; keep the original PNG.

### Styling
- Render as a centered emblem with a circular or rounded square frame.
- Frame size: ~120px on desktop, scaling down to ~80px on mobile.
- Add a subtle red ring or background circle using `--accent` to tie it to the existing palette.
- Keep it decorative and non-interactive (no link, no hover animation required).
- Ensure it does not overlap adjacent content.

### Responsive behavior
- Maintain centering at all breakpoints.
- Reduce size on mobile so it does not dominate the gap.

## Constraints
- No new colors outside the existing palette; use `--accent` for any frame/ring.
- No animations or transitions.
- Decorative only — not clickable, not focusable.
- Build must pass (`npm run build`).

## Acceptance Criteria
- [ ] Dragon image appears centered between the hero and `#what`.
- [ ] Image is copied to `public/dragon.png` and loads correctly.
- [ ] Emblem is styled with a subtle accent frame/ring.
- [ ] Layout remains stable on desktop and mobile.
- [ ] Build passes.
