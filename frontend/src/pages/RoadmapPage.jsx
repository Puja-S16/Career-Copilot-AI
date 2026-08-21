import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Roadmap from "../components/Roadmap";
import { generateRoadmap } from "../services/api";

function RoadmapPage() {
    const [roadmap, setRoadmap] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const loadRoadmap = async () => {
            const savedAnalysis = localStorage.getItem(
                "current_analysis"
            );

            if (!savedAnalysis) {
                setMessage(
                    "Please analyze a job first."
                );
                return;
            }

            try {
                const analysis = JSON.parse(
                    savedAnalysis
                );

                const data = await generateRoadmap(
                    analysis.analysis_id,
                    14,
                    token
                );

                setRoadmap(data);
            } catch (error) {
                setMessage(error.message);
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

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {roadmap && (
                    <Roadmap
                        roadmap={roadmap}
                    />
                )}

            </main>
        </div>
    );
}

export default RoadmapPage;