/**
 * UI strings. Page content lives in src/content (later Sanity); only interface text belongs here.
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
    switchLanguage: "switch language to",
    homeLink: "vkusindia, home page",
    learnMore: "Learn more",
    breadcrumbs: "Breadcrumb",
    comingSoon: "Full content for this page is coming soon.",
  },
  nav: {
    label: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Get a consultation",
    items: {
      home: "Home",
      services: "Services",
      about: "About us",
      contact: "Contact",
      privacy: "Privacy policy",
    },
  },
  footer: {
    tagline:
      "End-to-end support for international businesses entering and growing in the Russian market.",
    servicesHeading: "Services",
    companyHeading: "Company",
    contactHeading: "Contact",
    phone: "Phone",
    email: "Email",
    rights: "All rights reserved.",
  },
  chat: {
    label: "Chat with us",
    whatsapp: "Chat with us on WhatsApp",
    telegram: "Chat with us on Telegram",
  },
  blocks: {
    comparisonFeature: "Feature",
    step: "Step",
    versus: "vs",
  },
  servicePage: {
    overview: "Overview",
    otherServices: "Other services",
    allServices: "All services",
    asideTitle: "Discuss your project",
    asideText: "The first consultation is free. Reach us the way that suits you.",
  },
  contactPage: {
    methodsTitle: "Get in touch",
    phone: "Call us",
    email: "Email us",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    hours: "Office hours",
    form: {
      title: "Send us a request",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      service: "Service you are interested in",
      servicePlaceholder: "Select a service",
      serviceOther: "Other / not sure yet",
      message: "Tell us about your project",
      consentBefore: "I agree to the processing of my personal data in accordance with the",
      consentLink: "privacy policy",
      required: "required",
      submit: "Send request",
      hint: "Submitting opens your email app with the request filled in.",
      subject: "Website request",
    },
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
  },
};

export type Dictionary = typeof en;

export default en;
