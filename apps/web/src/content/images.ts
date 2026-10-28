import type { StaticImageData } from "next/image";
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
 * JSON content refers to them by key. Replaced by Sanity image assets later.
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
