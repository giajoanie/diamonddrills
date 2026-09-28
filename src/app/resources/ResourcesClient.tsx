"use client";

import { useMemo, useState } from "react";
import { ResourceCard, type Resource } from "./ResourceCard";

const LEVEL_OPTIONS = [
  { value: "DISTRICT", label: "District" },
  { value: "STATE", label: "State" },
  { value: "ICDC", label: "ICDC" },
];

const TILTS = [-0.4, 0.5, 0.3, -0.5];

export function ResourcesClient({
  resources,
  typeLabels,
}: {
  resources: Resource[];
  typeLabels: Record<string, string>;
}) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [level, setLevel] = useState("");

  const typeOptions = useMemo(
    () => [...new Set(resources.map((r) => r.type))].sort(),
    [resources],
  );
  const areaOptions = useMemo(
    () =>
      [...new Set(resources.flatMap((r) => r.resourceAreas.map((a) => a.instructionalArea.name)))].sort(),
    [resources],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesQuery =
        !query || `${r.name} ${r.description ?? ""}`.toLowerCase().includes(query);
      const matchesType = !type || r.type === type;
      const matchesArea = !area || r.resourceAreas.some((a) => a.instructionalArea.name === area);
      const matchesLevel = !level || r.competitionLevel === level;
      return matchesQuery && matchesType && matchesArea && matchesLevel;
    });
  }, [resources, q, type, area, level]);

  const clearFilters = () => {
    setQ("");
    setType("");
    setArea("");
    setLevel("");
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-[30px] font-extrabold text-foreground">Resources</h1>
        <span className="font-hand text-[17px] text-[rgba(18,58,122,.6)]">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        </span>
      </div>

      <div className="progress-note relative mt-[22px] rounded-none bg-[#eaf2ff] px-6 py-[22px]">
        <div className="progress-note-tape" style={{ left: "36px", width: "88px", transform: "rotate(-2deg)" }} />
        <div className="grid grid-cols-1 items-end gap-[18px] sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <label className="flex flex-col gap-1.5">
            <span className="font-display text-xs font-bold tracking-[.08em] text-accent">SEARCH</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Name or description"
              className="font-hand border-0 border-b-[1.5px] border-[rgba(18,58,122,.3)] bg-transparent px-0.5 py-1.5 text-[19px] text-foreground outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-display text-xs font-bold tracking-[.08em] text-accent">TYPE</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-[10px] border-[1.5px] border-[rgba(18,58,122,.22)] bg-white px-3 py-2.5 text-[13.5px] font-semibold text-foreground"
            >
              <option value="">All types</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {typeLabels[t] ?? t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-display text-xs font-bold tracking-[.08em] text-accent">
              INSTRUCTIONAL AREA
            </span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="rounded-[10px] border-[1.5px] border-[rgba(18,58,122,.22)] bg-white px-3 py-2.5 text-[13.5px] font-semibold text-foreground"
            >
              <option value="">All areas</option>
              {areaOptions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-display text-xs font-bold tracking-[.08em] text-accent">
              COMPETITION LEVEL
            </span>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-[10px] border-[1.5px] border-[rgba(18,58,122,.22)] bg-white px-3 py-2.5 text-[13.5px] font-semibold text-foreground"
            >
              <option value="">All levels</option>
              {LEVEL_OPTIONS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-[30px] grid grid-cols-1 gap-[22px_26px] sm:grid-cols-2">
        {filtered.map((r, i) => (
          <ResourceCard key={r.id} resource={r} typeLabel={typeLabels[r.type] ?? r.type} tiltDeg={TILTS[i % 4]} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="progress-note mx-auto mt-2.5 max-w-[360px] rounded-none bg-[#fff6dc] px-[18px] py-[22px] text-center"
          style={{ borderColor: "rgba(138,100,18,.2)", transform: "rotate(-1deg)" }}
        >
          <p className="font-hand text-[19px] text-[#6b4c08]">Nothing matches those filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-1.5 text-[12.5px] font-semibold text-[#8a6412] underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
