import type { FolderTab } from "@/components/binder/FolderTabs";

export type MentorSection =
  | "overview"
  | "students"
  | "assignments"
  | "exams"
  | "exports";

const SECTIONS: { key: MentorSection; label: string; href: string }[] = [
  { key: "overview", label: "Overview", href: "/mentor" },
  { key: "students", label: "Roster", href: "/mentor/students" },
  { key: "assignments", label: "Assignments", href: "/mentor/assignments" },
  { key: "exams", label: "Exam bank", href: "/mentor/exams" },
  { key: "exports", label: "Reports", href: "/mentor/exports" },
];

/**
 * The persistent top folder-tab row for every /mentor/* page. `active`
 * highlights the current section when it's one of the five primary ones;
 * pages that don't map to one of those (Rubrics, Written events, etc.) can
 * omit it, which renders all five as plain nav links back to the sections
 * they *do* cover.
 */
export function getMentorTabs(active?: MentorSection): FolderTab[] {
  return SECTIONS.map((s) => ({
    label: s.label,
    href: s.key === active ? undefined : s.href,
    active: s.key === active,
  }));
}
