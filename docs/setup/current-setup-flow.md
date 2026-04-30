# Current Setup Flow

## What We Have Right Now

The project is set up as a monorepo. The whole product lives in one repository and is versioned together under a single root Git repository.

Current layout:

```text
udbhavi/
  .git/                 # one Git repo for the whole project
  apps/
    web/                # Next.js frontend
    api/                # FastAPI backend
  workers/
    ai-worker/          # future AI worker
    export-worker/      # future PDF/DOCX export worker
  packages/
    shared/             # future shared schemas/types
  infra/
    docker/             # future Docker/export infrastructure files
    aws/                # future AWS-specific files
  docs/
  scripts/
```

## Git Model

This project should use one Git repository at the root only.

That means:

- `udbhavi/.git` is correct.
- `apps/web/.git` is not needed.
- `apps/api/.git` is not needed.

Why one Git repo is better here:

- Frontend, backend, workers, and docs evolve together.
- One commit can capture one product change across multiple services.
- Shared refactors are easier.
- Phase docs and implementation stay in sync.

## How The Flow Works Today

### Frontend

The frontend lives in `apps/web` and is a Next.js App Router app.

Its current job in the current Phase 2 state:

- Provide the design-system foundation for auth and resume-workspace screens.
- Confirm the frontend toolchain works with lint, typecheck, build, and focused auth tests.
- Establish the place where onboarding, dashboard, editor, and future product screens will live.

Step flow today:

```text
npm run dev
  -> Next.js dev server starts on localhost:3000
  -> serves the Udbhavi landing, auth, and workspace-entry routes
```

### Backend

The backend lives in `apps/api` and is a FastAPI app.

Its current job in the current Phase 2 state:

- Boot successfully.
- Expose `/health` plus auth routes for signup, login, refresh, logout, and session lookup.
- Own SQLAlchemy models, Alembic migrations, and protected-route behavior.
- Establish the module structure for future resumes, AI, files, and jobs.

Step flow today:

```text
uv run fastapi dev app/main.py
  -> FastAPI app starts
  -> registers route modules
  -> exposes /health and /auth/*
  -> uses SQLAlchemy session dependencies
  -> returns structured success/error responses
```

### Database

The local database contract is PostgreSQL through Neon.

Its role:

- Provide the same database engine locally that we plan to use in AWS through RDS PostgreSQL.
- Let the backend connect to a managed, TLS-backed Postgres instance without maintaining a local container.

The database is not embedded in the backend. The API connects to Neon through `DATABASE_URL`.

Schema changes now flow through Alembic. The database lifecycle is:

```text
copy .env.example .env
  -> set Neon DATABASE_URL
alembic upgrade head
  -> apply the current backend schema
FastAPI app
  -> uses the migrated tables for auth and core entities
```

### Docker

Docker is no longer part of the default local database path.

What Docker is still reserved for:

- Future export-worker PDF compilation.
- Any later infra experiments that benefit from container isolation.

## How The Full Product Flow Will Grow

This is the intended product direction after later phases:

```text
User
  -> Next.js frontend
  -> FastAPI backend
  -> PostgreSQL for structured data
  -> S3 for uploads and generated files
  -> SQS for async jobs
  -> AI worker for Bedrock calls
  -> Export worker for PDF/DOCX generation
```

## Current Local Flow Diagram

```text
Developer
  -> apps/web
     -> npm run dev
     -> Next.js local dev server on port 3000

Developer
  -> apps/api
     -> uv run fastapi dev app/main.py
     -> FastAPI local API

Developer
  -> apps/api/.env
     -> Neon PostgreSQL connection
```

## Planned Production Flow Diagram

```text
User
  -> Frontend host
     -> Next.js web app
        -> API requests
           -> FastAPI service on ECS Fargate
              -> RDS PostgreSQL
              -> S3
              -> SQS

SQS
  -> AI worker
     -> Bedrock
     -> stores validated results

SQS
  -> Export worker
     -> render LaTeX/DOCX
     -> generate files
     -> store outputs in S3
```

## How AWS Fits In

We are AWS-first, but not AWS-everything-on-day-one locally.

That means:

- Local Neon PostgreSQL mirrors the same Postgres behavior we expect from RDS.
- Local env vars are shaped like future AWS config.
- S3, SQS, Bedrock, and ECS are planned in architecture, even if not yet wired in code.

Current intention:

- Local dev uses Neon Postgres and app processes.
- Production will use RDS, S3, SQS, ECS Fargate, CloudWatch, Secrets Manager, and Bedrock.

## Current Command Flow

Frontend:

```bash
cd apps/web
npm run dev
```

Local URL:

```text
http://localhost:3000
```

Frontend compile and checks:

```bash
cd apps/web
npm run lint
npm run typecheck
npm run test
npm run build
```

Backend:

```bash
cd apps/api
copy .env.example .env
uv run fastapi dev app/main.py
```

Backend checks:

```bash
cd apps/api
uv run pytest
uv run ruff check .
uv run ruff format --check .
uv run alembic upgrade head
```

Database migration:

```bash
cd apps/api
uv run alembic upgrade head
```

Health check:

```text
GET http://127.0.0.1:8000/health
```

## Current Reality Check

What is working:

- Root monorepo structure exists.
- One root Git repo exists.
- Next.js app exists.
- FastAPI app exists.
- Backend auth and migration flow exist.
- Backend tests pass.
- Frontend lint, typecheck, auth tests, and production build pass.
- Local frontend port is fixed at `3000`.
- Local backend config targets Neon PostgreSQL.

What is not built yet:

- Resume CRUD.
- Uploads.
- AI workflows.
- S3 integration.
- SQS integration.
- PDF/DOCX generation.

What still needs local verification:

- The backend should be exercised against the configured Neon database after local credentials are in place.
