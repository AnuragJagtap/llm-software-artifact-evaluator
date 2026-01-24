def evaluate_test_cases(problem: str, tests: str) -> dict:
    problem_len = len(problem.split())
    test_len = len(tests.split())

    coverage = min(test_len / max(problem_len, 1), 1.0)

    return {
        "type": "TEST_CASES",
        "problem_length": problem_len,
        "test_length": test_len,
        "coverage_score": round(coverage, 2)
    }
