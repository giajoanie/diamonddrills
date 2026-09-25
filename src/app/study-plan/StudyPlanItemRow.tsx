import Link from "next/link";
import { Check } from "lucide-react";
import { toggleStudyPlanItem } from "@/lib/actions/study-plan";

type Item = {
  id: string;
  dueDate: Date;
  completed: boolean;
  instructionalAreaId: string | null;
  instructionalArea: { name: string } | null;
  resourceId: string | null;
  resourceName: string | null;
};

export function StudyPlanItemRow({ item, color }: { item: Item; color: string }) {
  const dueLabel = item.dueDate.toLocaleDateString(undefined, { month: "numeric", day: "numeric" });

  return (
    <li className="flex items-center gap-3 border-b border-border py-2.5 text-sm last:border-0">
      <form action={toggleStudyPlanItem}>
        <input type="hidden" name="itemId" value={item.id} />
        <input type="hidden" name="completed" value={String(item.completed)} />
        <button
          type="submit"
          aria-label={item.completed ? "Mark not done" : "Mark done"}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
            item.completed
              ? "border-accent-strong bg-accent-strong text-accent-foreground"
              : "border-border-strong bg-transparent hover:border-accent"
          }`}
        >
          {item.completed && <Check className="h-3.5 w-3.5" aria-hidden />}
        </button>
      </form>

      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <p
          className={`truncate ${item.completed ? "text-foreground-subtle line-through" : "text-foreground"}`}
        >
          {item.instructionalArea?.name ?? "General review"}
          {item.resourceName && (
            <>
              {" · "}
              <Link href="/resources" className="text-accent hover:underline">
                {item.resourceName}
              </Link>
            </>
          )}
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <span className="font-hand text-sm text-foreground-subtle">Due {dueLabel}</span>
          {item.completed ? (
            <form action={toggleStudyPlanItem}>
              <input type="hidden" name="itemId" value={item.id} />
              <input type="hidden" name="completed" value={String(item.completed)} />
              <button type="submit" className="text-xs font-semibold text-accent hover:underline">
                Undo
              </button>
            </form>
          ) : item.instructionalAreaId ? (
            <Link
              href={`/exam/start?mode=PRACTICE_AREA&area=${item.instructionalAreaId}`}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Start →
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
}
