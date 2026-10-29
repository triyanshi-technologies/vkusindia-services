import type { ContentIconName } from "@/components/icons";
import type { ImageKey } from "./images";
import type { Localized } from "./localize";

/**
 * Shapes of the JSON content in ./data. These mirror the planned Sanity schema,
 * so the same components keep working when the data source changes.
 */

export type ImageRef = {
  key: ImageKey;
  alt: Localized;
};

export type FeatureItem = {
  icon: ContentIconName;
  title: Localized;
  description: Localized;
};

export type StepItem = {
  title: Localized;
  description: Localized;
};

type BlockBase = {
  title: Localized;
  intro?: Localized;
};

/** Page-builder blocks used on service pages. */
export type ContentBlock =
  | (BlockBase & { type: "features"; items: FeatureItem[] })
  | (BlockBase & { type: "steps"; items: StepItem[] })
  | (BlockBase & { type: "checklist"; items: Localized[] })
  | (BlockBase & {
      type: "comparison";
      columns: [Localized, Localized];
      rows: { feature: Localized; values: [Localized, Localized] }[];
    });

export type ServiceEntry = {
  slug: string;
  icon: ContentIconName;
  image: ImageRef;
  title: Localized;
  summary: Localized;
  tagline: Localized;
  intro: Localized[];
  blocks: ContentBlock[];
};

export type StatItem = {
  value: Localized;
  label: Localized;
};

export type CallToAction = {
  title: Localized;
  description: Localized;
  button: Localized;
  image: ImageRef;
};

export type HomeContent = {
  hero: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    primaryCta: Localized;
    secondaryCta: Localized;
    panelTitle: Localized;
    panelNote: Localized;
    highlights: Localized[];
    image: ImageRef;
  };
  stats: {
    eyebrow: Localized;
    title: Localized;
    items: StatItem[];
    note: Localized;
  };
  services: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
  };
  approach: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    image: ImageRef;
    items: { letter: string; title: Localized; description: Localized }[];
  };
  process: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    items: StepItem[];
  };
  why: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    items: FeatureItem[];
  };
};

type PageIntro = {
  title: Localized;
  description: Localized;
};

export type PagesContent = {
  cta: CallToAction;
  about: PageIntro & {
    image: ImageRef;
    story: { eyebrow: Localized; title: Localized; paragraphs: Localized[]; image: ImageRef };
    philosophy: { eyebrow: Localized; title: Localized; text: Localized };
  };
  contact: PageIntro & {
    hours: Localized;
    responseTime: Localized;
  };
  privacy: PageIntro;
};
