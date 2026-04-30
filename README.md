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
uv run ruff format --check .
uv run alembic upgrade head
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
npm run test
npm run build
```

## Current Phase Status

Phase 1 created the local monorepo foundation:

- Monorepo folder structure.
- Local PostgreSQL through Docker Compose.
- Initial FastAPI app with `/health`.
- Initial Next.js app shell.

Phase 2 is now in progress and has started implementing:

- Email/password auth routes.
- JWT access tokens and refresh rotation.
- SQLAlchemy models and Alembic migrations for the first core entities.
- A shadcn-compatible, dual-theme frontend foundation.
- SaaS-style landing, signup, login, and workspace-entry routes on the client.

Still pending inside Phase 2 and later phases:

- Real onboarding screens after auth.
- Resume CRUD and version authoring flows.
- Uploads, AI workflows, job targeting, and exports.
- Real PostgreSQL runtime verification once Docker Desktop can pull images again.
