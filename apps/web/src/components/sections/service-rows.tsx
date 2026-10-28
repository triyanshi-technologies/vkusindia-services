import Image from "next/image";
import { ArrowRightIcon, ContentIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { images } from "@/content/images";
import type { Service } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import { cn } from "@/lib/cn";

type ServiceRowsProps = {
  locale: Locale;
  services: Service[];
  linkLabel: string;
};

/** Zig-zag rows: a large photo with an index number, and the service's highlights. */
export function ServiceRows({ locale, services, linkLabel }: ServiceRowsProps) {
  return (
    <div className="space-y-20 sm:space-y-28">
      {services.map((service, index) => {
        const flip = index % 2 === 1;
        const headingId = `service-${service.slug}`;
        // Highlights: the first few feature titles from the service's own content.
        const highlights = service.blocks
          .flatMap((block) => (block.type === "features" ? block.items.map((item) => item.title) : []))
          .slice(0, 4);

        return (
          <article
            key={service.slug}
            aria-labelledby={headingId}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div className={cn("relative", flip ? "reveal-right lg:order-2" : "reveal-left")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <div className="scroll-zoom absolute inset-0">
                  <Image
                    src={images[service.image.key]}
                    alt={service.image.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-8 inline-flex size-20 items-center justify-center rounded-2xl bg-secondary text-3xl font-bold text-white shadow-lg sm:size-24 sm:text-4xl",
                  flip ? "left-6 lg:-left-8" : "right-6 lg:-right-8",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="reveal">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-section text-secondary">
                <ContentIcon name={service.icon} className="size-6" />
              </span>
              <h2
                id={headingId}
                className="mt-5 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl"
              >
                {service.title}
              </h2>
              <p className="mt-3 text-lg font-medium text-secondary">{service.tagline}</p>
              <p className="mt-4 text-lg text-muted">{service.summary}</p>
              {highlights.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full bg-card px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-border"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              <ButtonLink
                href={localePath(locale, `/services/${service.slug}`)}
                className="mt-8"
                aria-describedby={headingId}
              >
                {linkLabel}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
