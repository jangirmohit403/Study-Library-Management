import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a small delay
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Study Library Management</h1>
          <p>Admin Login</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-info">Demo Credentials:</p>
          <p className="demo-creds">Username: <strong>admin</strong></p>
          <p className="demo-creds">Password: <strong>1234</strong></p>
          <p className="security-notice">
            ⚠️ Note: This is a frontend-only demo system. The login credentials
            are visible in the source code and should NOT be used in production.
            Always use real backend authentication in production.
          </p>
        </div>
      </div>
    </div>
  );
}
