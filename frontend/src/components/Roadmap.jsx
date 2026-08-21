function Roadmap({ roadmap }) {
    return (
        <section className="roadmap-section">

            <h2>14-Day Career Roadmap</h2>

            <p>
                Personalized roadmap for{" "}
                <strong>{roadmap.job_title}</strong>
            </p>

            <div className="roadmap-list">

                {roadmap.roadmap.map((item) => (
                    <div
                        className="roadmap-card"
                        key={item.day}
                    >
                        <h3>
                            Day {item.day}
                        </h3>

                        <strong>
                            {item.skill}
                        </strong>

                        <p>
                            {item.task}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}

export default Roadmap;