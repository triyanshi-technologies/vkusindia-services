# studio

Sanity Studio for the vkusindia website (project `dhxhd5vu`, dataset `production`).
Editors use the hosted Studio; run it locally only to work on the Studio itself.

```bash
npm run dev       # http://localhost:3333
npx sanity deploy # publish schema or config changes to the hosted Studio
```

## What is edited here

- **Site settings**: phone, email, WhatsApp and Telegram links, office hours (one document).
- **Services**: title, URL, menu order, icon, photo and texts, plus page sections built from
  four types (features grid, steps timeline, checklist, comparison table). Every text has
  English and Russian side by side.

## Folder structure

```
schemaTypes/
  documents/   service, siteSettings
  objects/     Bilingual fields, icon list, page section types
structure.ts   Studio sidebar
```

The icon list in `schemaTypes/objects/icon.ts` must match `contentIcons` in
`apps/web/src/components/icons.tsx`.
