import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { ClockIcon, MailIcon, PhoneIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/content/pages";
import { getServices } from "@/content/services";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getPageContent(locale, "contact");

  return {
    title: page.title,
    description: page.description,
    alternates: getAlternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const page = getPageContent(locale, "contact");
  const labels = dict.contactPage;
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.description}
        breadcrumbs={{
          label: dict.common.breadcrumbs,
          items: [{ label: dict.nav.items.home, href: localePath(locale) }, { label: page.title }],
        }}
      />

      <Section tone="section">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">{labels.methodsTitle}</h2>
            <ul className="space-y-4">
              <ContactMethod icon={<PhoneIcon className="size-6" />} label={labels.phone}>
                <a href={contact.phoneHref} className="link-underline">
                  {contact.phone}
                </a>
              </ContactMethod>
              <ContactMethod icon={<MailIcon className="size-6" />} label={labels.email}>
                <a href={`mailto:${contact.email}`} className="link-underline">
                  {contact.email}
                </a>
              </ContactMethod>
              <ContactMethod icon={<WhatsAppIcon className="size-6" />} label={labels.whatsapp}>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {contact.phone}
                </a>
              </ContactMethod>
              <ContactMethod icon={<TelegramIcon className="size-6" />} label={labels.telegram}>
                <a href={contact.telegramUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                  @{contact.telegramUrl.split("/").pop()}
                </a>
              </ContactMethod>
              <ContactMethod icon={<ClockIcon className="size-6" />} label={labels.hours}>
                <span>{page.hours}</span>
                <span className="mt-1 block text-sm font-normal text-muted">{page.responseTime}</span>
              </ContactMethod>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-semibold text-primary">{labels.form.title}</h2>
            <div className="mt-8">
              <ContactForm
                labels={labels.form}
                services={getServices(locale).map(({ slug, title }) => ({ slug, title }))}
                privacyHref={localePath(locale, "/privacy")}
                email={contact.email}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactMethod({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-section text-secondary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-0.5 font-semibold break-words text-primary">{children}</div>
      </div>
    </li>
  );
}
