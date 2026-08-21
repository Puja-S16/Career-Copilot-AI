from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.connection import SessionLocal
from backend.app.dependencies import get_current_user
from backend.app.models.job_analysis import JobAnalysis
from backend.app.models.resume import Resume
from backend.app.models.user import User
from backend.app.schemas.roadmap import RoadmapRequest
from backend.app.services.roadmap import generate_roadmap


router = APIRouter(
    prefix="/roadmap",
    tags=["Roadmap"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_roadmap(
    roadmap_data: RoadmapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = (
        db.query(JobAnalysis)
        .join(Resume)
        .filter(
            JobAnalysis.id == roadmap_data.analysis_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    missing_skills = (
        analysis.missing_skills.split(", ")
        if analysis.missing_skills
        else []
    )

    try:
        roadmap = generate_roadmap(
            missing_skills,
            roadmap_data.duration_days
        )
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    return {
        "analysis_id": analysis.id,
        "job_title": analysis.job_title,
        "duration_days": roadmap_data.duration_days,
        "missing_skills": missing_skills,
        "roadmap": roadmap
    }