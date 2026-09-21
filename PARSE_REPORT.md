# PARSE_REPORT.md

Results of importing the staged exam PDFs in `seed/exams/<bank>/` via `scripts/import-exam-pdfs.ts`.
A file is auto-published only when every question matched an answer-key entry with zero anomalies; anything else is left as a draft for a mentor to fix on the review screen (`/mentor/exams/<bank>`).

## business-management-administration

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2018_business-management-administration_sample_exam.pdf | 2018 Business Management and Administration Sample Exam | needs-review | 100 | 100 | 0 | 100 | 0 |

## entrepreneurship

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2017_entrepreneurship_sample_exam.pdf | 2017 Entrepreneurship Sample Exam | needs-review | 100 | 100 | 0 | 100 | 0 |
| 2019_entrepreneurship_sample_exam.pdf | 2019 Entrepreneurship Sample Exam | needs-review | 100 | 100 | 0 | 100 | 0 |
| 2022_entrepreneurship_state_exam.pdf | 2022 Entrepreneurship State Exam | needs-review | 100 | 100 | 0 | 93 | 7 |

## marketing

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2010_marketing_icdc_exam.pdf | 2010 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2010_marketing_state_sample_exam.pdf | 2010 Marketing Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2011_marketing_icdc_exam.pdf | 2011 Marketing ICDC Exam | skipped | 0 | 0 | 0 | 0 | 0 |
| 2012_marketing_icdc_exam.pdf | 2012 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2013_marketing_icdc_exam.pdf | 2013 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2013_marketing_icdc_exam_v2.pdf | 2013 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2014_marketing_sample_exam.pdf | 2014 Marketing Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2021_marketing_sample_exam.pdf | 2021 Marketing Sample Exam | needs-review | 100 | 100 | 0 | 0 | 100 |
| 2022_marketing_state_exam.pdf | 2022 Marketing State Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2026_marketing_icdc_exam.pdf | 2026 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2026_marketing_icdc_exam_final.pdf | 2026 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |


## Anomalies

### 2018_business-management-administration_sample_exam.pdf

- Unrecognized instructional area code(s), stored as-is: EN, KM, PJ, QM, RM, SM

### 2017_entrepreneurship_sample_exam.pdf

- Unrecognized instructional area code(s), stored as-is: EN, QM, RM, SM

### 2019_entrepreneurship_sample_exam.pdf

- Unrecognized instructional area code(s), stored as-is: EN, QM, RM, SM

### 2022_entrepreneurship_state_exam.pdf

- Unrecognized instructional area code(s), stored as-is: EN, SM, RM, QM

### 2011_marketing_icdc_exam.pdf

- No answer key section found — this PDF may be a scanned/image-only document with no extractable text layer, or uses an unrecognized layout. Skipped; needs manual entry.

### 2021_marketing_sample_exam.pdf

- Unrecognized instructional area code(s), stored as-is: EN, SM

## Summary

- 15 files processed
- 9 auto-published (clean parse)
- 6 need manual review or were skipped
- 393 total questions created
