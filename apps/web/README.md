# web

The vkusindia website (Next.js 16, App Router).

Run commands from the repository root (see the [root README](../../README.md)). To run them from this folder instead:

```bash
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Folder structure

```
src/
  app/           Routes, layouts and global styles
  assets/images/ Stock photos for home and about (Unsplash License), imported statically
  components/
    layout/      Site shell: header, mobile nav, footer, floating chat
    sections/    Page sections, including the service page blocks edited in Sanity
    ui/          Generic building blocks: Container, Section, ButtonLink, PageHeader
  config/        Site name, URL and navigation
  content/       Content loaders: services and site settings from Sanity, the rest from data/
    data/        Bilingual JSON for home, about, CTA and privacy: { "en": "...", "ru": "..." }
  i18n/          Locales, UI dictionaries and locale-aware paths
  lib/           Small helpers
  sanity/        Sanity client and GROQ queries
```

## Content

| Content                                            | Edited in                     |
| -------------------------------------------------- | ----------------------------- |
| Services (text, sections, photos)                  | Sanity Studio                 |
| Site settings (phone, email, chat links, hours)    | Sanity Studio                 |
| Home, about, CTA and privacy texts                 | `src/content/data/*.json`     |
| Interface text (menu, buttons, form labels)        | `src/i18n/dictionaries/*.ts`  |

Sanity content is cached and refreshed every few minutes. The website needs
`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (see `.env.example`).

The structure grows as features are added. Keep this section up to date.
