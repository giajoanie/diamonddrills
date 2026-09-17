"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the chapter-provided DECA logo from /public/brand/deca-logo.png.
 * Falls back to a text wordmark until that asset is supplied (see DECISIONS.md).
 *
 * The image can fail to load before React hydrates and attaches `onError`
 * (the browser doesn't refire `error` for an already-failed request), so on
 * mount we also check `img.complete && naturalWidth === 0` directly.
 */
export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <span
        className={`font-semibold tracking-wide text-foreground ${className ?? ""}`}
      >
        Diamond <span className="text-accent">Drills</span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/brand/deca-logo.png"
      alt="DECA chapter logo"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
