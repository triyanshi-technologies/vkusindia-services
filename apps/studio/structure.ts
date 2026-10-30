import type {StructureResolver} from 'sanity/structure'

/** Sidebar: the site settings singleton first, then services in menu order. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')),
      S.divider(),
      S.documentTypeListItem('service')
        .title('Services')
        .child(S.documentTypeList('service').title('Services').defaultOrdering([{field: 'order', direction: 'asc'}])),
    ])
