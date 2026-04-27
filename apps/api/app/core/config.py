from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Udbhavi API"
    environment: str = "local"
    database_url: str = "postgresql+psycopg://udbhavi:udbhavi@localhost:5432/udbhavi_dev"
    cors_origins: str = "http://localhost:3000"
    aws_region: str = "ap-south-1"
    s3_bucket_name: str = "udbhavi-dev"
    sqs_ai_queue_url: str = ""
    sqs_export_queue_url: str = ""
    bedrock_model_id: str = "anthropic.claude-sonnet-4-6"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
