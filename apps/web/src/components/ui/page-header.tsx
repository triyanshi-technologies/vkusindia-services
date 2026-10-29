import Image from "next/image";
import type { CSSProperties } from "react";
import { images, type ImageKey } from "@/content/images";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** Decorative background photo behind a dark overlay. */
  image?: ImageKey;
  breadcrumbs?: { label: string; items: Crumb[] };
};

/** The title band at the top of every inner page. Holds the page's only <h1>. */
export function PageHeader({ title, description, image, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative isolate overflow-clip bg-primary text-white">
      {image && (
        <>
          <div className="parallax absolute inset-0 -z-20">
            <Image
              src={images[image]}
              alt=""
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Lighter tint on the right, where there is no text on wide screens. */}
          <div
            className="absolute inset-0 -z-10 bg-primary/70 lg:bg-transparent lg:bg-linear-to-r lg:from-primary/85 lg:via-primary/65 lg:to-primary/15"
            aria-hidden="true"
          />
          <div className="bg-dots absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
        </>
      )}
      <Container className="py-16 sm:py-24">
        {breadcrumbs && <Breadcrumbs label={breadcrumbs.label} items={breadcrumbs.items} />}
        <h1 className="animate-enter mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p
            className="animate-enter mt-5 max-w-2xl text-lg text-pretty text-white/85 sm:text-xl"
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
