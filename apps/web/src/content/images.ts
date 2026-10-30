import type { ImageProps, StaticImageData } from "next/image";
import aboutTeam from "@/assets/images/about-team.jpg";
import businessPlan from "@/assets/images/business-plan.jpg";
import consultation from "@/assets/images/consultation.jpg";
import cta from "@/assets/images/cta.jpg";
import exhibitions from "@/assets/images/exhibitions.jpg";
import handshake from "@/assets/images/handshake.jpg";
import hero from "@/assets/images/hero.jpg";
import openABusiness from "@/assets/images/open-a-business.jpg";
import port from "@/assets/images/port.jpg";
import shipmentControl from "@/assets/images/shipment-control.jpg";
import warehouse from "@/assets/images/warehouse.jpg";

/**
 * Stock photos (Unsplash License: free for commercial use, no attribution required).
 * JSON content refers to them by key. Service photos come from Sanity instead.
 */
export const images = {
  "about-team": aboutTeam,
  "business-plan": businessPlan,
  consultation,
  cta,
  exhibitions,
  handshake,
  hero,
  "open-a-business": openABusiness,
  port,
  "shipment-control": shipmentControl,
  warehouse,
} satisfies Record<string, StaticImageData>;

export type ImageKey = keyof typeof images;

/** A Sanity image (see `CmsImageRef`) without its alt text, which callers pass separately. */
export type CmsImage = {
  url: string;
  lqip: string | null;
  hotspot: { x: number; y: number } | null;
};

/** A local photo by key, or an image from Sanity. */
export type ImageSource = ImageKey | CmsImage;

/**
 * `next/image` props for either kind of source. Sanity images blur in from their
 * low-quality preview and keep the focal point editors set in the Studio.
 */
export function imageProps(
  source: ImageSource,
): Pick<ImageProps, "src" | "placeholder" | "blurDataURL" | "style"> {
  if (typeof source === "string") {
    return { src: images[source], placeholder: "blur" };
  }
  const { url, lqip, hotspot } = source;
  return {
    src: url,
    placeholder: lqip ? "blur" : "empty",
    blurDataURL: lqip ?? undefined,
    style: hotspot ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` } : undefined,
  };
}
