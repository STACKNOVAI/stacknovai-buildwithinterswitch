import { Link } from "react-router-dom";
import { useLogin } from "./useLogin"; // Adjust path as needed
import "./Login.css";

const LOGIN_ENDPOINT = "https://carelink-5qts.onrender.com/patient/login";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    shake,
    handleSubmit,
  } = useLogin(LOGIN_ENDPOINT);

  return (
    <div className="login-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          CareLink
        </Link>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <Link to="/support">Support</Link>
          <Link to="/about">About</Link>
        </div>
        <Link to="/signup" className="btn-signup">
          Sign Up
        </Link>
      </nav>

      <main className="login-content">
        <div className={`login-card ${shake ? "shake" : ""}`}>
          <div className="login-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            Securely access your health dashboard
          </p>

          {error && (
            <div className="error-message">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label className="form-label" style={{ marginBottom: 0 }}>
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--primary-color)",
                    textDecoration: "none",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-buttons">
            <button className="btn-social">Google</button>
            <button className="btn-social">Apple</button>
          </div>

          <p className="signup-prompt">
            New to CareLink?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">CareLink</div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <div className="footer-copyright">© 2024 CareLink Health.</div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
