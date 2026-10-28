"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Match only this exact path, not its children (use for the home link). */
  exact?: boolean;
};

/** A navigation link that marks itself as current for its page and, unless `exact`, its sub-pages. */
export function NavLink({ href, exact = false, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isPage = pathname === href;
  const isSection = !exact && pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isPage ? "page" : isSection ? "true" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold transition-colors hover:bg-section",
        isPage || isSection ? "text-secondary" : "text-primary",
        className,
      )}
      {...props}
    />
  );
}
