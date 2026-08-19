# Hero Carousel Title: Full Red Brand Name

## Summary

In the homepage hero carousel overlay, make the entire brand name "שאי-הון" appear in the accent red color (`var(--accent-bright)`). Currently "שאי-" is rendered in the paper (white) color and only "הון" is red.

## Goal

- Ensure the full phrase "שאי-הון" reads as one red brand name.
- Keep the existing italic/weight styling on "הון" unchanged.
- Limit the change to the carousel overlay so other hero title uses are unaffected.

## Files affected

- `src/pages/styles.css`

## Detailed design

### CSS

In the existing carousel overlay rule:

```css
.carousel-overlay .hero-title {
    color: var(--paper);
    margin: 16px 0;
}
```

Change `color` from `var(--paper)` to `var(--accent-bright)`:

```css
.carousel-overlay .hero-title {
    color: var(--accent-bright);
    margin: 16px 0;
}
```

Because `.hero-title-text` has no explicit color, it will inherit the red from its parent. `.hero-title-accent` already sets `color: var(--accent-bright)`, so "הון" stays the same red shade while "שאי-" switches from white to red.

### HTML

No markup changes are required.

### Responsive behavior

No responsive adjustments needed; only the text color changes.

### Accessibility

No impact on accessibility. Color contrast against the dark carousel overlay should be verified visually.

## Acceptance criteria

- [ ] The text "שאי-" in the carousel hero title is red (`var(--accent-bright)`).
- [ ] The text "הון" remains red (`var(--accent-bright)`).
- [ ] The change is scoped to `.carousel-overlay .hero-title` only.
- [ ] Build succeeds with `npm run build`.

## Notes

- No JavaScript changes are required.
- The red shade is the existing `--accent-bright` CSS custom property.
