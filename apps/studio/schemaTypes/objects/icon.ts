import {defineField} from 'sanity'

/** Icons the website can draw. Keep in sync with `contentIcons` in apps/web/src/components/icons.tsx. */
const icons = [
  'bank',
  'bolt',
  'briefcase',
  'building',
  'calendar',
  'chart',
  'check',
  'clipboard-check',
  'clock',
  'factory',
  'file-text',
  'flask',
  'globe',
  'laptop',
  'megaphone',
  'message',
  'mountain',
  'package',
  'search',
  'shield',
  'sprout',
  'target',
  'trending-up',
  'truck',
  'users',
]

export function iconField(name = 'icon') {
  return defineField({
    name,
    title: 'Icon',
    type: 'string',
    options: {list: icons},
    validation: (rule) => rule.required(),
  })
}
