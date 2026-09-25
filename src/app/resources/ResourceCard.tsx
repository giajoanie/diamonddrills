"use client";

import { useState } from "react";
import { FileText, Link as LinkIcon, X } from "lucide-react";
import { logResourceOpen } from "@/lib/actions/resources";
import { getCaseStudyPreview } from "@/lib/case-study-format";
import { Card } from "@/components/ui/Card";

type Resource = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  resourceAreas: { instructionalArea: { name: string } }[];
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const [reading, setReading] = useState(false);
  const isTextOnly = !resource.fileUrl && !resource.externalUrl;
  const textOnlyPreview =
    resource.type === "CASE_STUDY" && resource.description
      ? getCaseStudyPreview(resource.description)
      : (resource.description?.split("\n")[0] ?? null);
  const preview = isTextOnly ? textOnlyPreview : resource.description;

  const inner = (
    <>
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
        {resource.fileUrl ? (
          <FileText className="h-4 w-4 text-accent-strong" aria-hidden />
        ) : (
          <LinkIcon className="h-4 w-4 text-accent-strong" aria-hidden />
        )}
      </span>
      <div>
        <p className="font-display font-bold text-foreground">{resource.name}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          {resource.type}
        </p>
        {preview && (
          <p className={`mt-1 text-sm text-foreground-muted ${isTextOnly ? "line-clamp-2" : ""}`}>
            {preview}
          </p>
        )}
        {resource.resourceAreas.length > 0 && (
          <p className="mt-1 text-xs text-foreground-subtle">
            {resource.resourceAreas.map((a) => a.instructionalArea.name).join(" · ")}
          </p>
        )}
      </div>
    </>
  );

  if (isTextOnly) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            void logResourceOpen(resource.id);
            setReading(true);
          }}
          className="flex w-full items-start gap-3 rounded-xl border border-border bg-background-elevated p-5 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          {inner}
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
                {resource.description}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const href = resource.fileUrl ? `/files/${resource.fileUrl}` : resource.externalUrl!;
  return (
    <Card className="transition-shadow hover:shadow-md">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void logResourceOpen(resource.id)}
        className="flex items-start gap-3"
      >
        {inner}
      </a>
    </Card>
  );
}
