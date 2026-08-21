function GapAnalysis({ gapAnalysis }) {
    return (
        <section className="gap-analysis">
            <h2>Career Gap Analysis</h2>

            <p>
                Matched Skills: {gapAnalysis.matched_skills_count}
            </p>

            <p>
                Missing Skills: {gapAnalysis.missing_skills_count}
            </p>

            {gapAnalysis.gaps.map((gap) => (
                <div
                    className="gap-card"
                    key={gap.skill}
                >
                    <h3>{gap.skill}</h3>

                    <strong>
                        Priority: {gap.priority}
                    </strong>

                    <p>
                        {gap.recommendation}
                    </p>

                    <p>
                        <strong>Resume Action:</strong>{" "}
                        {gap.resume_action}
                    </p>
                </div>
            ))}
        </section>
    );
}

export default GapAnalysis;