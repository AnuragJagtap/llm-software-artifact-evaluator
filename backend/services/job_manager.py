import uuid

# In-memory job store (temporary for Day 3)
JOBS = {}

def create_job() -> str:
    job_id = str(uuid.uuid4())
    JOBS[job_id] = {
        "status": "processing",
        "result": None
    }
    return job_id

def update_job(job_id: str, result: dict):
    if job_id in JOBS:
        JOBS[job_id]["status"] = "completed"
        JOBS[job_id]["result"] = result

def get_job(job_id: str):
    return JOBS.get(job_id)
