# Phase 1 Setup Notes

## What Phase 1 Created

Root project files:

- `README.md`
- `AGENTS.md`
- `.gitignore`

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
- Pytest health and auth tests.
- Ruff config.
- `.env.example` with Neon-ready local settings.

Frontend foundation:

- Next.js App Router app in `apps/web`.
- TypeScript.
- Tailwind CSS.
- ESLint.
- Local auth/workspace smoke coverage.
- Scripts for `dev`, `build`, `start`, `lint`, `typecheck`, and `test`.

Infrastructure foundation:

- Local Neon PostgreSQL configuration through `apps/api/.env`.
- Placeholder directories for future Docker and AWS infrastructure.
- One root Git repository for the whole monorepo.

## Commands

Backend:

```bash
cd apps/api
uv sync
copy .env.example .env
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
npm run test
npm run dev
```

Local frontend URL:

```text
http://localhost:3000
```

Database:

- Local API development uses a Neon PostgreSQL connection string in `apps/api/.env`.
- The SQLAlchemy connection should use `postgresql+psycopg://...`.
- Keep `sslmode=require&channel_binding=require` in the URL.

## Verification Results

Passed:

- Backend health and auth tests: `pytest`.
- Backend lint after formatter/import-sort fix: `ruff check`.
- Frontend lint: `npm run lint`.
- Frontend typecheck: `npm run typecheck`.
- Frontend auth-contract tests: `npm run test`.

Warning:

- Pytest may still warn if `.pytest_cache` is not writable on this Windows setup. That does not invalidate the test results.

## Decisions Made

- The worker folder is named `workers/export-worker` because it will eventually handle both PDF and DOCX export, not only LaTeX.
- AWS-specific settings are present in `.env.example`, but Phase 1 does not provision AWS resources.
- `uv` is the backend package manager. It was installed into the user Python scripts directory during setup.
- Mechanical import-order issues should be fixed with the configured formatter/linter once, then rechecked, instead of manually guessing import order.
- The monorepo uses one root Git repository only. Nested app-level `.git` folders are not part of the intended setup.
- Local development uses Neon PostgreSQL instead of Docker Compose Postgres.
- The web app is explicitly pinned to port `3000` for local use.

## Non-Goals Confirmed

Phase 1 does not implement:

- Authentication beyond the now-complete foundation wiring.
- Resume upload.
- AI workflows.
- PDF/DOCX rendering.
- AWS provisioning.
- Billing.
