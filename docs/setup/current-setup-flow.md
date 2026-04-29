# Current Setup Flow

## What We Have Right Now

The project is set up as a monorepo. That means the whole product lives in one repository and is versioned together under a single root Git repository.

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
    docker/             # future Docker-specific files
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

Deleting the nested `apps/web/.git` folder was the right move. We do not want two separate Git histories for this monorepo.

## How The Flow Works Today

### Frontend

The frontend lives in `apps/web` and is a Next.js App Router app.

Its current job in Phase 1:

- Provide the initial Udbhavi landing shell.
- Confirm the frontend toolchain works.
- Establish the place where dashboard, auth, editor, and future product screens will live.

The frontend talks to the backend later through HTTP APIs. In Phase 1 it does not yet call the backend.

Step flow today:

```text
npm run dev
  -> Next.js dev server starts
  -> serves the Udbhavi landing shell
  -> future routes will live in the same app
```

### Backend

The backend lives in `apps/api` and is a FastAPI app.

Its current job in Phase 1:

- Boot successfully.
- Expose a health endpoint at `/health`.
- Establish the module structure for future auth, resumes, AI, files, and jobs.

Right now the backend does not yet use the database in code, but it is already shaped for that future.

Step flow today:

```text
uv run fastapi dev app/main.py
  -> FastAPI app starts
  -> registers route modules
  -> exposes /health
  -> returns service status JSON
```

### Database

The local database is PostgreSQL, defined in the root `docker-compose.yml`.

Its role:

- Provide the same database engine locally that we plan to use in AWS through RDS PostgreSQL.
- Let the backend connect to a realistic local database without changing architecture later.

The database container is not the backend. It is a separate service that the backend will connect to through `DATABASE_URL`.

Step flow today:

```text
docker compose up -d
  -> Docker starts postgres:16
  -> PostgreSQL listens on port 5432
  -> backend will later connect through DATABASE_URL
```

### Docker

Docker is being used for local infrastructure, not for the frontend or backend runtime yet.

What Docker is doing in Phase 1:

- Running PostgreSQL in a container.
- Giving us a clean, repeatable local database setup.
- Keeping local infrastructure separate from the app code.

Why this helps:

- We do not need to install PostgreSQL directly on Windows.
- The local DB can be started and stopped predictably.
- Later, more services can be containerized if needed.

Current Docker flow:

```text
docker compose up -d
  -> starts postgres container
  -> exposes port 5432 locally
  -> backend uses DATABASE_URL to connect
```

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
     -> Next.js local dev server

Developer
  -> apps/api
     -> uv run fastapi dev app/main.py
     -> FastAPI local API

Developer
  -> docker compose up -d
     -> local PostgreSQL container
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

- Local PostgreSQL mirrors future RDS PostgreSQL.
- Local env vars are shaped like future AWS config.
- S3, SQS, Bedrock, and ECS are planned in architecture, even if not yet wired in code.

Current intention:

- Local dev uses Docker Postgres and app processes.
- Production will use RDS, S3, SQS, ECS Fargate, CloudWatch, Secrets Manager, and Bedrock.

## Current Command Flow

Frontend:

```bash
cd apps/web
npm run dev
```

Frontend compile and checks:

```bash
cd apps/web
npm run lint
npm run typecheck
```

Backend:

```bash
cd apps/api
uv run fastapi dev app/main.py
```

Backend checks:

```bash
cd apps/api
uv run pytest
uv run ruff check .
```

Database:

```bash
docker compose up -d
```

Database status:

```bash
docker compose ps
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
- Backend tests pass.
- Frontend lint and typecheck pass.

What is not built yet:

- Auth.
- DB models and migrations.
- Resume CRUD.
- Uploads.
- AI workflows.
- S3 integration.
- SQS integration.
- PDF/DOCX generation.

What still needs local verification:

- The PostgreSQL container should be started successfully through Docker Compose.
- The backend will need an actual DB connection test in Phase 2.

Current Docker blocker:

- Docker Desktop is reachable, but the `postgres:16` image pull is failing because Docker cannot resolve `registry-1.docker.io`.
- This is an environment/network issue in Docker Desktop, not a monorepo or app-structure issue.
