import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/config/navigation";
import { getServices } from "@/content/services";
import { getSiteSettings } from "@/content/site-settings";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";
import { NavLink } from "./nav-link";
import type { HeaderNavItem } from "./nav-types";

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const [services, settings] = await Promise.all([getServices(locale), getSiteSettings(locale)]);
  const cta = { href: localePath(locale, "/contact"), label: dict.nav.cta };

  const items: HeaderNavItem[] = mainNav.map((item) => {
    const label = dict.nav.items[item.key];

    if ("menu" in item) {
      return {
        type: "menu",
        label,
        activePrefix: localePath(locale, "/services/"),
        entries: services.map((service) => ({
          href: localePath(locale, `/services/${service.slug}`),
          label: service.title,
          description: service.summary,
          icon: service.icon,
        })),
        footer: { text: dict.nav.menuHint, href: cta.href, label: cta.label },
      };
    }

    return {
      type: "link",
      href: localePath(locale, item.path),
      label,
      exact: item.path === "/",
    };
  });

  return (
    <header className="header-elevate sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-secondary" />
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo
          href={localePath(locale)}
          label={dict.common.homeLink}
          image={settings.logo}
          className="text-primary"
        />

        <nav aria-label={dict.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.label}>
                {item.type === "link" ? (
                  <NavLink href={item.href} exact={item.exact}>
                    {item.label}
                  </NavLink>
                ) : (
                  <NavDropdown
                    label={item.label}
                    activePrefix={item.activePrefix}
                    entries={item.entries}
                    footer={item.footer}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} label={dict.common.switchLanguage} />
          <div className="hidden lg:block">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
          <MobileNav
            items={items}
            cta={cta}
            labels={{ nav: dict.nav.label, open: dict.nav.openMenu, close: dict.nav.closeMenu }}
          />
        </div>
      </Container>
    </header>
  );
}
