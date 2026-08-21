SKILLS = {
    # Programming
    "python",
    "java",
    "c++",
    "c",
    "c#",
    "javascript",
    "typescript",

    # Web
    "html",
    "css",
    "react",
    "angular",
    "node.js",
    "express",
    "fastapi",
    "flask",
    "spring boot",
    "rest api",

    # Databases
    "mysql",
    "postgresql",
    "mongodb",
    "sqlite",
    "redis",

    # Machine Learning / AI
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "nlp",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "pandas",
    "numpy",
    "opencv",
    "easyocr",

    # CS Fundamentals
    "data structures",
    "algorithms",
    "object oriented programming",
    "dbms",
    "operating systems",
    "computer networks",

    # DevOps / Tools
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "linux",
    "streamlit",

    # Other common engineering skills
    "sql",
    "microservices",
}

import re


def normalize_text(text: str) -> str:
    text = text.lower()

    replacements = {
        "datastructures": "data structures",
        "objectorientedprogramming": "object oriented programming",
        "computernetworks": "computer networks",
        "machinelearning": "machine learning",
        "deeplearning": "deep learning",
        "scikit learn": "scikit-learn",
        "springboot": "spring boot",
        "nodejs": "node.js",
        "restapi": "rest api",
        "objectoriented": "object oriented",
        "dsa": "data structures",
        "ml": "machine learning",
        "ai": "artificial intelligence",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    text = re.sub(r"[^a-z0-9+#.\s-]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text


def extract_skills(text: str) -> list[str]:
    normalized_text = normalize_text(text)

    found_skills = []

    for skill in SKILLS:
        pattern = rf"(?<!\w){re.escape(skill)}(?!\w)"

        if re.search(pattern, normalized_text):
            found_skills.append(skill)

    return sorted(found_skills)