/**
 * UI strings. Page content lives in Sanity; only interface text belongs here.
 * `en` is the source of truth: every other dictionary must match its shape.
 */
const en = {
  metadata: {
    title: "vkusindia: Business Consulting for the Russian Market",
    description:
      "End-to-end support for international companies entering Russia: consulting, company registration, business plans, warehousing, exhibitions and export–import control.",
  },
  common: {
    skipToContent: "Skip to main content",
    languageSwitcher: "Choose language",
  },
  home: {
    title: "vkusindia",
    underConstruction: "Website under construction.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
  },
};

export type Dictionary = typeof en;

export default en;
