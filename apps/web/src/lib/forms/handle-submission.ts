import "server-only";
import { isHoneypotFilled, HONEYPOT_FIELD } from "./honeypot";
import { sendMail, type MailContent } from "./mailer";

/** What the form receives back. `error` tells it which message to show. */
export type SubmissionResult = { ok: true } | { ok: false; error: "invalid" | "send_failed" };

type FormDefinition<T> = {
  /** For log messages, e.g. "contact". */
  name: string;
  /** Validated data, or null when anything is missing or malformed. */
  parse: (body: Record<string, unknown>) => T | null;
  toEmail: (data: T) => MailContent;
};

// Far above any honest submission; rejects oversized bodies before parsing them.
const MAX_BODY_BYTES = 20_000;

/**
 * Shared steps for every form route:
 * honeypot (bot: pretend success, send nothing) → validation → email → result.
 */
export async function handleSubmission<T>(request: Request, form: FormDefinition<T>): Promise<Response> {
  const body = await readJson(request);
  if (!body) return reply({ ok: false, error: "invalid" }, 400);

  // Bots get the same answer as people, so they can't tell they were caught.
  if (isHoneypotFilled(body[HONEYPOT_FIELD])) {
    console.info(`[forms] ${form.name}: honeypot filled, submission dropped`);
    return reply({ ok: true });
  }

  const data = form.parse(body);
  if (!data) return reply({ ok: false, error: "invalid" }, 400);

  try {
    await sendMail(form.toEmail(data));
    return reply({ ok: true });
  } catch (error) {
    console.error(`[forms] ${form.name}: email could not be sent`, error);
    return reply({ ok: false, error: "send_failed" }, 502);
  }
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return null;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return null;
    const body: unknown = JSON.parse(text);
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function reply(result: SubmissionResult, status = 200) {
  return Response.json(result, { status });
}
