# DECISIONS.md

Ambiguities encountered while building, the default chosen, and why — per working rule #2 in `DECA_HUB_BUILD_PROMPT.md`. Newest entries at the bottom of each phase's section.

---

## Phase 2

### `pdf-parse` breaks under Turbopack's server bundling — fixed with `serverExternalPackages`
`pdf-parse` (built on `pdfjs-dist`) sets up a Node "fake worker" at call time by dynamically resolving a `pdf.worker.mjs` chunk; Turbopack's server-component bundling changes that file's path and the resolve fails with `Setting up fake worker failed`. Fixed by adding `pdf-parse` and `pdfjs-dist` to `serverExternalPackages` in `next.config.ts`, which tells Next.js to `require()` them natively instead of bundling. Required a dev server restart to take effect (config is only read at startup).

### Instructional area codes (BL, CM, CO, CR, EC, EI, FI, HR, IM, MK, MP, NF, OP, PD, PI, PM, PR, SE) verified via research
Extracted from real exam answer-key "SOURCE:" lines across all 6 staged Marketing exams. Two were genuinely ambiguous from context alone (NF, MK) and confirmed via web research: **NF = Information Management** (the generic/business-core version) and **MK = Marketing** (broad marketing-fundamentals area) — distinct from **IM = Marketing-Information Management** (the Marketing-cluster-specific, marketing-research-flavored version), which coexists with NF in the same exam bank. All 18 codes are stored in `src/lib/exam-import/instructional-areas.ts`. Research access was search-snippet-based (direct fetches to mbaresearch.org/deca.org were blocked in this sandbox), so confidence is "strongly corroborated" rather than verbatim-sourced — flagged if a mentor ever spots a wrong label on the review screen, it's a one-field edit, not a schema problem.

### Instructional areas stored globally, not per exam bank
The schema supports scoping `InstructionalArea` to a specific `ExamBank`, but research found these code→name mappings are stable across DECA's cluster exams (excluding the IM/NF distinction, which are two different codes, not the same code meaning different things). Seeded with `examBankId: null` (global). Note: Postgres doesn't enforce uniqueness across NULL values in the `@@unique([examBankId, slug])` index, so lookups use `findFirst` + `create` (`getOrCreateGlobalInstructionalArea`) rather than `upsert`.

### Exam PDF parser: real-world layout quirks handled, not a hypothetical
While building the parser, testing against all 6 staged real exam PDFs (2010–2014, 2026) surfaced actual defects worth recording:
- **2011 exam PDF has no extractable text layer** (scanned/image-only, 34 blank pages per `pdf-parse`). Flagged as an anomaly and skipped rather than guessed at; needs OCR or manual entry, which is out of scope for now.
- **2013 exam's first key-page header has a typo** — it still reads "...EXAM 12" instead of "...EXAM—KEY 13" like every other key page. Initially caused an off-by-one that dropped 5 real key entries and fabricated a phantom question. Fixed by detecting the body/key boundary from **content structure** (the first bare "1. `<letter>`" line — a real question stem is never that short) instead of trusting header text, which is more robust regardless of one-off template mistakes in 15-year-old PDFs.
- **Options render as either one-per-line or two-per-line** (a two-column layout used when both options are short), inconsistently across years and even within the same exam, with the column separator rendered as tabs, multiple spaces, or a single space depending on export tool. Handled with a lazy-match regex that finds the second marker (`C.`/`D.`) if present without needing a fixed separator.
- Verified parser quality directly against real data before writing any DB-persistence code: 5 of 6 files parsed 100/100 questions matched to their key with zero anomalies (see `PARSE_REPORT.md`); the 6th (2011) was correctly identified as unparseable rather than silently producing garbage.

### Mentor exam upload requires Node's `--conditions=react-server` flag for CLI scripts
`src/lib/exam-import/extract-pdf-text.ts` and `src/lib/dal/instructional-areas.ts` import `"server-only"`, which throws when required outside Next's own build (it relies on Next setting the `react-server` package-export condition to pick the no-op implementation; plain Node/`tsx` don't set that condition, so it always hits the throwing branch). Since the one-time bulk importer (`scripts/import-exam-pdfs.ts`) needs to import that same shared logic from outside Next, its npm script (`db:import-exams`) sets `NODE_OPTIONS=--conditions=react-server` rather than stripping the `"server-only"` guard from shared modules.

### "Longest streak" personal record interpreted as longest in-attempt correct-answer run
Spec §6.7 lists "personal records (best score, longest streak)" without defining what the streak counts (days practiced? correct answers in a row? attempts above some threshold?). Interpreted it as the longest run of consecutive correct answers within a single attempt (by question order) — a natural, immediately-computable test-taking record, and the one most directly motivating during practice. `computeLongestCorrectStreak` in `src/lib/exam-engine/streak.ts`, unit-tested. Flagging in case a login-streak or daily-practice-streak was intended instead — easy to add alongside this one later.

### "Score trend... per instructional area" simplified to a weighted weakest-areas list, not N line charts
Spec §6.7 asks for score trend lines "overall and per instructional area." Built the overall trend as a real line chart (`/progress`), but rendered the per-area view as `computeWeightedWeakAreas`' ranked list (already recency-weighted, matches the "weighted toward recent attempts" requirement in the same section) rather than plotting a separate line per instructional area, which would need small-multiples or an 18-line chart to stay readable. Revisit if a mentor/student specifically wants to see one area's trajectory over time — the underlying per-attempt-per-area data (`getAttemptQuestionHistory`) already supports it.

## Phase 1

### Accent color changed from teal to blue (#61a1d7)
The build spec's original design system (§3) called for teal accents; the user shared a chapter flyer with a bolder, warm-toned "vibe" and then specified `#61a1d7` (a mid blue) as the accent color to use instead. Since every component already referenced the accent via semantic Tailwind classes (`text-accent`, `bg-accent-strong`, etc.) rather than hardcoded teal hex values, this was a single-file token change in `globals.css`: `--color-accent: #61a1d7`, with `--color-accent-strong` (`#3d7ab8`) and `--color-accent-fg` (`#05121f`, dark text) chosen to keep WCAG AA contrast on solid-accent buttons (verified: ~5:1 for accent-strong, ~7.6:1 for accent, both well above the 4.5:1 AA text threshold, using dark text rather than white since white-on-this-blue was only ~2.8–4:1). Held off on the flyer's heavier poster-style typography (drop shadows, bolder display headlines) until more background assets arrive, per the user's note that more are coming — a color-token swap is safe and reversible; a full typographic treatment isn't something to guess twice.

### Product renamed: "DECA Hub" → "Diamond Drills" (full name "Mountain House Diamond Drills")
Per explicit request, replaced every "DECA Hub" reference in the app UI. There's now one designated spot for the full formal name — the browser tab's default `<title>` (`Mountain House Diamond Drills`) — and every other occurrence (page-title template suffix, meta description, footer, login heading, homepage eyebrow, Logo fallback text) uses the short name "Diamond Drills". `DECA_HUB_BUILD_PROMPT.md` (the original spec) and the historical Phase 0 entries above are left as-is since they're a record of the instructions as given at the time, not living UI copy. The chapter's actual DECA logo image (`/public/brand/deca-logo.png`) is unaffected by this — that's a separate, DECA-branded asset per spec §3, not the product name.

### Button/label casing cleanup
Fixed "Student sign up" (awkward mid-phrase lowercase) → "Sign up" on the homepage, matching the sentence-case convention already used everywhere else ("Log in", "Save new password", "Reset password"). Also flagged the ALL-CAPS "ROLEPLAY EVENT" / "WRITTEN EVENT" card labels on the dashboard as an intentional small-caps style choice (CSS `uppercase`), not a grammar issue — left those as-is.

### Mentor seed password hardcoded, per explicit user instruction (overrides the original spec)
`DECA_HUB_BUILD_PROMPT.md` §5.3 originally said the mentor seed password must come from a `SEED_MENTOR_PASSWORD` env var and never be hardcoded. The user explicitly asked to hardcode it instead — it's a shared chapter password, not a secret, and other mentors are meant to know it. `prisma/seed.ts` now sets it as a constant (`DiamondDrills2026`) directly; removed `SEED_MENTOR_PASSWORD` from `.env` / `.env.example`. Noting this here since it's a direct reversal of a security instruction in the original spec, not a silent judgment call — the user made the call.

### `/signup` was statically prerendered at build time — fixed with `force-dynamic`
`next build` marked `/signup` as static (`○`) because nothing in its render path calls a Request-time API. That baked the entire event dropdown list into the HTML/RSC payload at build time: a mentor adding, renaming, or deactivating an event afterward would not show up until the next deploy. Added `export const dynamic = "force-dynamic"` to `src/app/signup/page.tsx` so it's server-rendered per request instead (confirmed via a fresh `next build` that it now shows as `ƒ`). `/login` stays static since it has no DB-dependent content. Worth checking again in Phase 3+ as more DB-backed pages are added — same class of bug.

### `@prisma/adapter-pg`'s object-config form silently drops the username
`new PrismaPg({ connectionString: ... })` connects to Postgres but every query fails with a cryptic "no PostgreSQL user name specified in startup packet" / `DatabaseAccessDenied` error — the object form doesn't reach `pg.Pool` correctly in this adapter version. `new PrismaPg(connectionStringAsString)` works. Fixed in `src/lib/prisma.ts`; left a comment there so nobody "fixes" it back to the object form, which looks more idiomatic but is broken.

### `.env` isn't auto-loaded outside the Prisma CLI
Only `prisma.config.ts` (via its own `import "dotenv/config"`) loads `.env` for `prisma migrate`/`generate`. Running `prisma/seed.ts` directly with `tsx`, or running Vitest, does not — `DATABASE_URL` came back `undefined`, which combined with the adapter-pg bug above initially looked like a permissions problem. Added explicit `import "dotenv/config"` to both `prisma/seed.ts` and `vitest.config.ts`.

## Phase 0

### Prisma CLI version pinned to 7.10.0, not npm's "latest" tag
`npm install prisma` resolved to `8.0.0-rc.15` (npm's `latest` dist-tag currently points at a release candidate), while `@prisma/client`'s `latest` tag is the stable `7.10.0`. Installing the mismatched pair broke immediately. **Decision:** pinned `prisma` to `7.10.0` to match `@prisma/client`. Revisit once Prisma 8 has an actual stable release.

### Prisma 7's new config format
Prisma 7 removed `datasource.url` from `schema.prisma` in favor of `prisma.config.ts` + explicit driver adapters passed to `PrismaClient`. Used `@prisma/adapter-pg` with `DATABASE_URL` from the environment, and the new `generator client { provider = "prisma-client" }` (outputs to `src/generated/prisma` instead of importing directly from `@prisma/client`). This is the currently-recommended path, not a workaround.

### Password hashing library: `@node-rs/argon2` instead of the `argon2` npm package
The spec allows argon2 or bcrypt. The plain `argon2` npm package requires a native compile toolchain (node-gyp) at install time, which is fragile in constrained/sandboxed environments. `@node-rs/argon2` ships prebuilt native bindings (napi-rs) for the same algorithm and is a drop-in choice. No behavior difference for users.

### Session auth implementation: custom, not a library
Built a minimal session table (`Session` model) + httpOnly cookie holding a random token, with only the token's SHA-256 hash stored server-side — rather than pulling in NextAuth/Auth.js. The spec calls for straightforward session-based auth with hashed passwords and httpOnly cookies; a full auth framework would add surface area (OAuth providers, adapters) this app doesn't use, since the only two account types are school-issued School ID + password.

### DECA logo asset not yet provided
`/public/brand/deca-logo.png` doesn't exist yet (the spec describes it as "chapter-provided"). Built `Logo` as a small client component that renders the image and falls back to a text "Diamond Drills" wordmark on load error, so the app doesn't break and nothing resembling an official DECA logo is fabricated. **Action needed from you:** drop the real file at that path (and it'll pick it up automatically, including as favicon) — see `next.config`/`layout.tsx` icon metadata.

### Event categorization: Professional Selling stays WRITTEN
The spec explicitly says: *"Keep it selectable as WRITTEN unless I say otherwise."* Research turned up that DECA's own taxonomy treats Professional Selling, Financial Consulting, and Hospitality and Tourism Professional Selling as one category ("Professional Selling and Consulting") that behaves more like a roleplay (live judged presentation + exam) than a written deliverable. Followed your explicit instruction anyway: Professional Selling = `WRITTEN`; the other two stay `ROLEPLAY` as originally hand-typed. This leaves a real inconsistency across the three sibling events — flagged in `EVENT_VERIFICATION.md` §3 item 5 in case you'd rather make them consistent.

### Exam bank enum corrections applied without asking
Two corrections from research were applied directly rather than flagged as an open question, because they're unambiguous and structural, not judgment calls:
- All five "Principles of X" events use the **Business Administration Core** exam bank, not their own cluster's exam (this matches the spec's own stated default assumption in §4.1 — research just confirmed it).
- "Business Law" and "Sports and Entertainment Marketing" are not standalone DECA exam banks; Business Law and Ethics TDM and all three SEM events route to Business Management and Administration and Marketing respectively.

### Financial Literacy Project's cluster placement — left as hand-typed, flagged uncertain
Research couldn't confirm with confidence whether DECA files this under Business Management and Administration (as hand-typed) or Personal Financial Literacy. Seeded under BMA for now since that's the existing hand-typed placement; see `EVENT_VERIFICATION.md` §4 for the open question.

### Event research was search-snippet-based, not a direct document read
The sandboxed environment blocked direct `WebFetch` access to deca.org, decaplus.org, and every state-DECA site tried, so `EVENT_VERIFICATION.md` is built entirely from web-search snippets rather than a first-hand read of DECA's current Guide/Exam Blueprint PDFs. Confidence per-claim is noted in that file. **Recommend a human spot-check the Exam Blueprints PDF and the current-year Guide PDF before treating minute counts, page limits, or the Financial Literacy Project placement as final** — none of those numbers are hard-coded into the schema yet, so nothing breaks if they change.

### Exam PDFs will arrive incrementally
You uploaded one exam (`2026 Marketing ICDC Exam`) mid-Phase-0; it's stored at `seed/exams/marketing/2026_marketing_icdc_exam.pdf` for the Phase 2 PDF-import pipeline to pick up. More will presumably follow before Phase 2 begins — no action needed now, just noting where uploads land.

### This Next.js version (16.3.5) is ahead of training data — checked bundled docs before writing more code
`AGENTS.md`/`CLAUDE.md` (auto-generated by `next dev`) correctly flagged that this Next.js version may have breaking changes vs. training data, and pointed at real bundled docs in `node_modules/next/dist/docs/`. Confirmed this is genuine (the generator script and docs directory both exist) and read the version 16 upgrade guide plus the authentication guide before proceeding. Two things affect this codebase directly:

1. **`middleware.ts` is renamed to `proxy.ts`** (exported function `proxy`, not `middleware`); the `edge` runtime is no longer supported for it (runs on `nodejs` only, which suits us anyway since our session lookup needs Prisma/node-postgres). No `proxy.ts` exists yet — note this for whoever adds one in Phase 1, and per Next's own guidance, use it only for optimistic redirects, not as the real auth check.
2. **Layouts are not a reliable place for auth checks.** Next 16's partial rendering means a shared `layout.tsx` does not re-run on client-side navigation between sibling routes, so a check placed only in a layout won't re-verify the session on every route change, and a layout doesn't stop the rest of the route tree from rendering/streaming regardless. The documented pattern is a `cache()`-memoized `getSessionUser()`/`requireUser()` (already updated in `src/lib/auth/session.ts` and `src/lib/auth/guards.ts` to use React's `cache()`) called from **every** protected `page.tsx`, Server Action, and Route Handler — not just from the layout. **Applies directly to Phase 1's "role-based route protection" requirement — student/mentor route protection must be enforced per-page, with layouts only used for shared chrome.**

Also confirmed already-correct: `cookies()` usage (async, `await cookies()`) matches the current API; ESLint flat config matches what's already generated; ID param helper types (`LayoutProps<"/">`) match the new `next typegen` convention already in the scaffolded `layout.tsx`.

### Local dev database: native Postgres, not Docker
`docker-compose.yml` is included per the spec's tech stack (and is what you should use on a normal machine), but this sandbox's Docker daemon isn't available to me. Used the sandbox's pre-installed native PostgreSQL 16 instead, with a `deca_hub` role/database matching the same credentials `docker-compose.yml` would produce, so `DATABASE_URL` in `.env` works either way. This only affects how *I* verified the schema in this session — it doesn't change anything about how you'd run this locally.

### Assignment types simplified for Phase 3 scope
`EXAM`-type assignments store their config (`examBankId`, `questionCount`, `timeLimitMinutes`) as a randomized draw, reusing the existing practice-exam engine from Phase 2 rather than building a separate fixed-question-set authoring flow — a mentor picks a bank and a count, and each student gets a fresh random draw when they take it (task #33). `PRACTICE_ROLEPLAY`-type assignments are, for now, functionally identical to `FILE_SUBMISSION` (student uploads written prep notes/materials) since the live roleplay simulator is a Tier 2 feature (Phase 5) that doesn't exist yet — the type is still tracked distinctly on the model so the simulator can hook into it later without a schema change.

### Assignment targeting: one target mode per assignment, multiple values within it
`AssignmentTarget` supports mixing target types on one assignment (e.g., grade 11 AND a specific event) per its schema comment, but the creation form only lets a mentor pick one mode (Everyone / Grade / Event / Cluster / Individual student) and multi-select within it — creating one `AssignmentTarget` row per selected value. This covers the realistic cases (assign to a grade, a roster, specific students) without the UI complexity of combining modes; nothing stops a future form from allowing combined targeting since the DAL/visibility logic (`src/lib/assignments/visibility.ts`) already treats the target list as "visible if ANY row matches," mirroring the resource-visibility pattern from Phase 3 resources.

### PRACTICE_SESSION_START/COMPLETE activity types are reserved for the Tier 2 roleplay simulator, not exam practice mode
The schema's `ActivityType` enum has both `EXAM_START`/`EXAM_COMPLETE` and `PRACTICE_SESSION_START`/`PRACTICE_SESSION_COMPLETE`. Confirmed by checking what each pairs with: `EXAM_START` already fires for every exam attempt regardless of mode (including practice-by-area and missed-question review, with `mode` in its metadata), while `PRACTICE_SESSION_*` has no existing caller and its natural home is `RoleplayPracticeSession` (Tier 2, Phase 5, not built yet). So Phase 4's "practice sessions per student per week" KPI is computed by filtering `EXAM_START` logs to practice-type modes, not from a separate activity type — nothing new needed here for Phase 4.

### ASSIGNMENT_VIEWED/FEEDBACK_VIEWED logged client-side on mount, so dev-mode double-fires
Both are logged from a tiny client component (`ViewLogger`) that calls a Server Action in a `useEffect` on the assignment detail page, mirroring the existing `logResourceOpen` pattern. In development, React's Strict Mode double-invokes effects, so you'll see two identical log rows per page view in `next dev` — this does not happen in production (`next build && next start`) and isn't worth guarding against with dedup logic for an engagement-timeline log.
