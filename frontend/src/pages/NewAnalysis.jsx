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