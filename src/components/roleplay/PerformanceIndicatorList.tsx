import { Card } from "@/components/ui/Card";

type PI = {
  id: string;
  instructionalArea: string;
  code: string | null;
  level: string | null;
  description: string;
};

/** Reference content for roleplay prep — grouped by tier, then by
 * instructional area. Not graded; a mentor-built Rubric is what a roleplay
 * is actually scored against. */
export function PerformanceIndicatorList({
  eventName,
  grouped,
}: {
  eventName: string;
  grouped: Map<string, PI[]>;
}) {
  if (grouped.size === 0) return null;

  return (
    <Card className="mt-6">
      <h2 className="font-medium text-foreground">Performance indicators to review — {eventName}</h2>
      <p className="mt-1 text-sm text-foreground-muted">
        What this roleplay draws from, straight from MBA Research&apos;s published PI list. Not a
        rubric — your mentor will add the actual scoring rubric separately.
      </p>

      <div className="mt-4 space-y-3">
        {[...grouped.entries()].map(([tierLabel, items]) => (
          <details key={tierLabel} className="rounded-md border border-border">
            <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-foreground">
              {tierLabel} <span className="font-normal text-foreground-subtle">({items.length})</span>
            </summary>
            <div className="border-t border-border px-3 py-2">
              {groupByArea(items).map(([area, areaItems]) => (
                <div key={area} className="py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                    {area}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {areaItems.map((pi) => (
                      <li key={pi.id} className="text-sm text-foreground-muted">
                        {pi.description}
                        {pi.code && (
                          <span className="ml-1 text-xs text-foreground-subtle">
                            ({pi.code}
                            {pi.level ? `, ${pi.level}` : ""})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Card>
  );
}

function groupByArea(items: PI[]): [string, PI[]][] {
  const map = new Map<string, PI[]>();
  for (const item of items) {
    const existing = map.get(item.instructionalArea);
    if (existing) existing.push(item);
    else map.set(item.instructionalArea, [item]);
  }
  return [...map.entries()];
}
