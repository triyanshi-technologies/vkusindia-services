/**
 * GROQ queries. Projections return exactly the shapes in src/content/types.ts,
 * so the components that render them don't know the data comes from Sanity.
 */

const localized = "{ en, ru }";

const serviceProjection = /* groq */ `{
  "slug": slug.current,
  icon,
  "title": title${localized},
  "summary": summary${localized},
  "tagline": tagline${localized},
  "image": {
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "hotspot": image.hotspot{ x, y },
    "alt": image.alt${localized}
  },
  "intro": coalesce(intro[]${localized}, []),
  "blocks": coalesce(blocks[]{
    "title": title${localized},
    "intro": intro${localized},
    _type == "featuresBlock" => {
      "type": "features",
      "items": items[]{ icon, "title": title${localized}, "description": description${localized} }
    },
    _type == "stepsBlock" => {
      "type": "steps",
      "items": items[]{ "title": title${localized}, "description": description${localized} }
    },
    _type == "checklistBlock" => {
      "type": "checklist",
      "items": items[]${localized}
    },
    _type == "comparisonBlock" => {
      "type": "comparison",
      "columns": [left${localized}, right${localized}],
      "rows": rows[]{ "feature": feature${localized}, "values": [left${localized}, right${localized}] }
    }
  }, [])
}`;

export const servicesQuery = /* groq */ `*[_type == "service" && defined(slug.current)] | order(order asc) ${serviceProjection}`;

export const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]{
  phone,
  email,
  whatsappUrl,
  telegramUrl,
  "hours": hours${localized},
  "responseTime": responseTime${localized}
}`;
