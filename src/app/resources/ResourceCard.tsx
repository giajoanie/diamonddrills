"use client";

import { FileText, Link as LinkIcon } from "lucide-react";
import { logResourceOpen } from "@/lib/actions/resources";
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
  const href = resource.fileUrl ? `/files/${resource.fileUrl}` : resource.externalUrl!;

  return (
    <Card>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void logResourceOpen(resource.id)}
        className="flex items-start gap-3"
      >
        {resource.fileUrl ? (
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
        ) : (
          <LinkIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
        )}
        <div>
          <p className="font-medium text-foreground">{resource.name}</p>
          <p className="text-xs uppercase tracking-wide text-foreground-subtle">{resource.type}</p>
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
    </Card>
  );
}
