from datetime import datetime

from sqlalchemy import JSON, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.core.ids import new_uuid
from app.core.time import utc_now


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    target_roles: Mapped[list[str]] = mapped_column(JSON, default=list)
    experience_level: Mapped[str] = mapped_column(String(64), default="")
    preferred_country: Mapped[str] = mapped_column(String(64), default="")
    industry: Mapped[str] = mapped_column(String(64), default="software")
    primary_skills: Mapped[list[str]] = mapped_column(JSON, default=list)
    career_goal: Mapped[str] = mapped_column(String(500), default="")
    onboarding_status: Mapped[str] = mapped_column(String(32), default="not_started")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
    )
