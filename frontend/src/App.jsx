import { useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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

            </Routes>
        </BrowserRouter>
    );
}

export default App;