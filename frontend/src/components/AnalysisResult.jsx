function AnalysisResult({
    analysis,
    onGapAnalysis,
}) {
    return (
        <section className="analysis-result">
            <h2>Analysis Result</h2>

            <div className="score">
                <h3>{analysis.match_score}%</h3>
                <p>Match Score</p>
            </div>

            <div>
                <h3>Matched Skills</h3>

                <ul>
                    {analysis.matched_skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Missing Skills</h3>

                <ul>
                    {analysis.missing_skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </div>

            <button
                className="action-button"
                onClick={onGapAnalysis}
            >
                View Gap Analysis
            </button>
        </section>
    );
}

export default AnalysisResult;