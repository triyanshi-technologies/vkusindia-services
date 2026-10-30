import {defineArrayMember, defineField, defineType} from 'sanity'
import {iconField} from '../objects/icon'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'main', title: 'Main', default: true},
    {name: 'sections', title: 'Page sections'},
  ],
  fields: [
    defineField({name: 'title', type: 'localeString', group: 'main', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'URL',
      description: 'Used in the page address, e.g. /en/services/consultation. Changing it breaks old links.',
      type: 'slug',
      group: 'main',
      options: {source: 'title.en', maxLength: 64},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      description: 'Position in menus and lists (1 comes first).',
      type: 'number',
      group: 'main',
      validation: (rule) => rule.required().integer().min(1),
    }),
    {...iconField(), group: 'main'},
    defineField({
      name: 'summary',
      description: 'One sentence, shown on service cards and as the page heading.',
      type: 'localeText',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      description: 'Short line under the title at the top of the page.',
      type: 'localeText',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'main',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          description: 'What the photo shows, for screen readers and search engines.',
          type: 'localeString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Overview paragraphs',
      type: 'array',
      group: 'main',
      of: [defineArrayMember({type: 'localeText', preview: {select: {title: 'en'}}})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'blocks',
      title: 'Page sections',
      description: 'Add, remove and reorder sections. Each type keeps the website design.',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({type: 'featuresBlock'}),
        defineArrayMember({type: 'stepsBlock'}),
        defineArrayMember({type: 'checklistBlock'}),
        defineArrayMember({type: 'comparisonBlock'}),
      ],
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title.en', subtitle: 'title.ru', media: 'image', order: 'order'},
    prepare({title, subtitle, media, order}) {
      return {title: `${order ?? '–'}. ${title ?? 'Untitled'}`, subtitle, media}
    },
  },
})
