"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { HONEYPOT_FIELD } from "@/lib/forms/honeypot";
import type { SubmissionResult } from "@/lib/forms/handle-submission";

type ContactFormProps = {
  labels: Dictionary["contactPage"]["form"];
  services: { slug: string; title: string }[];
  privacyHref: string;
  locale: Locale;
  /** Offered when sending fails. */
  phone: { display: string; href: string };
};

type Status = "idle" | "sending" | "success" | "invalid" | "send_failed";

const fieldClass =
  "mt-2 block w-full rounded-md border border-border-input bg-card px-3.5 py-2.5 text-primary placeholder:text-muted focus-visible:border-secondary";

/**
 * Sends the request to /api/contact, which emails it to the company inbox.
 * The browser checks required fields first (native messages); the server checks again.
 */
export function ContactForm({ labels, services, privacyHref, locale, phone }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const result = await send({ ...Object.fromEntries(new FormData(form)), locale });
    if (result.ok) form.reset();
    setStatus(result.ok ? "success" : result.error);
  }

  const required = (
    <span className="text-muted">
      {" "}
      <span aria-hidden="true">*</span>
      <span className="sr-only">({labels.required})</span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className="text-sm font-semibold text-primary">
          {labels.name}
          {required}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="text-sm font-semibold text-primary">
          {labels.email}
          {required}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="cf-phone" className="text-sm font-semibold text-primary">
          {labels.phone}
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} />
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
          maxLength={150}
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
        <textarea id="cf-message" name="message" rows={5} required maxLength={5000} className={fieldClass} />
      </div>

      {/* Honeypot: off-screen, skipped by Tab, autofill and screen readers. Only bots fill it in. */}
      <div aria-hidden="true" className="absolute top-0 -left-[10000px] size-px overflow-hidden">
        <label htmlFor="cf-website">{labels.honeypot}</label>
        <input id="cf-website" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
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

      <div className="flex flex-col gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center justify-center self-start rounded-md bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-hover disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>

        {/* Always rendered, so screen readers announce the message when it appears. */}
        <div aria-live="polite" role="status">
          {status === "success" && (
            <p className="rounded-md bg-section px-4 py-3 font-semibold text-primary">{labels.success}</p>
          )}
          {status === "invalid" && <p className={errorClass}>{labels.errorInvalid}</p>}
          {status === "send_failed" && (
            <p className={errorClass}>
              {labels.errorSend}{" "}
              <a href={phone.href} className="font-semibold whitespace-nowrap underline underline-offset-4">
                {phone.display}
              </a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

const errorClass = "rounded-md border border-red-700/30 bg-red-50 px-4 py-3 text-red-800";

async function send(body: Record<string, unknown>): Promise<SubmissionResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json()) as SubmissionResult;
  } catch {
    // Offline, or the server answered with something other than JSON.
    return { ok: false, error: "send_failed" };
  }
}
