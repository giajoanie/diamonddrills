"use client";

import { useActionState, useState } from "react";
import { createResource, type CreateResourceState } from "@/lib/actions/resources";
import { Button } from "@/components/ui/Button";
import { Label, Input, Select, FieldError } from "@/components/ui/Field";

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  CASE_STUDY: "Case study",
  EXAM: "Exam",
  LESSON: "Lesson",
  VIDEO: "Video",
  STUDY_GUIDE: "Study guide",
  SAMPLE_WRITTEN: "Sample written",
  RUBRIC: "Rubric",
  PRESENTATION: "Presentation",
  OTHER: "Other",
};

type Cluster = { id: string; name: string; events: { id: string; name: string }[] };
type InstructionalArea = { id: string; name: string };

export function UploadResourceForm({
  clusters,
  instructionalAreas,
}: {
  clusters: Cluster[];
  instructionalAreas: InstructionalArea[];
}) {
  const [state, action, pending] = useActionState<CreateResourceState, FormData>(
    createResource,
    undefined,
  );
  const [allEvents, setAllEvents] = useState(false);

  return (
    <form action={action} className="space-y-4">
      {state?.error && <FieldError messages={[state.error]} />}

      <div>
        <Label htmlFor="name">Resource name</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select id="type" name="type" defaultValue="LESSON">
          {Object.entries(RESOURCE_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="allEvents"
          checked={allEvents}
          onChange={(e) => setAllEvents(e.target.checked)}
        />
        All events (every cluster)
      </label>

      {!allEvents && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="clusterIds">Entire cluster(s)</Label>
            <select
              id="clusterIds"
              name="clusterIds"
              multiple
              size={Math.min(clusters.length, 6)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
            >
              {clusters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="eventIds">Specific event(s)</Label>
            <select
              id="eventIds"
              name="eventIds"
              multiple
              size={Math.min(clusters.length, 6)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
            >
              {clusters.map((c) => (
                <optgroup key={c.id} label={c.name}>
                  {c.events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="instructionalAreaIds">Instructional area(s) (optional)</Label>
        <select
          id="instructionalAreaIds"
          name="instructionalAreaIds"
          multiple
          size={Math.min(instructionalAreas.length, 6)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          {instructionalAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Select id="grade" name="grade" defaultValue="">
            <option value="">All grades</option>
            {[9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                {g}th grade
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="competitionLevel">Competition level</Label>
          <Select id="competitionLevel" name="competitionLevel" defaultValue="">
            <option value="">All levels</option>
            <option value="DISTRICT">District</option>
            <option value="STATE">State</option>
            <option value="ICDC">ICDC</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="file">File</Label>
        <Input id="file" name="file" type="file" />
      </div>
      <div>
        <Label htmlFor="externalUrl">Or an external URL</Label>
        <Input id="externalUrl" name="externalUrl" type="url" placeholder="https://…" />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Uploading…" : "Upload resource"}
      </Button>
    </form>
  );
}
