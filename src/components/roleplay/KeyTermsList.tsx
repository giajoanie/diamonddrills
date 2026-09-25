type Term = { id: string; term: string; definition: string };

/**
 * Plain scrolling term/definition list for /roleplay/start — see
 * design_handoff_progress_roleplay/roleplay-reference.html (#terms).
 * Replaces the flip-flashcard deck (FlashcardDeck, now unused/removed)
 * that this screen used before this restyle.
 */
export function KeyTermsList({ terms }: { terms: Term[] }) {
  if (terms.length === 0) {
    return (
      <div
        className="progress-note font-hand mt-4 rounded-none px-[18px] py-[22px] text-center text-[19px] leading-tight text-[#6b4c08]"
        style={{ background: "#fff6dc", borderColor: "rgba(138,100,18,.2)", transform: "rotate(-1deg)" }}
      >
        No key terms for this cluster yet.
        <p className="font-body mt-1.5 text-xs leading-relaxed text-[#8a6412]">
          Your mentor hasn&apos;t added any. Check back before District.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 max-h-[560px] overflow-y-auto pr-1">
      {terms.map((t) => (
        <div key={t.id} className="border-b border-dashed border-[rgba(18,58,122,.16)] py-2.5">
          <div className="font-display text-sm font-bold text-foreground">{t.term}</div>
          <div className="font-body mt-0.5 text-[12.5px] leading-relaxed text-[rgba(18,58,122,.72)]">
            {t.definition}
          </div>
        </div>
      ))}
    </div>
  );
}
