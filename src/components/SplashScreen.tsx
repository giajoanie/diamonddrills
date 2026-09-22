"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HOLD_MS = 2500;
const FADE_MS = 500;
const SESSION_KEY = "dd-splash-shown";

/**
 * A one-time "welcome to your binder" moment on first load per browser
 * session (not on every in-app navigation — Next's own client-side
 * routing is fast enough not to need one, and a mandatory pause on every
 * click would make the app feel slow). Shows for ~3s total, then fades
 * out over the light app content underneath.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "fading">("hidden");
  const scheduledRef = useRef(false);

  useEffect(() => {
    // Dev-mode StrictMode double-invokes effects (mount → cleanup →
    // mount). Cancelling these timers on that throwaway first cleanup
    // while sessionStorage already remembers "shown" from that same first
    // run would mean the real, kept invocation sees "already shown" and
    // never reschedules them — nothing would ever display. This ref
    // (unlike sessionStorage) persists across that double-invoke on the
    // same instance, so the second call is what proceeds instead of the
    // first. No cleanup needed either way: this lives in the root layout
    // and doesn't unmount during normal navigation.
    if (scheduledRef.current) return;

    let shown: string | null;
    try {
      shown = sessionStorage.getItem(SESSION_KEY);
    } catch {
      return; // storage blocked (private browsing etc.) — just skip the splash
    }
    if (shown) return;

    scheduledRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore — worst case the splash shows again on the next navigation
    }

    setTimeout(() => setPhase("visible"), 0);
    setTimeout(() => setPhase("fading"), HOLD_MS);
    setTimeout(() => setPhase("hidden"), HOLD_MS + FADE_MS);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`shell-diamond-bg fixed inset-0 z-50 flex items-center justify-center transition-opacity ease-out motion-reduce:transition-none ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden
    >
      <Image
        src="/brand/dd-wordmark.png"
        alt=""
        width={620}
        height={92}
        priority
        className="h-auto w-full max-w-[280px] px-6"
      />
    </div>
  );
}
