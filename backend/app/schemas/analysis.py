from pydantic import BaseModel


class JobAnalysisCreate(BaseModel):
    resume_id: int
    job_title: str
    job_description: str

class JobAnalysisResponse(BaseModel):
    id: int
    resume_id: int
    job_title: str
    job_description: str
    match_score: float
    matched_skills: list[str]
    missing_skills: list[str]