# Udbhavi Agent Instructions

You are coding inside the Udbhavi monorepo.

Udbhavi is an AI resume-building SaaS. The architecture is:

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: FastAPI, Python, Pydantic, SQLAlchemy, Alembic.
- Database: PostgreSQL.
- Storage later: AWS S3.
- Queue later: AWS SQS.
- AI later: Amazon Bedrock Claude.
- Export later: Dockerized LaTeX/PDF and DOCX worker.

## Core Product Rule

Structured resume JSON is the source of truth.

Do not generate final LaTeX directly from the LLM. AI workflows must produce validated JSON or structured suggestions. Backend code renders final outputs deterministically from structured data.

## Code Quality Rules

1. Keep files small and focused.
2. Keep modules isolated.
3. Do not mix UI, business logic, API logic, and persistence logic.
4. Add tests for every feature.
5. Use strict typing.
6. Avoid unnecessary dependencies.
7. Do not add features that were not requested.
8. Do not rewrite unrelated files.
9. Do not introduce global state unless explicitly required.
10. Do not bypass validation.
11. Update relevant docs whenever implementation changes project behavior, setup, architecture, commands, or decisions.
12. Record important decisions in docs before or during implementation, not from memory later.

## Frontend Rules

- Use TypeScript.
- Use the Next.js App Router.
- Keep Server Components as the default.
- Use Client Components only when interactivity is needed.
- Keep UI components presentational when possible.
- Put feature logic inside hooks, services, or feature modules.
- Do not put API calls randomly inside large components.
- Keep text and controls responsive on mobile and desktop.

## Backend Rules

- FastAPI routers handle HTTP concerns only.
- Put business logic in services.
- Put database access in repositories.
- Use Pydantic schemas for request/response validation.
- Use SQLAlchemy models for persistence.
- Use Alembic migrations for schema changes.
- Do not access the database directly from routers.
- Return structured errors with stable error codes.

## Testing Rules

Before completing a task, run the relevant checks:

Frontend:

```bash
npm run lint
npm run typecheck
npm run test
```

Backend:

```bash
uv run ruff check .
uv run ruff format --check .
uv run pytest
```

If a test command does not exist yet, create the minimal test setup before relying on it.

For mechanical formatting or import-order issues, use the configured formatter/linter fix command once instead of manually guessing the style repeatedly. After the fix, rerun the check and report the result.

## Documentation Rules

- Keep `docs/` aligned with the current implementation.
- Add a setup or decision note when a phase changes how the project runs.
- Update `README.md` when local commands, dependencies, or service layout change.
- Update `docs/phase-roadmap.md` when a phase is completed, blocked, or materially re-scoped.
- Do not leave decisions only in chat history.
- If a command cannot be verified due to local environment limitations, document the blocker and the expected command.

## Completion Format

When done, respond with:

1. Summary of changes.
2. Files changed.
3. Tests/checks run.
4. Known limitations.
