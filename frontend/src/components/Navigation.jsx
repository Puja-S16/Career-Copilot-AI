import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navigation">

            <div className="navigation-brand">
                <div className="brand-icon">CC</div>

                <div>
                    <h2>Career Copilot</h2>
                    <p>AI Career Assistant</p>
                </div>
            </div>

            <div className="navigation-links">

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/new-analysis">
                    New Analysis
                </NavLink>

                <NavLink to="/analysis">
                    Analysis
                </NavLink>

                <NavLink to="/gap-analysis">
                    Gap Analysis
                </NavLink>

                <NavLink to="/roadmap">
                    Career Roadmap
                </NavLink>

                <NavLink to="/resume-improvement">
                    Resume Improvement
                </NavLink>

            </div>

        </nav>
    );
}

export default Navigation;