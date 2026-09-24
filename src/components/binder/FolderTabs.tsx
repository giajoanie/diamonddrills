import Link from "next/link";

export type FolderTab = {
  label: string;
  href?: string;
  active?: boolean;
};

/**
 * Horizontal "manila folder" tab row that sits directly on top of a
 * TabbedCard — the active tab's fill matches the card so it reads as
 * physically attached to it. Sits on the page's light background (see
 * BinderPageShell), not a dark shell, so inactive tabs use light-surface
 * colors rather than a white-on-dark wash.
 */
export function FolderTabs({ tabs }: { tabs: FolderTab[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 px-2">
      {tabs.map((tab) => {
        const className = `rounded-t-xl px-4 py-2.5 text-sm font-bold font-display transition-colors sm:px-5 ${
          tab.active
            ? "bg-background-elevated text-accent-strong"
            : "bg-surface-hover text-foreground-muted hover:bg-border/60 hover:text-foreground"
        }`;
        return tab.href && !tab.active ? (
          <Link key={tab.label} href={tab.href} className={className}>
            {tab.label}
          </Link>
        ) : (
          <span key={tab.label} className={className}>
            {tab.label}
          </span>
        );
      })}
    </div>
  );
}
