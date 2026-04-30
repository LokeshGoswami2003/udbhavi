from fastapi.testclient import TestClient

from app.main import app


def test_health_check_returns_ok() -> None:
    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "udbhavi-api",
    }


def test_cors_preflight_allows_local_web_origin() -> None:
    client = TestClient(app)
    response = client.options(
        "/auth/login",
        headers={
            "Origin": "http://127.0.0.1:3000",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://127.0.0.1:3000"
