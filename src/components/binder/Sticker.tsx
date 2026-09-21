/**
 * A small rotated-rectangle "washi tape" decoration for callout boxes.
 * Purely decorative — pass `aria-hidden` behavior is baked in.
 */
export function Sticker({
  color = "highlight",
  className = "",
}: {
  color?: "highlight" | "accent" | "danger";
  className?: string;
}) {
  const bg =
    color === "highlight"
      ? "bg-highlight"
      : color === "danger"
        ? "bg-danger-soft"
        : "bg-accent-soft";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-3 left-6 h-6 w-14 -rotate-6 rounded-sm opacity-90 shadow-sm ${bg} ${className}`}
    />
  );
}
