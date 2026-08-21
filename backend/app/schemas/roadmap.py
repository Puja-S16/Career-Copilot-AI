from pydantic import BaseModel


class RoadmapRequest(BaseModel):
    analysis_id: int
    duration_days: int = 14