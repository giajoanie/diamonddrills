"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SHOW_DELAY_MS = 150; // don't flash on fast navigations
const HOLD_WIDTH = 82; // % — never claims "done" until the route actually changes
const STUCK_TIMEOUT_MS = 10000; // safety net if a click doesn't lead anywhere

type Phase = "idle" | "loading" | "done";

/** A thin top-of-screen progress bar for page-to-page navigation, shown
 * only once a navigation has been running long enough to be worth telling
 * the user about — not a fixed pause on every click. Covers <Link> clicks;
 * server-action-driven redirects (login, start exam, …) already show their
 * own per-form pending state. */
export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("idle");
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigating = useRef(false);

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (stuckTimer.current) clearTimeout(stuckTimer.current);
    if (doneTimer.current) clearTimeout(doneTimer.current);
  };

  // The URL actually changed — the navigation this bar was tracking (if
  // any) has finished. Runs on mount too, which is harmless (nothing to
  // clear yet).
  useEffect(() => {
    if (!navigating.current) return;
    navigating.current = false;
    clearTimers();
    setPhase((p) => (p === "idle" ? p : "done"));
    doneTimer.current = setTimeout(() => setPhase("idle"), 200);
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element).closest?.("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same-page hash link — no route change to wait for.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      navigating.current = true;
      clearTimers();
      showTimer.current = setTimeout(() => setPhase("loading"), SHOW_DELAY_MS);
      stuckTimer.current = setTimeout(() => {
        navigating.current = false;
        setPhase("idle");
      }, STUCK_TIMEOUT_MS);
    }

    // Capture phase: Next's <Link> calls preventDefault() to do its own
    // client-side navigation, which would otherwise make every real click
    // look like one the defaultPrevented guard above should skip, since a
    // bubble-phase listener here would run after Link's own handler.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        className={`h-full bg-highlight transition-all ease-out motion-reduce:transition-none ${
          phase === "done" ? "opacity-0 duration-200" : "opacity-100 duration-[600ms]"
        }`}
        style={{ width: phase === "done" ? "100%" : `${HOLD_WIDTH}%` }}
      />
    </div>
  );
}
