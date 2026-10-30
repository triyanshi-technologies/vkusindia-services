import {defineField, defineType} from 'sanity'

/** One document only: contact details used in the footer, contact page, service pages and chat button. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      description: 'As it should be shown, e.g. +7 (900) 000-00-00. Also used for calls and WhatsApp.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'email', type: 'string', validation: (rule) => rule.required().email()}),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp link',
      description: 'e.g. https://wa.me/79000000000',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'telegramUrl',
      title: 'Telegram link',
      description: 'e.g. https://t.me/username',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'hours', title: 'Office hours', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'responseTime',
      title: 'Response time',
      description: 'Shown under the office hours, e.g. "We usually reply within one business day."',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
