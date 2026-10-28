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
npm run dev          # website  -> http://localhost:3000
npm run dev:studio   # studio   -> http://localhost:3333
```

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

| Branch             | Host         | Notes                                                        |
| ------------------ | ------------ | ------------------------------------------------------------ |
| `main`             | Vercel       | Production. Language detection by cookie and visitor country |
| `gh-pages-preview` | GitHub Pages | Temporary static preview. Language detection in the browser  |
