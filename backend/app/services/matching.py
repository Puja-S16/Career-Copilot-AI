SKILL_ALIASES = {
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "dsa": "data structures",
    "postgres": "postgresql",
    "postgres db": "postgresql",
    "sklearn": "scikit-learn",
    "scikit learn": "scikit-learn",
    "opencv-python": "opencv",
}


def normalize_skills(skills: list[str]) -> set[str]:
    normalized = set()

    for skill in skills:
        skill = skill.strip().lower()
        normalized.add(SKILL_ALIASES.get(skill, skill))

    return normalized


def calculate_match(
    resume_skills: list[str],
    job_skills: list[str]
) -> dict:

    resume_set = normalize_skills(resume_skills)
    job_set = normalize_skills(job_skills)

    matched_skills = sorted(resume_set & job_set)
    missing_skills = sorted(job_set - resume_set)

    if not job_set:
        match_score = 0.0
    else:
        match_score = (
            len(matched_skills) / len(job_set)
        ) * 100

    return {
        "match_score": round(match_score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }