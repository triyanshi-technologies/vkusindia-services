import type { ImageLoaderProps } from "next/image";

/**
 * Image URLs for the static export, which has no Next.js image optimizer.
 * Sanity photos are resized and converted (WebP/AVIF) by Sanity's image CDN.
 * Local stock photos are served as they are; the width parameter only keeps
 * each srcset entry unique and is ignored by GitHub Pages.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("fit", "max");
    url.searchParams.set("auto", "format");
    return url.href;
  }
  return `${src}?w=${width}`;
}
