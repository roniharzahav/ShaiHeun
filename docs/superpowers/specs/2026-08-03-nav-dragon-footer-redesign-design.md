# Navigation Dragon + Footer Redesign Design

## Goal
Move the dragon emblem into the site header navigation bar and redesign the footer to feature a quick email contact form and social/icon links.

## Scope
- `src/partials/nav.html` — add dragon image beside the existing logo.
- `src/partials/footer.html` — redesign footer layout with email form and social icons.
- `src/pages/styles.css` — add/update styles for header dragon and new footer.
- `public/dragon.png` — already exists; reuse it.

## Design Details

### Navigation bar
- Keep the existing brand link and `logo.png`.
- Insert the dragon image inside the `.brand` link, before the logo image.
- Dragon size: ~44px height on desktop, ~36px on mobile.
- Dragon should not push the header height beyond current bounds.
- Remove the `.dragon-emblem` block from `src/pages/index.html` since it moves to the nav.

### Footer
- Background stays dark (`#111111`).
- Two-column layout on desktop:
  - **Left column:** a rounded rectangle/card (`footer-contact-card`) containing a quick email form.
    - Fields: name, email, message.
    - Submit button: "שלח" (Send).
    - Client-side only (no backend); show a success message on submit, same pattern as the existing contact form.
  - **Right column:** large icon links.
    - Instagram icon/link.
    - YouTube icon/link.
    - Site logo icon/link (links to `index.html`).
- Stack columns vertically on mobile (form first, icons second).
- Remove the old 4-column footer grid and footer navigation columns.
- Keep copyright line at the bottom.

### Form behavior
- Use the existing contact-form success pattern from `src/pages/script.js` if available, or add a simple inline success message.
- Form is decorative/client-side only; no backend endpoint.

## Constraints
- Use existing color palette (`--accent`, `--paper`, etc.).
- No new fonts.
- Build must pass (`npm run build`).
- Keep responsive behavior stable.
- Icons: use inline SVGs for Instagram, YouTube, and the logo (reuse existing logo image).

## Acceptance Criteria
- [ ] Dragon appears beside the logo in the nav on all pages.
- [ ] Old `.dragon-emblem` block is removed from the homepage.
- [ ] Footer shows a quick email form card.
- [ ] Footer shows Instagram, YouTube, and logo icon links.
- [ ] Footer is responsive and readable on mobile.
- [ ] Build passes.
