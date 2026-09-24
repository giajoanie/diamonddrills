"use client";

import { useEffect, useRef, useState } from "react";

const WIPE_MS = 500;
const SESSION_KEY = "dd-splash-shown";

/**
 * A one-time page-load flourish per browser session (not on every in-app
 * navigation — Next's own client-side routing is fast enough not to need
 * one). A plain dark panel wipes off to the side over half a second,
 * revealing the page underneath — no hold, no logo, no text, nothing to
 * wait on.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "covering" | "wiping">("hidden");
  const scheduledRef = useRef(false);

  useEffect(() => {
    // Dev-mode StrictMode double-invokes effects (mount → cleanup →
    // mount). This ref (unlike sessionStorage) persists across that
    // double-invoke on the same instance, so only the second, kept
    // invocation schedules the timer. No cleanup needed either way: this
    // lives in the root layout and doesn't unmount during normal
    // navigation.
    if (scheduledRef.current) return;

    let shown: string | null;
    try {
      shown = sessionStorage.getItem(SESSION_KEY);
    } catch {
      return; // storage blocked (private browsing etc.) — just skip it
    }
    if (shown) return;

    scheduledRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore — worst case it plays again on the next navigation
    }

    setTimeout(() => {
      setPhase("covering");
      // Double rAF: ensure the "covering" (untransitioned) frame actually
      // paints before switching to "wiping", or the transition has nothing
      // to animate from and just snaps straight to the end state.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("wiping"));
      });
    }, 0);
    setTimeout(() => setPhase("hidden"), WIPE_MS + 50);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-accent-strong transition-transform ease-out motion-reduce:hidden ${
        phase === "wiping" ? "-translate-x-full" : "translate-x-0"
      }`}
      style={{ transitionDuration: `${WIPE_MS}ms` }}
      aria-hidden
    />
  );
}
