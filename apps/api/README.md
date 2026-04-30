# Udbhavi API

FastAPI backend for Udbhavi.

## Setup

```bash
uv sync
```

## Run

```bash
uv run fastapi dev app/main.py
```

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
