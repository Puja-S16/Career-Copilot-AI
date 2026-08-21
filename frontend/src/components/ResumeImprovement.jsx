function ResumeImprovement({ improvements }) {
    return (
        <section className="resume-improvement">

            <h2>Resume Improvement Suggestions</h2>

            {improvements.improvements.map((item, index) => (
                <div
                    className="improvement-card"
                    key={index}
                >
                    <h3>{item.category}</h3>

                    <p>{item.suggestion}</p>
                </div>
            ))}

        </section>
    );
}

export default ResumeImprovement;