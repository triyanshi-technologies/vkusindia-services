import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { images, type ImageKey } from "@/content/images";

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelNote: string;
  highlights: string[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  image: { key: ImageKey; alt: string };
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Full-bleed photo with a parallax drift, a staggered entrance, and a glass
 * panel summarising what we handle. Leaves room at the bottom for the
 * overlapping stats card that follows it.
 */
export function HomeHero({
  eyebrow,
  title,
  description,
  panelTitle,
  panelNote,
  highlights,
  primary,
  secondary,
  image,
}: HomeHeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-primary text-white">
      <div className="parallax absolute inset-0 -z-20">
        <Image
          src={images[image.key]}
          alt={image.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-primary/70 lg:bg-transparent lg:bg-linear-to-r lg:from-primary/90 lg:via-primary/65 lg:to-primary/10"
      />
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-40" />

      <Container className="grid gap-12 pt-20 pb-40 sm:pt-28 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16 lg:pb-48">
        <div>
          <p
            className="animate-enter inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-section ring-1 ring-white/20"
            style={delay(0)}
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-section" />
            {eyebrow}
          </p>
          <h1
            className="animate-enter mt-6 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={delay(100)}
          >
            {title}
          </h1>
          <p
            className="animate-enter mt-6 max-w-xl text-lg text-pretty text-white/85 sm:text-xl"
            style={delay(200)}
          >
            {description}
          </p>
          <div
            className="animate-enter mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={delay(300)}
          >
            <ButtonLink href={primary.href} variant="inverse" className="px-6 py-3 text-base">
              {primary.label}
              <ArrowRightIcon className="size-5" />
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="ghostInverse" className="px-6 py-3 text-base">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div
          className="animate-enter rounded-2xl bg-primary/60 p-6 ring-1 ring-white/20 backdrop-blur-md sm:p-8"
          style={delay(450)}
        >
          <p className="text-lg font-semibold">{panelTitle}</p>
          <ul className="mt-5 space-y-4">
            {highlights.map((highlight, index) => (
              <li key={highlight} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/90">{highlight}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 border-t border-white/20 pt-5 text-sm font-semibold text-section">
            <CheckIcon className="size-4 shrink-0" />
            {panelNote}
          </p>
        </div>
      </Container>
    </div>
  );
}
