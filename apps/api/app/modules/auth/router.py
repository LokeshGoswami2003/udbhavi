from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db_session
from app.modules.auth.dependencies import get_current_user
from app.modules.auth.schemas import (
    AuthRefreshRequest,
    AuthSessionResponse,
    AuthTokensResponse,
    AuthUserResponse,
    LoginRequest,
    LogoutRequest,
    SignupRequest,
)
from app.modules.auth.service import AuthService
from app.modules.users.models import User

router = APIRouter(prefix="/auth", tags=["auth"])
db_session_dependency = Depends(get_db_session)
current_user_dependency = Depends(get_current_user)


@router.post(
    "/signup",
    response_model=AuthTokensResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    payload: SignupRequest,
    session: Session = db_session_dependency,
) -> AuthTokensResponse:
    return AuthService(session).signup(payload)


@router.post("/login", response_model=AuthTokensResponse)
def login(
    payload: LoginRequest,
    session: Session = db_session_dependency,
) -> AuthTokensResponse:
    return AuthService(session).login(payload)


@router.post("/refresh", response_model=AuthTokensResponse)
def refresh(
    payload: AuthRefreshRequest,
    session: Session = db_session_dependency,
) -> AuthTokensResponse:
    return AuthService(session).refresh(payload.refresh_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    payload: LogoutRequest,
    session: Session = db_session_dependency,
) -> Response:
    AuthService(session).logout(payload.refresh_token)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=AuthSessionResponse)
def me(
    session: Session = db_session_dependency,
    current_user: User = current_user_dependency,
) -> AuthSessionResponse:
    profile = AuthService(session).get_profile(current_user.id)
    return AuthSessionResponse(
        user=AuthUserResponse.model_validate(current_user),
        profile_onboarding_status=profile.onboarding_status,
    )
