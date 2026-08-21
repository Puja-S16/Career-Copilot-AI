SKILL_TASKS = {
    "docker": [
        "Learn Docker fundamentals, images, containers, and Dockerfiles.",
        "Practice essential Docker commands and container lifecycle management.",
        "Containerize a simple Python application.",
        "Create a Dockerfile and run your application locally.",
    ],
    "postgresql": [
        "Learn PostgreSQL basics, databases, tables, and data types.",
        "Practice SELECT, INSERT, UPDATE, DELETE, and JOIN queries.",
        "Practice indexes, constraints, and relationships.",
        "Build a small PostgreSQL-backed application.",
    ],
    "rest api": [
        "Learn REST principles, HTTP methods, status codes, and endpoints.",
        "Build basic GET and POST REST endpoints.",
        "Practice request validation, error handling, and JSON responses.",
        "Build a small CRUD REST API.",
    ],
    "spring boot": [
        "Learn Spring Boot fundamentals and project structure.",
        "Build REST endpoints using Spring Boot.",
        "Connect Spring Boot to PostgreSQL using JPA.",
        "Build a small CRUD backend with Spring Boot.",
    ],
}


def generate_roadmap(
    missing_skills: list[str],
    duration_days: int
) -> list[dict]:

    if duration_days < 7 or duration_days > 14:
        raise ValueError("Duration must be between 7 and 14 days")

    if not missing_skills:
        return [
            {
                "day": 1,
                "skill": "Interview Preparation",
                "task": "Review your existing skills and practice role-specific interview questions."
            }
        ]

    roadmap = []
    skill_count = len(missing_skills)
    skill_day_count = {skill: 0 for skill in missing_skills}

    for day in range(1, duration_days + 1):

        skill_index = ((day - 1) * skill_count) // duration_days
        skill = missing_skills[skill_index]

        tasks = SKILL_TASKS.get(
            skill,
            [
                f"Learn the fundamentals of {skill}.",
                f"Practice {skill} with hands-on exercises.",
                f"Build a small project using {skill}.",
                f"Review {skill} and solve practical problems."
            ]
        )

        task_index = skill_day_count[skill] % len(tasks)

        roadmap.append({
            "day": day,
            "skill": skill,
            "task": tasks[task_index]
        })

        skill_day_count[skill] += 1

    return roadmap