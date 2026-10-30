import {defineArrayMember, defineField, defineType} from 'sanity'
import {iconField} from './icon'

/**
 * The four section types a service page can be built from. Each one renders
 * with a fixed design on the website, so editors choose the order and content only.
 */

const blockBaseFields = [
  defineField({name: 'title', title: 'Section title', type: 'localeString', validation: (rule) => rule.required()}),
  defineField({name: 'intro', title: 'Intro (optional)', type: 'localeText'}),
]

function blockPreview(label: string) {
  return {
    select: {title: 'title.en', items: 'items', rows: 'rows'},
    prepare({title, items, rows}: {title?: string; items?: unknown[]; rows?: unknown[]}) {
      const count = (items ?? rows ?? []).length
      return {title: title ?? label, subtitle: `${label} · ${count} item${count === 1 ? '' : 's'}`}
    },
  }
}

export const featuresBlock = defineType({
  name: 'featuresBlock',
  title: 'Features grid',
  type: 'object',
  fields: [
    ...blockBaseFields,
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          fields: [
            iconField(),
            defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'localeText', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title.en', subtitle: 'icon'}},
        }),
      ],
    }),
  ],
  preview: blockPreview('Features grid'),
})

export const stepsBlock = defineType({
  name: 'stepsBlock',
  title: 'Steps timeline',
  type: 'object',
  fields: [
    ...blockBaseFields,
    defineField({
      name: 'items',
      title: 'Steps',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'step',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'localeText', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title.en', subtitle: 'description.en'}},
        }),
      ],
    }),
  ],
  preview: blockPreview('Steps timeline'),
})

export const checklistBlock = defineType({
  name: 'checklistBlock',
  title: 'Checklist',
  type: 'object',
  fields: [
    ...blockBaseFields,
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'localeText',
          preview: {select: {title: 'en'}},
        }),
      ],
    }),
  ],
  preview: blockPreview('Checklist'),
})

export const comparisonBlock = defineType({
  name: 'comparisonBlock',
  title: 'Comparison table',
  type: 'object',
  fields: [
    ...blockBaseFields,
    defineField({name: 'left', title: 'Left column heading', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'right', title: 'Right column heading', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'rows',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'row',
          type: 'object',
          fields: [
            defineField({name: 'feature', title: 'Row label', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'left', title: 'Left value', type: 'localeText', validation: (rule) => rule.required()}),
            defineField({name: 'right', title: 'Right value', type: 'localeText', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'feature.en'}},
        }),
      ],
    }),
  ],
  preview: blockPreview('Comparison table'),
})
