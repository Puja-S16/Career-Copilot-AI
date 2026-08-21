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
            </header>

            <Navigation />

            <main className="dashboard-content">

                {!analysis ? (
                    <section className="welcome-card">
                        <h2>No Analysis Available</h2>

                        <p>
                            Please analyze a job from the Dashboard
                            first.
                        </p>

                        <button
                            className="action-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go to Dashboard
                        </button>
                    </section>
                ) : (
                    <>
                        <AnalysisResult
                            analysis={analysis}
                            onGapAnalysis={() =>
                                navigate("/gap-analysis")
                            }
                        />

                        <div className="analysis-actions">

                            <button
                                className="action-button"
                                onClick={() => navigate("/roadmap")}
                            >
                                View Career Roadmap
                            </button>

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate("/resume-improvement")
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