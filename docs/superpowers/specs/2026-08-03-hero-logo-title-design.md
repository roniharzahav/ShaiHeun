# Hero Overlay: Single-Line Title + Logo

## Summary

Redesign the homepage hero overlay so the brand name "שאי הון" appears on a single line, with the association logo (`logo.png`) placed to its right (visually, in the RTL layout).

## Goal

- Replace the current two-line title (`שאי` / `הון`) with a one-line lockup.
- Add `logo.png` inline with the title, on the same visual line.
- Keep the hero overlay readable and balanced on desktop and mobile.
- Preserve accessibility and the page heading hierarchy.

## Files affected

- `src/pages/index.html`
- `src/pages/styles.css`

## Detailed design

### HTML

In the hero carousel overlay, replace:

```html
<h1 class="hero-title">
    <span class="title-line">שאי</span>
    <span class="title-line title-line--accent">הון</span>
</h1>
```

With:

```html
<h1 class="hero-title">
    <img src="logo.png" alt="" class="hero-title-logo">
    <span class="hero-title-text">שאי <span class="hero-title-accent">הון</span></span>
</h1>
```

Because the document is `dir="rtl"`, the DOM order places the logo on the right and the text to its left.

### CSS

1. Convert `.hero-title` from a block container to an inline flex row, centered:
   ```css
   .hero-title {
       display: inline-flex;
       align-items: center;
       justify-content: center;
       gap: 0.35em;
   }
   ```
2. Size the logo relative to the title font:
   ```css
   .hero-title-logo {
       height: 1.1em;
       width: auto;
       flex-shrink: 0;
   }
   ```
3. Keep the text on one line:
   ```css
   .hero-title-text {
       white-space: nowrap;
   }
   ```
4. Replace the old accent styling. Remove `.title-line` and `.title-line--accent` rules; add:
   ```css
   .hero-title-accent {
       color: var(--accent-bright);
       font-style: italic;
       font-weight: 500;
   }
   ```
5. Keep existing `.hero-title` font size (`clamp(52px, 11vw, 150px)`), `font-weight: 900`, and `letter-spacing: -3px`.
6. Keep the `.carousel-overlay` centered flex column, eyebrow, and lede untouched.

### Responsive behavior

- The title font already scales via `clamp()`, so the logo scales proportionally with it.
- The flex row prevents the logo and text from wrapping to separate lines.
- On mobile, the `1.1em` logo remains legible without extra breakpoint rules.

### Accessibility

- The logo image uses `alt=""` because the adjacent "שאי הון" text already serves as the heading label. This avoids redundant announcements by screen readers.
- The `h1` remains the page’s primary heading.

## Acceptance criteria

- [ ] `src/pages/index.html` title lockup uses a single line with logo + text.
- [ ] `src/pages/styles.css` lays out the logo and title inline, centered.
- [ ] The word "הון" keeps the accent color (`var(--accent-bright)`).
- [ ] The eyebrow and lede text remain unchanged.
- [ ] The design is visually balanced on desktop and mobile.
- [ ] Build succeeds with `npm run build`.

## Notes

- This change redesigns only the overlay graphics; the carousel placeholder images stay gray until photos are provided.
- No JavaScript changes are required.
- The logo file `public/logo.png` already exists and is copied to `dist/` by Vite.
