import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import NotFound from "../not-found";

/**
 * GitHub Pages only: the static export can't render not-found.tsx for unknown
 * URLs, so this page renders it as a normal page. The deploy workflow copies
 * out/en/page-not-found/index.html to out/404.html, which GitHub Pages serves.
 */
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.notFound.title,
    robots: { index: false },
  };
}

export default NotFound;
