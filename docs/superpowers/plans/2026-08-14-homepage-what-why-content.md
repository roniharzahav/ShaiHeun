# Homepage #what and #why Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder text in the homepage `#what` and `#why` card sections with the provided Hebrew copy, update card titles, and add large centered closing paragraphs under each section.

**Architecture:** A minimal, content-only change to `src/pages/index.html` plus a new CSS utility class in `src/pages/styles.css`. No JavaScript or other pages are touched. Verification is manual via Vite build and dev-server preview.

**Tech Stack:** HTML (Handlebars partials), CSS, Vite with `vite-plugin-handlebars`.

## Global Constraints

- All text is Hebrew (RTL); preserve `lang="he" dir="rtl"` context.
- Site uses relative paths (`base: './'`); do not change asset paths.
- CSS output is forced to `assets/styles.css` via Vite config; do not rename stylesheet output.
- Keep changes scoped to `src/pages/index.html` and `src/pages/styles.css` only.
- Follow existing Clean & Light palette and typography.

---

## Task 1: Update `#what` card titles and body text

**Files:**
- Modify: `src/pages/index.html:45-104`

**Interfaces:**
- Consumes: Existing `.section--what`, `.what-hub`, `.card`, `.card-title`, `.card-body` markup.
- Produces: Updated titles and paragraphs inside each `#what` card.

- [ ] **Step 1: Update קראטה card**

  In `src/pages/index.html`, locate the `#what` section. Find the first `.card` and update:
  - Keep `.card-title` as `קראטה`.
  - Replace the placeholder paragraph inside `.card-body` with:

  ```html
  <p>מהקראטה אימצנו את העמידות, הבעיטות, מגוון מכות וההגנות. טכניקות אלו מפתחות שליטה בגוף, דיוק, ריכוז, נשימה נכונה ונחישות – יכולות המהוות חלק בלתי נפרד מאימוני שאי-הון.</p>
  ```

- [ ] **Step 2: Update ג'ודו card**

  In the same section, find the `.card-title` with text `ג'ודו` and replace its `.card-body` paragraph with:

  ```html
  <p>מהג'ודו אימצנו הטלות, ריתוקים, חניקות, נעילות ויכולת נפילה נכונה ובטוחה – כלי חיוני הן באימונים והן בחיי היומיום. דרך טכניקות אלו אנו לומדים להתמודד עם כוח חיצוני, לשפר יציבות ולהבין טוב יותר את תנועת הגוף במרחב.</p>
  ```

- [ ] **Step 3: Update אגרוף card**

  Find the `.card-title` with text `אגרוף` and replace its `.card-body` paragraph with:

  ```html
  <p>מעולם האיגרוף אימצנו עבודת ידיים מדויקת, הגנות, עבודת רגליים והיכולת להניע את משקל הגוף בצורה יעילה כדי לייצר כוח. עקרונות אלו משתלבים בתרגילים רבים בשיטת שאי-הון ומשפרים מהירות, תזמון ושליטה.</p>
  ```

- [ ] **Step 4: Update הגנה עצמית card title and body**

  Find the `.card-title` with text `הגנה עצמית` and:
  - Change the title to `שיטת הגנה עצמית ייחודית`.
  - Replace its `.card-body` paragraph with:

  ```html
  <p>בשאי-הון אנו מאמינים שבהגנה עצמית התוצאה היא הדבר החשוב ביותר – לחזור הביתה בשלום. לכן אנו מלמדים רצף שלם של כלים: החל ממודעות סביבתית והתנהלות נכונה בחיי היומיום, דרך מניעת עימותים וסטואציות מסוכנות, ועד להתמודדות במצבי סכנה כאשר אין ברירה. אחד המאפיינים הייחודיים של השיטה הוא תצורת התנועה הייחודית שלנו.</p>
  ```

- [ ] **Step 5: Verify edits visually**

  Run: `npm run dev`
  Open the local server URL and scroll to the `#what` section.
  Confirm all four cards show the new titles and body text, and that card expansion/hover behavior still works.

- [ ] **Step 6: Commit**

  ```bash
  git add src/pages/index.html
  git commit -m "content: update #what section card copy and titles

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

---

## Task 2: Add `#what` closing paragraph

**Files:**
- Modify: `src/pages/index.html:45-104`
- Modify: `src/pages/styles.css`

**Interfaces:**
- Consumes: Updated `#what` markup from Task 1.
- Produces: New `.section-closing` element inside `#what` and corresponding CSS class.

- [ ] **Step 1: Add closing paragraph to `#what`**

  Inside the `.container` of `#what`, after the closing `</div>` of `.what-hub`, add:

  ```html
  <p class="section-closing">שילוב כל המרכיבים יוצר שיטה הגדולה מסך חלקיה</p>
  ```

- [ ] **Step 2: Add `.section-closing` CSS class**

  In `src/pages/styles.css`, append a new rule near the end of the file (after the existing section/card styles):

  ```css
  .section-closing {
    text-align: center;
    font-size: 1.35rem;
    line-height: 1.6;
    margin-top: 3rem;
    color: var(--ink);
    font-weight: 500;
  }
  ```

- [ ] **Step 3: Verify visually**

  Run: `npm run dev`
  Confirm the closing paragraph appears centered below the `#what` cards, with larger text and adequate spacing.

- [ ] **Step 4: Commit**

  ```bash
  git add src/pages/index.html src/pages/styles.css
  git commit -m "feat: add large centered closing tagline to #what section

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

---

## Task 3: Update `#why` card titles and body text

**Files:**
- Modify: `src/pages/index.html:107-142`

**Interfaces:**
- Consumes: Existing `.section--why`, `.card-grid`, `.card`, `.card-title`, `.card-body` markup.
- Produces: Updated titles and paragraphs inside each `#why` card.

- [ ] **Step 1: Update כושר גופני card title and body**

  In `#why`, find the `.card-title` with text `כושר גופני` and:
  - Change the title to `כושר וחיזוק הגוף`.
  - Replace its `.card-body` paragraph with:

  ```html
  <p>פעילות גופנית וחיזוק הגוף הם רכיבים הכרחיים לקיום אורח חיים בריא. בשאי-הון חיזוק הגוף והכושר הגופני הינם חלק בלתי נפרד מהאימון בשיטה. דרך האימונים בשאי הון נחזק את הגוף והכוח המתפרץ דרך אימוני התנגדות, נשפר את יכולות הקורדינציה והשליטה הגופנית בזכות השימוש בקבוצות שרירים רבות העובדות בתיאום. דרך האימונים, זריזות התגובה משתפרת כדי להתמודד עם שינויי מצב פתאומיים. האימונים מגברים את יכולות שיווי המשקל דרך הנעת המשקל בצורה מבוקרת לכיוונים השונים. סיבולת מערכת הלב ריאה מתחזקת דרך האימונים המתמשכים.</p>
  ```

- [ ] **Step 2: Update ביטחון עצמי card title and body**

  Find the `.card-title` with text `חיזוק ביטחון עצמי` and:
  - Change the title to `ביטחון עצמי`.
  - Replace its `.card-body` paragraph with:

  ```html
  <p>ביטחון עצמי הינו האמונה של האדם ביכולתו להצליח במעשיו. ביטחון עצמי משפיע על התפקוד שלנו בכל תחומים. במערכות היחסים שלנו, בעבודה שלנו, על הבריאות שלנו ועוד. האימונים באומנויות לחימה ככלל ובשאי הון בפרט משפרים את תחושת הביטחון העצמי דרך הצבה והשגה של יעדים באימון, העלאת הביטחון ביכולת הגופנית ופיתוח שליטה ומשמעת עצמית.</p>
  ```

- [ ] **Step 3: Update הגנה עצמית card body**

  Find the `.card-title` with text `הגנה עצמית` and replace its `.card-body` paragraph with:

  ```html
  <p>בשאי הון אנחנו מאמינים שהמטרה של הגנה עצמית הינה להביא לכך שהפרט ישמור על עצמו מפגיעה מכל סוג. השגת מטרה זו נעשת על ידי שימוש בכלים שונים. חלק הם כלים פיזיים כגון הגנות, התקפות, שחרורים, כאשר כל האמצעים כשרים, וחלק מהכלים הינם הרגלים התנהגותיים כמו זיהוי סכנה, ערנות סביבתית, התנהגות מונעת ושימוש בשפה. שאי הון דוגלת בשיטת הגנה עצמית יעילה וייחודית בעלת טכניקות שלא נראות בשיטות אחרות, כאשר עיקרון התזוזה הוא הבסיס לטכניקות אלו.</p>
  ```

- [ ] **Step 4: Update קהילה card title and body**

  Find the `.card-title` with text `קהילה` and:
  - Change the title to `קהילתיות`.
  - Replace its `.card-body` paragraph with:

  ```html
  <p>בשאי-הון אנחנו רואים את המועדון לא רק כמקום לאימונים, אלא כמשפחה. דבר זה בא לידי ביטוי בחברויות הקרובות בין המתאמנים, בתחושת הקהילה בשיטה ובפעילויות המשותפות שהשיטה עושה יחד במהלך השנה. מאימונים מיוחדים בטבע המחברים בין כלל מתאמני השיטה בארץ ועד לארוחות משותפות בסוף אימון שנהיה חלק מהתרבות בשיטה.</p>
  ```

- [ ] **Step 5: Verify edits visually**

  Run: `npm run dev`
  Scroll to the `#why` section and confirm all four cards show the new titles and body text, and that card expansion/hover behavior still works.

- [ ] **Step 6: Commit**

  ```bash
  git add src/pages/index.html
  git commit -m "content: update #why section card copy and titles

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

---

## Task 4: Add `#why` closing paragraph

**Files:**
- Modify: `src/pages/index.html:107-142`

**Interfaces:**
- Consumes: Updated `#why` markup from Task 3 and `.section-closing` CSS class from Task 2.
- Produces: New `.section-closing` element inside `#why`.

- [ ] **Step 1: Add closing paragraph to `#why`**

  Inside the `.container` of `#why`, after the closing `</ul>` of `.card-grid`, add:

  ```html
  <p class="section-closing">בשאי-הון אנו מאמינים שאומנות לחימה היא דרך לחיים. לצד היכולות הפיזיות, המתאמנים מפתחים משמעת, אחריות, התמדה, כבוד לאחר ויכולת להתמודד עם הצלחות וכישלונות. ערכים אלו מלווים אותם בבית, בבית הספר, בעבודה ובכל תחומי החיים.</p>
  ```

- [ ] **Step 2: Verify visually**

  Run: `npm run dev`
  Confirm the closing paragraph appears centered below the `#why` cards and matches the styling of the `#what` closing paragraph.

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/index.html
  git commit -m "feat: add large centered closing tagline to #why section

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

---

## Task 5: Production build verification

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: All prior changes.

- [ ] **Step 1: Run production build**

  ```bash
  npm run build
  ```

  Expected: Build completes without errors.

- [ ] **Step 2: Preview production build**

  ```bash
  npm run preview
  ```

  Open the preview URL, scroll to `#what` and `#why`, and confirm:
  - All card titles and body text are updated.
  - Both closing paragraphs are centered and styled larger than card body text.
  - No layout breakage on desktop and mobile widths.
  - Card hover/click expansion still works.

- [ ] **Step 3: Final commit (if any additional fixes were needed)**

  If no fixes were needed, no additional commit is required. If any fixes were made, commit them with a descriptive message.

---

## Self-Review Checklist

- [ ] Spec coverage: Every card title/body update and both closing paragraphs are represented in tasks.
- [ ] Placeholder scan: No TBD, TODO, or vague instructions remain.
- [ ] Type consistency: CSS class name `.section-closing` is consistent across HTML and CSS tasks.
- [ ] Scope: Only `src/pages/index.html` and `src/pages/styles.css` are modified.
