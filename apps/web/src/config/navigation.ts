import type { Dictionary } from "@/i18n/dictionaries/en";

type NavItem = {
  /** Label key in `dictionary.nav`. */
  key: keyof Dictionary["nav"]["items"];
  /** Locale-independent path. */
  path: string;
};

export const mainNav: readonly NavItem[] = [
  { key: "home", path: "/" },
  { key: "services", path: "/services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

export const companyNav: readonly NavItem[] = [
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "privacy", path: "/privacy" },
];
