import { useState } from "react";
import AnalysisResult from "../components/AnalysisResult";
import GapAnalysis from "../components/GapAnalysis";
import JobAnalysisForm from "../components/JobAnalysisForm";
import {
    uploadResume,
    analyzeJob,
    getGapAnalysis,
    generateRoadmap,
    getResumeImprovements,
} from "../services/api";
import Roadmap from "../components/Roadmap";
import ResumeImprovement from "../components/ResumeImprovement";

function Dashboard() {
    const [resume, setResume] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [message, setMessage] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [resumeId, setResumeId] = useState(null);
    const [gapAnalysis, setGapAnalysis] = useState(null);
    const [roadmap, setRoadmap] = useState(null);
    const [resumeImprovement, setResumeImprovement] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

    const token = localStorage.getItem("access_token");

    const handleGapAnalysis = async () => {
        if (!analysis) {
            setMessage("Please analyze a job first.");
            return;
        }

        setMessage("");

        try {
            const data = await getGapAnalysis(
                analysis.analysis_id,
                token
            );

            setGapAnalysis(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleRoadmap = async () => {
        if (!analysis) {
            setMessage("Please analyze a job first.");
            return;
        }

        setMessage("");

        try {
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

    const handleResumeImprovement = async () => {
        if (!analysis) {
            setMessage("Please analyze a job first.");
            return;
        }

        setMessage("");

        try {
            const data = await getResumeImprovements(
                analysis.analysis_id,
                token
            );

            setResumeImprovement(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleAnalyze = async () => {
        if (!jobTitle || !jobDescription) {
            setMessage("Please enter job title and job description.");
            return;
        }

        if (!resumeId) {
            setMessage("Please upload your resume first.");
            return;
        }

        setMessage("");

        try {
            const data = await analyzeJob(
                resumeId,
                jobTitle,
                jobDescription,
                token
            );

            setAnalysis(data);
            setGapAnalysis(null);
            setMessage("Analysis completed successfully!");
        } catch (error) {
            setMessage(error.message);
        }
    };

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
                `Resume uploaded successfully. Resume ID: ${data.resume_id}`
            );
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.reload();
    };

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div>
                    <h1>Career Copilot</h1>
                    <p>Your AI-powered career assistant</p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <main className="dashboard-content">

                <section className="welcome-card">
                    <h2>Welcome back 👋</h2>

                    <p>
                        Upload your resume and enter a job description
                        to analyze your career match.
                    </p>
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
                />

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

                {analysis && (
                    <AnalysisResult
                        analysis={analysis}
                        onGapAnalysis={handleGapAnalysis}
                    />
                )}

                {gapAnalysis && (
                    <GapAnalysis
                        gapAnalysis={gapAnalysis}
                    />
                )}

                <div className="analysis-actions">

                    {analysis && (
                        <button
                            className="action-button"
                            onClick={handleRoadmap}
                        >
                            Generate 14-Day Career Roadmap
                        </button>
                    )}

                    {analysis && (
                        <button
                            className="action-button"
                            onClick={handleResumeImprovement}
                        >
                            View Resume Improvement Suggestions
                        </button>
                    )}

                </div>

                {roadmap && (
                    <Roadmap roadmap={roadmap} />
                )}

                {resumeImprovement && (
                    <ResumeImprovement
                        improvements={resumeImprovement}
                    />
                )}

            </main>
        </div>
    );
}

export default Dashboard;