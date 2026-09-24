import { FolderTabs, type FolderTab } from "./FolderTabs";

/**
 * A plain white rounded card. `tabs` is optional and, when passed, renders
 * a small pill row above the card — used for things that aren't page
 * navigation (the signup wizard's step indicator, a pair of sibling pages
 * cross-linking each other) now that real page-to-page navigation lives in
 * the persistent Sidebar instead.
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
        className={`bg-background-elevated p-5 shadow-sm sm:p-7 ${
          tabs ? "rounded-b-2xl rounded-tr-2xl" : "rounded-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
