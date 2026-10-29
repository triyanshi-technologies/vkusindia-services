import type { Dictionary } from "@/i18n/dictionaries/en";

type NavKey = keyof Dictionary["nav"]["items"];

type NavLinkItem = {
  /** Label key in `dictionary.nav.items`. */
  key: NavKey;
  /** Locale-independent path. */
  path: string;
};

type NavMenuItem = {
  key: NavKey;
  /** Dropdown filled with these entries instead of a link. */
  menu: "services";
};

export type MainNavItem = NavLinkItem | NavMenuItem;

export const mainNav: readonly MainNavItem[] = [
  { key: "home", path: "/" },
  { key: "services", menu: "services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

export const companyNav: readonly NavLinkItem[] = [
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "privacy", path: "/privacy" },
];

/** Where the home page lists all services (no separate services page). */
export const servicesAnchor = "#services";
