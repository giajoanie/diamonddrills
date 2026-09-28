"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { logResourceOpen } from "@/lib/actions/resources";
import { getCaseStudyPreview } from "@/lib/case-study-format";

export type Resource = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  competitionLevel: string | null;
  resourceAreas: { instructionalArea: { name: string } }[];
};

/**
 * Index-card resource tile — see
 * design_handoff_norcal_resources/resources-reference.html (.res). A
 * text-only resource (no file/external URL — every case study, since its
 * content lives in `description`) keeps the app's existing in-app
 * slide-over reader instead of the reference's plain external link, which
 * assumes every resource has somewhere to send the browser. A resource with
 * a real file/URL opens it in a new tab exactly like the reference.
 */
export function ResourceCard({
  resource,
  typeLabel,
  tiltDeg,
}: {
  resource: Resource;
  typeLabel: string;
  tiltDeg: number;
}) {
  const [reading, setReading] = useState(false);
  const isTextOnly = !resource.fileUrl && !resource.externalUrl;
  const areaLabel = resource.resourceAreas.map((a) => a.instructionalArea.name).join(" · ");

  const cardInner = (
    <>
      <div className="res-h flex h-[38px] items-center justify-between px-[18px]">
        <span
          className="rounded-[4px] border-[1.5px] border-[#c2562f] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-[#c2562f]"
          style={{ transform: "rotate(-2deg)" }}
        >
          {typeLabel}
        </span>
        <span className="font-hand text-[15px] text-accent">open ↗</span>
      </div>
      <div className="flex flex-col gap-2 px-[18px] pb-4 pt-3.5">
        <div className="font-display text-base font-bold leading-[1.35] text-foreground text-pretty">
          {resource.name}
        </div>
        {areaLabel && (
          <div className="font-hand text-base" style={{ color: "rgba(18,58,122,.62)" }}>
            {areaLabel}
          </div>
        )}
      </div>
    </>
  );

  const cardClassName =
    "resource-index-card flex flex-col bg-white text-foreground no-underline shadow-[3px_4px_0_rgba(18,58,122,.08)] transition-shadow hover:shadow-[4px_6px_0_rgba(18,58,122,.14)]";
  const cardStyle = { transform: `rotate(${tiltDeg}deg)` };

  if (isTextOnly) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            void logResourceOpen(resource.id);
            setReading(true);
          }}
          className={`${cardClassName} text-left`}
          style={cardStyle}
        >
          {cardInner}
        </button>

        {reading && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setReading(false)}
              className="absolute inset-0 bg-foreground/40"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={resource.name}
              className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">{resource.name}</h2>
                <button
                  type="button"
                  onClick={() => setReading(false)}
                  aria-label="Close"
                  className="rounded-full p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground-muted">
                {resource.type === "CASE_STUDY" && resource.description
                  ? getCaseStudyPreview(resource.description)
                  : resource.description}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const href = resource.fileUrl ? `/files/${resource.fileUrl}` : resource.externalUrl!;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => void logResourceOpen(resource.id)}
      className={cardClassName}
      style={cardStyle}
    >
      {cardInner}
    </a>
  );
}
