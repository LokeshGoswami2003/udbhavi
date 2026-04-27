# Udbhavi Phase 0 Logic Review

## Review Summary

The current product logic is coherent, but the MVP is ambitious. The key to keeping it buildable is to treat MVP as one launch target with internal implementation phases, not as one giant feature sprint.

## Decisions That Fit Together

### Upload + Template Creation

Supporting both upload-first and template-first creation is logical because the audience includes both experienced users with existing resumes and freshers who may need more guidance.

Implementation implication:

- Uploads create `resume_sources`.
- Templates create structured resume drafts.
- Both paths converge into the same structured resume JSON editor.

### PDF + DOCX Export

Supporting both PDF and DOCX output is product-valid because users need polished PDFs for applications and editable DOCX files for manual sharing or recruiter requests.

Implementation implication:

- DOCX must be generated from structured JSON.
- PDF must be generated from structured JSON through LaTeX.
- PDF-to-DOCX conversion should be avoided because formatting quality is unreliable.

### Structured Editor + Chat Edits

This is a strong product direction. The structured editor gives reliability; chat gives speed and delight.

Implementation implication:

- Chat edits must produce validated JSON patches or section replacements.
- Accepted chat edits create resume versions.
- Chat should not directly mutate final documents.

### Full Job Targeting In MVP

This increases scope, but it fits the resume product promise. Many users care more about job-specific resumes than generic resume generation.

Implementation implication:

- Build job targeting as a workflow over structured JSON.
- Store target job descriptions separately.
- Treat ATS score as guidance, not a guarantee.

### AWS From Day One

AWS-first is logical because Bedrock, S3, SQS, RDS, ECS, CloudWatch, and Secrets Manager line up with the product's AI/file/job architecture.

Implementation implication:

- Use AWS-shaped interfaces from the beginning.
- Keep local development fast with local substitutes where practical.
- Do not force production provisioning before core local workflows exist.

## Risks And Corrections

### Risk: MVP Scope Is Large

Current MVP includes upload, AI analysis, structured editing, chat edits, job targeting, ATS guidance, PDF export, and DOCX export.

Correction:

- Keep one MVP launch target, but execute in strict internal phases.
- Do not begin AI polish before resume JSON, auth, and versioning are stable.

### Risk: Claude Model Availability Can Change

The planning docs mention Claude Sonnet 4.6 on Bedrock. Official AWS docs currently list Claude Sonnet 4.6 as active with model ID `anthropic.claude-sonnet-4-6`, but model availability, regions, quotas, and inference profiles can change.

References:

- https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-4-6.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards-anthropic.html

Correction:

- Store model provider, model ID, region, and inference profile in configuration.
- Keep AI workflow logic provider-aware but not model-hardcoded.
- Verify Bedrock region/quota before implementation.

### Risk: ATS Score Could Overpromise

An exact-looking score can mislead users.

Correction:

- Label it as a guidance score.
- Show keyword gaps and readability feedback alongside the score.
- Avoid claims like "guaranteed ATS pass."

### Risk: LaTeX Compilation Is Security-Sensitive

Raw LaTeX can be risky if user-controlled.

Correction:

- MVP should not expose raw LaTeX editing.
- Compile only backend-rendered LaTeX.
- Run compiler in an isolated worker with strict timeouts and shell escape disabled.

### Risk: Custom Auth Adds Security Responsibility

Custom JWT auth is feasible but must be implemented carefully.

Correction:

- Keep signup simple.
- Hash passwords properly.
- Rotate refresh tokens.
- Add tests for token failure cases.
- Add OAuth/OTP/2FA later.

## Final Logic Verdict

The product direction is sound if the team follows the source-of-truth rule:

> Uploads, forms, chat, AI, ATS, PDF, and DOCX must all converge on validated structured resume JSON.

That one rule prevents most architecture drift and keeps future LaTeX editing, template expansion, and monetization possible.
