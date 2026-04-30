from datetime import datetime

from sqlalchemy import JSON, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.core.ids import new_uuid
from app.core.time import utc_now


class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    title: Mapped[str] = mapped_column(String(200))
    target_role: Mapped[str] = mapped_column(String(120), default="")
    status: Mapped[str] = mapped_column(String(32), default="draft")
    current_version_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
    )


class ResumeVersion(Base):
    __tablename__ = "resume_versions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    resume_id: Mapped[str] = mapped_column(ForeignKey("resumes.id"), index=True)
    version_number: Mapped[int] = mapped_column(Integer)
    template_id: Mapped[str | None] = mapped_column(ForeignKey("templates.id"), nullable=True)
    target_job_id: Mapped[str | None] = mapped_column(ForeignKey("target_jobs.id"), nullable=True)
    structured_json: Mapped[dict[str, object]] = mapped_column(JSON, default=dict)
    latex_source_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    pdf_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    docx_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    change_summary: Mapped[str] = mapped_column(Text, default="")
    created_by: Mapped[str] = mapped_column(ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
