import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import GapAnalysisPage from "./pages/GapAnalysisPage";
import RoadmapPage from "./pages/RoadmapPage";
import ResumeImprovementPage from "./pages/ResumeImprovementPage";
import NewAnalysis from "./pages/NewAnalysis";

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
          path="/dashboard"
          element={<Dashboard />}
        />

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
          path="/new-analysis"
          element={<NewAnalysis />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;