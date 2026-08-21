from backend.app.database.connection import Base, engine
from backend.app.models.user import User
from backend.app.models.resume import Resume
from backend.app.models.job_analysis import JobAnalysis

Base.metadata.create_all(bind=engine)

print("Database tables created successfully")