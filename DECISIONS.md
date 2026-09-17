# DECISIONS.md

Ambiguities encountered while building, the default chosen, and why — per working rule #2 in `DECA_HUB_BUILD_PROMPT.md`. Newest entries at the bottom of each phase's section.

---

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
`/public/brand/deca-logo.png` doesn't exist yet (the spec describes it as "chapter-provided"). Built `Logo` as a small client component that renders the image and falls back to a text "DECA Hub" wordmark on load error, so the app doesn't break and nothing resembling an official DECA logo is fabricated. **Action needed from you:** drop the real file at that path (and it'll pick it up automatically, including as favicon) — see `next.config`/`layout.tsx` icon metadata.

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

### Local dev database: native Postgres, not Docker
`docker-compose.yml` is included per the spec's tech stack (and is what you should use on a normal machine), but this sandbox's Docker daemon isn't available to me. Used the sandbox's pre-installed native PostgreSQL 16 instead, with a `deca_hub` role/database matching the same credentials `docker-compose.yml` would produce, so `DATABASE_URL` in `.env` works either way. This only affects how *I* verified the schema in this session — it doesn't change anything about how you'd run this locally.
