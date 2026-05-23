Add a new article to the Statecraft Institute site.

The user will provide:

- Article content as a file path in `$ARGUMENTS` or pasted text in the chat
- Article image file
- If a new author: author image file and bio details

## Your job

### 1. Read the article content

If a file path is given in `$ARGUMENTS`, read that file. Otherwise use the text provided in the conversation.

### 2. Handle the article image

Ask the user to provide the article image file path. Then:

- Check existing files in `public/static/images/articles/` to find the next number in the sequence
- Copy the image to `public/static/images/articles/article<number>.jpg`
- Remember this path for the frontmatter e.g. `/static/images/articles/article5.jpg`

### 3. Extract or infer article fields

Extract the following from the content. If any are missing or ambiguous, ask before proceeding:

- `title` — full article title
- `date` — use today's date in `YYYY-MM-DD` format
- `tags` — 1–3 lowercase hyphenated tags inferred from the content e.g. `indo-pacific`, `foreign-policy`
- `summary` — 2–3 sentence description; write one from the content if not provided
- `authors` — confirm the author slug with the user:
  - `bhavya-chaturvedi`
  - `chakravarti-singh`
  - `manish-kumar-singh`
  - `prakash-jangid`
  - If new, handle in step 4

### 4. Handle a new author (if applicable)

If the author is not in the list above, ask the user to provide:

- Full name
- Occupation / job title
- Organisation / company
- Short bio (2–3 sentences)
- Author photo file path

Then:

- Derive the slug as `firstname-lastname` (lowercase, hyphenated)
- Copy the photo to `public/static/images/authors/firstname-lastname.jpeg`
- Create `data/authors/firstname-lastname.mdx`:

```
---
name: Full Name
avatar: /static/images/authors/firstname-lastname.jpeg
occupation: Job Title
company: Organisation Name
---

Bio text here.
```

> Author photo should be a 1:1 square image (e.g. 400×400px or 800×800px).

### 5. Generate the article filename

Derive from the title: lowercase, spaces replaced with hyphens, no special characters, ending in `.mdx`

- Example: "India's Foreign Policy 2026" → `indias-foreign-policy-2026.mdx`

Show the filename to the user and confirm before writing.

### 6. Create the article file

Write to `data/articles/<filename>.mdx`:

```
---
title: '<title>'
date: '<date>'
tags: ['<tag1>', '<tag2>']
draft: false
summary: '<summary>'
images: ['/static/images/articles/article<number>.jpg']
authors: ['<author-slug>']
---

## Summary

*<summary>*

---

<article body>

*Disclaimer: Views expressed are of the author(s) and do not necessarily reflect the views of The Statecraft Institute.*
```

### 7. Confirm what was created

List all files created or copied:

- `public/static/images/articles/article<number>.jpg`
- `data/articles/<filename>.mdx`
- `public/static/images/authors/firstname-lastname.jpeg` _(if new author)_
- `data/authors/firstname-lastname.mdx` _(if new author)_

## Rules

- Never guess the author slug — always confirm with the user
- Never proceed without the article image
- Tags must be lowercase with hyphens, no spaces
- The disclaimer line must always be the last line of the article body
- Do not create any file until the user has confirmed the filename and all fields
