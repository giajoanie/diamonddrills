# Diamond Drills

A private, school-only training platform for DECA Roleplay and Written
events — part class hub, part exam engine, part analytics system, built as
a closed-loop training system: diagnose, practice, analyze, recommend,
reassess, measure growth, compete, record outcome.

Built with Next.js 16 (App Router), React 19, Prisma 7, and Postgres.

## Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — environment setup, database
  migrations, seeding, building, and running in production.
- **[MENTOR_GUIDE.md](./MENTOR_GUIDE.md)** — a tour of every mentor-facing
  feature: exams, resources, assignments, grading, rubrics, roleplay/Judge
  Mode, teams, competition results, CSV exports, and the PM CDE Impact
  Dashboard.
- **[DECISIONS.md](./DECISIONS.md)** — a running log of judgment calls made
  while building, and why.
- **[EVENT_VERIFICATION.md](./EVENT_VERIFICATION.md)** — research backing the
  DECA competitive-event data seeded into the platform.
- **[DECA_HUB_BUILD_PROMPT.md](./DECA_HUB_BUILD_PROMPT.md)** — the original
  build specification this platform was built against.

## Local development

```bash
npm install
npx prisma migrate deploy
npm run db:seed          # base reference data + 2 mentor accounts
npm run dev
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for environment variables, exam-bank
imports, demo data, and production deployment.

## Testing

```bash
npm run test        # unit tests (vitest)
npm run lint         # eslint
npx tsc --noEmit      # typecheck
```
