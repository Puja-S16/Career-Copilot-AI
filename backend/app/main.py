from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import health, auth, resumes, analyses, roadmap, gap_analysis

from backend.app.routes import (
    health,
    auth,
    resumes,
    analyses,
    roadmap,
    gap_analysis,
    resume_improvement
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Career Copilot AI API is running"}


app.include_router(health.router)
app.include_router(auth.router)
app.include_router(resumes.router)
app.include_router(analyses.router)
app.include_router(roadmap.router)
app.include_router(gap_analysis.router)
app.include_router(resume_improvement.router)