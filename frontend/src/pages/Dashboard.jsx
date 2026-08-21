import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function Dashboard() {
    const [analysis, setAnalysis] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedAnalysis = localStorage.getItem(
            "current_analysis"
        );

        if (savedAnalysis) {
            setAnalysis(JSON.parse(savedAnalysis));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("current_analysis");

        window.location.reload();
    };

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Career Copilot</h1>
                    <p>
                        Your AI-powered career assistant
                    </p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <Navigation />

            <main className="dashboard-content">

                <section className="welcome-card">
                    <h2>Welcome back 👋</h2>

                    <p>
                        Analyze job opportunities, identify skill
                        gaps, create learning roadmaps, and improve
                        your resume.
                    </p>
                </section>

                <section className="dashboard-grid">

                    <div className="dashboard-card">
                        <h3>New Job Analysis</h3>

                        <p>
                            Compare your resume with a target job
                            and discover your match score.
                        </p>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/new-analysis")
                            }
                        >
                            Start Analysis
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h3>Career Gap Analysis</h3>

                        <p>
                            Identify the skills you need to develop
                            for your target role.
                        </p>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/gap-analysis")
                            }
                        >
                            View Gap Analysis
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h3>Career Roadmap</h3>

                        <p>
                            Follow a personalized learning roadmap
                            based on your skill gaps.
                        </p>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/roadmap")
                            }
                        >
                            View Roadmap
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h3>Resume Improvement</h3>

                        <p>
                            Get suggestions to improve your resume
                            for your target role.
                        </p>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/resume-improvement")
                            }
                        >
                            Improve Resume
                        </button>
                    </div>

                </section>

                {analysis && (
                    <section className="latest-analysis">

                        <div>
                            <h2>Latest Analysis</h2>

                            <p>
                                {analysis.job_title}
                            </p>
                        </div>

                        <div className="latest-score">
                            <strong>
                                {analysis.match_score}%
                            </strong>

                            <span>
                                Match Score
                            </span>
                        </div>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/analysis")
                            }
                        >
                            View Analysis
                        </button>

                    </section>
                )}

            </main>
        </div>
    );
}

export default Dashboard;