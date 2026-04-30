from dataclasses import dataclass
from datetime import timedelta

from fastapi import status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.errors import AppError
from app.core.ids import new_uuid
from app.core.security import (
    create_access_token,
    decode_access_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)
from app.core.time import as_utc, utc_now
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import (
    AuthTokensResponse,
    AuthUserResponse,
    LoginRequest,
    SignupRequest,
)
from app.modules.profiles.models import Profile
from app.modules.users.models import User


@dataclass(frozen=True)
class SessionTokens:
    access_token: str
    refresh_token: str
    expires_in: int


class AuthService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.repository = AuthRepository(session)

    def signup(self, payload: SignupRequest) -> AuthTokensResponse:
        if self.repository.get_user_by_email(payload.email) is not None:
            raise AppError(
                status.HTTP_409_CONFLICT,
                "AUTH_EMAIL_IN_USE",
                "An account with that email already exists.",
            )

        user = self.repository.create_user(payload.email, hash_password(payload.password))
        self.session.flush()
        self.repository.create_profile(user.id)
        tokens = self._issue_tokens(user)
        self.session.commit()
        return self._build_auth_response(user, tokens)

    def login(self, payload: LoginRequest) -> AuthTokensResponse:
        user = self.repository.get_user_by_email(payload.email)
        if user is None or not verify_password(payload.password, user.password_hash):
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_CREDENTIALS",
                "Invalid email or password.",
            )
        if user.status != "active":
            raise AppError(
                status.HTTP_403_FORBIDDEN,
                "AUTH_USER_INACTIVE",
                "This account is not active.",
            )

        tokens = self._issue_tokens(user)
        self.session.commit()
        return self._build_auth_response(user, tokens)

    def refresh(self, refresh_token: str) -> AuthTokensResponse:
        now = utc_now()
        stored_token = self.repository.get_refresh_token_by_hash(hash_refresh_token(refresh_token))
        if stored_token is None:
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_REFRESH_TOKEN",
                "Refresh token is invalid.",
            )

        if stored_token.revoked_at is not None or stored_token.rotated_at is not None:
            self.repository.revoke_family(stored_token.user_id, stored_token.token_family, now)
            self.session.commit()
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_REFRESH_TOKEN_REUSED",
                "Refresh token reuse was detected.",
            )

        if as_utc(stored_token.expires_at) <= now:
            self.repository.revoke_token(stored_token, now)
            self.session.commit()
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_REFRESH_TOKEN",
                "Refresh token is invalid.",
            )

        user = self.repository.get_user_by_id(stored_token.user_id)
        if user is None or user.status != "active":
            self.repository.revoke_family(stored_token.user_id, stored_token.token_family, now)
            self.session.commit()
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_REFRESH_TOKEN",
                "Refresh token is invalid.",
            )

        new_refresh_token = generate_refresh_token()
        replacement = self.repository.create_refresh_token(
            user_id=user.id,
            token_family=stored_token.token_family,
            token_hash=hash_refresh_token(new_refresh_token),
            expires_at=now + timedelta(days=settings.refresh_token_ttl_days),
        )
        self.repository.mark_token_rotated(stored_token, replacement, now)

        access_token, expires_in = create_access_token(user.id, user.email)
        self.session.commit()
        return AuthTokensResponse(
            access_token=access_token,
            refresh_token=new_refresh_token,
            expires_in=expires_in,
            user=AuthUserResponse.model_validate(user),
        )

    def logout(self, refresh_token: str) -> None:
        stored_token = self.repository.get_refresh_token_by_hash(hash_refresh_token(refresh_token))
        if stored_token is None:
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_REFRESH_TOKEN",
                "Refresh token is invalid.",
            )

        self.repository.revoke_token(stored_token, utc_now())
        self.session.commit()

    def authenticate_access_token(self, access_token: str) -> User:
        try:
            payload = decode_access_token(access_token)
        except ValueError as exc:
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_ACCESS_TOKEN",
                "Access token is invalid.",
            ) from exc

        user = self.repository.get_user_by_id(payload.user_id)
        if user is None or user.status != "active":
            raise AppError(
                status.HTTP_401_UNAUTHORIZED,
                "AUTH_INVALID_ACCESS_TOKEN",
                "Access token is invalid.",
            )
        return user

    def get_profile(self, user_id: str) -> Profile:
        profile = self.repository.get_profile_by_user_id(user_id)
        if profile is None:
            raise AppError(
                status.HTTP_404_NOT_FOUND,
                "PROFILE_NOT_FOUND",
                "Profile was not found.",
            )
        return profile

    def _issue_tokens(self, user: User) -> SessionTokens:
        refresh_token = generate_refresh_token()
        self.repository.create_refresh_token(
            user_id=user.id,
            token_family=new_uuid(),
            token_hash=hash_refresh_token(refresh_token),
            expires_at=utc_now() + timedelta(days=settings.refresh_token_ttl_days),
        )
        access_token, expires_in = create_access_token(user.id, user.email)
        return SessionTokens(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=expires_in,
        )

    def _build_auth_response(self, user: User, tokens: SessionTokens) -> AuthTokensResponse:
        return AuthTokensResponse(
            access_token=tokens.access_token,
            refresh_token=tokens.refresh_token,
            expires_in=tokens.expires_in,
            user=AuthUserResponse.model_validate(user),
        )
