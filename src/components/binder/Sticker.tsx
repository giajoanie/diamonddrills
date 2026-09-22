/**
 * Small scrapbook decals for callout boxes and section headers — washi
 * tape, a star, a paperclip, a push-pin. Purely decorative (aria-hidden),
 * meant to be used sparingly (one or two per screen, not a sticker sheet).
 */
type StickerKind = "tape" | "star" | "paperclip" | "pin";
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
  if (kind === "star") return <StarSticker color={color} className={className} />;
  if (kind === "paperclip") return <PaperclipSticker className={className} />;
  if (kind === "pin") return <PinSticker color={color} className={className} />;

  const bg =
    color === "highlight" ? "bg-highlight" : color === "danger" ? "bg-danger-soft" : "bg-accent-soft";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-3 left-6 h-6 w-14 -rotate-6 rounded-sm opacity-90 shadow-sm ${bg} ${className}`}
    />
  );
}

function fillFor(color: StickerColor) {
  return color === "highlight"
    ? "var(--color-highlight)"
    : color === "danger"
      ? "var(--color-danger-fg)"
      : "var(--color-accent)";
}

function StarSticker({ color, className }: { color: StickerColor; className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute -right-2 -top-3 h-7 w-7 rotate-12 drop-shadow-sm ${className}`}
    >
      <path
        d="M12 1.5l2.7 6.6 7.1.6-5.4 4.7 1.7 6.9-6.1-3.7-6.1 3.7 1.7-6.9-5.4-4.7 7.1-.6z"
        fill={fillFor(color)}
        stroke="var(--color-accent-strong)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
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

function PinSticker({ color, className }: { color: StickerColor; className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow-sm ${className}`}
      style={{ background: fillFor(color), boxShadow: "0 2px 3px rgba(18,58,122,0.35)" }}
    />
  );
}
