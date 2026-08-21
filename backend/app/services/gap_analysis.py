SKILL_RECOMMENDATIONS = {
    "docker": {
        "priority": "High",
        "recommendation": "Learn Docker fundamentals and containerize one existing project.",
        "resume_action": "Add Docker under Technical Skills after completing a hands-on project.",
    },
    "postgresql": {
        "priority": "High",
        "recommendation": "Practice PostgreSQL queries, relationships, indexes, and database design.",
        "resume_action": "Add PostgreSQL after using it in a project.",
    },
    "rest api": {
        "priority": "High",
        "recommendation": "Build REST APIs using HTTP methods, validation, authentication, and CRUD operations.",
        "resume_action": "Mention REST API development in a project where you implemented endpoints.",
    },
    "spring boot": {
        "priority": "High",
        "recommendation": "Learn Spring Boot and build a CRUD REST backend connected to PostgreSQL.",
        "resume_action": "Add Spring Boot to your skills after completing a backend project.",
    },
}


def generate_gap_analysis(
    matched_skills: list[str],
    missing_skills: list[str]
) -> dict:

    gaps = []

    for skill in missing_skills:
        recommendation = SKILL_RECOMMENDATIONS.get(
            skill,
            {
                "priority": "Medium",
                "recommendation": f"Learn the fundamentals of {skill} and build a small hands-on project.",
                "resume_action": f"Add {skill} to your resume after gaining practical experience.",
            }
        )

        gaps.append({
            "skill": skill,
            "priority": recommendation["priority"],
            "recommendation": recommendation["recommendation"],
            "resume_action": recommendation["resume_action"],
        })

    return {
        "matched_skills_count": len(matched_skills),
        "missing_skills_count": len(missing_skills),
        "gaps": gaps,
    }