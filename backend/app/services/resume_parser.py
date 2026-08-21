import re

from pypdf import PdfReader


def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text).strip()


def clean_resume_text(text: str) -> str:
    lines = []

    for line in text.splitlines():
        line = re.sub(r"\s+", " ", line)
        line = line.strip()

        if line:
            lines.append(line)

    return "\n".join(lines)

def extract_relevant_content(text: str) -> str:
    relevant_sections = [
        "PROFESSIONAL SUMMARY",
        "TECHNICAL SKILLS",
        "PROJECTS",
        "CERTIFICATIONS",
    ]

    lines = text.splitlines()

    selected_lines = []
    collecting = False

    for line in lines:
        line_upper = line.strip().upper()

        if line_upper in relevant_sections:
            collecting = True
            selected_lines.append(line)
            continue

        if collecting:
            if line_upper in {
                "EDUCATION",
                "EXPERIENCE",
                "CO-CURRICULAR ACTIVITIES",
                "ACHIEVEMENTS",
            }:
                collecting = False
                continue

            selected_lines.append(line)

    return "\n".join(selected_lines)