from fastapi import FastAPI
from backend.routes.evaluate import router as evaluate_router

app = FastAPI(
    title="LLM Software Artifact Evaluator API",
    version="0.1.0"
)

app.include_router(evaluate_router)

@app.get("/")
def health_check():
    return {"status": "ok"}
