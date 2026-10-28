import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-secondary text-white hover:bg-secondary-hover",
  outline: "border border-secondary text-secondary hover:bg-section",
  /** For dark backgrounds (bg-primary). */
  inverse: "bg-white text-primary hover:bg-section",
  /** Secondary action on dark backgrounds. */
  ghostInverse: "border border-white/60 text-white hover:bg-white/10",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

/** A link styled as a button. Use a real <button> for actions that don't navigate. */
export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
