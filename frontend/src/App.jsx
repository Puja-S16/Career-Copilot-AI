import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/NewAnalysis";
import Analysis from "./pages/Analysis";
import GapAnalysisPage from "./pages/GapAnalysisPage";
import RoadmapPage from "./pages/RoadmapPage";
import ResumeImprovementPage from "./pages/ResumeImprovementPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("access_token")
    );

    if (!isLoggedIn) {
        return (
            <Login
                onLogin={() => setIsLoggedIn(true)}
            />
        );
    }

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/new-analysis"
                    element={<NewAnalysis />}
                />

                <Route
                    path="/analysis"
                    element={<Analysis />}
                />

                <Route
                    path="/gap-analysis"
                    element={<GapAnalysisPage />}
                />

                <Route
                    path="/roadmap"
                    element={<RoadmapPage />}
                />

                <Route
                    path="/resume-improvement"
                    element={<ResumeImprovementPage />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;