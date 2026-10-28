"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";

type ContactFormProps = {
  labels: Dictionary["contactPage"]["form"];
  services: { slug: string; title: string }[];
  privacyHref: string;
  email: string;
};

const fieldClass =
  "mt-2 block w-full rounded-md border border-border-input bg-card px-3.5 py-2.5 text-primary placeholder:text-muted focus-visible:border-secondary";

/**
 * TEMPORARY: until a form service is connected, submitting opens the visitor's
 * email app with the request prefilled. Validation uses native browser messages.
 */
export function ContactForm({ labels, services, privacyHref, email }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const body = [
      `${labels.name}: ${field("name")}`,
      `${labels.email}: ${field("email")}`,
      `${labels.phone}: ${field("phone")}`,
      `${labels.company}: ${field("company")}`,
      `${labels.service}: ${field("service")}`,
      "",
      field("message"),
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(body)}`;
  }

  const required = (
    <span className="text-muted">
      {" "}
      <span aria-hidden="true">*</span>
      <span className="sr-only">({labels.required})</span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className="text-sm font-semibold text-primary">
          {labels.name}
          {required}
        </label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="cf-email" className="text-sm font-semibold text-primary">
          {labels.email}
          {required}
        </label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="cf-phone" className="text-sm font-semibold text-primary">
          {labels.phone}
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="cf-company" className="text-sm font-semibold text-primary">
          {labels.company}
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-service" className="text-sm font-semibold text-primary">
          {labels.service}
        </label>
        <select id="cf-service" name="service" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            {labels.servicePlaceholder}
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value={labels.serviceOther}>{labels.serviceOther}</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="text-sm font-semibold text-primary">
          {labels.message}
          {required}
        </label>
        <textarea id="cf-message" name="message" rows={5} required className={fieldClass} />
      </div>
      <div className="flex gap-3 sm:col-span-2">
        <input
          id="cf-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 size-5 shrink-0 accent-secondary"
        />
        <label htmlFor="cf-consent" className="text-sm text-muted">
          {labels.consentBefore}{" "}
          <Link href={privacyHref} className="font-semibold text-secondary underline underline-offset-4">
            {labels.consentLink}
          </Link>
          .{required}
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-hover"
        >
          {labels.submit}
        </button>
        <p className="text-sm text-muted">{labels.hint}</p>
      </div>
    </form>
  );
}
