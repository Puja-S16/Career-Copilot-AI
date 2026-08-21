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
    isAnalyzing,
}) {
    return (
        <section className="analysis-card">

            <h2>Analyze Your Career Match</h2>

            <div className="form-group">
                <label>Resume</label>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setResume(e.target.files[0])
                    }
                    disabled={isUploading || isAnalyzing}
                />
            </div>

            <button
                onClick={onUpload}
                disabled={isUploading || isAnalyzing}
            >
                {isUploading
                    ? "Uploading..."
                    : "Upload Resume"}
            </button>

            <div className="form-group">
                <label>Job Title</label>

                <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) =>
                        setJobTitle(e.target.value)
                    }
                    disabled={isAnalyzing}
                />
            </div>

            <div className="form-group">
                <label>Job Description</label>

                <textarea
                    rows="10"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                    disabled={isAnalyzing}
                />
            </div>

            <button
                onClick={onAnalyze}
                disabled={isUploading || isAnalyzing}
            >
                {isAnalyzing
                    ? "Analyzing..."
                    : "Analyze Job"}
            </button>

        </section>
    );
}

export default JobAnalysisForm;