"use client";

import { useState } from "react";

type Panel = { tierLabel: string; items: string[] };

/**
 * Red-rule PI accordion cards for /roleplay/start — see
 * design_handoff_progress_roleplay/roleplay-reference.html (.card). One
 * card open at a time (Core open by default); each open card shows the
 * first 4 PIs then "+ N more" to expand the full list. Flattens the DAL's
 * per-area grouping into one list per tier to match the reference exactly
 * — the underlying grouped data (PerformanceIndicatorList) is untouched.
 */
export function PerformanceIndicatorCards({ panels }: { panels: Panel[] }) {
  const [openTier, setOpenTier] = useState<string | null>(panels[0]?.tierLabel ?? null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-3">
      {panels.map((panel) => {
        const isOpen = openTier === panel.tierLabel;
        const showAll = expanded[panel.tierLabel] ?? false;
        const visibleItems = showAll ? panel.items : panel.items.slice(0, 4);
        const remaining = panel.items.length - visibleItems.length;

        return (
          <div key={panel.tierLabel} className="roleplay-pi-card rounded-none">
            <button
              type="button"
              onClick={() => setOpenTier(isOpen ? null : panel.tierLabel)}
              className="flex h-11 w-full items-center gap-3 px-4"
            >
              <span className="font-body w-3 text-xs font-bold text-accent">{isOpen ? "▾" : "▸"}</span>
              <span className="font-display flex-1 text-left text-[15px] font-bold text-foreground">
                {panel.tierLabel}
              </span>
              <span className="font-hand text-[17px] text-[rgba(18,58,122,.6)]">
                {panel.items.length} PIs
              </span>
            </button>

            {isOpen && (
              <div className="roleplay-pi-card-body pb-3 pl-10 pr-4 pt-1.5">
                <div className={showAll ? "max-h-[420px] overflow-y-auto pr-1" : undefined}>
                  {visibleItems.map((item, i) => (
                    <div key={i} className="font-body flex min-h-8 items-center py-1 text-[13px] text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => ({ ...e, [panel.tierLabel]: true }))}
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
  );
}
