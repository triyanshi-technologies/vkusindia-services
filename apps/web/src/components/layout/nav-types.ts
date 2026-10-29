/** Header navigation, resolved for the current locale and passed to client components. */

export type HeaderNavLink = {
  type: "link";
  href: string;
  label: string;
  /** Match only this exact path, not its children (the home link). */
  exact: boolean;
};

export type HeaderNavMenuEntry = {
  href: string;
  label: string;
  description: string;
  icon: string;
};

export type HeaderNavMenu = {
  type: "menu";
  label: string;
  /** Paths starting with this mark the menu as the current section. */
  activePrefix: string;
  entries: HeaderNavMenuEntry[];
  /** Closing row of the desktop panel, e.g. a consultation link. */
  footer: { text: string; href: string; label: string };
};

export type HeaderNavItem = HeaderNavLink | HeaderNavMenu;
