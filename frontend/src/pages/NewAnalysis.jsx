import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import JobAnalysisForm from "../components/JobAnalysisForm";
import {
    uploadResume,
    analyzeJob,
} from "../services/api";

function NewAnalysis() {
    const [resume, setResume] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [message, setMessage] = useState("");
    const [resumeId, setResumeId] = useState(null);

    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!resume) {
            setMessage("Please select a resume first.");
            return;
        }

        setIsUploading(true);
        setMessage("");

        try {
            const data = await uploadResume(
                resume,
                token
            );

            setResumeId(data.resume_id);

            setMessage(
                "Resume uploaded successfully. You can now analyze the job."
            );
        } catch (error) {
            setMessage(
                error.message || "Resume upload failed."
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!jobTitle.trim()) {
            setMessage("Please enter a job title.");
            return;
        }

        if (!jobDescription.trim()) {
            setMessage("Please enter a job description.");
            return;
        }

        if (!resumeId) {
            setMessage("Please upload your resume first.");
            return;
        }

        setIsAnalyzing(true);
        setMessage("");

        try {
            const data = await analyzeJob(
                resumeId,
                jobTitle,
                jobDescription,
                token
            );

            localStorage.setItem(
                "current_analysis",
                JSON.stringify(data)
            );

            navigate("/analysis");
        } catch (error) {
            setMessage(
                error.message || "Job analysis failed."
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    const hasJobDetails =
        jobTitle.trim() && jobDescription.trim();

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>New Job Analysis</h1>
                    <p>
                        Compare your resume with a target job
                    </p>
                </div>
            </header>

            <Navigation />

            <main className="dashboard-content">

                <section className="analysis-steps">

                    {/* Step 1 */}
                    <div
                        className={
                            resumeId
                                ? "analysis-step completed"
                                : "analysis-step active"
                        }
                    >
                        <span>
                            {resumeId ? "✓" : "1"}
                        </span>

                        <div>
                            <strong>
                                Upload Resume
                            </strong>

                            <p>
                                Select your latest resume.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div
                        className={
                            hasJobDetails
                                ? "analysis-step completed"
                                : resumeId
                                    ? "analysis-step active"
                                    : "analysis-step"
                        }
                    >
                        <span>
                            {hasJobDetails ? "✓" : "2"}
                        </span>

                        <div>
                            <strong>
                                Enter Job Details
                            </strong>

                            <p>
                                Add the target job title
                                and description.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div
                        className={
                            isAnalyzing || hasJobDetails
                                ? "analysis-step active"
                                : "analysis-step"
                        }
                    >
                        <span>3</span>

                        <div>
                            <strong>
                                {isAnalyzing
                                    ? "Analyzing Match..."
                                    : "Analyze Match"}
                            </strong>

                            <p>
                                Get your career match
                                and skill gaps.
                            </p>
                        </div>
                    </div>

                </section>

                <JobAnalysisForm
                    resume={resume}
                    setResume={setResume}
                    jobTitle={jobTitle}
                    setJobTitle={setJobTitle}
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    onUpload={handleUpload}
                    onAnalyze={handleAnalyze}
                    isUploading={isUploading}
                    isAnalyzing={isAnalyzing}
                />

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

            </main>

        </div>
    );
}

export default NewAnalysis;