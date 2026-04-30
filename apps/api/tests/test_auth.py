from fastapi.testclient import TestClient


def test_signup_returns_tokens_and_allows_me_lookup(client: TestClient) -> None:
    signup_response = client.post(
        "/auth/signup",
        json={"email": "user@example.com", "password": "super-secure-pass"},
    )

    assert signup_response.status_code == 201
    signup_body = signup_response.json()
    assert signup_body["user"]["email"] == "user@example.com"
    assert signup_body["refresh_token"]

    me_response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {signup_body['access_token']}"},
    )

    assert me_response.status_code == 200
    assert me_response.json()["profile_onboarding_status"] == "not_started"


def test_signup_rejects_duplicate_email(client: TestClient) -> None:
    payload = {"email": "user@example.com", "password": "super-secure-pass"}

    first_response = client.post("/auth/signup", json=payload)
    second_response = client.post("/auth/signup", json=payload)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    assert second_response.json()["error"]["code"] == "AUTH_EMAIL_IN_USE"


def test_login_rejects_invalid_credentials(client: TestClient) -> None:
    client.post(
        "/auth/signup",
        json={"email": "user@example.com", "password": "super-secure-pass"},
    )

    response = client.post(
        "/auth/login",
        json={"email": "user@example.com", "password": "wrong-password"},
    )

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "AUTH_INVALID_CREDENTIALS"


def test_protected_route_requires_access_token(client: TestClient) -> None:
    response = client.get("/auth/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "AUTH_MISSING_ACCESS_TOKEN"


def test_refresh_rotates_tokens_and_detects_reuse(client: TestClient) -> None:
    signup_response = client.post(
        "/auth/signup",
        json={"email": "user@example.com", "password": "super-secure-pass"},
    )
    original_refresh_token = signup_response.json()["refresh_token"]

    refresh_response = client.post(
        "/auth/refresh",
        json={"refresh_token": original_refresh_token},
    )

    assert refresh_response.status_code == 200
    replacement_refresh_token = refresh_response.json()["refresh_token"]
    assert replacement_refresh_token != original_refresh_token

    reuse_response = client.post(
        "/auth/refresh",
        json={"refresh_token": original_refresh_token},
    )
    revoked_family_response = client.post(
        "/auth/refresh",
        json={"refresh_token": replacement_refresh_token},
    )

    assert reuse_response.status_code == 401
    assert reuse_response.json()["error"]["code"] == "AUTH_REFRESH_TOKEN_REUSED"
    assert revoked_family_response.status_code == 401


def test_logout_revokes_refresh_token(client: TestClient) -> None:
    signup_response = client.post(
        "/auth/signup",
        json={"email": "user@example.com", "password": "super-secure-pass"},
    )
    refresh_token = signup_response.json()["refresh_token"]

    logout_response = client.post("/auth/logout", json={"refresh_token": refresh_token})
    refresh_response = client.post("/auth/refresh", json={"refresh_token": refresh_token})

    assert logout_response.status_code == 204
    assert refresh_response.status_code == 401
    assert refresh_response.json()["error"]["code"] == "AUTH_REFRESH_TOKEN_REUSED"
