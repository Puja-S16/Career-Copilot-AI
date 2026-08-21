import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import GapAnalysis from "../components/GapAnalysis";
import { getGapAnalysis } from "../services/api";

function GapAnalysisPage() {
    const [gapAnalysis, setGapAnalysis] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const loadGapAnalysis = async () => {
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

                const data = await getGapAnalysis(
                    analysis.analysis_id,
                    token
                );

                setGapAnalysis(data);
            } catch (error) {
                setMessage(error.message);
            }
        };

        loadGapAnalysis();
    }, [token]);

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Career Gap Analysis</h1>
                    <p>
                        Identify the skills you need to strengthen
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

                {gapAnalysis && (
                    <GapAnalysis
                        gapAnalysis={gapAnalysis}
                    />
                )}

            </main>
        </div>
    );
}

export default GapAnalysisPage;