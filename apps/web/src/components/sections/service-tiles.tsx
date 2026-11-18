import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon, ContentIcon } from "@/components/icons";
import { imageProps } from "@/content/images";
import type { Service } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import { cn } from "@/lib/cn";

type ServiceTilesProps = {
  locale: Locale;
  services: Service[];
  /**
   * "bento": rows of three on a 4-column grid, see `bentoSpan`.
   * "row": equal tiles, three across.
   */
  layout?: "bento" | "row";
};

type BentoSpan = "normal" | "wide" | "half" | "full";

const bentoSpanClasses: Record<BentoSpan, string> = {
  normal: "",
  wide: "sm:col-span-2",
  half: "lg:col-span-2",
  full: "sm:col-span-2 lg:col-span-4",
};

// Rendered tile width per layout, so each screen downloads a fitting photo size.
const tileSizes: Record<BentoSpan, string> = {
  normal: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  half: "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw",
  full: "100vw",
};

/**
 * Bento layout for any number of tiles. Desktop rows hold three tiles, one of them
 * double width, which alternates between the start and the end of the row. A last
 * row of two tiles splits the width in half; a single last tile spans the full row.
 * On tablets (2 columns) wide tiles take a whole row, so the rows still close evenly.
 */
function bentoSpan(index: number, count: number): BentoSpan {
  const row = Math.floor(index / 3);
  const tilesInRow = Math.min(3, count - row * 3);
  if (tilesInRow === 1) return "full";
  if (tilesInRow === 2) return "half";
  const wideAt = row % 2 === 0 ? 0 : 2;
  return index % 3 === wideAt ? "wide" : "normal";
}

/** Photo tiles with the text on a dark gradient. The whole tile is one link. */
export function ServiceTiles({ locale, services, layout = "bento" }: ServiceTilesProps) {
  const isBento = layout === "bento";

  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:gap-6",
        isBento ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {services.map((service, index) => {
        const span = isBento ? bentoSpan(index, services.length) : "normal";
        // Tiles at least half the desktop width get the full summary and larger images.
        const isWide = span !== "normal";

        return (
          <li
            key={service.slug}
            className={cn("reveal flex", bentoSpanClasses[span])}
            style={{ "--i": index % 3 } as CSSProperties}
          >
            <Link
              href={localePath(locale, `/services/${service.slug}`)}
              className="group relative isolate flex min-h-80 w-full flex-col justify-end overflow-clip rounded-2xl p-6 text-white shadow-sm transition-shadow hover:shadow-xl sm:p-8 lg:min-h-96"
            >
              <Image
                {...imageProps(service.image)}
                alt=""
                fill
                sizes={tileSizes[span]}
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                // Dark only behind the text at the bottom; the top half of the photo stays clear.
                className="absolute inset-0 -z-10 bg-linear-to-t from-primary/95 via-primary/75 via-45% to-transparent to-85%"
              />

              <span className="absolute top-6 left-6 inline-flex size-12 items-center justify-center rounded-xl bg-primary/70 ring-1 ring-white/25 backdrop-blur sm:top-8 sm:left-8">
                <ContentIcon name={service.icon} className="size-6" />
              </span>
              <span
                aria-hidden="true"
                className="absolute top-6 right-6 inline-flex size-11 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:-rotate-45 sm:top-8 sm:right-8"
              >
                <ArrowRightIcon className="size-5" />
              </span>

              {isBento && (
                <span aria-hidden="true" className="text-sm font-semibold text-section">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{service.title}</h3>
              <p className={cn("mt-2 text-white/85", !isWide && "line-clamp-3")}>{service.summary}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
