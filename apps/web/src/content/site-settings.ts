import { cacheLife, cacheTag } from "next/cache";
import type { Locale } from "@/i18n/config";
import { SANITY_CACHE_TAG, sanityClient } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { localize, type Localized } from "./localize";

type SiteSettingsEntry = {
  phone: string;
  email: string;
  whatsappUrl: string;
  telegramUrl: string;
  hours: Localized;
  responseTime: Localized;
};

async function fetchSiteSettings(): Promise<SiteSettingsEntry> {
  "use cache";
  cacheTag(SANITY_CACHE_TAG);
  cacheLife("minutes");
  const settings = await sanityClient.fetch<SiteSettingsEntry | null>(siteSettingsQuery);
  if (!settings) throw new Error('Sanity has no "Site settings" document. Publish it in the Studio.');
  return settings;
}

/** Contact details from the Sanity "Site settings" document, in one language. */
export async function getSiteSettings(locale: Locale) {
  const settings = localize(await fetchSiteSettings(), locale);
  return {
    ...settings,
    phoneHref: `tel:+${settings.phone.replace(/\D/g, "")}`,
    telegramHandle: settings.telegramUrl.split("/").filter(Boolean).pop() ?? "",
  };
}

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;
