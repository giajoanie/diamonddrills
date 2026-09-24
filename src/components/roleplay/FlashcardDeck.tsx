"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

type Flashcard = { id: string; term: string; definition: string };

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A single flip card, cycled with prev/next/shuffle — key-terms study aid
 * scoped to a cluster (see src/lib/flashcard-seed-data.ts), separate from
 * the PI panels: vocabulary a judge expects a competitor to already know,
 * not the roleplay-scenario-specific performance indicators.
 */
export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [order, setOrder] = useState(cards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (order.length === 0) {
    return <p className="text-sm text-foreground-muted">No key terms yet for this cluster.</p>;
  }

  const card = order[index];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + order.length) % order.length);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[9rem] w-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-shadow hover:shadow-md"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          {flipped ? "Definition" : "Term"}
        </p>
        <p className="mt-3 font-display text-lg font-bold text-foreground">
          {flipped ? card.definition : card.term}
        </p>
        <p className="mt-3 text-xs text-foreground-subtle">Tap to flip</p>
      </button>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-strong hover:bg-accent-soft/80"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-xs text-foreground-subtle">
          {index + 1} of {order.length}
        </span>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setOrder(shuffled(cards));
              setIndex(0);
              setFlipped(false);
            }}
            aria-label="Shuffle cards"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-foreground-muted hover:text-foreground"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next card"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-strong hover:bg-accent-soft/80"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
