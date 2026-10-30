import Link from "next/link";
import type { ReactNode } from "react";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { companyNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getServices } from "@/content/services";
import { getSiteSettings } from "@/content/site-settings";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { FooterAccordion } from "./footer-accordion";
import { Logo } from "./logo";

// The current time can't be read while prerendering; caching makes the year part of the static output.
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass =
  "inline-flex min-h-11 items-center text-white/80 transition-colors hover:text-white sm:min-h-9";

export async function SiteFooter() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getCurrentYear()]);
  const [services, contact] = await Promise.all([getServices(locale), getSiteSettings(locale)]);

  return (
    <footer className="bg-primary text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo href={localePath(locale)} label={dict.common.homeLink} />
          <p className="mt-3 max-w-xs text-white/80">{dict.footer.tagline}</p>
        </div>

        {/* Up to 480px both columns stack as one accordion group; wider, they are regular grid columns. */}
        <div className="max-[481px]:border-t max-[481px]:border-white/15 min-[481px]:contents">
          <FooterAccordion heading={dict.footer.servicesHeading}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={localePath(locale, `/services/${service.slug}`)} className={linkClass}>
                  <span className="link-underline">{service.title}</span>
                </Link>
              </li>
            ))}
          </FooterAccordion>

          <FooterAccordion heading={dict.footer.companyHeading}>
            {companyNav.map((item) => (
              <li key={item.key}>
                <Link href={localePath(locale, item.path)} className={linkClass}>
                  <span className="link-underline">{dict.nav.items[item.key]}</span>
                </Link>
              </li>
            ))}
          </FooterAccordion>
        </div>

        <FooterColumn heading={dict.footer.contactHeading}>
          <li>
            <a href={contact.phoneHref} className={`${linkClass} gap-2`}>
              <PhoneIcon className="size-4 shrink-0" />
              <span className="sr-only">{dict.footer.phone}: </span>
              <span className="link-underline">{contact.phone}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2`}>
              <MailIcon className="size-4 shrink-0" />
              <span className="sr-only">{dict.footer.email}: </span>
              <span className="link-underline">{contact.email}</span>
            </a>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-6 text-sm text-white/80">
          {/* Right padding keeps the text clear of the floating chat buttons on phones. */}
          <p className="pr-16 sm:pr-0">
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wider uppercase">{heading}</h2>
      <ul className="mt-4 space-y-1 text-sm">{children}</ul>
    </div>
  );
}
