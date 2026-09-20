"use client";

import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/Button";
import { Label, Select } from "@/components/ui/Field";

const DURATION_OPTIONS = [
  { label: "15 minutes (presentation)", seconds: 15 * 60 },
  { label: "5 minutes (Q&A)", seconds: 5 * 60 },
  { label: "10 minutes", seconds: 10 * 60 },
];

/**
 * A practice timer for rehearsing the in-person written-event presentation —
 * purely client-side and ephemeral (nothing to grade or persist here, unlike
 * the roleplay simulator's recorded sessions).
 */
export function PresentationTimer() {
  const [durationSeconds, setDurationSeconds] = useState(DURATION_OPTIONS[0].seconds);
  const [remaining, setRemaining] = useState(DURATION_OPTIONS[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function handleDurationChange(seconds: number) {
    setDurationSeconds(seconds);
    setRemaining(seconds);
    setRunning(false);
  }

  function handleReset() {
    setRemaining(durationSeconds);
    setRunning(false);
  }

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="presentationDuration">Practice presentation timer</Label>
        <Select
          id="presentationDuration"
          value={durationSeconds}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          disabled={running}
        >
          {DURATION_OPTIONS.map((o) => (
            <option key={o.seconds} value={o.seconds}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>

      <p className={`text-3xl font-semibold ${remaining === 0 ? "text-danger" : "text-foreground"}`}>
        {formatTime(remaining)}
      </p>

      <div className="flex gap-2">
        {!running ? (
          <Button type="button" onClick={() => setRunning(true)} disabled={remaining === 0}>
            {remaining === durationSeconds ? "Start" : "Resume"}
          </Button>
        ) : (
          <Button type="button" variant="secondary" onClick={() => setRunning(false)}>
            Pause
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
