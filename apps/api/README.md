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

Health endpoint:

```text
GET http://127.0.0.1:8000/health
```

Expected response:

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
```
