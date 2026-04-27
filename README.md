# Udbhavi

Udbhavi is an AI-powered resume-building SaaS for IT and software professionals. It helps users upload or create resumes, improve them with AI, target job descriptions, and export high-quality PDF/DOCX versions.

## Architecture

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: FastAPI, Python, Pydantic, SQLAlchemy, Alembic.
- Database: PostgreSQL locally, AWS RDS PostgreSQL in production.
- Storage: AWS S3 for uploads and generated files.
- Queue: AWS SQS for AI and export jobs.
- AI: Amazon Bedrock, with Claude Sonnet configured through environment settings.
- Workers: AI worker and export worker.

## Repository Layout

```text
apps/
  web/              # Next.js frontend
  api/              # FastAPI backend
workers/
  ai-worker/        # Bedrock workflow worker
  export-worker/    # PDF/DOCX export worker
packages/
  shared/           # Shared schemas/types later
infra/
  docker/           # Local Docker support
  aws/              # AWS infrastructure notes/config later
docs/               # Product and architecture docs
scripts/            # Project scripts
```

## Local Setup

Start PostgreSQL:

```bash
docker compose up -d
```

Run the backend:

```bash
cd apps/api
uv sync
uv run fastapi dev app/main.py
```

If `uv` is not recognized on Windows after installation, open a new terminal or add this directory to `PATH`:

```text
C:\Users\Arcstream\AppData\Roaming\Python\Python313\Scripts
```

Run backend checks:

```bash
cd apps/api
uv run pytest
uv run ruff check .
```

Run the frontend:

```bash
cd apps/web
npm install
npm run dev
```

Run frontend checks:

```bash
cd apps/web
npm run lint
npm run typecheck
```

## Phase 1 Scope

Phase 1 creates the local foundation only:

- Monorepo folder structure.
- Local PostgreSQL through Docker Compose.
- Initial FastAPI app with `/health`.
- Initial Next.js app shell.

Phase 1 does not include auth, AI workflows, resume editing, AWS provisioning, or document generation.

## Current Phase 1 Status

Created:

- Monorepo folder structure.
- Root `AGENTS.md`, `.gitignore`, `docker-compose.yml`, and `README.md`.
- Initial FastAPI backend in `apps/api`.
- Initial Next.js frontend in `apps/web`.
- Placeholder worker, shared package, infra, and scripts folders.

Known local setup note:

- Docker is installed and reachable, but the PostgreSQL image pull is currently blocked because Docker Desktop cannot resolve `registry-1.docker.io`.
- `uv` was installed for the current user. A new terminal may be needed before the `uv` command is available on `PATH`.
