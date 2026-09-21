"use client";

import { FileText, Link as LinkIcon } from "lucide-react";
import { logResourceOpen } from "@/lib/actions/resources";
import { RuledCard } from "@/components/binder/RuledCard";

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
  const href = resource.fileUrl ? `/files/${resource.fileUrl}` : resource.externalUrl!;

  return (
    <RuledCard className="transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-border)]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void logResourceOpen(resource.id)}
        className="flex items-start gap-3"
      >
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
          {resource.description && (
            <p className="mt-1 text-sm text-foreground-muted">{resource.description}</p>
          )}
          {resource.resourceAreas.length > 0 && (
            <p className="mt-1 text-xs text-foreground-subtle">
              {resource.resourceAreas.map((a) => a.instructionalArea.name).join(" · ")}
            </p>
          )}
        </div>
      </a>
    </RuledCard>
  );
}
