---
name: add-article
description: >
  Publish a new article to the Statecraft Institute site. Creates the MDX file, handles image numbering, and optionally adds a new author profile. Use whenever the user wants to add, publish, or create an article.
---

# Add Article — Statecraft Institute

Publishing a new article means creating an MDX file under `data/articles/` with correct frontmatter, and optionally creating a new author profile under `data/people/`. This skill walks through that in one go.

---

## Step 1 — Gather information

Before writing any files, collect everything needed. Run these two reads in parallel:

- List `public/static/images/articles/` to find the highest-numbered image file (e.g. `article13.jpg` → next slot is **14**). Tell the user: "The next image should be named `article14.jpg` (or `.jpeg`). Please upload it to `public/static/images/articles/` before we commit."
- List `data/people/` to get all existing author slugs (the filenames without `.mdx`).

Then ask the user for the article details using AskUserQuestion. Collect all of this in a **single** question call — don't make the user answer in multiple rounds. You need:

1. **Title** — full article title
2. **Author slug** — show the list of known slugs from `data/people/`. If their author isn't there, ask for the new author's full name and bio details (name, occupation, company, short bio).
3. **Tags** — 1–3 topic keywords, lowercase with hyphens (e.g. `indo-pacific`, `foreign-policy`, `china`). Ask for comma-separated input.
4. **Summary** — 2–3 sentences that will appear in the article listing.
5. **Article body** — the full article text, or confirm it will be added manually later.

Today's date (from context: `currentDate`) should be used as the default `date` — don't ask the user for it unless they want to override.

---

## Step 2 — Derive the slug and image path

**Slug**: Convert the title to kebab-case — lowercase, spaces become hyphens, strip all special characters (punctuation, apostrophes, colons, etc.).

Example: `"India's Gulf Shield: Hormuz Calculus"` → `india-s-gulf-shield-hormuz-calculus`

Better approach: strip non-alphanumeric chars first, then lowercase and hyphenate spaces. Run a quick sanity check — does the slug read clearly? If it looks awkward (double hyphens, leading/trailing hyphens), clean it up before proceeding.

Confirm the slug and the file path (`data/articles/<slug>.mdx`) with the user in one line before writing: _"I'll create `data/articles/india-gulf-shield.mdx`. OK?"_

**Image**: Use the next slot number found in Step 1. The frontmatter path will be `/static/images/articles/article<N>.jpg` (adjust extension if user uploaded `.jpeg`).

---

## Step 3 — Write the article file

Create `data/articles/<slug>.mdx` with this exact frontmatter format. Use single-quoted values to match existing articles. **Exception:** if a field value contains an apostrophe (e.g. a title like "India's Arctic Ambitions"), use double quotes for that field instead — never escape apostrophes as `''`.

```mdx
---
title: 'Full Article Title Here'
date: '2026-05-29'
tags: ['tag-one', 'tag-two']
draft: false
summary: 'Two or three sentence summary that appears in the article listing.'
images: ['/static/images/articles/articleN.jpg']
authors: ['author-slug']
---

## Summary

_Two or three sentence summary here._

---

Article body goes here.

## First Section Heading

Paragraph here.

*Disclaimer: Views expressed are of the author(s) and do not necessarily reflect the views of The Statecraft Institute.*
```

If the user provided a full article body, insert it between the `---` separator and the disclaimer. Keep their headings and formatting intact — just make sure `##` headings are used (not `#`).

If they said they'll add the body manually, leave the placeholder text as-is.

---

## Step 4 — Create a new author file (if needed)

If the author slug doesn't exist in `data/people/`, create `data/people/<firstname-lastname>.mdx`:

```mdx
---
name: Full Name
avatar: /static/images/people/firstname-lastname.jpg
occupation: Job Title
company: Organisation Name
isAuthor: true
isBoardMember: false
---

A short 2–3 sentence bio here.
```

Use the details the user provided. Remind them to upload the author's photo to `public/static/images/people/firstname-lastname.jpg` (square image, 400×400px or larger).

---

## Step 5 — Commit

Once all files are written, stage and commit only the new files:

```bash
git add data/articles/<slug>.mdx
# if new author was created:
git add data/people/<author-slug>.mdx
```

Commit message format: `add article: <short descriptive title in lowercase>`

Example: `add article: india gulf shield hormuz calculus`

Show the user the commit message before running — let them approve or tweak it.

After committing, remind them:
1. Upload the article image to `public/static/images/articles/article<N>.jpg`
2. If a new author: upload their photo to `public/static/images/people/`
3. Push to trigger the site rebuild: `git push`

---

## Notes

- The site rebuilds automatically after a push (GitHub Actions, 2–5 minutes).
- `draft: false` publishes immediately; use `draft: true` to stage without publishing.
- Tags must be lowercase with hyphens — no spaces, no capitals.
- The disclaimer line at the bottom is standard and should always be included.
