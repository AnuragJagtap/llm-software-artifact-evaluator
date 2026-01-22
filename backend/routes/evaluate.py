from fastapi import APIRouter, UploadFile, Form
from backend.models.schemas import EvaluationResponse
from backend.services.job_manager import create_job

router = APIRouter(
    prefix="/evaluate",
    tags=["Evaluation"]
)

@router.post("/", response_model=EvaluationResponse)
async def evaluate(
    type: str = Form(...),
    srs_file: UploadFile | None = None,
    code_file: UploadFile | None = None,
    problem_file: UploadFile | None = None,
    testcase_file: UploadFile | None = None
):
    job_id = create_job()
    return {
        "job_id": job_id,
        "status": "processing"
    }
