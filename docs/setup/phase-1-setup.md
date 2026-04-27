# Phase 1 Setup Notes

## What Phase 1 Created

Root project files:

- `README.md`
- `AGENTS.md`
- `.gitignore`
- `docker-compose.yml`

Monorepo folders:

- `apps/web`
- `apps/api`
- `workers/ai-worker`
- `workers/export-worker`
- `packages/shared`
- `infra/docker`
- `infra/aws`
- `docs`
- `scripts`

Backend foundation:

- FastAPI app in `apps/api`.
- Modular health route at `/health`.
- Pydantic settings in `app/core/config.py`.
- Pytest health test.
- Ruff config.
- `.env.example` with AWS-shaped local settings.

Frontend foundation:

- Next.js App Router app in `apps/web`.
- TypeScript.
- Tailwind CSS.
- ESLint.
- Udbhavi landing shell.
- Scripts for `dev`, `build`, `start`, `lint`, and `typecheck`.

Infrastructure foundation:

- Local PostgreSQL defined in root `docker-compose.yml`.
- Placeholder directories for future Docker and AWS infrastructure.
- One root Git repository for the whole monorepo.

## Commands

Backend:

```bash
cd apps/api
uv sync
uv run pytest
uv run ruff check .
uv run fastapi dev app/main.py
```

Windows note:

If `uv` is not recognized after installation, open a new terminal or add this directory to `PATH`:

```text
C:\Users\Arcstream\AppData\Roaming\Python\Python313\Scripts
```

Frontend:

```bash
cd apps/web
npm install
npm run lint
npm run typecheck
npm run dev
```

Database:

```bash
docker compose up -d
```

## Verification Results

Passed:

- Backend health test: `pytest`.
- Backend lint after formatter/import-sort fix: `ruff check`.
- Frontend lint: `npm run lint`.
- Frontend typecheck: `npm run typecheck`.

Warning:

- Pytest passed, but this session could not write `.pytest_cache` due to a Windows access warning. This does not block the test result.

Blocked locally:

- Docker is now reachable from the terminal, but PostgreSQL has not started yet because Docker Desktop could not pull `postgres:16`.
- The exact error is DNS/network related inside Docker Desktop: it could not resolve `registry-1.docker.io`.

Expected fix:

- Fix Docker Desktop network/DNS access to Docker Hub.
- Rerun `docker compose up -d` from the repo root and confirm the `postgres` service becomes healthy.

## Decisions Made

- The worker folder is named `workers/export-worker` because it will eventually handle both PDF and DOCX export, not only LaTeX.
- AWS-specific settings are present in `.env.example`, but Phase 1 does not provision AWS resources.
- `uv` is the backend package manager. It was installed into the user Python scripts directory during setup.
- Mechanical import-order issues should be fixed with the configured formatter/linter once, then rechecked, instead of manually guessing import order.
- The monorepo uses one root Git repository only. Nested app-level `.git` folders are not part of the intended setup.

## Non-Goals Confirmed

Phase 1 does not implement:

- Authentication.
- Database models.
- Resume upload.
- AI workflows.
- PDF/DOCX rendering.
- AWS provisioning.
- Billing.
