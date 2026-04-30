# Udbhavi Phase Roadmap

## Phase 0: Requirements Documentation

Goal: create implementation-ready docs before app scaffolding.

Deliverables:

- Product requirements.
- Architecture decisions.
- Auth and security requirements.
- Data model requirements.
- AI workflow requirements.
- Export/rendering requirements.
- Testing strategy.
- Logic review.

Acceptance criteria:

- Docs exist under `docs/`.
- MVP and post-MVP scope are clearly separated.
- No implementation code is added.

Non-goals:

- Creating the monorepo structure.
- Building frontend/backend features.
- Provisioning AWS resources.

## Phase 1: Project Foundation

Goal: create a clean monorepo and local development base.

Status: completed. The monorepo skeleton, root files, initial FastAPI app, and initial Next.js app are in place. Local development is now locked to web port 3000 plus a Neon PostgreSQL connection instead of Docker-based Postgres.

Deliverables:

- Root project files: `README.md`, `AGENTS.md`, `.gitignore`.
- Folder structure: `apps/web`, `apps/api`, `workers/ai-worker`, `workers/latex-worker`, `packages/shared`, `infra`, `docs`, `scripts`.
- Local Neon PostgreSQL configuration for the backend.
- Initial Next.js app.
- Initial FastAPI app with `/health`.

Acceptance criteria:

- Frontend dev server starts.
- Backend health endpoint works.
- Backend connects successfully with a configured Neon `DATABASE_URL`.
- Basic lint/typecheck/test commands pass.
- Phase setup notes are recorded in [Phase 1 Setup](../setup/phase-1-setup.md).

Non-goals:

- Real auth.
- Resume features.
- AI integration.
- PDF/DOCX generation.

## Phase 2: Auth And Core Database

Goal: implement custom auth and persistent core entities.

Status: completed. Backend auth, JWT session handling, refresh rotation, Alembic migrations, and the first core entities are implemented locally. The client also has landing, signup, login, and a focused workspace-entry flow in place.

Deliverables:

- Email/password signup and login.
- JWT access tokens.
- Refresh token rotation.
- Logout/revoke flow.
- SQLAlchemy and Alembic setup.
- Initial tables for users, refresh tokens, profiles, resumes, resume versions, templates, jobs, and usage events.

Acceptance criteria:

- User can sign up, sign in, refresh, and log out.
- Protected routes reject missing/invalid tokens.
- Auth tests cover common failure cases.

Non-goals:

- Google OAuth.
- OTP.
- 2FA.
- Billing.

## Phase 3: Resume Intake And Structured Editor

Goal: create resumes from upload or template and store structured JSON.

Deliverables:

- PDF and DOCX upload flow.
- Resume source records.
- Resume text extraction service interface.
- Template-start flow.
- Structured resume editor.
- Resume version creation.

Acceptance criteria:

- User can create a resume from upload or template.
- Resume context is saved for future edits.
- Structured JSON validates before save.
- Versions are created predictably.

Non-goals:

- AI generation quality tuning.
- Final PDF/DOCX export.

## Phase 4: AI Analysis And Editing

Goal: use Bedrock to analyze, improve, and edit resumes through validated JSON workflows.

Deliverables:

- Bedrock client abstraction.
- Prompt templates and schemas.
- Analyze resume workflow.
- Generate resume JSON workflow.
- Rewrite section workflow.
- Chat edit workflow.
- AI job records and usage tracking.

Acceptance criteria:

- AI output is schema-validated.
- Invalid AI output fails safely.
- User can apply AI suggestions without corrupting prior versions.

Non-goals:

- Direct LLM-generated final LaTeX as the normal path.
- Fine-tuning.

## Phase 5: Job Targeting And ATS Guidance

Goal: tailor resumes to job descriptions and provide honest ATS-style feedback.

Deliverables:

- Job description paste flow.
- Keyword extraction.
- Resume/job match guidance score.
- Keyword gap analysis.
- Tailored resume version generation.
- Explanation of suggested changes.

Acceptance criteria:

- User can create a job-targeted resume version.
- ATS guidance avoids pass/fail guarantees.
- Original resume remains recoverable.

Non-goals:

- Claiming compatibility with every employer ATS.
- Scraping job boards.

## Phase 6: Export And Rendering

Goal: generate high-quality PDF and DOCX files from structured JSON.

Deliverables:

- JSON-to-LaTeX renderer.
- Dockerized LaTeX compiler worker.
- DOCX generator from structured JSON.
- Preview and download flows.
- Compile/export job records.

Acceptance criteria:

- User can preview and download PDF and DOCX.
- PDF and DOCX are generated from the same structured resume data.
- Compile failures return useful errors.

Non-goals:

- In-app raw LaTeX editor.
- LaTeX download.

## Phase 7: Async Jobs And AWS Services

Goal: move slow workflows to scalable AWS-backed jobs.

Deliverables:

- SQS job queues.
- S3 storage for uploads and generated files.
- RDS PostgreSQL production configuration.
- ECS Fargate services for API and workers.
- CloudWatch logs.
- Secrets Manager configuration.

Acceptance criteria:

- API does not block on long AI/export jobs.
- Workers update job status.
- Failed jobs are visible and retryable.

Non-goals:

- Kubernetes.
- Complex microservice split beyond API, AI worker, and export worker.

## Phase 8: Monetization Readiness

Goal: prepare the product for free and paid tiers without payment integration.

Deliverables:

- Plan/tier fields.
- Usage events.
- Generation/download counters.
- Rate-limit hooks.
- Frontend "Pro coming soon" messaging.

Acceptance criteria:

- Backend can enforce future limits.
- Usage is trackable per user and workflow.
- No payment provider is required.

Non-goals:

- Stripe checkout.
- Subscription billing.

## Phase 9: Production Hardening

Goal: make the MVP operable for beta users.

Deliverables:

- Error monitoring strategy.
- Backup strategy.
- Security review.
- Rate limits.
- Deployment runbooks.
- Basic operational queries for support.

Acceptance criteria:

- Production failures can be diagnosed from logs and job records.
- Secrets are not committed.
- User files are private by default.

Non-goals:

- Full admin panel.
- Advanced analytics.

## Phase 10: Post-MVP Expansion

Goal: expand once the core resume workflow is working.

Possible additions:

- Admin panel.
- Stripe payments.
- Premium templates.
- In-app LaTeX editor.
- LaTeX download.
- Google OAuth, OTP, 2FA.
- More industries.
- Mobile app.
- Self-hosted or fine-tuned model experiments.
