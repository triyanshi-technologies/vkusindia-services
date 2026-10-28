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
  assets/images/ Stock photos (Unsplash License), imported statically
  components/
    layout/      Site shell: header, mobile nav, footer, floating chat
    sections/    Page sections and service content blocks (future Sanity blocks)
    ui/          Generic building blocks: Container, Section, ButtonLink, PageHeader
  config/        Site settings and navigation
  content/       Temporary local content, replaced by Sanity later
    data/        Bilingual JSON: every text is { "en": "...", "ru": "..." }
  i18n/          Locales, dictionaries and locale-aware paths
  lib/           Small helpers
```

The structure grows as features are added. Keep this section up to date.
