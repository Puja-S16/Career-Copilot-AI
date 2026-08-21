const API_BASE_URL = "http://127.0.0.1:8000";

export async function uploadResume(file, token) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
        `${API_BASE_URL}/resumes/upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Resume upload failed."
        );
    }

    return data;
}


export async function analyzeJob(
    resumeId,
    jobTitle,
    jobDescription,
    token
) {
    const response = await fetch(
        `${API_BASE_URL}/analyses/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                resume_id: resumeId,
                job_title: jobTitle,
                job_description: jobDescription,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Job analysis failed."
        );
    }

    return data;
}


export async function getGapAnalysis(
    analysisId,
    token
) {
    const response = await fetch(
        `${API_BASE_URL}/gap-analysis/${analysisId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Gap analysis failed."
        );
    }

    return data;
}

export async function generateRoadmap(
    analysisId,
    durationDays,
    token
) {
    const response = await fetch(
        `${API_BASE_URL}/roadmap/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                analysis_id: analysisId,
                duration_days: durationDays,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Roadmap generation failed."
        );
    }

    return data;
}

export async function getResumeImprovements(
    analysisId,
    token
) {
    const response = await fetch(
        `${API_BASE_URL}/resume-improvement/${analysisId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Resume improvement analysis failed."
        );
    }

    return data;
}