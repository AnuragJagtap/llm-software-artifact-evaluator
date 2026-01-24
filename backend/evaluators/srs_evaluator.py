from backend.utils.chunker import chunk_text

REQUIRED_SECTIONS = [
    "introduction",
    "functional requirements",
    "non-functional requirements",
    "system overview"
]

def evaluate_srs(text: str) -> dict:
    text_lower = text.lower()

    scores = {}
    total = 0

    for section in REQUIRED_SECTIONS:
        present = section in text_lower
        scores[section] = 1 if present else 0
        total += scores[section]

    return {
        "type": "SRS",
        "section_coverage": scores,
        "coverage_score": round(total / len(REQUIRED_SECTIONS), 2)
    }
