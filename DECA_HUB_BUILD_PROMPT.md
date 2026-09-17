# DECA Hub: Build Specification for Claude Code

> **How to use this file:** Put it in the repo root and tell Claude Code: *"Read DECA_HUB_BUILD_PROMPT.md and start Phase 0. Stop at the end of each phase and wait for my approval."*

---

## 0. Mission

Build a private, school-only training platform for DECA Roleplay and Written events. It is part Canvas-style class hub, part exam engine, part analytics system.

It must **not** be a resource library with quizzes attached. It is a **closed-loop training system**:

**Diagnose → Practice → Analyze → Recommend → Reassess → Measure Growth → Compete → Record Outcome**

Every feature should feed this loop, and every meaningful student action should produce data. That data supports a DECA **Project Management – Career Development Project**, which must show measurable student improvement over time.

Before building, research DECA competitive events (event formats, the exam/instructional-area system, performance indicators, team decision making, and written event evaluation) so the terminology in this document is understood correctly.

---

## 1. Working Rules for Claude Code

1. **Build in phases** (Section 12). At the end of each phase, stop, summarize what was built, list anything unverified, and wait for approval.
2. **Never silently guess.** When this spec is ambiguous or conflicts with official DECA information, choose a sensible default, note it in `DECISIONS.md`, and tell me.
3. **Verify, don't copy.** The event list in Section 4 was typed by hand. Check it against DECA's current competitive event guidelines and produce a diff report before seeding.
4. **Write tests** for auth, permissions, exam scoring, timer logic, and analytics calculations.
5. **Keep a seed script** so the database can be rebuilt from scratch at any time.

---

## 2. Tech Stack (default; change if needed)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Prisma ORM (Docker Postgres for local dev) |
| Auth | Session-based auth with hashed passwords (argon2 or bcrypt), httpOnly cookies |
| File storage | S3-compatible storage (or Supabase Storage / Vercel Blob); local folder in dev |
| Charts | Recharts |
| PDF parsing | `pdf-parse` (or similar), always followed by a human review screen |
| Hosting target | Vercel + managed Postgres (Neon or Supabase) |

---

## 3. Design System

- **Font:** League Spartan (Google Fonts) for all text, with a sans-serif fallback.
- **Base theme:** dark navy background with **teal accents**. Clean, modern, and uncluttered.
- **Branding:** use the chapter-provided DECA logo from `/public/brand/deca-logo.png` in the header, login screen, and favicon. Follow DECA brand guidelines; do not alter the logo.
- **Icons:** simple line icons only (e.g., `lucide-react`).
- **Accessibility:** WCAG AA contrast, keyboard navigation (especially in the exam engine), visible focus states.
- **Responsive:** must work well on Chromebooks and phones.

---

## 4. Event Data Model

### 4.1 Structure

Model events as relational data, **not strings**, so "show resources for MY events" is a real query.

```
Cluster (id, name, slug)
  └── Event (id, cluster_id, name, slug, category, format, has_exam,
             exam_bank_id, team_size_min, team_size_max, is_active)
```

- `category`: `ROLEPLAY` or `WRITTEN`. This is what the signup picker uses. Students choose exactly one of each.
- `format`: finer detail such as `SERIES`, `PRINCIPLES`, `TEAM_DECISION_MAKING`, `PROFESSIONAL_SELLING_CONSULTING`, `IMC`, `OPERATIONS_RESEARCH`, `PROJECT_MANAGEMENT`, `ENTREPRENEURSHIP_PLAN`, `PERSONAL_FINANCIAL_LITERACY`.
- `has_exam`: controls whether the Exam tab appears for a student.
- `exam_bank_id`: which cluster exam bank an event draws from. This is not always the event's own cluster; for example, Principles events typically use the Business Administration Core exam. **Verify each mapping against DECA guidelines.**
- `team_size_min/max`: enables team linking.

### 4.2 Exam rules

- **Have exams:** all Series, Principles, Team Decision Making, Professional Selling/Consulting, Integrated Marketing Campaign, and Personal Financial Literacy events.
- **No exams:** Project Management (BMA projects), Entrepreneurship plans, and Operations Research events.
- The Exam tab only appears if at least one of the student's events has `has_exam = true`.

### 4.3 Seed list (verify before seeding)

Fix spelling and naming to match official DECA titles. Flags for review:

- "Accounting Applications Series" was listed under both Marketing and Finance. It belongs to **Finance only**.
- "Sports and Entertainment" in Marketing roleplays should be **Sports and Entertainment Marketing Series**.
- "Professional Selling" was listed as a Marketing written. Confirm its official format (prepared presentation plus exam). Keep it selectable as `WRITTEN` unless I say otherwise.
- "Personal Financial Literacy" has no cluster color or cluster home; create a `Personal Financial Literacy` cluster.

**Marketing**
- Written: Professional Selling; Buying and Merchandising Operations Research; Sports and Entertainment Marketing Operations Research; Integrated Marketing Campaign–Product; Integrated Marketing Campaign–Event; Integrated Marketing Campaign–Service
- Roleplay: Apparel and Accessories Marketing Series; Automotive Services Marketing Series; Business Services Marketing Series; Food Marketing Series; Marketing Communications Series; Principles of Marketing; Retail Merchandising Series; Sports and Entertainment Marketing Series; Buying and Merchandising Team Decision Making; Marketing Management Team Decision Making; Sports and Entertainment Marketing Team Decision Making

**Finance**
- Written: Finance Operations Research
- Roleplay: Accounting Applications Series; Business Finance Series; Financial Consulting; Financial Services Team Decision Making; Principles of Finance

**Business Management and Administration**
- Written: Business Services Operations Research; Business Solutions Project; Career Development Project; Community Awareness Project; Community Giving Project; Financial Literacy Project; Sales Project
- Roleplay: Business Law and Ethics Team Decision Making; Human Resources Management Series; Principles of Business Management and Administration

**Entrepreneurship**
- Written: Business Growth Plan; Franchise Business Plan; Independent Business Plan; Innovation Plan; International Business Plan; Start-Up Business Plan
- Roleplay: Entrepreneurship Series; Entrepreneurship Team Decision Making; Principles of Entrepreneurship

**Hospitality and Tourism**
- Written: Hospitality and Tourism Operations Research
- Roleplay: Hospitality and Tourism Professional Selling; Hospitality Services Team Decision Making; Hotel and Lodging Management Series; Principles of Hospitality and Tourism; Quick Serve Restaurant Management Series; Restaurant and Food Service Management Series; Travel and Tourism Team Decision Making

**Personal Financial Literacy**
- Roleplay: Personal Financial Literacy

**Deliverable:** `EVENT_VERIFICATION.md` listing every change, addition, or unresolved question compared with DECA's current guidelines.

### 4.4 Instructional Areas

Create an `InstructionalArea` table (e.g., Economics, Marketing Management, Communications, Financial Analysis, Emotional Intelligence, etc.). Populate it from the answer keys of uploaded exams, normalizing spelling so the same area is never stored twice.

---

## 5. Accounts, Roles, and Security

### 5.1 Roles

- `STUDENT`
- `MENTOR` (administrator)

Use role-based access checks on **every** server route and API endpoint, not just in the UI.

### 5.2 Student signup

Fields (nothing else required):

1. 7-digit School ID (this is the username; validate exactly 7 digits, unique)
2. First Name
3. Password (minimum 8 characters, with confirm field)
4. Grade (9–12)
5. Roleplay Event (dropdown grouped by cluster, `category = ROLEPLAY`)
6. Written Event (dropdown grouped by cluster, `category = WRITTEN`)

Students may pick events from different clusters.

After signup, prompt the student to take a **Baseline Diagnostic** exam (Section 6.6). They may postpone it, but a banner reminds them until it's done.

### 5.3 Mentor accounts

Seed two mentor accounts: School IDs **1071632** and **1078913**.

- The initial password comes from the `SEED_MENTOR_PASSWORD` environment variable (I will set it to `DiamondDrills2026`). **Never hardcode it in source code or commit it.**
- Force a password change on first login.
- Mentors can create additional mentor accounts from the admin dashboard without editing code.

### 5.4 Account management

- Mentors can reset a student's password (generates a temporary password with forced change).
- Students can change their events. **Historical attempts stay linked to the event they were taken under.** Keep an `EventEnrollment` history table with start/end dates.
- Mentors can deactivate accounts (soft delete; data preserved for analytics).

### 5.5 Privacy and security

- Hash all passwords; rate-limit login attempts.
- A student can never see another student's School ID, scores, or submissions (except linked teammates' shared team results).
- Exam questions, answer keys, and uploaded files are only accessible to logged-in users with permission. Serve files through authenticated routes, never public URLs.
- Log mentor actions that change grades or accounts in an audit log.

---

## 6. Exam Engine

### 6.1 Exam upload and parsing

Mentors upload an exam PDF and select its exam bank (cluster). The last section of each DECA exam PDF contains the answer key: correct answer, **instructional area**, and usually an **explanation**, for each question.

Pipeline:

1. Parse questions (stem plus options A–D) and the answer key.
2. Match each question to its key entry by number.
3. Show a **review screen** where the mentor can fix any misparsed question, answer, instructional area, or explanation before publishing.
4. Deduplicate questions already in the bank.
5. Store the source exam name/year on each question.

The marketing cluster exam PDFs are in `/seed/exams/marketing/`. Import those during seeding, then produce a parse report (questions found, questions with missing keys, anomalies).

### 6.2 Question schema

```
Question (id, exam_bank_id, source_exam, number_in_source, stem,
          option_a, option_b, option_c, option_d, correct_option,
          instructional_area_id, explanation, is_active)
```

### 6.3 Exam modes and timers

Timed full or partial exams, drawing randomized questions from the student's exam bank:

| Time | Questions |
|---|---|
| **90 min (default)** | **100** |
| 70 min | 78 |
| 50 min | 56 |
| 30 min | 33 |
| 10 min | 11 |

Additional modes:

- **Practice by Instructional Area:** student picks one or more areas and a question count (e.g., 20 Economics questions). Optional timer.
- **Missed-Question Review:** retake only previously missed questions. Use spaced repetition so missed questions resurface over time until answered correctly several times in a row.
- **Mentor-assigned exam:** fixed question set with a due date (Section 8).

If a bank has fewer questions than requested, use all available questions and show a notice.

Randomize question order **and** option order (keeping correct answer tracking accurate).

### 6.4 Exam experience

- Visible countdown timer; warning at 5 minutes and 1 minute; auto-submit at zero.
- Question navigator showing answered, unanswered, and flagged questions.
- **Flag for review.**
- **Autosave** every answer to the server. If the tab closes or the device dies, the student can resume. The timer is based on a server-stored start time so it can't be paused by closing the tab.
- Confirm-before-submit dialog listing unanswered and flagged counts.

### 6.5 Results

Immediately after submission:

- Score, percentage, and time used.
- Every question with the student's answer, the correct answer, and **the explanation taken directly from the exam document**.
- **Instructional area breakdown:** accuracy per area, sorted weakest first, with a bar chart.
- Buttons: "Practice my weakest area" and "Review missed questions."

### 6.6 Baseline Diagnostic

A full 100-question, 90-minute exam from the student's bank, marked as `is_baseline = true`. All growth metrics compare against it. Mentors may reset a baseline if needed.

### 6.7 Student exam analytics

- Score trend line over time (overall and per instructional area).
- Top 5 weakest instructional areas, across all attempts, weighted toward recent attempts.
- Personal records (best score, longest streak).

---

## 7. Resources

### 7.1 Upload form (mentors)

| Field | Values |
|---|---|
| Resource Name | Free text (e.g., "Sports Marketing Case Study #4") |
| Type | Case Study, Exam, Lesson, Video, Study Guide, Sample Written, Rubric, Presentation, Other |
| Cluster(s) | One or more, or All |
| Event(s) | One or more, filtered by selected clusters, or All in cluster |
| Instructional Areas | Zero or more |
| Grade | 9, 10, 11, 12, or All |
| Competition Level | District, State, ICDC, or All |
| File or link | Upload (PDF, DOCX, PPTX, images, video) or external URL |
| Description | Optional |

Use join tables (`ResourceEvent`, `ResourceInstructionalArea`) so filtering is a real query.

### 7.2 Student resource view

- Default view shows only resources tagged to the student's current roleplay event, written event, their clusters (when tagged "All in cluster"), and their grade.
- Filters: type, instructional area, competition level.
- "Recommended for you" section: resources tagged with the student's weakest instructional areas.
- Log every resource open.

---

## 8. Assignments, Submissions, and Grading

- Mentors create assignments with title, instructions, attached resources, target (individual students, events, clusters, grades, or everyone), due date, and optional rubric.
- Assignment types: file submission, exam (fixed or randomized), or practice roleplay.
- Students see assignments on their dashboard sorted by due date, with status (not started, submitted, graded, late).
- Mentors grade submissions, leave written feedback, and can request a resubmission.
- **Rubric builder:** mentors create rubrics with criteria, descriptions, and point ranges, modeled on DECA written and roleplay evaluation forms. Rubrics are reusable and attachable to assignments.
- Rubric scores are stored per criterion so they can be tracked over time.

### 8.1 Written event support

- Draft uploads with version history; mentor comments attached to a specific version.
- Per-event checklist: page limits, required sections, formatting requirements (mentors can edit these per event).
- Chapter-internal milestone deadlines (outline, first draft, final draft, presentation).

---

## 9. Dashboards

### 9.1 Student dashboard

- Welcome with first name, current events, and cluster labels.
- Baseline reminder (if not taken).
- Upcoming assignments and deadlines.
- Latest exam score and trend sparkline.
- Weakest 3 instructional areas with "Practice now" buttons.
- Recommended resources.
- Announcements and competition calendar.
- Missed-question review count.

### 9.2 Mentor dashboard (landing page)

**Summary first:**

- Active students, students without a baseline, practice sessions this week.
- Average score now vs. baseline, overall and by cluster.
- Chapter-wide weakest instructional areas.
- Students who are inactive, declining, or below a threshold ("needs attention").
- Ungraded submissions queue.

**Lesson plan recommendations:** based on the weakest instructional areas across the chapter (and per cluster/event), generate a suggested lesson plan: focus areas, suggested resources from the library tagged to those areas, a practice exam configuration, and which students would benefit most. Start with a transparent rule-based approach (explain why each recommendation was made).

**Filters** on every mentor view: grade, cluster, event, competition level, date range.

**Individual student view:** full profile, events history, every exam attempt, area breakdown, submissions, rubric scores, engagement timeline, mentor notes, and intervention history.

**Other mentor tools:** resource uploads, exam uploads and review, assignments, grading, announcements, calendar, account management, CSV exports.

---

## 10. Data, KPIs, and PM CDE Reporting

### 10.1 KPIs (store the data needed to calculate these)

- Average exam score change vs. baseline (per student, event, cluster, chapter).
- Instructional-area accuracy change over time.
- Practice sessions per student per week.
- Time on platform (active session time, not just login time).
- Exam attempts per student.
- Rubric score improvement per criterion.
- Assignment completion and on-time rate.
- Resource usage by type and event.
- Competition placement rates vs. platform usage.

### 10.2 Engagement logging

Log with timestamps: logins, exam starts/completions/abandons, practice sessions, resource opens, submissions, and feedback viewed. Use one `ActivityLog` table with an event type and JSON metadata.

### 10.3 Competition results

Mentors record results per student (or team) and level: **District, State, ICDC**. Store event, year, placement, test score, roleplay/presentation scores if available, and whether they advanced.

### 10.4 CSV export

Mentors can export CSVs for students (without passwords), exam attempts, per-question responses, instructional-area results, rubric scores, activity logs, and competition results, all filterable by date range. Use anonymized student IDs in exports as an option.

---

## 11. Feature Tiers

### 🔴 Tier 1: Must Have
Student auth; mentor auth; event database; event-specific resource filtering; student dashboard; admin dashboard; exam engine; question bank and PDF import; timers; randomization; autosave/resume; instructional-area analytics; baseline diagnostic; score history; resource uploads with tagging; assignments; rubric grading; CSV export.

### 🟡 Tier 2: High Value
- **Roleplay simulator:** shows a case study with timers matching competition (individual events: 10 min prep, 10 min presentation; Team Decision Making: 30 min prep, 15 min presentation). Includes a notes area and self-rating against performance indicators.
- **Written-event workspace:** drafts, versions, checklists, milestone deadlines, presentation timer.
- Personalized recommendations for students.
- Lesson-plan generator improvements.
- Competition calendar.
- Competition results entry.
- **Team linking:** link teammates for TDM and team written events; share team assignments and results.
- Missed-question review with spaced repetition.
- Cohort analytics (compare by grade, cluster, year).
- **Intervention tracking:** mentors log interventions (e.g., "1:1 session on Economics") so later score changes can be connected to them.

### 🟢 Tier 3: Really Cool
- **Judge Mode:** a mentor or peer scores a live practice roleplay on the rubric from a phone.
- **Competition Simulation Mode:** timed exam followed immediately by a timed roleplay, like competition day.
- Student activity timeline.
- Personal records and streaks.
- Advanced mastery prediction per instructional area.
- Resource search.
- Automatic study-plan generation leading up to a competition date.
- **PM CDE Impact Dashboard:** before/after charts, engagement vs. improvement, and competition outcomes, formatted for use in the written report.

---

## 12. Build Phases

Stop after each phase, report, and wait for approval.

### Phase 0: Setup and verification
- Scaffold project, database, auth libraries, design tokens, and layout shell.
- Research DECA events and produce `EVENT_VERIFICATION.md`.
- Draft the full Prisma schema covering all tiers (so later phases don't require painful migrations).

**Done when:** app runs locally, schema is reviewed, event verification report is delivered.

### Phase 1: Accounts and events
- Seed clusters, events, and mentors.
- Signup, login, logout, forced password change, password reset by mentor, event changes with history.
- Role-based route protection; basic student and mentor dashboard shells.

**Done when:** a student can sign up, log in, and see their two events; mentors can log in, change password, and view a student list; a student cannot access any mentor route.

### Phase 2: Exam engine
- PDF import with review screen; import marketing exams from `/seed/exams/marketing/`.
- All timed modes, practice by instructional area, randomization, flagging, autosave/resume, auto-submit.
- Results screen with explanations and area breakdown; baseline diagnostic; score history and trends.

**Done when:** a student can take, abandon, resume, and finish an exam; results and explanations are correct; parse report is delivered; scoring tests pass.

### Phase 3: Resources, assignments, grading
- Resource upload with tagging and filtered student views.
- Assignments, submissions, rubric builder, grading, feedback, written event checklists and versions.

**Done when:** a mentor uploads a tagged resource and only the right students see it; an assignment can be created, submitted, graded with a rubric, and viewed by the student.

### Phase 4: Analytics and reporting
- Activity logging, KPI calculations, mentor summary dashboard with filters, needs-attention list, rule-based lesson plan recommendations, individual student view, competition results entry, CSV exports.

**Done when:** mentor dashboard shows accurate chapter metrics against baselines; all CSV exports download correctly; KPI tests pass.

### Phase 5: Tier 2 features
Roleplay simulator, written workspace, team linking, spaced-repetition review, calendar and announcements, cohort analytics, intervention tracking.

### Phase 6: Tier 3 features
Judge Mode, Competition Simulation, PM CDE Impact Dashboard, and remaining Tier 3 items.

### Phase 7: Launch readiness
- Security review (permissions, file access, rate limiting, secrets).
- Seed a demo dataset for testing, then remove it for production.
- Deployment guide and a short mentor user guide.
