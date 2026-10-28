import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/config/navigation";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const items = mainNav.map((item) => ({
    href: localePath(locale, item.path),
    label: dict.nav.items[item.key],
    exact: item.path === "/",
  }));
  const cta = { href: localePath(locale, "/contact"), label: dict.nav.cta };

  return (
    <header className="header-elevate sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-secondary" />
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo href={localePath(locale)} label={dict.common.homeLink} className="text-primary" />

        <nav aria-label={dict.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} exact={item.exact}>
                  {item.label}
                </NavLink>
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
