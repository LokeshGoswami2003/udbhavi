from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Udbhavi API"
    environment: str = "local"
    database_url: str = (
        "postgresql+psycopg://neondb_owner:replace-me@your-neon-host/neondb"
        "?sslmode=require&channel_binding=require"
    )
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    auth_secret_key: str = Field(
        default="change-me-local-secret-key-please",
        min_length=24,
    )
    token_issuer: str = "udbhavi-api"
    access_token_ttl_minutes: int = 15
    refresh_token_ttl_days: int = 14
    aws_region: str = "ap-south-1"
    s3_bucket_name: str = "udbhavi-dev"
    sqs_ai_queue_url: str = ""
    sqs_export_queue_url: str = ""
    bedrock_model_id: str = "anthropic.claude-sonnet-4-6"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
