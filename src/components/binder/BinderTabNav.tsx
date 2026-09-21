import Link from "next/link";

export type BinderTab = {
  label: string;
  href: string;
  active?: boolean;
};

/**
 * Right-side vertical "hanging tab" navigation rail. Each tab is a pill that
 * visually hinges into the RuledCard content below/beside it when active.
 */
export function BinderTabNav({ tabs }: { tabs: BinderTab[] }) {
  return (
    <nav className="flex flex-col gap-3 pl-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={`[writing-mode:vertical-rl] rotate-180 whitespace-nowrap rounded-l-2xl rounded-r-md border-2 px-2 py-4 text-xs font-bold uppercase tracking-wide transition-colors ${
            tab.active
              ? "border-accent-strong bg-accent-strong text-accent-foreground"
              : "border-border-strong bg-surface text-foreground-muted hover:bg-surface-hover"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
