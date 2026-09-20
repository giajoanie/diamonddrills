import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const STORAGE_ROOT = path.resolve(process.cwd(), process.env.FILE_STORAGE_DIR ?? "./.data/uploads");

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}

/**
 * Saves an uploaded file under `${FILE_STORAGE_DIR}/${category}/...` and
 * returns the relative path to store as `fileUrl` in the DB. `category`
 * doubles as the permission-check discriminator in the serving route
 * (`src/app/files/[...path]/route.ts`), so callers pass e.g.
 * `resources/<resourceId>` or `submissions/<submissionId>/<version>`.
 */
export async function saveUploadedFile(file: File, category: string): Promise<string> {
  const dir = path.join(STORAGE_ROOT, category);
  await mkdir(dir, { recursive: true });

  const uniquePrefix = randomBytes(8).toString("hex");
  const filename = `${uniquePrefix}-${sanitizeFilename(file.name || "upload")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `${category}/${filename}`;
}

/** Reads a previously-saved file back by its stored relative path. Throws if outside the storage root. */
export async function readStoredFile(relativePath: string): Promise<Buffer> {
  const fullPath = path.join(STORAGE_ROOT, relativePath);
  if (!fullPath.startsWith(STORAGE_ROOT)) {
    throw new Error("Invalid file path");
  }
  return readFile(fullPath);
}
