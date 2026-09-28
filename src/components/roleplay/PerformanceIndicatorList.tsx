"use client";

import { useState } from "react";

type PI = { id: string; description: string };
type Scenario = { label: string; area: string; pis: PI[] };

/**
 * Numbered scenario index-cards for /roleplay/norcal-prep — see
 * design_handoff_norcal_resources/norcal-reference.html (.card). Reuses the
 * same .roleplay-pi-card/-body classes as PerformanceIndicatorCards
 * (/roleplay/start), which stays untouched — this is norcal-prep's own
 * component since its header needs a numeral badge the other screen
 * doesn't have. One card open at a time (first open by default); each open
 * card shows the first 4 PIs then "+ N more" to reveal the rest.
 */
export function PerformanceIndicatorList({
  eventName,
  scenarios,
}: {
  eventName: string;
  scenarios: Scenario[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(scenarios.length > 0 ? 0 : null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (scenarios.length === 0) return null;

  return (
    <div className="mt-[38px] max-w-[920px]">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#b9d2ff] pb-1.5">
        <span className="font-display text-xs font-bold tracking-[.08em] text-accent">
          PERFORMANCE INDICATORS TO REVIEW
        </span>
        <span className="font-hand text-[17px]">{eventName}</span>
      </div>
      <p className="mt-2 text-[12.5px] leading-[1.55] text-[rgba(18,58,122,.62)]">
        What this roleplay draws from, taken from MBA Research&apos;s published PI list. Your mentor
        adds the scoring rubric separately.
      </p>

      <div className="mt-3.5 flex flex-col gap-3">
        {scenarios.map((scenario, i) => {
          const isOpen = openIndex === i;
          const showAll = expanded[i] ?? false;
          const visible = showAll ? scenario.pis : scenario.pis.slice(0, 4);
          const remaining = scenario.pis.length - visible.length;

          return (
            <div key={scenario.label} className="roleplay-pi-card rounded-none">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex h-11 w-full items-center gap-3 px-4"
              >
                <span className="font-body w-3 text-xs font-bold text-accent">{isOpen ? "▾" : "▸"}</span>
                <span className="font-hand text-[17px] text-[rgba(18,58,122,.55)]">{i + 1}</span>
                <span className="font-display flex-1 text-left text-[15px] font-bold text-foreground">
                  {scenario.label} · {scenario.area}
                </span>
                <span className="font-hand text-[17px] text-[rgba(18,58,122,.6)]">
                  {scenario.pis.length} PIs
                </span>
              </button>

              {isOpen && (
                <div className="roleplay-pi-card-body pb-3 pl-10 pr-4 pt-1.5">
                  {visible.map((pi) => (
                    <div key={pi.id} className="font-body flex min-h-8 items-center py-1 text-[13px] text-foreground">
                      {pi.description}
                    </div>
                  ))}
                  {remaining > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => ({ ...e, [i]: true }))}
                      className="font-hand text-[15px] text-accent"
                    >
                      + {remaining} more
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
