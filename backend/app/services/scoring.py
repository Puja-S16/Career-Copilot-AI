def calculate_final_score(
    skill_score: float,
    semantic_score: float
) -> float:
    final_score = (
        skill_score * 0.70
        + semantic_score * 0.30
    )

    return round(final_score, 2)