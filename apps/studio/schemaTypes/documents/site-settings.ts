import {defineField, defineType} from 'sanity'

const logoFormats = 'image/svg+xml,image/png,image/webp'

/** One document only: logo and contact details used across the site. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'brand', title: 'Logo'},
  ],
  fields: [
    defineField({
      name: 'logo',
      description:
        'Shown in the header on a white background. SVG, or PNG/WebP with a transparent background. Leave empty to show the name "vkusindia" as text.',
      type: 'image',
      group: 'brand',
      options: {accept: logoFormats},
    }),
    defineField({
      name: 'logoOnDark',
      title: 'Logo for dark backgrounds',
      description:
        'Shown in the footer on dark blue, so it should be light (e.g. white). Leave empty to show the name as text there.',
      type: 'image',
      group: 'brand',
      options: {accept: logoFormats},
    }),
    defineField({
      name: 'phone',
      group: 'contact',
      description: 'As it should be shown, e.g. +7 (900) 000-00-00. Also used for calls and WhatsApp.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'email', type: 'string', group: 'contact', validation: (rule) => rule.required().email()}),
    defineField({
      name: 'whatsappUrl',
      group: 'contact',
      title: 'WhatsApp link',
      description: 'e.g. https://wa.me/79000000000',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'telegramUrl',
      group: 'contact',
      title: 'Telegram link',
      description: 'e.g. https://t.me/username',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Office hours',
      type: 'localeString',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'responseTime',
      group: 'contact',
      title: 'Response time',
      description: 'Shown under the office hours, e.g. "We usually reply within one business day."',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
