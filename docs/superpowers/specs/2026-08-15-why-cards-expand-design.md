# #why Cards Expand-on-Interaction Design

## Goal
Allow visitors to read the full text inside each `#why` section card on hover (desktop) or press/tap (touch and keyboard), without the card pushing neighboring cards out of place.

## Scope
- Apply only to the four cards inside `#why` (`src/pages/index.html`).
- Keep the existing `#what` card behavior unchanged (centered overlay, fixed aspect-ratio).
- Re-use existing `data-card`, `aria-expanded`, `is-open`, and keyboard/click handlers in `src/pages/script.js`.

## Structure change
Each `#why` grid item currently looks like:

```html
<li class="card" data-card aria-expanded="false" tabindex="0" role="button">...</li>
```

Change it to:

```html
<li class="card-wrapper">
  <div class="card" data-card aria-expanded="false" tabindex="0" role="button">...</div>
</li>
```

- `.card-wrapper` is the grid item: `position: relative`, no padding/margin changes.
- `.card` is the interactive surface that expands out of flow when open.

## Collapsed state
- `.card` has `position: relative`, `aspect-ratio: 3 / 4` (desktop), `16 / 9` (mobile).
- Background image, title, and hidden body behave exactly as today.

## Expanded state
When `.card.is-open` is present (or `:hover` on hover-capable devices):

- `.card` switches to:
  - `position: absolute`
  - `inset: 0`
  - `z-index: 10`
  - `aspect-ratio: auto`
  - `height: auto`
  - `max-height: 420px` (desktop) / `380px` (mobile)
  - `overflow: hidden` on the card, so the body can scroll if needed
  - subtle `box-shadow`
- `.card-image` dims/scales as today.
- `.card-title` fades out as today.
- `.card-body` fades in and is scrollable if content exceeds the card max-height:
  - `overflow-y: auto`
  - `max-height: 100%`
- The card floats above its neighbors; the grid cell keeps its original size because `.card-wrapper` remains in flow.

## Interaction
- Desktop with fine pointer: CSS `:hover` expands the card; moving the cursor away collapses it.
- Touch and keyboard: existing `script.js` toggles `is-open` and `aria-expanded` on click/tap or `Enter`/`Space`. A second click/tap or `Escape` closes the card.
- Focus outline remains visible for keyboard users.

## Responsive notes
- Desktop (`> 640px`): cards are 3/4 aspect-ratio; expanded max-height 420px.
- Mobile (`<= 640px`): cards are 16/9 aspect-ratio; expanded max-height 380px.
- The grid itself stays 4 → 2 → 1 columns as today.

## Files to modify
- `src/pages/index.html` — wrap each `#why` card in `.card-wrapper`.
- `src/pages/styles.css` — add `.card-wrapper`, `.section--why .card`, and expanded-state rules scoped to `#why`.

## Accessibility
- `aria-expanded` continues to reflect open/closed state.
- `role="button"`, `tabindex="0"`, and keyboard handlers remain unchanged.
- Body text is readable without hover via the open state, and scrollable if it exceeds the max-height.
