import { FolderTabs, type FolderTab } from "./FolderTabs";

/**
 * A plain white rounded card. `tabs` is optional and, when passed, renders
 * a small pill row above the card — used for things that aren't page
 * navigation (the signup wizard's step indicator, a pair of sibling pages
 * cross-linking each other) now that real page-to-page navigation lives in
 * the persistent Sidebar instead.
 *
 * `ruled` is an opt-in ruled-paper + punch-hole rail treatment, matching the
 * design_handoff_* mockups for dashboard/mentor-overview/study-plan/signup.
 * It's a prop rather than the default so it stays confined to those screens
 * — every other page keeps the plain card the mockups explicitly leave
 * untouched.
 */
export function TabbedCard({
  tabs,
  ruled = false,
  children,
}: {
  tabs?: FolderTab[];
  ruled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {tabs && <FolderTabs tabs={tabs} />}
      <div
        className={`shadow-sm ${tabs ? "rounded-b-2xl rounded-tr-2xl" : "rounded-2xl"} ${
          ruled
            ? "ruled-paper-shell p-5 pl-8 sm:p-7 sm:pl-16"
            : "bg-background-elevated p-5 sm:p-7"
        }`}
      >
        {ruled && (
          <div className="punch-rail hidden sm:flex" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="punch-hole" />
            ))}
          </div>
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
