from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db_session
from app.core.errors import AppError
from app.modules.auth.service import AuthService
from app.modules.users.models import User

bearer_scheme = HTTPBearer(auto_error=False)
bearer_credentials = Depends(bearer_scheme)
db_session_dependency = Depends(get_db_session)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = bearer_credentials,
    session: Session = db_session_dependency,
) -> User:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise AppError(401, "AUTH_MISSING_ACCESS_TOKEN", "Access token is required.")

    return AuthService(session).authenticate_access_token(credentials.credentials)
