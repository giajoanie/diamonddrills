/**
 * A labeled, colored horizontal bar for one instructional area's score —
 * used wherever the mockups show "weakest areas" as bars rather than a
 * plain text list (dashboard, mentor overview, exam results). Color is a
 * status read (how are you doing here), not an identity, so it reuses the
 * app's existing danger/warning/accent tokens rather than a new palette.
 */
export function AreaScoreBar({ label, percentage }: { label: string; percentage: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(percentage)));
  const barColor =
    pct < 60
      ? "var(--color-danger)"
      : pct < 75
        ? "var(--color-warning-border)"
        : pct < 90
          ? "var(--color-accent)"
          : "var(--color-accent-strong)";

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground-muted">{label}</span>
        <span className="text-foreground-subtle">{pct}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-hover">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: barColor }} />
      </div>
    </div>
  );
}
