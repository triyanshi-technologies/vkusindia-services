import type { Locale } from "@/i18n/config";
import servicesData from "./data/services.json";
import { localize, type Resolved } from "./localize";
import type { ServiceEntry } from "./types";

/**
 * TEMPORARY local content source. Replaced by Sanity `service` documents later;
 * keep these function signatures so pages don't change.
 */

// JSON imports widen literals (e.g. block `type`) to `string`, so the shape is asserted here.
const services = servicesData as ServiceEntry[];

export type Service = Resolved<ServiceEntry>;
export type ServiceBlock = Service["blocks"][number];

export function getServices(locale: Locale): Service[] {
  return localize(services, locale);
}

export function getService(locale: Locale, slug: string): Service | undefined {
  const service = services.find((entry) => entry.slug === slug);
  return service && localize(service, locale);
}

export function getServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
