import { FolderTabs, type FolderTab } from "./FolderTabs";

/**
 * The folder-tab bar + single white ruled-paper card, for use inside
 * BinderPageShell. Split out so client components (e.g. the signup wizard,
 * where the active tab follows client-side step state) can render it too.
 *
 * The pink margin rule + ring holes are printed on the card itself (like
 * real loose-leaf paper), not floating in the dark shell beside it.
 */
export function TabbedCard({
  tabs,
  children,
}: {
  tabs?: FolderTab[];
  children: React.ReactNode;
}) {
  return (
    <div>
      {tabs && <FolderTabs tabs={tabs} />}
      <div
        className={`paper-margin binder-ruled bg-background-elevated p-5 pl-8 shadow-lg sm:p-7 sm:pl-16 ${
          tabs ? "rounded-b-2xl rounded-tr-2xl" : "rounded-2xl"
        }`}
      >
        <div className="paper-holes hidden sm:flex" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="paper-hole" />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
