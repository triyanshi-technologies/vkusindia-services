import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { LogoImage } from "@/content/site-settings";
import { cn } from "@/lib/cn";

type LogoProps = {
  href: string;
  /** Accessible name, e.g. "vkusindia, home page". */
  label: string;
  /** Logo uploaded in Sanity; without one the site name is shown as text. */
  image?: LogoImage;
  className?: string;
};

/**
 * Logo image from Sanity, or the site name as text. The link's aria-label names it,
 * so the image itself is decorative. SVGs are used as they are; other formats are
 * sized by Sanity's image CDN (at 2x the displayed height, for sharp screens).
 */
export function Logo({ href, label, image, className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("inline-flex min-h-11 items-center text-xl font-bold tracking-tight", className)}
    >
      {image ? (
        <Image
          src={image.url.endsWith(".svg") ? image.url : `${image.url}?h=80&fit=max&auto=format`}
          alt=""
          width={image.width}
          height={image.height}
          unoptimized
          className="h-8 w-auto max-w-44 object-contain object-left sm:h-10 sm:max-w-56"
        />
      ) : (
        siteConfig.name
      )}
    </Link>
  );
}
