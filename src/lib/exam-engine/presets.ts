export type TimedPreset = { minutes: number; questions: number };

/** Spec section 6.3. Keyed by minutes for easy lookup from a form value. */
export const TIMED_EXAM_PRESETS: Record<number, TimedPreset> = {
  90: { minutes: 90, questions: 100 },
  70: { minutes: 70, questions: 78 },
  50: { minutes: 50, questions: 56 },
  30: { minutes: 30, questions: 33 },
  10: { minutes: 10, questions: 11 },
};

export const DEFAULT_TIMED_PRESET_MINUTES = 90;

/** Baseline Diagnostic preset (shorter than a full timed exam by design —
 * it's a quick placement check, not a competition simulation). */
export const BASELINE_PRESET: TimedPreset = { minutes: 20, questions: 22 };
