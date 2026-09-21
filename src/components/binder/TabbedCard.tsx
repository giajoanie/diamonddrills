import { FolderTabs, type FolderTab } from "./FolderTabs";

/**
 * The folder-tab bar + single white ruled-paper card, for use inside
 * BinderPageShell. Split out so client components (e.g. the signup wizard,
 * where the active tab follows client-side step state) can render it too.
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
        className={`binder-ruled bg-background-elevated p-5 shadow-lg sm:p-7 ${
          tabs ? "rounded-b-2xl rounded-tr-2xl" : "rounded-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
