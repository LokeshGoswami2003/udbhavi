from datetime import datetime

from sqlalchemy import JSON, Boolean, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.core.ids import new_uuid
from app.core.time import utc_now


class Template(Base):
    __tablename__ = "templates"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    category: Mapped[str] = mapped_column(String(80), default="")
    industry: Mapped[str] = mapped_column(String(80), default="software")
    output_support: Mapped[list[str]] = mapped_column(JSON, default=list)
    latex_template_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    docx_template_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    preview_image_s3_key: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
