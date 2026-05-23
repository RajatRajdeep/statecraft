# How to Add a New Article

No coding required. Everything is done through the browser.

---

## Step 1 — Open the repository in the browser editor

1. Go to the repository link shared by the site owner
2. Once on the repository page, press the **`.` (period/dot) key** on your keyboard
3. This opens a full **VS Code editor inside your browser** — no installation needed

> **Tip:** The URL will change from `github.com/...` to `github.dev/...` — that's normal.

---

## Step 2 — Upload your article image

1. In the left sidebar, open the folder **`public/static/images/articles/`**
2. Check the existing image files — they are named `article1.jpg`, `article2.jpeg`, etc.
3. Right-click on the `articles` folder → **Upload...**
4. Select your image file and upload it
5. Rename it to the next number in the sequence
   - Example: if `article4.jpeg` already exists, rename yours **`article5.jpg`**

---

## Step 3 — Create the article file

1. In the left sidebar, open the folder **`data/articles/`**
2. Right-click on the `articles` folder → **New File...**
3. Name the file using **lowercase letters and hyphens only**, ending in `.mdx`
   - This filename becomes the article's URL on the live site
   - Example: `india-foreign-policy-2026.mdx` → URL will be `.../articles/india-foreign-policy-2026`
4. The file opens in the editor. Paste the following at the very top:

```
---
title: "Your Full Article Title"
date: "2026-05-22"
tags: ["indo-pacific", "foreign-policy"]
draft: false
summary: "One or two sentences describing the article. This appears in the article list."
images: ["/static/images/articles/article5.jpg"]
authors: ["author-slug-here"]
---

## Summary

*Your one or two sentence summary here.*

---

Write your article content here.

## First Section Heading

Your paragraph here.

*Disclaimer: Views expressed are of the author(s) and do not necessarily reflect the views of The Statecraft Institute.*
```

### Filling in the fields

| Field | What to put |
|---|---|
| `title` | The full article title, inside single quotes |
| `date` | Today's date in `YYYY-MM-DD` format |
| `tags` | 1–3 topic tags, **lowercase with hyphens** e.g. `'indo-pacific'`, `'foreign-policy'` |
| `draft` | Always `false` to publish, `true` to hide |
| `summary` | 2-3 sentence description shown in the article list |
| `images` | Path to your uploaded image e.g. `'/static/images/articles/article5.jpg'` |
| `authors` | The author's slug (see list below) |

### Author slugs

| Author | Slug to use |
|---|---|
| Bhavya Chaturvedi | `bhavya-chaturvedi` |
| Chakravarti Singh | `chakravarti-singh` |
| Manish Kumar Singh | `manish-kumar-singh` |
| Prakash Jangid | `prakash-jangid` |

### Formatting your article

Use plain text with these simple markers:

```
## Big Heading

### Smaller Heading

Regular paragraph here.

**Bold text** and *italic text*

[Link text](https://example.com)
```

To preview your markdown before committing, paste it here: https://markdownlivepreview.dev

---

## Step 4 — Add a new author (skip if author already exists)

If the author is not in the list above:

1. In the editor, open **`data/authors/`** and create a new file named `firstname-lastname.mdx`
2. Paste the following and fill in the details:

```
---
name: Full Name
avatar: /static/images/authors/firstname-lastname.jpeg
occupation: Job Title
company: Organisation Name
---

A short 2–3 sentence bio.
```

3. Also upload their photo to **`public/static/images/authors/`** — name it the same as the avatar field above
   - A **1:1 ratio (square) image** is preferred e.g. 400×400px or 800×800px

---

## Step 5 — Commit (publish) your changes

1. Click the **Source Control icon** in the left sidebar (looks like a branching line, third icon from top)
2. You will see all changed files listed under **Changes**
3. Type a short message in the box at the top describing what you added
   - Format: `add article: <short title>` e.g. `add article: india foreign policy 2026`
4. Click **Commit & Push**

That's it. All files are published in one single commit and the site will update automatically within a few minutes.

---

## How publishing works

When you click **Commit & Push**, GitHub automatically triggers a build and deployment process called a **GitHub Action**. You do not need to do anything else.

- GitHub detects the new commit and starts building the site (takes 2–5 minutes)
- Once done, the live site updates automatically
- To check progress: go back to `github.com/...` (the normal repo page) and click the **Actions** tab at the top — a green checkmark means it's live, a spinning circle means it's still building

> **If the build fails (red cross):** This usually means there is a formatting error in the article file — a missing quote, a wrong field name, or incorrect indentation in the top section. Click the failed action to see the error, fix the file in the editor, and commit again. Use https://markdownlivepreview.dev to check your content before committing.
