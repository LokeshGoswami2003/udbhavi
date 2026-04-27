# Udbhavi Product Requirements

## Product Vision

Udbhavi helps IT and software professionals create polished, ATS-friendly resumes using AI analysis, structured editing, job targeting, and high-quality PDF/DOCX export.

The product should feel like a resume workspace, not a one-time generator. Users should be able to build a reusable career profile, create multiple resume versions, target resumes to job descriptions, and improve content through both guided forms and chat-based AI edits.

## Target Audience

Primary MVP audience:

- IT and software freshers.
- Internship applicants.
- Junior engineers.
- Experienced software professionals.
- Data/technical candidates whose resumes follow software-industry conventions.

Post-MVP expansion may include design, finance, consulting, law, product management, and academic CVs.

## MVP User Journeys

### Journey 1: Upload Existing Resume

1. User signs up with email and password.
2. User completes lightweight onboarding.
3. User uploads a PDF or DOCX resume.
4. System stores the original file and extracts resume text.
5. AI analyzes the resume and identifies strengths, weaknesses, missing details, ATS issues, and improvement opportunities.
6. System converts resume context into structured resume JSON.
7. User edits the structured resume and may use chat commands for changes.
8. User pastes a target job description for matching and tailoring.
9. System generates a targeted resume version.
10. User previews and downloads generated PDF and DOCX files.

### Journey 2: Start From Template

1. User signs up with email and password.
2. User completes lightweight onboarding.
3. User selects one of the MVP templates.
4. System asks for missing resume details progressively.
5. AI helps generate and improve structured resume JSON.
6. User edits fields and uses chat-based commands.
7. User targets the resume to a job description.
8. User previews and downloads generated PDF and DOCX files.

## MVP Requirements

- Custom email/password signup and login.
- Progressive onboarding for role target, experience level, country/job market, core skills, and career goal.
- PDF and DOCX resume upload.
- Resume text extraction from uploaded files.
- AI resume analysis.
- Structured resume JSON generation.
- Structured editor for summary, skills, experience, projects, education, and section order.
- Chat-based AI editing that updates structured JSON.
- Job description paste flow.
- ATS-style guidance score, keyword gaps, readability feedback, and improvement suggestions.
- Three templates: Software Engineer, Fresher/Internship, Modern ATS.
- Deterministic PDF rendering from structured JSON through LaTeX.
- Deterministic DOCX generation from structured JSON.
- Preview and download for generated PDF and DOCX.
- Resume version history from day one.
- Usage tracking for monetization readiness.
- Backend route/rate-limit design ready for future free and paid tiers.

## Explicit Non-Goals For MVP

- Mobile app.
- LinkedIn import.
- Full Overleaf-style editor.
- Raw LaTeX editing in the main flow.
- Public resume hosting.
- Team accounts.
- Payment integration.
- Admin panel.
- Fine-tuned or self-hosted LLM.
- Multiple non-IT industries.

## Post-MVP Requirements

- Google OAuth.
- OTP login or verification.
- 2FA.
- Stripe/payment integration.
- Admin panel.
- Premium templates.
- In-app LaTeX editor.
- LaTeX download.
- More industries and resume styles.
- Mobile experience.
- LinkedIn text/data import options.

## Product Principles

- Resume quality matters more than feature count.
- AI must assist users, not silently overwrite their career story.
- Every AI change should be reviewable or recoverable through versions.
- ATS feedback should be honest guidance, not a guaranteed pass/fail claim.
- The resume data model must support multiple output formats without duplicating content.
