import {service} from './documents/service'
import {siteSettings} from './documents/site-settings'
import {checklistBlock, comparisonBlock, featuresBlock, stepsBlock} from './objects/blocks'
import {localeString, localeText} from './objects/locale'

export const schemaTypes = [
  siteSettings,
  service,
  featuresBlock,
  stepsBlock,
  checklistBlock,
  comparisonBlock,
  localeString,
  localeText,
]
