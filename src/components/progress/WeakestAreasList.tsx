import Link from "next/link";

type Area = { name: string; pct: number | null; areaId?: string };

/**
 * Ranked weak-area rows for /progress — see
 * design_handoff_progress_roleplay/progress-reference.html (.area/.bar).
 * Never-attempted areas (pct === null) read "not tried" instead of "0%",
 * distinct from AreaScoreBar (dashboard/mentor/results), which has no such
 * state and stays untouched.
 */
export function WeakestAreasList({ areas }: { areas: Area[] }) {
  const top = areas[0];

  return (
    <div>
      {areas.map((a, i) => {
        const pct = a.pct == null ? 0 : Math.max(0, Math.min(100, Math.round(a.pct)));
        const barColor = a.pct == null || a.pct < 25 ? "#e4a28f" : "#f2c14e";
        return (
          <div
            key={a.name}
            className="grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-dashed border-[rgba(18,58,122,.16)] py-3"
          >
            <span className="font-hand text-[17px] text-[rgba(18,58,122,.5)]">{i + 1}</span>
            <div className="min-w-0">
              <div className="font-body text-[13.5px] font-semibold text-foreground">{a.name}</div>
              <div className="relative mt-1.5 h-2.5 rounded-sm bg-[rgba(18,58,122,.06)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-sm"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
            </div>
            <span
              className="font-hand text-[17px]"
              style={{ color: a.pct == null ? "#c2562f" : "#123a7a" }}
            >
              {a.pct == null ? "not tried" : `${Math.round(a.pct)}%`}
            </span>
          </div>
        );
      })}

      {top?.areaId && (
        <Link
          href={`/exam/start?area=${top.areaId}&mode=PRACTICE_AREA`}
          className="btn mt-4 inline-flex items-center rounded-full border-2 border-[#3f72d4] bg-[#2a58b8] px-[18px] py-[9px] font-body text-[13px] font-bold text-white shadow-[0_2px_6px_rgba(18,58,122,.16)]"
        >
          Drill {top.name}
        </Link>
      )}
    </div>
  );
}
