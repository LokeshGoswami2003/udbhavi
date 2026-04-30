# Udbhavi Architecture

## Architecture Principle

Udbhavi should be built as a modular monorepo with AWS-first infrastructure. The system should be simple enough for fast MVP development, but shaped so workers, storage, queueing, and AI can scale without a rewrite.

## Future Monorepo Layout

```text
udbhavi/
  apps/
    web/
    api/
  workers/
    ai-worker/
    export-worker/
  packages/
    shared/
  infra/
    docker/
    aws/
  docs/
  scripts/
```

Phase 0 only creates docs. The monorepo structure starts in Phase 1.

## Service Responsibilities

### Web App

Technology:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- App Router.

Responsibilities:

- Landing page.
- Auth screens.
- Progressive onboarding.
- Dashboard.
- Resume upload.
- Template selection.
- Structured resume editor.
- AI chat edit panel.
- Job targeting UI.
- ATS guidance UI.
- PDF/DOCX preview and download.

### API Service

Technology:

- FastAPI.
- Python.
- Pydantic.
- SQLAlchemy.
- Alembic.

Responsibilities:

- Auth and session management.
- User and profile management.
- Resume CRUD.
- Resume versioning.
- Template metadata.
- Upload coordination.
- Job creation and status APIs.
- Usage tracking.
- Presigned S3 URL creation.
- Error handling.

### AI Worker

Responsibilities:

- Consume AI jobs.
- Call Amazon Bedrock.
- Validate model output.
- Store AI results.
- Track token usage and estimated cost.
- Never write unvalidated resume JSON.

### Export Worker

Responsibilities:

- Render LaTeX from structured JSON.
- Compile PDF through Dockerized TeX Live/XeLaTeX.
- Generate DOCX from structured JSON.
- Store generated files in S3.
- Record compile/export logs.
- Enforce compiler timeouts and sandbox rules.

## AWS Services

Default production infrastructure:

- Amazon Bedrock for AI.
- RDS PostgreSQL for relational data.
- S3 for uploads and generated files.
- SQS for async AI/export jobs.
- ECS Fargate for API and workers.
- CloudWatch for logs.
- Secrets Manager for secrets.
- ALB or API Gateway for API ingress.
- CloudFront/S3 or Amplify for frontend hosting.

Frontend hosting may later move to Vercel after research, but backend, storage, database, queue, and AI remain AWS-first for the MVP plan.

## High-Level Flow

```text
User
  -> Next.js Web App
  -> FastAPI API
  -> PostgreSQL for structured data
  -> S3 for uploads and generated files
  -> SQS for long-running jobs
  -> AI Worker for Bedrock workflows
  -> Export Worker for PDF/DOCX generation
```

## Key Architecture Decisions

- Structured resume JSON is the source of truth.
- Resume versions exist from day one.
- AI workflows are async once job duration becomes user-visible.
- PDF and DOCX are generated from the same structured data.
- LaTeX compilation runs outside the API service.
- User uploads and generated outputs are private by default.
- Model IDs, regions, and provider settings must be configurable.

## Why AI Returns JSON Instead Of LaTeX

The model should return validated structured resume JSON, not final LaTeX as the normal contract.

Why:

- JSON is easier to validate than free-form LaTeX.
- JSON is easier to diff, version, and partially update.
- Template switching becomes possible without asking the model to rewrite the whole document format.
- The same source data can feed PDF, DOCX, previews, ATS analysis, and future editors.
- LaTeX generated directly by the model is more brittle and harder to debug when formatting breaks.

The correct flow is:

```text
AI
  -> structured resume JSON
  -> backend validation
  -> deterministic renderer
  -> LaTeX
  -> PDF compiler
```

Direct model-to-LaTeX generation can still be useful as a fallback or repair workflow in narrow cases, but it should not be the primary architecture.

## Database ORM And Migration Strategy

The backend is not using Prisma.

Chosen stack:

- SQLAlchemy for ORM and query modeling.
- Alembic for schema migrations.
- PostgreSQL locally and in production.

Why not Prisma:

- Prisma is strongest in Node/TypeScript backends, while this backend is intentionally Python/FastAPI-based.
- Using Prisma here would add an unnecessary cross-language database toolchain.
- SQLAlchemy and Alembic are the standard, mature Python choices for FastAPI applications.

Expected migration flow:

```text
Model change
  -> create Alembic migration
  -> review migration SQL
  -> apply locally
  -> test
  -> apply in deployed environments
```

Typical commands later:

```bash
alembic revision --autogenerate -m "create users table"
alembic upgrade head
```

In this project we will wire those commands through the backend environment and docs when Phase 2 begins.

## Local Development Strategy

Local development should mirror production concepts without requiring every AWS service immediately:

- Local Neon PostgreSQL connection for the API runtime.
- Local filesystem or local S3-compatible substitute for early file development if needed.
- Local fake queue or direct worker execution before SQS is wired.
- Environment variables shaped like production settings from the beginning.

## Logic Check

AWS-first does not mean every AWS resource must be provisioned before coding. It means interfaces, configuration, and service boundaries should be designed around AWS services from the start. This keeps local development fast while avoiding a later architecture rewrite.
