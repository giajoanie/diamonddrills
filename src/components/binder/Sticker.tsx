/**
 * Small scrapbook decals for callout boxes and section headers — washi
 * tape, a paperclip. Purely decorative (aria-hidden), meant to be used
 * sparingly (one or two per screen, not a sticker sheet).
 */
type StickerKind = "tape" | "paperclip";
type StickerColor = "highlight" | "accent" | "danger";

export function Sticker({
  kind = "tape",
  color = "highlight",
  className = "",
}: {
  kind?: StickerKind;
  color?: StickerColor;
  className?: string;
}) {
  if (kind === "paperclip") return <PaperclipSticker className={className} />;

  const bg =
    color === "highlight" ? "bg-highlight" : color === "danger" ? "bg-danger-soft" : "bg-accent-soft";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-3 left-6 h-6 w-14 -rotate-6 rounded-sm opacity-90 shadow-sm ${bg} ${className}`}
    />
  );
}

function PaperclipSticker({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none absolute -right-3 -top-4 h-8 w-8 rotate-[18deg] drop-shadow-sm ${className}`}
    >
      <path
        d="M7 12.5V6.8a3.3 3.3 0 0 1 6.6 0v10.9a2 2 0 1 1-4 0V7.7"
        stroke="var(--color-fg-subtle)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
