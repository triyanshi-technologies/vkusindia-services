function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "vkusindia",
  url: resolveSiteUrl(),
  // DEMO contacts: replace with the client's real details before launch (will move to Sanity).
  contact: {
    phone: "+7 (900) 000-00-00",
    phoneHref: "tel:+79000000000",
    email: "hello@example.com",
    whatsappUrl: "https://wa.me/79000000000",
    telegramUrl: "https://t.me/vkusindia_demo",
  },
} as const;
