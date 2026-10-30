# vkusindia

Website for vkusindia, a consulting company that helps international businesses enter and grow in the Russian market.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS 4
- [Sanity](https://www.sanity.io) (headless CMS)
- English and Russian (`/en`, `/ru`)

## Repository structure

```
apps/
  web/      Next.js website
  studio/   Sanity Studio (CMS)
```

This is an npm workspaces monorepo. Install dependencies once from the repository root.

## Getting started

Requirements: Node.js 22 or newer.

```bash
npm install
cp apps/web/.env.example apps/web/.env.local   # then fill in the Sanity project ID
npm run dev          # website  -> http://localhost:3000
```

Content is edited in the hosted Sanity Studio. `npm run dev:studio` runs it locally
(http://localhost:3333) when working on the Studio itself.

## Scripts (run from the root)

| Script               | What it does                     |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start the website in dev mode    |
| `npm run dev:studio` | Start Sanity Studio              |
| `npm run build`      | Production build of the website  |
| `npm run start`      | Serve the production build       |
| `npm run lint`       | Lint all apps                    |
| `npm run typecheck`  | Type-check all apps              |

## Deployment

| Branch              | Host         | Notes                                                        |
| ------------------- | ------------ | ------------------------------------------------------------ |
| `main`              | Vercel       | Production. Language detection by cookie and visitor country |
| `github-pages-demo` | GitHub Pages | Static demo. Saved language (cookie) or English              |

The GitHub Pages branch is a static export (`output: "export"`, no proxy, no Cache
Components). `.github/workflows/github-pages.yml` builds and deploys it on every push to
`github-pages-demo`, on every Sanity publish (webhook) and on demand. Sanity changes go live
on Vercel within a few minutes without a deploy.
