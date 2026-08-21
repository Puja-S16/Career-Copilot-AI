def generate_resume_improvements(
    matched_skills: list[str],
    missing_skills: list[str]
) -> list[dict]:

    improvements = []

    if missing_skills:
        improvements.append({
            "category": "Technical Skills",
            "suggestion": (
                "Prioritize job-relevant missing skills and add them to the "
                "resume only after gaining practical experience."
            )
        })

    if matched_skills:
        improvements.append({
            "category": "Skills Alignment",
            "suggestion": (
                "Move the most relevant skills for the target role toward "
                "the beginning of the Technical Skills section."
            )
        })

    improvements.append({
        "category": "Projects",
        "suggestion": (
            "Add or strengthen projects that demonstrate the missing "
            "technologies required by the target job."
        )
    })

    improvements.append({
        "category": "Project Descriptions",
        "suggestion": (
            "Use action-oriented bullets that clearly mention the technology "
            "used, what was implemented, and the measurable result."
        )
    })

    improvements.append({
        "category": "ATS Optimization",
        "suggestion": (
            "Use the exact terminology from the job description when it "
            "accurately describes your skills and experience."
        )
    })

    return improvements