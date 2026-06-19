# The Statecraft Institute

Website for The Statecraft Institute — an India-focused geopolitics and foreign policy think-tank.

Built on the [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2 template, customised with institute branding and content types.

## Quick start

```bash
yarn          # install dependencies
yarn dev      # dev server at localhost:3000
yarn build    # production build + sitemap/search index
yarn serve    # serve the production build locally
yarn lint     # ESLint with auto-fix
```

## Content

| Type | Location | Route |
|---|---|---|
| Commentaries | `data/commentaries/**/*.mdx` | `/commentaries/[slug]` |
| People / authors | `data/people/**/*.mdx` | n/a (referenced by commentaries) |

See [`docs/HOW_TO_ADD_COMMENTARY.md`](docs/HOW_TO_ADD_COMMENTARY.md) for the step-by-step guide to publishing a new commentary (no coding required).

## Key files

| File | Purpose |
|---|---|
| `data/siteMetadata.js` | Site-wide config, social links (X: `@TSI_India_`, LinkedIn) |
| `data/headerNavLinks.ts` | Top navigation |
| `data/journalData.ts` | NEETIVIYUH journal page copy |
| `contentlayer.config.ts` | Content schema (reads from `data/commentaries/`) |
| `css/tailwind.css` | Brand colors (`--navy: #162755`, `--gold: #c9a227`) |
| `components/social-icons/index.tsx` | `SocialIcon` — accepts optional `iconClassName` prop |

## Deployment

GitHub Actions ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)) deploys to GitHub Pages on every push to `main`. Build takes 2–5 minutes.

## Licence

[MIT](LICENSE)
