from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.connection import SessionLocal
from backend.app.dependencies import get_current_user
from backend.app.models.job_analysis import JobAnalysis
from backend.app.models.resume import Resume
from backend.app.models.user import User
from backend.app.services.resume_improvement import generate_resume_improvements


router = APIRouter(
    prefix="/resume-improvement",
    tags=["Resume Improvement"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/{analysis_id}")
def get_resume_improvements(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = (
        db.query(JobAnalysis)
        .join(Resume)
        .filter(
            JobAnalysis.id == analysis_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    matched_skills = (
        analysis.matched_skills.split(", ")
        if analysis.matched_skills
        else []
    )

    missing_skills = (
        analysis.missing_skills.split(", ")
        if analysis.missing_skills
        else []
    )

    improvements = generate_resume_improvements(
        matched_skills,
        missing_skills
    )

    return {
        "analysis_id": analysis.id,
        "job_title": analysis.job_title,
        "match_score": analysis.match_score,
        "improvements": improvements
    }