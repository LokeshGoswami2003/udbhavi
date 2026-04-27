from fastapi import FastAPI

from app.core.config import settings
from app.modules.health.router import router as health_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="0.1.0")
    app.include_router(health_router, prefix="/health", tags=["health"])
    return app


app = create_app()
