import os
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from backend.app.database.connection import SessionLocal
from backend.app.dependencies import get_current_user
from backend.app.models.resume import Resume
from backend.app.models.user import User


from backend.app.models.job_analysis import JobAnalysis


router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


UPLOAD_DIR = "backend/uploads/resumes"


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension != ".pdf":
        raise HTTPException(
            status_code=400,
            detail="File must have a .pdf extension"
        )

    unique_filename = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    file_content = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_content)

    resume = Resume(
        user_id=current_user.id,
        filename=file.filename,
        file_path=file_path
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": resume.filename
    }


@router.get("/")
def get_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.uploaded_at.desc())
        .all()
    )

    return [
        {
            "id": resume.id,
            "filename": resume.filename,
            "uploaded_at": resume.uploaded_at,
        }
        for resume in resumes
    ]

@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Delete related job analyses first
    db.query(JobAnalysis).filter(
        JobAnalysis.resume_id == resume.id
    ).delete(synchronize_session=False)

    # Delete physical PDF
    if os.path.exists(resume.file_path):
        os.remove(resume.file_path)

    # Delete resume record
    db.delete(resume)
    db.commit()

    return {
        "message": "Resume and related analyses deleted successfully"
    }