# Hero Founder Removal — Design Spec

## Overview

Remove the founder mention from the hero section to create a more uplifting first impression. The founder's story remains on the About page and in the new homepage About teaser.

## Change

**File:** `src/pages/index.html`

Remove the `.hero-meta` div from the hero section:

```html
<!-- REMOVE THIS ENTIRE BLOCK -->
<div class="hero-meta">
    <span>נוסדה 1960</span>
    <span class="dot"></span>
    <span>על ידי אונשי סידני שלמה פייגה ז״ל</span>
</div>
```

The hero will flow directly from the quote to the CTA button.

## Rationale

- The "ז״ל" notation creates a memorial tone on the site's most prominent section
- The About teaser (added in previous work) and the full About page already tell the founder's story with proper context and his photo
- A cleaner hero focuses visitors on the invitation to train, not the history

## No CSS changes needed

The `.hero-meta` styles can remain in `styles.css` as harmless unused rules (they do not affect layout when the element is absent).
