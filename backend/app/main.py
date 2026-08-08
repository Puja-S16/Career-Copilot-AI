from fastapi import FastAPI
from app.routes import health

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Career Copilot AI API is running"}


app.include_router(health.router)