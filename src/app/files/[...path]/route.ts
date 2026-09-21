import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { readStoredFile } from "@/lib/files/storage";
import { mimeTypeForFilename } from "@/lib/files/mime";
import { canUserAccessResourceFile } from "@/lib/dal/resources";
import { prisma } from "@/lib/prisma";

/**
 * Every uploaded file (resource attachments, submission drafts) is served
 * through this authenticated route rather than a public URL, per spec 5.5.
 * The stored `fileUrl` in the DB is exactly the path segments this route
 * expects, e.g. "resources/<resourceId>/<name>" or
 * "submissions/<submissionId>/<name>".
 */
/** Every stored fileUrl is exactly "<category>/<ownerId>/<filename>" (see storage.ts) — reject anything else, including traversal segments, before touching the filesystem or the auth check. */
function isSafeSegment(segment: string | undefined): segment is string {
  return !!segment && segment !== "." && segment !== ".." && !segment.includes("/") && !segment.includes("\\");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const user = await requireUser();
  const { path: segments } = await params;
  if (segments.length !== 3 || !segments.every(isSafeSegment)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const [category, ownerId] = segments;

  if (category === "resources" && ownerId) {
    const allowed = await canUserAccessResourceFile(user.id, ownerId);
    if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } else if (category === "submissions" && ownerId) {
    const submission = await prisma.submission.findUnique({ where: { id: ownerId } });
    if (!submission || (submission.userId !== user.id && user.role !== "MENTOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const relativePath = segments.join("/");
    const buffer = await readStoredFile(relativePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": mimeTypeForFilename(segments[segments.length - 1]),
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
