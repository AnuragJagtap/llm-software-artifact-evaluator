from fastapi import APIRouter, UploadFile, Form
from backend.models.schemas import EvaluationResponse
from backend.services.job_manager import create_job
from backend.utils.text_extractor import extract_text_from_file
from backend.evaluators.srs_evaluator import evaluate_srs
from backend.evaluators.code_evaluator import evaluate_code
from backend.evaluators.test_case_evaluator import evaluate_test_cases
from backend.services.job_manager import update_job


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

    if type == "srs" and srs_file:
        content = await srs_file.read()
        text = extract_text_from_file(content, srs_file.filename)
        result = evaluate_srs(text)

    elif type == "code" and code_file:
        content = await code_file.read()
        text = extract_text_from_file(content, code_file.filename)
        result = evaluate_code(text)

    elif type == "test_cases" and problem_file and testcase_file:
        p = extract_text_from_file(await problem_file.read(), problem_file.filename)
        t = extract_text_from_file(await testcase_file.read(), testcase_file.filename)
        result = evaluate_test_cases(p, t)

    else:
        result = {"error": "Invalid input"}

    update_job(job_id, result)

    return {
        "job_id": job_id,
        "status": "completed"
    }

