import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      onLogin();
    } catch (error) {
      setMessage("Unable to connect to backend.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="brand-icon">CC</div>

          <h1>Career Copilot</h1>

          <p>
            AI-powered career analysis
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;