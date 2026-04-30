# Udbhavi

Udbhavi is an AI-powered resume-building SaaS for IT and software professionals. It helps users upload or create resumes, improve them with AI, target job descriptions, and export high-quality PDF/DOCX versions.

## Architecture

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: FastAPI, Python, Pydantic, SQLAlchemy, Alembic.
- Database: Neon-hosted PostgreSQL for local development, AWS RDS PostgreSQL in production.
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
  docker/           # Future export/runtime container support
  aws/              # AWS infrastructure notes/config later
docs/               # Product and architecture docs
scripts/            # Project scripts
```

## Local Setup

Prepare the backend environment:

```bash
cd apps/api
copy .env.example .env
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

Database note:

- Local development now uses a Neon PostgreSQL connection string through `apps/api/.env`.
- For SQLAlchemy, use the `postgresql+psycopg://...` form of the Neon URL.
- Keep `sslmode=require&channel_binding=require` on the connection string.

Run the frontend:

```bash
cd apps/web
npm install
npm run dev
```

The web app is pinned to `http://localhost:3000` for local development.

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
- Local Neon-backed PostgreSQL configuration.
- Initial FastAPI app with `/health`.
- Initial Next.js app shell.

Phase 2 is complete for the auth foundation:

- Email/password auth routes.
- JWT access tokens and refresh rotation.
- SQLAlchemy models and Alembic migrations for the first core entities.
- A shadcn-compatible, dual-theme frontend foundation.
- SaaS-style landing, signup, login, and workspace-entry routes on the client.

Still pending in later phases:

- Real onboarding screens after auth.
- Resume CRUD and version authoring flows.
- Uploads, AI workflows, job targeting, and exports.
- Full resume-creation flow after the workspace handoff.
