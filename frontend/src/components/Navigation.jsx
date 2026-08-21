import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <aside className="navigation">

            <div className="navigation-brand">
                <div className="brand-icon">
                    CC
                </div>

                <div>
                    <h2>Career Copilot</h2>
                    <p>AI Career Assistant</p>
                </div>
            </div>

            <div className="navigation-links">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/new-analysis"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>New Analysis</span>
                </NavLink>

                <NavLink
                    to="/analysis"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>Analysis</span>
                </NavLink>

                <NavLink
                    to="/gap-analysis"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>Gap Analysis</span>
                </NavLink>

                <NavLink
                    to="/roadmap"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>Career Roadmap</span>
                </NavLink>

                <NavLink
                    to="/resume-improvement"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>Resume Improvement</span>
                </NavLink>

            </div>

        </aside>
    );
}

export default Navigation;
