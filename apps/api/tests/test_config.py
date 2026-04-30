from app.core.config import settings


def test_local_defaults_target_port_3000_only() -> None:
    assert settings.cors_origin_list == [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


def test_local_database_url_uses_neon_postgres_contract() -> None:
    assert settings.database_url.startswith("postgresql+psycopg://")
    assert "sslmode=require" in settings.database_url
