# Deployment guide

Diamond Drills is a standard Next.js 16 App Router app backed by Postgres. This
guide covers a first deployment and the day-to-day operations around it.

## 1. Prerequisites

- Node.js 20+ and npm
- A Postgres 16 database (the included `docker-compose.yml` runs one locally;
  any managed Postgres — RDS, Supabase, Neon, Railway, etc. — works the same
  way in production)
- A place to store uploaded files (resource attachments, submission uploads)
  that persists across deploys — see [File storage](#5-file-storage) below

## 2. Environment variables

Copy `.env.example` to `.env` and fill in real values:

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string. |
| `FILE_STORAGE_DIR` | Yes | Directory uploaded files are written to and served from. Must be a path that survives restarts/redeploys (see below). |
| `NODE_ENV` | Yes | `production` in production — this also governs whether the session cookie is marked `secure`. |

**Never commit `.env`.** It's already gitignored; only `.env.example` (with
placeholder values) is tracked.

## 3. Database setup

```bash
npm install                       # also runs `prisma generate` via postinstall
npx prisma migrate deploy         # applies committed migrations, does not create new ones
npm run db:seed                   # clusters, exam banks, events, and 2 mentor accounts
```

`db:seed` prints a random temporary password for each mentor account to the
console — copy those down now, since they aren't stored or shown again (only
their hash is). Both mentors are forced to change their password on first
login (`mustChangePassword`), which is when they'd set something they'll
actually remember.

`db:seed` is safe to re-run: it upserts reference data and skips creating a
mentor account that already exists, so it won't overwrite a password a
mentor has already changed.

### Importing exam question banks

Exam questions come from PDF files, not the seed script. Stage exam PDFs
under `seed/exams/<cluster>/` and run:

```bash
npm run db:import-exams
```

This parses each PDF, matches questions to answer keys, and creates
`isActive: false` draft questions for a mentor to review and publish from
`/mentor/exams`. See `PARSE_REPORT.md` for what this produced against the
exams staged during development, and expect to re-run it whenever a chapter
adds a new exam.

### Demo data (optional)

To populate the platform with realistic fake data for a demo or trial run —
6 students with exam history, roleplay sessions, competition results, and
more — run:

```bash
npm run db:seed-demo
```

**Before real production use, remove it:**

```bash
npm run db:remove-demo
```

This deletes only rows tagged as demo data (student accounts with schoolIds
`9000001`-`9000006`, and any mentor-authored content prefixed `"[Demo]"`) —
it never touches real accounts or the base reference data. Confirm it ran
cleanly (it prints a count of everything it removed) before treating the
instance as production-ready.

## 4. Build and run

```bash
npm run build
npm run start
```

`npm run start` serves the production build on port 3000 by default (set the
`PORT` env var to change it). Put this behind a reverse proxy (nginx, Caddy,
your platform's own load balancer) that terminates TLS — the app assumes
HTTPS in production for its `Strict-Transport-Security` header and secure
session cookies to make sense.

If deploying to a platform that builds from git (Vercel, Railway, Render,
etc.), point its build command at `npm run build` and its start command at
`npm run start`, and run `npx prisma migrate deploy` as a release/predeploy
step rather than locally, so migrations run against the actual production
database.

## 5. File storage

Uploaded files (resource attachments, assignment submissions) are written to
`FILE_STORAGE_DIR` and served through an authenticated route
(`/files/[...path]`) — never as static public files. On a single persistent
server, a local directory outside the build output is fine. On an ephemeral
or multi-instance platform (most PaaS deploys, containers that get recreated
on every deploy), point `FILE_STORAGE_DIR` at a mounted persistent volume or
switch storage backends — otherwise uploads silently disappear on the next
deploy. (Swapping `src/lib/files/storage.ts` for an S3-compatible backend
would be the natural next step if that's needed; it wasn't required for the
platform's original single-school, single-instance deployment target.)

## 6. Ongoing operations

- **Migrations**: whenever `prisma/schema.prisma` changes, a new migration
  under `prisma/migrations/` should already be committed alongside it — run
  `npx prisma migrate deploy` as part of every deploy to apply any that
  haven't run yet.
- **Backups**: back up the Postgres database on whatever schedule your host
  provides — it holds every student's exam history, submissions, and
  competition record, none of which is reconstructable if lost. Back up
  `FILE_STORAGE_DIR` too, on the same schedule.
- **Rate limiting**: signup and Judge Mode scoring are rate-limited
  in-process (`src/lib/rate-limit.ts`) — fine for a single instance, but
  reset on every restart/redeploy and not shared across multiple instances.
  If this ever runs behind a load balancer with more than one app instance,
  that limiter would need to move to a shared store (Redis, or similar).
- **Account lockouts**: a student or mentor locked out after repeated failed
  logins (`src/lib/auth/lockout.ts`) waits out an escalating cooldown; there's
  no admin "unlock" action yet, so if that's needed urgently, clear
  `failedLoginAttempts`/`lockedUntil` directly on the `User` row.
