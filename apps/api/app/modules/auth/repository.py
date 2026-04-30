from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.ids import new_uuid
from app.modules.auth.models import RefreshToken
from app.modules.profiles.models import Profile
from app.modules.users.models import User


class AuthRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_user_by_email(self, email: str) -> User | None:
        statement = select(User).where(func.lower(User.email) == email.lower())
        return self.session.scalar(statement)

    def get_user_by_id(self, user_id: str) -> User | None:
        return self.session.get(User, user_id)

    def get_profile_by_user_id(self, user_id: str) -> Profile | None:
        statement = select(Profile).where(Profile.user_id == user_id)
        return self.session.scalar(statement)

    def create_user(self, email: str, password_hash: str) -> User:
        user = User(
            id=new_uuid(),
            email=email.lower(),
            password_hash=password_hash,
        )
        self.session.add(user)
        return user

    def create_profile(self, user_id: str) -> Profile:
        profile = Profile(user_id=user_id)
        self.session.add(profile)
        return profile

    def get_refresh_token_by_hash(self, token_hash: str) -> RefreshToken | None:
        statement = select(RefreshToken).where(RefreshToken.token_hash == token_hash)
        return self.session.scalar(statement)

    def create_refresh_token(
        self,
        user_id: str,
        token_family: str,
        token_hash: str,
        expires_at: datetime,
    ) -> RefreshToken:
        token = RefreshToken(
            id=new_uuid(),
            user_id=user_id,
            token_family=token_family,
            token_hash=token_hash,
            expires_at=expires_at,
        )
        self.session.add(token)
        return token

    def mark_token_rotated(
        self,
        token: RefreshToken,
        replacement: RefreshToken,
        rotated_at: datetime,
    ) -> None:
        token.rotated_at = rotated_at
        token.replaced_by_token_id = replacement.id

    def revoke_token(self, token: RefreshToken, revoked_at: datetime) -> None:
        token.revoked_at = revoked_at

    def revoke_family(
        self,
        user_id: str,
        token_family: str,
        revoked_at: datetime,
    ) -> None:
        statement = select(RefreshToken).where(
            RefreshToken.user_id == user_id,
            RefreshToken.token_family == token_family,
        )
        for token in self.session.scalars(statement):
            if token.revoked_at is None:
                token.revoked_at = revoked_at
            if token.reuse_detected_at is None:
                token.reuse_detected_at = revoked_at
