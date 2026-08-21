from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.database.connection import Base


class JobAnalysis(Base):
    __tablename__ = "job_analyses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    resume_id: Mapped[int] = mapped_column(
        ForeignKey("resumes.id"),
        nullable=False,
        index=True
    )

    job_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    job_description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    match_score: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    matched_skills: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    missing_skills: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )