# Page Audit — Design Spec

## Goal

Refocus the Shai-Heun site on lead generation (trial-lesson signups) while simplifying the page architecture and closing obvious style/functionality gaps.

## Page architecture

| Page | Decision | Reason |
|------|----------|--------|
| Home | Keep | Main landing page and conversion funnel entry |
| About | Keep standalone | Builds credibility; separate from Home gives the founder story room |
| Locations | Keep | Critical conversion page — visitors choose a club |
| Events | Keep | Public events act as lead magnets |
| Contact | Keep | General inquiries and central contact details |
| Shop | Keep | Kept for future e-commerce; current placeholders need clearer messaging |
| Gallery | Remove | Images absorbed into Home and About; standalone gallery rarely drives trial signups |

## Navigation

New top navigation:

**דף הבית | אודות | מועדונים | אירועים | צור קשר | חנות**

## Per-page changes

### Home
- Remove the About teaser section (`section--about` in `index.html`).
- Add a locations preview section that links prominently to `locations.html`.
- Add lightweight social proof (years active, member count, or one testimonial) near the CTA.
- Keep hero, method preview, benefits, philosophy quote, and final CTA banner.

### About
- Add a closing CTA section linking to `contact.html` or `locations.html`.
- Consider expanding the team/lineage paragraph into a brief family-of-instructors section.

### Locations
- Add a unifying CTA at the bottom of the page.
- Optional: add a simple map embed or visual location indicator per club.

### Events
- Add a registration/interest CTA per event (e.g., WhatsApp link with a pre-filled message or link to `contact.html`).
- Hide or archive past events instead of only dimming them.

### Contact
- Add a page header/hero to match the visual style of other pages.
- Fix the contact form so it actually delivers the inquiry (e.g., via a form endpoint service, mailto link, or by redirecting to WhatsApp). The current form only shows a success message without sending data.

### Shop
- Clarify whether products are available now or coming soon.
- Replace placeholder icons with real product photos when available.
- Add an order path or waitlist mechanism.

## Out of scope

- Full e-commerce checkout implementation.
- Backend or CMS integration.
- Major brand/visual redesign beyond the gaps listed above.

## Success criteria

- Gallery page is removed and no longer in navigation.
- Home no longer contains an About teaser.
- Every conversion-related page has a clear next step.
- Contact form submits or clearly explains how to reach out.
- No broken internal links after page removals.
