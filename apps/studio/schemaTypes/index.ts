import {service} from './documents/service'
import {siteSettings} from './documents/site-settings'
import {
  checklistBlock,
  comparisonBlock,
  featuresBlock,
  industriesBlock,
  stepsBlock,
} from './objects/blocks'
import {localeString, localeText} from './objects/locale'

export const schemaTypes = [
  siteSettings,
  service,
  featuresBlock,
  stepsBlock,
  checklistBlock,
  comparisonBlock,
  industriesBlock,
  localeString,
  localeText,
]
