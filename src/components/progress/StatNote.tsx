/**
 * Tilted sticky-note stat card for /progress — see
 * design_handoff_progress_roleplay/progress-reference.html (.stat). Scoped
 * to that one screen; every other page's stat cards stay on the plain Card.
 */
export function StatNote({
  color,
  tiltDeg,
  tape,
  label,
  labelColor,
  value,
  unit,
  caption,
}: {
  color: "blue" | "yellow" | "white";
  tiltDeg: number;
  tape: { side: "left" | "right"; rotateDeg: number; white?: boolean };
  label: string;
  labelColor?: string;
  value: number | string;
  unit?: string;
  caption: string;
}) {
  const bg = color === "blue" ? "#eaf2ff" : color === "yellow" ? "#fff6dc" : "#fff";
  const borderColor = color === "yellow" ? "rgba(138,100,18,.2)" : "rgba(18,58,122,.14)";

  return (
    <div
      className="progress-note rounded-none"
      style={{ background: bg, borderColor, transform: `rotate(${tiltDeg}deg)`, padding: "20px 18px 16px" }}
    >
      <div
        className="progress-note-tape"
        style={{
          [tape.side]: "22px",
          transform: `rotate(${tape.rotateDeg}deg)`,
          background: tape.white ? "rgba(234,242,255,.9)" : undefined,
        }}
      />
      <div
        className="font-display text-[11px] font-bold uppercase tracking-[.08em]"
        style={{ color: labelColor ?? "#2a58b8" }}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-hand text-[52px] leading-none text-foreground">{value}</span>
        {unit && <span className="font-hand text-[20px] text-foreground">{unit}</span>}
      </div>
      <div className="mt-1 text-xs text-[rgba(18,58,122,.62)]">{caption}</div>
    </div>
  );
}
