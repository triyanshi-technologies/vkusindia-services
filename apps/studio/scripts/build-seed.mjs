/**
 * Converts the website's JSON content into a Sanity import file (one-time seed).
 *
 *   node scripts/build-seed.mjs
 *   npx sanity dataset import seed/content.ndjson production --replace
 *
 * Images are referenced as local files and uploaded by the import command.
 * Document IDs are fixed, so re-running with --replace updates instead of duplicating.
 */
import {randomUUID} from 'node:crypto'
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const studioDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const webDir = resolve(studioDir, '../web')
const readJson = (path) => JSON.parse(readFileSync(resolve(webDir, path), 'utf8'))

const services = readJson('src/content/data/services.json')

const key = () => randomUUID().replaceAll('-', '').slice(0, 12)
const withKey = (type, value) => ({_type: type, _key: key(), ...value})
const imageAsset = (imageKey) =>
  `image@${pathToFileURL(resolve(webDir, 'src/assets/images', `${imageKey}.jpg`)).href}`

const blockConverters = {
  features: (block) => ({
    _type: 'featuresBlock',
    items: block.items.map((item) => withKey('feature', item)),
  }),
  steps: (block) => ({
    _type: 'stepsBlock',
    items: block.items.map((item) => withKey('step', item)),
  }),
  checklist: (block) => ({
    _type: 'checklistBlock',
    items: block.items.map((item) => withKey('localeText', item)),
  }),
  comparison: (block) => ({
    _type: 'comparisonBlock',
    left: block.columns[0],
    right: block.columns[1],
    rows: block.rows.map((row) =>
      withKey('row', {feature: row.feature, left: row.values[0], right: row.values[1]}),
    ),
  }),
}

const serviceDocuments = services.map((entry, index) => ({
  _id: `service-${entry.slug}`,
  _type: 'service',
  title: entry.title,
  slug: {_type: 'slug', current: entry.slug},
  order: index + 1,
  icon: entry.icon,
  summary: entry.summary,
  tagline: entry.tagline,
  image: {_type: 'image', _sanityAsset: imageAsset(entry.image.key), alt: entry.image.alt},
  intro: entry.intro.map((paragraph) => withKey('localeText', paragraph)),
  blocks: entry.blocks.map((block) => ({
    _key: key(),
    title: block.title,
    ...(block.intro && {intro: block.intro}),
    ...blockConverters[block.type](block),
  })),
}))

// Demo contact details until the client sends real ones.
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  phone: '+7 (900) 000-00-00',
  email: 'hello@example.com',
  whatsappUrl: 'https://wa.me/79000000000',
  telegramUrl: 'https://t.me/vkusindia_demo',
  hours: {en: 'Monday to Friday, 9:00–18:00 (Moscow time)', ru: 'Понедельник — пятница, 9:00–18:00 (МСК)'},
  responseTime: {
    en: 'We usually reply within one business day.',
    ru: 'Обычно мы отвечаем в течение одного рабочего дня.',
  },
}

const outFile = resolve(studioDir, 'seed/content.ndjson')
mkdirSync(dirname(outFile), {recursive: true})
writeFileSync(outFile, [siteSettings, ...serviceDocuments].map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(`Wrote ${serviceDocuments.length + 1} documents to ${outFile}`)
