function JobAnalysisForm({
    resume,
    setResume,
    jobTitle,
    setJobTitle,
    jobDescription,
    setJobDescription,
    onUpload,
    onAnalyze,
    isUploading,
}) {
    return (
        <section className="analysis-card">

            <h2>Analyze Your Career Match</h2>

            <div className="form-group">
                <label>Resume</label>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                />
            </div>

            <button
                onClick={onUpload}
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Upload Resume"}
            </button>

            <div className="form-group">
                <label>Job Title</label>

                <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Job Description</label>

                <textarea
                    rows="10"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
            </div>

            <button onClick={onAnalyze}>
                Analyze Job
            </button>

        </section>
    );
}

export default JobAnalysisForm;