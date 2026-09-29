"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

type Term = { id: string; term: string; definition: string };

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const EMPTY_STATE = (
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

/**
 * List/Study toggle for /roleplay/start's key-terms panel — see
 * design_handoff_progress_roleplay/roleplay-reference.html (#terms) for the
 * List view. Study is a Quizlet-style flip-card mode layered on top,
 * requested separately: flip term/definition, shuffle, step through with
 * arrow keys, and sort cards into "still learning" vs "know it" until the
 * deck empties.
 */
export function KeyTermsList({ terms }: { terms: Term[] }) {
  const [mode, setMode] = useState<"list" | "study">("list");

  if (terms.length === 0) return EMPTY_STATE;

  return (
    <div>
      <div className="roleplay-subtabs mt-3 flex gap-1">
        <button
          type="button"
          onClick={() => setMode("list")}
          className={`roleplay-subtab px-3 py-1.5 text-[12px] ${
            mode === "list"
              ? "on font-display font-bold text-foreground"
              : "font-body text-[rgba(18,58,122,.55)]"
          }`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => setMode("study")}
          className={`roleplay-subtab px-3 py-1.5 text-[12px] ${
            mode === "study"
              ? "on font-display font-bold text-foreground"
              : "font-body text-[rgba(18,58,122,.55)]"
          }`}
        >
          Study
        </button>
      </div>

      {mode === "list" ? (
        <TermListView terms={terms} />
      ) : (
        // Keyed by the deck's own identity so switching roleplay events remounts
        // StudyMode with a fresh shuffle/progress instead of carrying over state.
        <StudyMode key={`${terms[0]?.id ?? "x"}-${terms.length}`} terms={terms} />
      )}
    </div>
  );
}

function TermListView({ terms }: { terms: Term[] }) {
  return (
    <div className="max-h-[560px] overflow-y-auto pr-1">
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

function StudyMode({ terms }: { terms: Term[] }) {
  const total = terms.length;
  const [pool, setPool] = useState<Term[]>(() => shuffled(terms));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target;
      if (target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        setFlipped(false);
        setIndex((i) => (pool.length === 0 ? 0 : (i + 1) % pool.length));
      } else if (e.key === "ArrowLeft") {
        setFlipped(false);
        setIndex((i) => (pool.length === 0 ? 0 : (i - 1 + pool.length) % pool.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pool.length]);

  function go(delta: number) {
    if (pool.length === 0) return;
    setFlipped(false);
    setIndex((i) => (i + delta + pool.length) % pool.length);
  }

  function markKnown() {
    if (pool.length === 0) return;
    const current = pool[index];
    setPool((p) => p.filter((c) => c.id !== current.id));
    setKnownCount((k) => k + 1);
    setFlipped(false);
    setIndex((i) => (pool.length <= 1 ? 0 : i % (pool.length - 1)));
  }

  function restart() {
    setPool(shuffled(terms));
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
  }

  function reshuffle() {
    setPool((p) => shuffled(p));
    setIndex(0);
    setFlipped(false);
  }

  if (pool.length === 0) {
    return (
      <div
        className="progress-note mt-4 rounded-none px-[18px] py-[26px] text-center"
        style={{ background: "#eaf2ff", transform: "rotate(-1deg)" }}
      >
        <p className="font-hand text-[22px] text-foreground">
          All {total} terms — you know them cold. 🎉
        </p>
        <button
          type="button"
          onClick={restart}
          className="font-body mt-3 rounded-full border-[1.5px] border-[rgba(18,58,122,.3)] bg-white px-4 py-1.5 text-xs font-semibold text-accent"
        >
          Study again
        </button>
      </div>
    );
  }

  const card = pool[index];

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <span className="font-body text-[11px] font-semibold text-[rgba(18,58,122,.6)]">
          {knownCount} / {total} known
        </span>
        <button
          type="button"
          onClick={reshuffle}
          aria-label="Shuffle remaining cards"
          className="flex items-center gap-1 text-[11px] font-semibold text-accent"
        >
          <Shuffle className="h-3 w-3" /> Shuffle
        </button>
      </div>
      <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-[rgba(18,58,122,.12)]">
        <div
          className="h-full rounded-full bg-[#2a58b8] transition-[width]"
          style={{ width: `${(knownCount / total) * 100}%` }}
        />
      </div>

      <div className="mt-3.5" style={{ perspective: "1200px" }}>
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="relative min-h-[9.5rem] w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative min-h-[9.5rem] w-full transition-transform duration-300"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="progress-note absolute inset-0 flex flex-col items-center justify-center rounded-none px-6 py-6 text-center"
              style={{ background: "#ffffff", backfaceVisibility: "hidden" }}
            >
              <p className="font-display text-[10px] font-bold uppercase tracking-[.1em] text-accent">
                Term
              </p>
              <p className="font-display mt-2.5 text-lg font-bold text-foreground">{card.term}</p>
              <p className="font-hand mt-2.5 text-sm text-[rgba(18,58,122,.5)]">Tap to flip</p>
            </div>
            <div
              className="progress-note absolute inset-0 flex flex-col items-center justify-center rounded-none px-6 py-6 text-center"
              style={{
                background: "#eaf2ff",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="font-display text-[10px] font-bold uppercase tracking-[.1em] text-accent">
                Definition
              </p>
              <p className="font-body mt-2.5 text-sm leading-relaxed text-foreground">
                {card.definition}
              </p>
              <p className="font-hand mt-2.5 text-sm text-[rgba(18,58,122,.5)]">Tap to flip back</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(18,58,122,.08)] text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-body text-[11px] text-[rgba(18,58,122,.6)]">
          {index + 1} of {pool.length} left
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next card"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(18,58,122,.08)] text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => go(1)}
          className="font-body flex-1 rounded-full border-[1.5px] border-[rgba(138,100,18,.35)] bg-[#fff6dc] py-2 text-xs font-bold text-[#8a6412]"
        >
          Still learning
        </button>
        <button
          type="button"
          onClick={markKnown}
          className="font-body flex-1 rounded-full border-none bg-[#123a7a] py-2 text-xs font-bold text-white"
        >
          Know it
        </button>
      </div>
    </div>
  );
}
