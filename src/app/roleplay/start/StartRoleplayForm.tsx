"use client";

import { useActionState, useState } from "react";
import { startRoleplaySession, type StartRoleplayState } from "@/lib/actions/roleplay";
import { Label, Select, FieldError } from "@/components/ui/Field";
import { PerformanceIndicatorCards } from "@/components/roleplay/PerformanceIndicatorCards";
import { KeyTermsList } from "@/components/roleplay/KeyTermsList";

type Term = { id: string; term: string; definition: string };
type Peer = { id: string; firstName: string };
type Event = {
  id: string;
  name: string;
  clusterName: string;
  prepMinutes: number;
  presentMinutes: number;
  isTeam: boolean;
  pis: { tierLabel: string; items: string[] }[];
  terms: Term[];
  peers: Peer[];
};
type Resource = { id: string; name: string };

/**
 * Event-picker note + PI/key-terms columns for /roleplay/start — see
 * design_handoff_progress_roleplay/roleplay-reference.html. Owns the
 * selected-event state so the format strip, PI cards, and key terms all
 * update together when the event changes, per the handoff's "Changing the
 * event updates the format strip, PIs, and key terms."
 */
export function StartRoleplayForm({
  events,
  caseStudies,
  defaultPartnerId,
}: {
  events: Event[];
  caseStudies: Resource[];
  defaultPartnerId: string;
}) {
  const [state, action, pending] = useActionState<StartRoleplayState, FormData>(
    startRoleplaySession,
    undefined,
  );
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const event = events.find((e) => e.id === eventId) ?? events[0];

  return (
    <>
      <div
        className="progress-note relative mt-6 max-w-[920px] rounded-none px-[26px] py-6"
        style={{ background: "#eaf2ff" }}
      >
        <div className="progress-note-tape" style={{ left: "36px", width: "88px", transform: "rotate(-2deg)" }} />

        <form action={action}>
          {state?.error && <FieldError messages={[state.error]} />}

          <label
            htmlFor="eventId"
            className="font-display text-[11px] font-bold uppercase tracking-[.08em] text-accent"
          >
            Roleplay event
          </label>
          <div className="mt-2.5 flex flex-wrap items-center gap-4">
            <select
              id="eventId"
              name="eventId"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="font-body min-w-0 flex-1 appearance-none rounded-[10px] border-[1.5px] border-[rgba(18,58,122,.22)] bg-white bg-[right_16px_center] bg-no-repeat px-4 py-3 pr-10 text-[15px] font-semibold text-foreground"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%232a58b8'/%3E%3C/svg%3E\")",
              }}
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={pending}
              className="font-body flex-none rounded-full border-none bg-[#123a7a] px-6 py-[13px] text-sm font-bold text-white shadow-[0_3px_8px_rgba(18,58,122,.25)]"
            >
              {pending ? "Starting…" : "Start practice →"}
            </button>
          </div>

          {event && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FormatStep value={event.prepMinutes} label="min prep" />
              <span className="font-hand text-xl text-[rgba(18,58,122,.5)]">→</span>
              <FormatStep value={event.presentMinutes} label="min present" />
              <span className="font-hand text-xl text-[rgba(18,58,122,.5)]">→</span>
              <FormatStep label="self-rate" />
              <span className="font-hand ml-auto text-[15px] text-accent">
                {event.isTeam ? "team event · 2 people" : "individual event"}
              </span>
            </div>
          )}

          {caseStudies.length > 0 && (
            <div className="mt-4">
              <Label htmlFor="caseStudyResourceId">Case study (optional)</Label>
              <Select id="caseStudyResourceId" name="caseStudyResourceId" defaultValue="">
                <option value="">None</option>
                {caseStudies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {event && event.peers.length > 0 && (
            <div className="mt-4">
              <Label htmlFor="partnerId">Practice with a partner (optional)</Label>
              <Select id="partnerId" name="partnerId" defaultValue={defaultPartnerId}>
                <option value="">Just me — I&apos;ll share the judge link myself</option>
                {event.peers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.firstName}
                  </option>
                ))}
              </Select>
              <p className="mt-1 text-xs text-foreground-subtle">
                They&apos;ll see an invite to judge your presentation as soon as you start.
              </p>
            </div>
          )}
        </form>
      </div>

      {event && (
        <div className="mt-[38px] grid items-start gap-[34px] lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="sec border-b-2 border-border pb-1.5 font-display text-xs font-bold uppercase tracking-[.08em] text-accent">
              Performance indicators to review
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[rgba(18,58,122,.62)]">
              From MBA Research&apos;s published PI list. Your mentor adds the scoring rubric
              separately.
            </p>
            {event.pis.length > 0 && (
              <div className="mt-3.5">
                <PerformanceIndicatorCards panels={event.pis} />
              </div>
            )}
          </div>
          <div>
            <div className="border-b-2 border-border pb-1.5 font-display text-xs font-bold uppercase tracking-[.08em] text-accent">
              Key terms · {event.clusterName.toUpperCase()}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[rgba(18,58,122,.62)]">
              Vocabulary a judge expects you to know cold.
            </p>
            <KeyTermsList terms={event.terms} />
          </div>
        </div>
      )}
    </>
  );
}

function FormatStep({ value, label }: { value?: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2 rounded-[10px] border-[1.5px] border-dashed border-[rgba(18,58,122,.3)] bg-white px-3.5 py-2">
      {value != null && <b className="font-hand text-[26px] leading-none text-foreground">{value}</b>}
      <span className="font-body text-xs font-semibold text-[rgba(18,58,122,.7)]">{label}</span>
    </div>
  );
}
