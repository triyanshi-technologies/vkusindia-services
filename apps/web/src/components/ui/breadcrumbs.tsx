import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export type Crumb = {
  label: string;
  /** Omit for the current page. */
  href?: string;
};

/** Breadcrumb trail for dark page headers. The last item is the current page. */
export function Breadcrumbs({ label, items }: { label: string; items: Crumb[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-white/80">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <ChevronRightIcon className="size-4 shrink-0" />}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-6 items-center underline-offset-4 hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
