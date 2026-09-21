import Link from "next/link";
import { toggleStudyPlanItem } from "@/lib/actions/study-plan";

type Item = {
  id: string;
  dueDate: Date;
  completed: boolean;
  instructionalArea: { name: string } | null;
  resourceId: string | null;
  resourceName: string | null;
};

export function StudyPlanItemRow({ item }: { item: Item }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-border pb-2 text-sm last:border-0 last:pb-0">
      <div>
        <p className={item.completed ? "text-foreground-subtle line-through" : "text-foreground"}>
          {item.instructionalArea?.name ?? "General review"}
        </p>
        <p className="text-xs text-foreground-subtle">
          Due {item.dueDate.toLocaleDateString()}
          {item.resourceName && (
            <>
              {" · "}
              <Link href="/resources" className="text-accent hover:underline">
                {item.resourceName}
              </Link>
            </>
          )}
        </p>
      </div>
      <form action={toggleStudyPlanItem}>
        <input type="hidden" name="itemId" value={item.id} />
        <input type="hidden" name="completed" value={String(item.completed)} />
        <button type="submit" className="shrink-0 text-xs text-accent hover:underline">
          {item.completed ? "Mark not done" : "Mark done"}
        </button>
      </form>
    </li>
  );
}
