import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { put, get } from "@vercel/blob";

// turbopackIgnore: without it, Next's file-tracer can't prove this dynamic
// (env-var-derived) path stays inside the project, so it conservatively
// bundles the *entire* repo (node_modules, public/, everything) into every
// serverless function that imports this module — which is what was blowing
// past Vercel's function size limit and taking the whole deployment down.
const STORAGE_ROOT = path.resolve(
  /* turbopackIgnore: true */ process.cwd(),
  process.env.FILE_STORAGE_DIR ?? "./.data/uploads",
);

// Vercel's serverless functions don't have a persistent disk — anything
// written to STORAGE_ROOT there can disappear before it's ever read back.
// Vercel Blob (set up by creating a Blob store in the Vercel project, which
// auto-populates this env var) is used instead whenever it's configured;
// local dev without it falls back to the filesystem above, unchanged.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

/** Shared cap for anything a mentor or student can upload (resources, submissions). */
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}

/**
 * Saves an uploaded file under `${FILE_STORAGE_DIR}/${category}/...` (or the
 * equivalent Blob pathname) and returns the relative path to store as
 * `fileUrl` in the DB. `category` doubles as the permission-check
 * discriminator in the serving route (`src/app/files/[...path]/route.ts`),
 * so callers pass e.g. `resources/<resourceId>` or `submissions/<submissionId>`.
 *
 * Blobs are stored with `access: "private"` — never a public URL a client
 * could hit directly — so the same per-request authorization check in the
 * serving route still gates every read, exactly as it does for local files.
 */
export async function saveUploadedFile(file: File, category: string): Promise<string> {
  const uniquePrefix = randomBytes(8).toString("hex");
  const filename = `${uniquePrefix}-${sanitizeFilename(file.name || "upload")}`;
  const relativePath = `${category}/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (useBlob) {
    await put(relativePath, buffer, { access: "private", addRandomSuffix: false });
    return relativePath;
  }

  const dir = path.join(/* turbopackIgnore: true */ STORAGE_ROOT, category);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return relativePath;
}

/** Reads a previously-saved file back by its stored relative path. Throws if outside the storage root (local mode) or not found (Blob mode). */
export async function readStoredFile(relativePath: string): Promise<Buffer> {
  if (useBlob) {
    const result = await get(relativePath, { access: "private" });
    if (!result) throw new Error("File not found");
    return Buffer.from(await new Response(result.stream).arrayBuffer());
  }

  const fullPath = path.join(/* turbopackIgnore: true */ STORAGE_ROOT, relativePath);
  // path.relative + the leading-".." check (rather than a bare startsWith)
  // avoids the classic false-positive where STORAGE_ROOT is a string
  // prefix of a *sibling* directory, e.g. ".../uploads" vs ".../uploads-backup".
  const relative = path.relative(STORAGE_ROOT, fullPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Invalid file path");
  }
  return readFile(fullPath);
}
