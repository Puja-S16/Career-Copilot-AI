import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Roadmap from "../components/Roadmap";
import { generateRoadmap } from "../services/api";

function RoadmapPage() {
    const [roadmap, setRoadmap] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        const loadRoadmap = async () => {
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

                const data = await generateRoadmap(
                    analysis.analysis_id,
                    14,
                    token
                );

                setRoadmap(data);
            } catch (error) {
                setMessage(
                    error.message || "Roadmap generation failed."
                );
            } finally {
                setLoading(false);
            }
        };

        loadRoadmap();
    }, [token]);

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Career Roadmap</h1>
                    <p>
                        Your personalized learning plan
                    </p>
                </div>
            </header>

            <Navigation />

            <main className="dashboard-content">

                {loading && (
                    <section className="welcome-card">
                        <h2>Generating Career Roadmap...</h2>
                        <p>
                            Creating your personalized 14-day
                            learning plan.
                        </p>
                    </section>
                )}

                {!loading && message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {!loading && roadmap && (
                    <>
                        <Roadmap
                            roadmap={roadmap}
                        />

                        <div className="analysis-actions">

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate("/gap-analysis")
                                }
                            >
                                View Gap Analysis
                            </button>

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate(
                                        "/resume-improvement"
                                    )
                                }
                            >
                                Improve Resume
                            </button>

                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default RoadmapPage;