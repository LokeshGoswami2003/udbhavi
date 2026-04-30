from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.errors import install_error_handlers
from app.modules.auth.router import router as auth_router
from app.modules.health.router import router as health_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="0.1.0")
    install_error_handlers(app)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(health_router, prefix="/health", tags=["health"])
    app.include_router(auth_router)
    return app


app = create_app()
