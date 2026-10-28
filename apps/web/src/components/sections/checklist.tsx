import type { CSSProperties } from "react";
import { CheckIcon } from "@/components/icons";

/** Short statements as large lines with check marks, for dark (tone="primary") sections. */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-10 border-t border-white/15 md:grid-cols-2">
      {items.map((item, index) => (
        <li
          key={item}
          className="reveal flex items-start gap-5 border-b border-white/15 py-6 sm:py-8"
          style={{ "--i": index % 2 } as CSSProperties}
        >
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-primary">
            <CheckIcon className="size-5" />
          </span>
          <span className="self-center text-lg text-white sm:text-xl">{item}</span>
        </li>
      ))}
    </ul>
  );
}
