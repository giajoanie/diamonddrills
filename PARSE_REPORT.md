# PARSE_REPORT.md

Results of importing the staged exam PDFs in `seed/exams/<bank>/` via `scripts/import-exam-pdfs.ts`.
A file is auto-published only when every question matched an answer-key entry with zero anomalies; anything else is left as a draft for a mentor to fix on the review screen (`/mentor/exams/<bank>`).

## business-management-administration

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2018_business-management-administration_sample_exam.pdf | 2018 Business Management and Administration Sample Exam | published | 100 | 100 | 0 | 0 | 100 |

## entrepreneurship

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2017_entrepreneurship_sample_exam.pdf | 2017 Entrepreneurship Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2019_entrepreneurship_sample_exam.pdf | 2019 Entrepreneurship Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2022_entrepreneurship_state_exam.pdf | 2022 Entrepreneurship State Exam | published | 100 | 100 | 0 | 0 | 100 |

## hospitality-tourism

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2010_hospitality-tourism_icdc_exam.pdf | 2010 Hospitality and Tourism ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2011_hospitality-tourism_icdc_exam.pdf | 2011 Hospitality and Tourism ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2013_hospitality-tourism_icdc_exam.pdf | 2013 Hospitality and Tourism ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2015_hospitality-tourism_sample_exam.pdf | 2015 Hospitality and Tourism Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2017_hospitality-tourism_collegiate_sample_exam.pdf | 2017 Hospitality and Tourism Collegiate Sample Exam | published | 100 | 100 | 0 | 0 | 100 |

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
| 2021_marketing_sample_exam.pdf | 2021 Marketing Sample Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2022_marketing_state_exam.pdf | 2022 Marketing State Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2026_marketing_icdc_exam.pdf | 2026 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |
| 2026_marketing_icdc_exam_final.pdf | 2026 Marketing ICDC Exam | published | 100 | 100 | 0 | 0 | 100 |

## personal-financial-literacy

| File | Source exam | Status | Questions found | Matched | Missing key | Created | Duplicates skipped |
|---|---|---|---|---|---|---|---|
| 2026_personal-financial-literacy_sample_exam.pdf | 2026 Personal Financial Literacy Sample Exam | published | 100 | 100 | 0 | 100 | 0 |


## Anomalies

### 2011_marketing_icdc_exam.pdf

- No answer key section found — this PDF may be a scanned/image-only document with no extractable text layer, or uses an unrecognized layout. Skipped; needs manual entry.

## Summary

- 21 files processed
- 20 auto-published (clean parse)
- 1 need manual review or were skipped
- 100 total questions created
