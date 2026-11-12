/**
 * Honeypot spam protection. Forms include an extra text field that people never
 * see or reach (moved off-screen, skipped by Tab, autofill and screen readers).
 * Bots fill in every field they find, so a value here means the sender is a bot.
 *
 * The name looks like a normal field on purpose: "website" attracts bots
 * without clashing with any real field.
 */
export const HONEYPOT_FIELD = "website";

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}
