from pydantic import BaseModel

class EvaluationResponse(BaseModel):
    job_id: str
    status: str
