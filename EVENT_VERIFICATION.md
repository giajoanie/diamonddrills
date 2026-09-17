# EVENT_VERIFICATION.md

> **Verification method and confidence level:** This report was produced with web search only — direct page/PDF fetches (`WebFetch`) were blocked by this environment's network egress policy for deca.org, decaplus.org, decadirect.org, and every state-DECA/CDN host tried. All findings rest on search-engine-synthesized snippets of real DECA pages and guide PDFs, not a first-hand read of the primary-source documents. Most load-bearing claims (exam bank mappings, event names, category structure) were cross-checked against two or more independent snippets, but this is weaker than a direct document read. **A human with working web access should spot-check Section 4's open items — especially the Exam Blueprints PDF and the Financial Literacy Project cluster placement — before this is treated as fully authoritative.** Sources consulted are listed in Section 1.

---

## 1. Sources Consulted

- deca.org/compete (Competitive Events | High School | DECA Inc.)
- deca.org/compete/[event-slug] pages for ~25 individual events (accounting-applications-series, business-services-operations-research, business-law-and-ethics-team-decision-making, business-solutions-project, buying-and-merchandising-team-decision-making, career-development-project, entrepreneurship-team-decision-making, financial-consulting, human-resources-management-series, hospitality-and-tourism-professional-selling, integrated-marketing-campaign-product/event/service, personal-financial-literacy, principles-of-business-management-and-administration, professional-selling, sports-and-entertainment-marketing-series/operations-research, apparel-and-accessories-marketing-series, retail-merchandising-series, marketing-communications-series, hotel-and-lodging-management-series, quick-serve-restaurant-management-series, restaurant-and-food-service-management-series)
- deca.org/career-clusters/[cluster] pages (business-management-administration, business-administration-core, entrepreneurship, marketing, personal-financial-literacy)
- decaplus.org/exams/[exam] and decaplus.org/competitive-events/[event] pages
- DECA Guide PDFs referenced by title (HS_TDM_Guidelines.pdf, HS_PSC_Guidelines.pdf, HS_PM_Guidelines.pdf, HS_BOR_Guidelines.pdf, HS_IMC_Guidelines.pdf, HS_PFL_Guidelines.pdf, HS_Series_Guidelines.pdf, "Exam Blueprints 2025.pdf"), 2022-23 through 2026-27 editions, hosted on cdn.prod.website-files.com
- decadirect.org articles: "2025-2026 District-Level Competitive Event Instructional Areas Announced," "DECA Project Management Events: Managing all 6," "The Ultimate Written Event Guide," "Finding Success Through DECA's Career Clusters," "Mastering Money: Why Finance Events Are Essential for DECA Members"
- deca.org/advisor-resources articles on Business Operations Research, Project Management, Business Law and Ethics TDM, Entrepreneurship TDM, Buying and Merchandising TDM
- texasdeca.org: "Selecting an Event," "Understanding the Differences in the Types of Competitive Events"
- mbaresearch.org: "DECA Exam Specifications 2024-2025" PDF

---

## 2. Corrected Event Tables by Cluster

Legend — **Category** (this platform's binary split): `ROLEPLAY` = exam + live judged presentation (spontaneous case study, Series/Principles/TDM, or a prepared Professional Selling/Consulting presentation); `WRITTEN` = a written/prepared deliverable with no live judged roleplay component (Operations Research, Project Management, Entrepreneurship business plans, IMC). **has_exam** follows the confirmed rule: Series, Principles, TDM, Professional Selling/Consulting, IMC, and PFL = yes; Operations Research, Project Management, and Entrepreneurship business-plan events = no.

### Marketing — exam bank: **Marketing**, except Principles → **Business Administration Core**

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Apparel and Accessories Marketing Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Automotive Services Marketing Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Business Services Marketing Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Food Marketing Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Marketing Communications Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Retail Merchandising Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Sports and Entertainment Marketing Series | ROLEPLAY | SERIES | Yes | Marketing | 1/1 |
| Principles of Marketing | ROLEPLAY | PRINCIPLES | Yes | **Business Administration Core** | 1/1 |
| Buying and Merchandising Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Marketing | 2/2 |
| Marketing Management Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Marketing | 2/2 |
| Sports and Entertainment Marketing Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Marketing (no separate SEM bank) | 2/2 |
| Professional Selling | WRITTEN (per explicit instruction in the build spec; DECA's own category is "Professional Selling and Consulting" — see Section 3, item 5) | PROFESSIONAL_SELLING_CONSULTING | Yes | Marketing | **1/1 — individual, not a team event** |
| Integrated Marketing Campaign–Product | WRITTEN | IMC | Yes | Marketing | 1/3 |
| Integrated Marketing Campaign–Event | WRITTEN | IMC | Yes | Marketing | 1/3 |
| Integrated Marketing Campaign–Service | WRITTEN | IMC | Yes | Marketing | 1/3 |
| Buying and Merchandising Operations Research | WRITTEN | OPERATIONS_RESEARCH | No | — | 1/3 |
| Sports and Entertainment Marketing Operations Research | WRITTEN | OPERATIONS_RESEARCH | No | — | 1/3 |

**Corrections vs. hand-typed list:** Professional Selling stays `WRITTEN`, per the build spec's explicit instruction ("Keep it selectable as WRITTEN unless I say otherwise") — not changed to ROLEPLAY despite DECA's own category being closer to a roleplay/presentation event (see discrepancy #5 below). Its exam bank and team size (1/1, individual) are confirmed.

### Finance — exam bank: **Finance**, except Principles → **Business Administration Core**

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Accounting Applications Series | ROLEPLAY | SERIES | Yes | Finance | 1/1 |
| Business Finance Series | ROLEPLAY | SERIES | Yes | Finance | 1/1 |
| Principles of Finance | ROLEPLAY | PRINCIPLES | Yes | **Business Administration Core** | 1/1 |
| Financial Services Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Finance | 2/2 |
| Financial Consulting | ROLEPLAY (Professional Selling and Consulting) | PROFESSIONAL_SELLING_CONSULTING | Yes | Finance | 1/1 |
| Finance Operations Research | WRITTEN | OPERATIONS_RESEARCH | No | — | 1/3 |

**Confirmed:** Accounting Applications Series is Finance-only (resolves hand-typed flag #1 — it was correctly listed only under Finance already; no change needed). Financial Consulting is current and active (resolves flag #4 — not discontinued).

### Business Management and Administration — exam bank: **Business Management and Administration**, except Principles → **Business Administration Core**; Project events → no exam

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Human Resources Management Series | ROLEPLAY | SERIES | Yes | Business Management and Administration | 1/1 |
| Principles of Business Management and Administration | ROLEPLAY | PRINCIPLES | Yes | **Business Administration Core** | 1/1 |
| Business Law and Ethics Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | **Business Management and Administration** (not a standalone "Business Law" exam) | 2/2 |
| Business Services Operations Research | WRITTEN | OPERATIONS_RESEARCH | No | — | 1/3 |
| Business Solutions Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 |
| Career Development Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 |
| Community Awareness Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 |
| Community Giving Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 |
| Sales Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 |
| Financial Literacy Project | WRITTEN | PROJECT_MANAGEMENT | No | — | 1/3 — **cluster placement uncertain, see Section 4** |

**Correction:** "Business Law" is **not** a standalone DECA exam bank at the high-school level — Business Law and Ethics TDM draws from the Business Management and Administration exam; "Business Law" is only an instructional area within it. Business Solutions Project confirmed current/active (resolves flag #5 — not renamed or retired).

### Entrepreneurship — exam bank: **Entrepreneurship**, except Principles → **Business Administration Core**; written plans → no exam

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Entrepreneurship Series | ROLEPLAY | SERIES | Yes | Entrepreneurship | 1/1 |
| Principles of Entrepreneurship | ROLEPLAY | PRINCIPLES | Yes | **Business Administration Core** | 1/1 |
| Entrepreneurship Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Entrepreneurship | 2/2 |
| Business Growth Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |
| Franchise Business Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |
| Independent Business Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |
| Innovation Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |
| International Business Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |
| Start-Up Business Plan | WRITTEN | ENTREPRENEURSHIP_PLAN | No | — | 1/3 |

**Confirmed:** no corrections needed. There is no Entrepreneurship Operations Research event — DECA runs exactly 5 Business Operations Research events total (Business Services, Buying & Merchandising, Finance, Hospitality & Tourism, Sports & Entertainment Marketing); Entrepreneurship's absence from that list is correct, not a gap.

### Hospitality and Tourism — exam bank: **Hospitality and Tourism**, except Principles → **Business Administration Core**

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Hotel and Lodging Management Series | ROLEPLAY | SERIES | Yes | Hospitality and Tourism | 1/1 |
| Quick Serve Restaurant Management Series | ROLEPLAY | SERIES | Yes | Hospitality and Tourism | 1/1 |
| Restaurant and Food Service Management Series | ROLEPLAY | SERIES | Yes | Hospitality and Tourism | 1/1 |
| Principles of Hospitality and Tourism | ROLEPLAY | PRINCIPLES | Yes | **Business Administration Core** | 1/1 |
| Hospitality Services Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Hospitality and Tourism | 2/2 |
| Travel and Tourism Team Decision Making | ROLEPLAY | TEAM_DECISION_MAKING | Yes | Hospitality and Tourism | 2/2 |
| Hospitality and Tourism Professional Selling | ROLEPLAY (Professional Selling and Consulting) | PROFESSIONAL_SELLING_CONSULTING | Yes | Hospitality and Tourism | 1/1 |
| Hospitality and Tourism Operations Research | WRITTEN | OPERATIONS_RESEARCH | No | — | 1/3 |

**Confirmed:** Hospitality and Tourism Professional Selling is a real, distinct, currently active event (resolves flag #3 in part).

### Personal Financial Literacy — exam bank: **Personal Financial Literacy**

| Event | Category | Format code | Has Exam | Exam Bank | Team size |
|---|---|---|---|---|---|
| Personal Financial Literacy | ROLEPLAY | PERSONAL_FINANCIAL_LITERACY | Yes | Personal Financial Literacy | 1/1 |

No correction needed. Note: DECA's separate "Financial Literacy Project" (written, no exam) is a different event under BMA/Project Management — the hand-typed list already keeps these distinct; do not conflate them.

---

## 3. Discrepancies vs. the Original Hand-Typed List

1. **All five "Principles of X" events use the Business Administration Core exam, not their named cluster's exam.** Confirmed directly from DECA+ materials. This validates the spec's own stated default assumption (Section 4.1 of the build prompt) — **apply it in the seed data.**
2. **"Business Law" is not a standalone exam bank.** Business Law and Ethics TDM draws from the Business Management and Administration exam. If your `exam_bank` enum/table currently has a separate "Business Law" entry, remove it and point BLTDM at Business Management and Administration.
3. **"Sports and Entertainment Marketing" is not a standalone exam bank either.** All three SEM events (Series, TDM, Operations Research) draw from the general Marketing cluster exam.
4. **Professional Selling is an individual (1-participant) event**, not a team event — confirm `team_size_min/max = 1/1` for it.
5. **Category inconsistency in the original hand-typed list, left as-is per explicit instruction:** Professional Selling was placed under Marketing's "Written" section, while Financial Consulting (Finance) and Hospitality and Tourism Professional Selling (Hospitality and Tourism) — the same DECA event family, "Professional Selling and Consulting" — were placed under "Roleplay." DECA itself treats all three as a third category distinct from both Team Decision Making/Roleplay and Written events (they have a live judged presentation on a real product/company, prepared in advance rather than a spontaneous case study, plus a 100-question exam). The build spec explicitly says: *"Keep it selectable as WRITTEN unless I say otherwise"* for Professional Selling specifically — so **Professional Selling stays `WRITTEN`** on this platform, while Financial Consulting and Hospitality and Tourism Professional Selling stay `ROLEPLAY` as originally hand-typed. All three get `format = PROFESSIONAL_SELLING_CONSULTING` so the roleplay/written-workspace timers (Section 11) can treat them distinctly from Series/TDM/plan events regardless of which tab they surface under. **This leaves a real inconsistency (the same DECA event type split across both platform categories) — flagged here for you to resolve if you'd rather have all three consistent; not changed unilaterally beyond what the spec already decided.**
6. **No missing or phantom events found.** Cross-checked counts: 5 Business Operations Research events, 6 Project Management events, 8 Team Decision Making events, 6 Entrepreneurship written plans, 3 IMC events, 3 Professional Selling and Consulting events, 14 individual Series events — every one is present in the hand-typed list under the correct cluster.
7. **No renames or retirements found** for Financial Consulting or Business Solutions Project — both current and active.
8. **Cosmetic only:** "and" vs. "&" in Buying and Merchandising Operations Research — same event, no data change needed.

---

## 4. Unresolved / Uncertain Items — Flagged for Human Review

- **Financial Literacy Project's cluster placement is genuinely uncertain.** One source ties it to the Personal Financial Literacy cluster; DECA's own "Project Management Events" grouping lumps it with the other five BMA Project events. **Seeded under Business Management and Administration for now (matches the hand-typed list), but a human should confirm via deca.org/compete's own cluster filter before this is final.**
- **"Principles of Business Management and Administration" vs. shorthand "Principles of Business Administration"** — the deca.org page title is authoritative for the former; some state materials may still use the shorter form. No action needed, just noted.
- **Exact minute counts, page/slide limits, and prep/presentation times** (10 min prep / 10 min presentation for individual events; 30 min prep / 15 min presentation for TDM, per Section 11 of the build spec) are consistent with search snippets but were not verified against a directly-read current-year DECA Guide PDF. **Spot-check before hard-coding these into the roleplay simulator (Phase 5).**
- **2025-26 vs. 2026-27 guide differences not diffed.** DECA appears to have already published 2026-27 guide PDFs. This report did not systematically diff 2025-26 vs. 2026-27 event lists; if the chapter is competing in 2026-27, re-verify against that year's guide specifically.
- **General caveat:** all of the above rests on search-engine snippets, not a direct document read (WebFetch was blocked in this environment for every DECA-related domain tried). Treat this report as a strong starting point, not a final authority — a human with normal web access should do a final pass against the current DECA Guide PDF and Exam Blueprints PDF before competition-critical decisions (e.g., disqualifying a submission for exceeding a page limit) are automated on top of this data.

---

## 5. Instructional Areas (for the `InstructionalArea` seed table)

DECA's cluster exams are 100-question multiple-choice tests; each item maps to an instructional area and, within it, a specific performance indicator. Recurring instructional areas found across DECA's exam materials (most complete for the Marketing exam):

Business Law · Channel Management · Communications · Customer Relations · Economics · Emotional Intelligence · Entrepreneurship · Financial Analysis · Human Resources Management · Information Management · Marketing (general) · Marketing-Information Management · Market Planning · Operations · Pricing · Product/Service Management · Professional Development · Promotion · Selling · Strategic Management

For the **Business Administration Core** exam (used by all "Principles of X" events), confirmed scored instructional areas include Business Law, Communications, Customer Relations, Economics, Emotional Intelligence, and Financial Analysis, with item counts that scale with competition level (district/association/ICDC). A complete instructional-area-to-item-count table per exam bank was not retrievable via search alone — **pull DECA's official "Exam Blueprints" PDF directly for the authoritative, complete list before relying on auto-tagging.** In practice, this platform's `InstructionalArea` table should be populated primarily from the actual answer keys of uploaded exam PDFs (per spec Section 4.4), with the list above used only as a sanity check for spelling normalization, not as the seed source of truth.

---

## 6. Decisions Applied to the Seed Data (see also `DECISIONS.md`)

- Exam bank for all "Principles of X" events set to **Business Administration Core**.
- Removed "Business Law" and "Sports and Entertainment Marketing" as standalone exam banks; both route to Business Management and Administration and Marketing respectively.
- Professional Selling categorized `WRITTEN` (per explicit instruction in the build spec); Financial Consulting and Hospitality and Tourism Professional Selling stay `ROLEPLAY` as originally hand-typed. All three get `format = PROFESSIONAL_SELLING_CONSULTING` and team size 1/1.
- Financial Literacy Project seeded under Business Management and Administration, flagged uncertain.
