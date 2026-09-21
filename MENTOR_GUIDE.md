# Mentor guide

A quick tour of what you can do as a mentor/advisor. Everything here lives
under `/mentor` once you're logged in.

## First login

Log in with the school ID and temporary password your admin gave you. You'll
be forced to set a new password immediately — pick something you'll
remember, since there's no self-service "forgot password" (that's your job
for students; see [Managing students](#managing-students)).

## The dashboard (`/mentor`)

Your landing page, with filters for grade, cluster, event, and date range
that apply to everything on it:

- **Active students**, students who haven't taken a Baseline Diagnostic yet,
  and practice sessions per student this week.
- **Score vs. baseline**, chapter-wide and broken down by cluster and grade.
- **Chapter-wide weakest instructional areas.**
- **Needs attention** — students who are inactive, declining, or below a
  score threshold. Click through to a student's full profile from here.
- **Ungraded submissions queue** — a shortcut straight to grading.

## Managing students (`/mentor/students`)

The full roster. From here you can:

- **Reset a password** — generates a new temporary one the student must
  change on next login. This is the only way a student regains access if
  they're locked out or forget their password.
- **Deactivate an account** (soft delete) if a student leaves the chapter —
  their history is kept, they just can't log in.
- Click into a student for their **full profile**: every exam attempt,
  instructional-area breakdown, predicted mastery per area, submissions,
  rubric scores, engagement timeline, and a place to log notes/interventions
  (see below).

### Logging an intervention

On a student's profile, "Add a note" logs a dated note (optionally tagged to
an instructional area) — e.g. "1:1 session on Economics." This isn't just a
journal: the platform tracks whether a student's scores actually moved after
an intervention, which shows up as impact data you can pull for reporting.

## Exams (`/mentor/exams`)

Upload an exam PDF and the platform parses it into individual questions
matched against the answer key. Nothing goes live automatically — review
each parsed question on the review screen (fixing anything the parser got
wrong or flagged as ambiguous) and publish it before students can see it.

## Resources (`/mentor/resources`)

Upload a file or link an external URL, then tag it — by grade, competition
level, cluster/event, and instructional area. Tagging controls exactly which
students see it in their own resource library, and area-tagged resources
feed the personalized recommendations students see on their dashboard and
the lesson-plan suggestions below.

## Rubrics (`/mentor/rubrics`)

Build a rubric once (name + weighted criteria), then reuse it anywhere
scoring happens: assignment grading, a student's roleplay self-rating, and
Judge Mode (below).

## Assignments and grading (`/mentor/assignments`)

Create an assignment — a file submission, a randomized practice exam, or
roleplay prep — and target it at everyone, a grade, a cluster, an event, or
specific students. Submissions show up in your grading queue; grade against
a rubric with per-criterion feedback, and request a resubmission if needed.

## Written events (`/mentor/written-events`)

Set a page limit, required sections, and formatting rules per written
event, plus milestone deadlines (outline, first draft, final draft,
presentation). Students see their checklist and can upload draft versions;
you can leave comments directly on a specific draft file.

## Teams (`/mentor/teams`)

Link students together for Team Decision Making events or team written
events. A student can only be on one active team per event at a time.
Recording a competition result for a team applies it to every active member
at once.

## Roleplay practice and Judge Mode

Students practice roleplays on their own from their dashboard. If you want
to score one live (in person or over video), open their practice session and
grab the **Judge Mode link** — it's a plain URL you or a peer can open on a
phone, no login required, to score the presentation against a rubric in real
time. The score shows up on the student's results page automatically.

## Competition results (`/mentor/competition-results`)

Record results per student or team — event, year, level (District / State /
ICDC), placement, test/roleplay/presentation scores, and whether they
advanced. This feeds the CSV exports and the PM CDE Impact Dashboard below.

## Calendar and announcements (`/mentor/calendar`, `/mentor/announcements`)

Post a competition date (with a level) to the calendar — students see it,
and it's what the automatic study-plan generator (a student-facing feature)
counts down to. Announcements can go to everyone, a specific grade, cluster,
or event.

## Lesson plan recommendations (`/mentor/lesson-plans`)

A rule-based suggestion engine: for each of the chapter's weakest
instructional areas, it suggests a focus area, tagged resources, a practice
exam configuration, and which students would benefit most — plus whether
that area's trending better or worse recently. Filter by grade, cluster, or
event to get a more targeted plan.

## CSV exports (`/mentor/exports`)

Export students, exam attempts, per-question responses, instructional-area
results, rubric scores, activity logs, or competition results as CSV,
filtered by date range. There's an option to anonymize student IDs in the
export.

## PM CDE Impact Dashboard (`/mentor/pm-cde-impact`)

Built for the Project Management CDE written report specifically: before/
after score change (chapter-wide and by cluster), plus two breakdowns a
single average can't show — **average score improvement** and **competition
advancement rate**, each grouped by how much a student has actually used the
platform (low/medium/high engagement). It's laid out as plain tables so you
can copy the numbers straight into your report.

## A note on demo data

If your instance was set up with `npm run db:seed-demo` for a trial or demo,
every demo student's school ID starts with `9000` and their first name
starts with "Demo" — anything you see with those markers isn't a real
student, and running `npm run db:remove-demo` clears it all out before
real use.
