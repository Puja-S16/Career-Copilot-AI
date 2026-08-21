import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import AnalysisResult from "../components/AnalysisResult";

function Analysis() {
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

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Career Analysis</h1>
                    <p>
                        Analyze your resume against a target job
                    </p>
                </div>

                <button
                    className="action-button"
                    onClick={() =>
                        navigate("/new-analysis")
                    }
                >
                    New Analysis
                </button>
            </header>

            <Navigation />

            <main className="dashboard-content">

                {!analysis ? (
                    <section className="welcome-card">

                        <h2>No Analysis Available</h2>

                        <p>
                            Please analyze a job from the
                            New Analysis page first.
                        </p>

                        <button
                            className="action-button"
                            onClick={() =>
                                navigate("/new-analysis")
                            }
                        >
                            Start New Analysis
                        </button>

                    </section>
                ) : (
                    <>
                        <section className="analysis-context">

                            <div>
                                <span className="context-label">
                                    Target Role
                                </span>

                                <h2>
                                    {analysis.job_title ||
                                        "Target Job"}
                                </h2>
                            </div>

                            <div className="context-score">
                                <span className="context-label">
                                    Match Score
                                </span>

                                <strong>
                                    {analysis.match_score}%
                                </strong>
                            </div>

                        </section>

                        <AnalysisResult
                            analysis={analysis}
                            onGapAnalysis={() =>
                                navigate("/gap-analysis")
                            }
                        />

                        <div className="analysis-actions">

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate("/roadmap")
                                }
                            >
                                View Career Roadmap
                            </button>

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate(
                                        "/resume-improvement"
                                    )
                                }
                            >
                                View Resume Improvements
                            </button>

                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default Analysis;