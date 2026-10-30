import { cacheLife, cacheTag } from "next/cache";
import type { Locale } from "@/i18n/config";
import { SANITY_CACHE_TAG, sanityClient } from "@/sanity/client";
import { servicesQuery } from "@/sanity/queries";
import { localize, type Resolved } from "./localize";
import type { ServiceEntry } from "./types";

export type Service = Resolved<ServiceEntry>;
export type ServiceBlock = Service["blocks"][number];

/**
 * All services in both languages, from Sanity `service` documents ordered by
 * their "order" field. Cached; refreshed every few minutes.
 */
async function fetchServices(): Promise<ServiceEntry[]> {
  "use cache";
  cacheTag(SANITY_CACHE_TAG);
  cacheLife("minutes");
  return sanityClient.fetch<ServiceEntry[]>(servicesQuery);
}

export async function getServices(locale: Locale): Promise<Service[]> {
  return localize(await fetchServices(), locale);
}

export async function getService(locale: Locale, slug: string): Promise<Service | undefined> {
  const service = (await fetchServices()).find((entry) => entry.slug === slug);
  return service && localize(service, locale);
}

export async function getServiceSlugs(): Promise<string[]> {
  return (await fetchServices()).map((service) => service.slug);
}
