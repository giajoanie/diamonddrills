import type { EventFormat } from "@/generated/prisma/client";

/**
 * Competition-matching prep/presentation timers (spec Tier 2 roleplay
 * simulator): Team Decision Making gets 30 min prep / 15 min presentation;
 * every other roleplay format is treated as an individual event at
 * 10 min prep / 10 min presentation.
 */
export function getRoleplayTimerPreset(format: EventFormat): {
  prepSeconds: number;
  presentationSeconds: number;
} {
  if (format === "TEAM_DECISION_MAKING") {
    return { prepSeconds: 30 * 60, presentationSeconds: 15 * 60 };
  }
  return { prepSeconds: 10 * 60, presentationSeconds: 10 * 60 };
}
