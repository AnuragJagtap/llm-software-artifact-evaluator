def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    """
    Temporary extractor.
    Later we will add PDF, DOCX, etc.
    """
    try:
        return file_bytes.decode("utf-8", errors="ignore")
    except Exception:
        return ""
