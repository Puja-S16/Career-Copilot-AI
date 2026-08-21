from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.connection import SessionLocal
from backend.app.dependencies import get_current_user
from backend.app.models.job_analysis import JobAnalysis
from backend.app.models.resume import Resume
from backend.app.models.user import User
from backend.app.schemas.analysis import JobAnalysisCreate
from backend.app.services.resume_parser import (
    extract_text_from_pdf,
    clean_resume_text,
)
from backend.app.services.skill_extractor import extract_skills
from backend.app.services.matching import calculate_match



router = APIRouter(
    prefix="/analyses",
    tags=["Job Analysis"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def analyze_job(
    analysis_data: JobAnalysisCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.id == analysis_data.resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    resume_text = extract_text_from_pdf(resume.file_path)
    resume_text = clean_resume_text(resume_text)

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(analysis_data.job_description)

    result = calculate_match(
        resume_skills,
        job_skills
    )

    analysis = JobAnalysis(
        resume_id=resume.id,
        job_title=analysis_data.job_title,
        job_description=analysis_data.job_description,
        match_score=result["match_score"],
        matched_skills=", ".join(result["matched_skills"]),
        missing_skills=", ".join(result["missing_skills"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "analysis_id": analysis.id,
        "resume_id": analysis.resume_id,
        "job_title": analysis.job_title,
        "match_score": analysis.match_score,
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"]
    }


@router.get("/")
def get_analyses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analyses = (
        db.query(JobAnalysis)
        .join(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(JobAnalysis.created_at.desc())
        .all()
    )

    results = []

    for analysis in analyses:
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

        results.append({
            "id": analysis.id,
            "resume_id": analysis.resume_id,
            "job_title": analysis.job_title,
            "job_description": analysis.job_description,
            "match_score": analysis.match_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        })

    return results