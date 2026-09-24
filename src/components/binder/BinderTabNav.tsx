import Link from "next/link";

export type BinderTabNavItem = { label: string; href: string; active?: boolean };

/**
 * The right-side vertical pill rail from the mockups (dashboard event
 * switcher, mentor console sections) — a secondary quick-jump nav that
 * sits beside TabbedCard's white page, on the dark shell. Hidden below
 * `sm:` since there's no room for it next to a single-column mobile layout.
 */
export function BinderTabNav({ items }: { items: BinderTabNavItem[] }) {
  return (
    <div className="hidden shrink-0 flex-col sm:flex">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center justify-center px-2 py-5 text-xs font-bold tracking-wide transition-colors first:rounded-t-lg last:rounded-b-lg ${
            item.active
              ? "bg-background-elevated text-accent-strong"
              : "bg-accent-strong text-white hover:bg-accent"
          }`}
          style={{ writingMode: "vertical-rl" }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
