/** Small validators for form bodies, which arrive as untrusted JSON. */

/** Trimmed text within the length limits, or null. Optional fields accept "". */
export function text(value: unknown, { max, required = false }: { max: number; required?: boolean }) {
  if (value === undefined || value === null) return required ? null : "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max || (required && trimmed === "")) return null;
  return trimmed;
}

// Deliberately simple: one "@", a dot in the domain, no spaces. The real check is the reply.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(value: unknown) {
  const trimmed = text(value, { max: 254, required: true });
  return trimmed && EMAIL_PATTERN.test(trimmed) ? trimmed : null;
}

/** A checkbox sent as true or "on". */
export function checked(value: unknown) {
  return value === true || value === "on";
}
