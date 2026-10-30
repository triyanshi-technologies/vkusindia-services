import {defineField, defineType} from 'sanity'

/**
 * Bilingual text: English and Russian side by side. The website picks one by
 * the visitor's language, matching `Localized<string>` in apps/web.
 */
const languages = [
  {id: 'en', title: 'English'},
  {id: 'ru', title: 'Русский'},
] as const

export const localeString = defineType({
  name: 'localeString',
  title: 'Text',
  type: 'object',
  options: {columns: 2},
  fields: languages.map((language) =>
    defineField({
      name: language.id,
      title: language.title,
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph',
  type: 'object',
  options: {columns: 2},
  fields: languages.map((language) =>
    defineField({
      name: language.id,
      title: language.title,
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ),
})
