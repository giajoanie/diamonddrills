# PARSE_REPORT.md

Results of importing the staged exam PDFs in `seed/exams/marketing/` via `scripts/import-exam-pdfs.ts`.
A file is auto-published only when every question matched an answer-key entry with zero anomalies; anything else is left as a draft for a mentor to fix on the review screen (`/mentor/exams/<bank>`).

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2010_marketing_icdc_exam.pdf | 2010 Marketing ICDC Exam | published | 100 | 100 | 0 | 100 | 0 |
| 2011_marketing_icdc_exam.pdf | 2011 Marketing ICDC Exam | skipped | 0 | 0 | 0 | 0 | 0 |
| 2012_marketing_icdc_exam.pdf | 2012 Marketing ICDC Exam | published | 100 | 100 | 0 | 100 | 0 |
| 2013_marketing_icdc_exam.pdf | 2013 Marketing ICDC Exam | published | 100 | 100 | 0 | 100 | 0 |
| 2014_marketing_sample_exam.pdf | 2014 Marketing Sample Exam | published | 100 | 100 | 0 | 95 | 5 |
| 2026_marketing_icdc_exam.pdf | 2026 Marketing ICDC Exam | published | 100 | 100 | 0 | 99 | 1 |

## Anomalies

### 2011_marketing_icdc_exam.pdf

- No answer key section found — this PDF may be a scanned/image-only document with no extractable text layer, or uses an unrecognized layout. Skipped; needs manual entry.

## Summary

- 6 files processed
- 5 auto-published (clean parse)
- 1 need manual review or were skipped
- 494 total questions created
