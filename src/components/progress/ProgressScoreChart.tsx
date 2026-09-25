"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { updateExamScoreGoal } from "@/lib/actions/progress";

type Score = { label: string; pct: number };

/**
 * Graph-paper "Score over time" chart for /progress — see
 * design_handoff_progress_roleplay/progress-reference.html (.chart/.plot).
 * Hand-built to match the reference exactly (dashed goal line, point
 * labels, single-point empty state) rather than reusing recharts, which
 * ScoreTrendChart.tsx already covers for the dashboard — that component is
 * shared with /dashboard and stays untouched.
 */
export function ProgressScoreChart({ scores, goal }: { scores: Score[]; goal: number }) {
  const n = scores.length;
  const xs = scores.map((_, i) => (n === 1 ? 12 : 12 + (i * 80) / (n - 1)));
  const last = scores[n - 1];

  return (
    <div className="progress-chart mt-4 rounded-none px-[18px] pb-[14px] pt-[18px] pl-[50px]">
      <div className="font-hand absolute left-[10px] top-3 bottom-[34px] flex flex-col justify-between text-sm text-[rgba(18,58,122,.6)]">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>

      <div className="progress-chart-plot">
        {[25, 50, 75, 0].map((t) => (
          <div
            key={t}
            className="absolute left-0 right-0 border-t-[1.5px] border-dashed border-[rgba(18,58,122,.2)]"
            style={{ top: `${t}%` }}
          />
        ))}

        <GoalLine goal={goal} />

        {n > 1 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <polyline
              fill="none"
              stroke="#2a58b8"
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              points={scores.map((s, i) => `${xs[i]},${100 - s.pct}`).join(" ")}
            />
          </svg>
        )}

        {scores.map((s, i) => (
          <div
            key={i}
            className="absolute h-[14px] w-[14px] rounded-full border-[3px] border-white bg-[#2a58b8] shadow-[0_0_0_2px_#2a58b8]"
            style={{ left: `${xs[i]}%`, top: `${100 - s.pct}%`, marginLeft: "-7px", marginTop: "-7px" }}
          />
        ))}

        {last && (
          <div
            className="font-hand absolute text-lg text-foreground"
            style={{ left: `calc(${xs[n - 1]}% + 14px)`, top: `calc(${100 - last.pct}% - 30px)` }}
          >
            {last.pct}%
          </div>
        )}

        {n === 1 && (
          <div
            className="progress-note font-hand absolute left-[30%] top-[52%] max-w-[220px] rounded-none px-3 py-2.5 text-[15px] leading-tight text-[#6b4c08]"
            style={{ background: "#fff6dc", borderColor: "rgba(138,100,18,.2)", transform: "rotate(-1.5deg)" }}
          >
            Only one exam so far. Take another and your trend line shows up here.
          </div>
        )}
      </div>

      <div className="font-hand relative mt-1.5 h-5 text-sm text-[rgba(18,58,122,.6)]">
        {scores.map((s, i) => (
          <span key={i} className="absolute -translate-x-1/2" style={{ left: `${xs[i]}%` }}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function GoalLine({ goal }: { goal: number }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(updateExamScoreGoal, undefined);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) setEditing(false);
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <>
      <div
        className="absolute left-0 right-0 border-t-2 border-dashed border-[#2f8a5a]"
        style={{ top: `${100 - goal}%` }}
      />
      {editing ? (
        <form
          action={action}
          className="absolute right-1.5 flex items-center gap-1.5 rounded-md bg-white px-1.5 py-1 shadow-sm"
          style={{ top: `calc(${100 - goal}% - 30px)` }}
        >
          <input
            type="number"
            name="examScoreGoal"
            min={1}
            max={100}
            defaultValue={goal}
            className="font-hand w-12 border-b border-[#2f8a5a] text-sm text-[#2f8a5a] outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={pending}
            className="font-body text-xs font-semibold text-[#2f8a5a]"
          >
            {pending ? "…" : "Save"}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="font-hand absolute right-1.5 flex items-center gap-1 text-[15px] text-[#2f8a5a]"
          style={{ top: `calc(${100 - goal}% - 22px)` }}
        >
          goal {goal}%
          <Pencil className="h-3 w-3 opacity-60" aria-hidden />
        </button>
      )}
      {state?.error && (
        <p className="absolute right-1.5 top-0 text-xs text-danger">{state.error}</p>
      )}
    </>
  );
}
