# Udbhavi API

FastAPI backend for Udbhavi.

## Setup

```bash
copy .env.example .env
```

Update `apps/api/.env` with the Neon database URL before running migrations.
Use SQLAlchemy's `postgresql+psycopg://` scheme and keep Neon SSL options enabled:

```text
DATABASE_URL=postgresql+psycopg://...?...sslmode=require&channel_binding=require
```

## Run

Run migrations first:

```bash
.\.venv\Scripts\python.exe -m alembic upgrade head
```

Start the API:

```bash
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

These commands are the preferred Windows local commands because they use the
project virtual environment directly. Plain `python -m uvicorn` uses global
Python if the virtual environment is not activated, and that global Python may
not have `uvicorn` installed. If `uv` is available in your terminal, the
equivalent commands are `uv run alembic upgrade head` and
`uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`.

## Schema Management

```bash
uv run alembic upgrade head
```

## Current Endpoints

Health:

```text
GET http://127.0.0.1:8000/health
```

Auth:

```text
POST /auth/signup
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET /auth/me
```

Example health response:

```json
{
  "status": "ok",
  "service": "udbhavi-api"
}
```

## Checks

```bash
uv run pytest
uv run ruff check .
uv run ruff format --check .
uv run alembic upgrade head
```

## Local Database Contract

- Local development uses Neon PostgreSQL through `DATABASE_URL`.
- Use SQLAlchemy's `postgresql+psycopg://` scheme instead of the raw `postgresql://` form.
- Keep the Neon SSL settings enabled in the connection string.

## Neon Visibility Troubleshooting

If auth appears to work but Neon tables show no rows, check these points before
assuming the database is broken:

- Browser auth can appear active from `localStorage`; sign out or clear site data before testing a fresh signup.
- Backend tests use temporary SQLite databases, so `uv run pytest` never writes test users to Neon.
- Port `8000` can be held by an old Python process; restart the API from `apps/api` after changing `.env` or auth code.
- If signup returns `500` with a refresh-token foreign-key error, the backend is not running the current auth service code.

Fresh Neon write smoke test:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"qa-neon@example.com\",\"password\":\"Password123!\"}"
```
