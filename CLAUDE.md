# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server at localhost:3000
yarn build      # Production build (also runs postbuild script for sitemap/search index)
yarn serve      # Serve the production build
yarn lint       # ESLint with auto-fix across app/, components/, layouts/, scripts/

# Process confirmed Google Sheet submissions locally (requires .env)
uv run --project scripts/ python scripts/process_submissions.py
```

No test suite is configured. There is no single-test command.

### Submission automation

Editors mark a **Confirmed** checkbox on the Google Sheet that collects form submissions. The script `scripts/process_submissions.py` reads all confirmed, unprocessed rows, downloads the publication `.docx` from Drive, converts it to Markdown via pandoc, creates author MDX profiles for new authors, writes the publication MDX (including its `pubType` from the sheet's **Publication Type** column), and opens a GitHub PR targeting `main`. It can be triggered locally (via the command above) or via the [Process Publication Submissions](.github/workflows/process-submissions.yml) workflow from the Actions tab. Credentials for local runs live in `.env` (gitignored). GitHub Actions reads `GOOGLE_SERVICE_ACCOUNT_KEY` and `GOOGLE_SHEET_ID` from repository secrets.

## Architecture

This is **The Statecraft Institute** — a think-tank site built on the [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2 template, heavily customised with institute branding and content types.

### Content layer (Contentlayer2)

Content is defined in `contentlayer.config.ts` and lives under `data/`. Two document types:

- **Publications** (`data/publications/**/*.mdx`, document type `Blog`) — published at `/publications/[slug]`. Required frontmatter: `title`, `date`, `pubType` (`commentary` | `book-review` | `interview` — decides which listing it shows under; rendered as a `CategoryBadge`). Optional: `tags`, `draft`, `summary`, `images`, `authors`, `layout`.
- **People** (`data/people/**/*.mdx`) — author and board member profiles. Key flags: `isAuthor`, `isBoardMember`, `boardSection` (`editorial` | `advisory`), `boardOrder`.

On build success, Contentlayer writes:
- `app/tag-data.json` — tag counts used by the tag sidebar
- `public/search.json` — kbar full-text search index

### Static data files

Pages pull structured content from TypeScript files in `data/`:
- `siteMetadata.js` — site-wide config (title, URL, analytics IDs, comments, search)
- `aboutData.ts`, `expertsData.ts`, `journalData.ts`, `writeForUsData.ts` — page-specific copy
- `headerNavLinks.ts` — top navigation (edit here to add/remove nav items)

### App routes

Next.js 15 App Router. Key routes:
- `/` → `app/page.tsx` + `app/Main.tsx` — hero + latest 6 publications grid
- `/publications` — all publications with tag sidebar + `CategoryTabs` (`ListLayoutWithTags`)
- `/publications/commentaries`, `/publications/book-reviews`, `/publications/interviews` — listings filtered by `pubType` (share `layouts/PublicationListPage.tsx`)
- `/publications/[...slug]` — publication detail page
- `/publications/page/[page]` (and `/publications/<type>/page/[page]`) — paginated listings
- `/commentaries/*` and `/articles/*` — legacy redirect stubs → `/publications/*` (meta-refresh)
- `/about`, `/contact`, `/write-for-us` — static pages driven by `data/*.ts` files
- `/journal`, `/journal/author-guidelines`, `/journal/editorial-board` — NEETIVIYUH journal section
- `/team` — team page (currently commented out of nav in `headerNavLinks.ts`)
- `/_experts` — private experts page (underscore prefix; not linked in nav)
- `/tags/[tag]` — auto-generated tag pages

### Branding & styles

Brand colors are defined as CSS custom properties in `css/tailwind.css` and used as Tailwind classes throughout:
- `bg-navy` / `text-navy` — `#162755` (dark navy blue)
- `text-gold` / `border-gold` — `#c9a227` (gold)

The `.full-bleed` utility class extends a section edge-to-edge (100vw) regardless of the page container, used for hero banners and section headers.

### Social links

`data/siteMetadata.js` has active entries for:
- `x` — `https://x.com/TSI_India_`
- `linkedin` — `https://www.linkedin.com/company/the-statecraft-institute-india/`

These are rendered in the Footer via `SocialIcon`. The `SocialIcon` component (`components/social-icons/index.tsx`) accepts an optional `iconClassName` prop to override the default icon color/hover styles.

### Images

Publication images live in `public/static/images/commentaries/` (folder intentionally keeps its historical `commentaries` name even though content moved to `data/publications/`) and are named after the publication's slug — i.e. the same basename as the MDX file, keeping the source extension (e.g. `india-sagar-to-mahasagar-maritime-doctrine.jpg` for `data/publications/india-sagar-to-mahasagar-maritime-doctrine.mdx`). Author photos go in `public/static/images/people/<firstname-lastname>.jpg`.

### Deployment

GitHub Actions (`.github/workflows/pages.yml`) deploys to GitHub Pages on push to `main`. The site rebuilds automatically within 2–5 minutes of a push.
