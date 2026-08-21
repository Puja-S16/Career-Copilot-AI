import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import ResumeImprovement from "../components/ResumeImprovement";
import { getResumeImprovements } from "../services/api";

function ResumeImprovementPage() {
    const [resumeImprovement, setResumeImprovement] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const loadResumeImprovement = async () => {
            const savedAnalysis = localStorage.getItem(
                "current_analysis"
            );

            if (!savedAnalysis) {
                setMessage("Please analyze a job first.");
                setLoading(false);
                return;
            }

            try {
                const analysis = JSON.parse(savedAnalysis);

                const data = await getResumeImprovements(
                    analysis.analysis_id,
                    token
                );

                setResumeImprovement(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadResumeImprovement();
    }, [token]);

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Resume Improvement</h1>
                    <p>
                        Improve your resume for your target role
                    </p>
                </div>
            </header>

            <Navigation />

            <main className="dashboard-content">

                {loading && (
                    <section className="welcome-card">
                        <h2>Generating Resume Suggestions...</h2>
                        <p>
                            Reviewing your resume against the target
                            role.
                        </p>
                    </section>
                )}

                {!loading && message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {!loading && resumeImprovement && (
                    <ResumeImprovement
                        improvements={resumeImprovement}
                    />
                )}

            </main>
        </div>
    );
}

export default ResumeImprovementPage;