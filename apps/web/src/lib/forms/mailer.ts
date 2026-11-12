import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Sends form submissions to the company inbox over SMTP (Gmail for now).
 * Everything comes from env variables, so switching provider or account needs
 * no code change. Without them nothing is sent: the submission is only logged,
 * which keeps local development working.
 */

export type MailField = { label: string; value: string };

export type MailContent = {
  subject: string;
  /** Visitor's address, so "Reply" in the inbox answers them directly. */
  replyTo?: string;
  fields: MailField[];
};

type MailConfig = { host: string; port: number; user: string; pass: string; to: string };

function readConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) return null;
  return { host: SMTP_HOST, port: Number(SMTP_PORT) || 465, user: SMTP_USER, pass: SMTP_PASS, to: MAIL_TO };
}

let transporter: Transporter | undefined;

function getTransporter(config: MailConfig) {
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // 465 is encrypted from the start; other ports (587) upgrade with STARTTLS.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
  return transporter;
}

/** "sent", or "skipped" when SMTP isn't configured. Throws when sending fails. */
export async function sendMail(content: MailContent): Promise<"sent" | "skipped"> {
  const fields = content.fields.filter((field) => field.value.trim() !== "");
  const config = readConfig();

  if (!config) {
    console.warn(`[mailer] SMTP is not configured, email not sent: "${content.subject}"`);
    // Only print the submission itself locally, never personal data in production logs.
    if (process.env.NODE_ENV === "development") console.info(toText(fields));
    return "skipped";
  }

  await getTransporter(config).sendMail({
    from: { name: "vkusindia website", address: config.user },
    to: config.to,
    replyTo: content.replyTo,
    subject: content.subject,
    text: toText(fields),
    html: toHtml(content.subject, fields),
  });
  return "sent";
}

function toText(fields: MailField[]) {
  return fields
    .map(({ label, value }) => (value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`))
    .join("\n\n");
}

function toHtml(subject: string, fields: MailField[]) {
  const rows = fields
    .map(
      ({ label, value }) =>
        `<tr><th align="left" valign="top" style="padding:8px 16px 8px 0;color:#3f72af;white-space:nowrap">${escapeHtml(label)}</th>` +
        `<td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return (
    `<div style="font-family:Arial,sans-serif;font-size:15px;color:#112d4e">` +
    `<h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>` +
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>` +
    `</div>`
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
