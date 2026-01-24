def evaluate_code(code: str) -> dict:
    metrics = {
        "has_functions": "def " in code or "function " in code,
        "has_comments": "#" in code or "//" in code,
        "has_classes": "class " in code
    }

    score = sum(metrics.values()) / len(metrics)

    return {
        "type": "CODE",
        "metrics": metrics,
        "quality_score": round(score, 2)
    }
