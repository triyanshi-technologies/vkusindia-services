import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  href: string;
  /** Accessible name, e.g. "vkusindia, home page". */
  label: string;
  className?: string;
};

/** Text logo until the client provides a brand mark. */
export function Logo({ href, label, className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("inline-flex min-h-11 items-center text-xl font-bold tracking-tight", className)}
    >
      {siteConfig.name}
    </Link>
  );
}
