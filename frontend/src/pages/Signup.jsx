import { useSignup } from "./useSignup";
import "./Signup.css";
import { Link } from "react-router-dom";


const ENDPOINT = "https://carelink-5qts.onrender.com/patient/signup";

function Signup() {
  const {
    formData,
    uiState,
    errors,
    handleChange,
    toggleUi,
    handleSubmit,
    validateField,
    passwordStrength,
    setAgreed,
  } = useSignup(ENDPOINT);

  const { showPassword, agreed, isLoading, showSuccess } = uiState;

  return (
    <div className="signup-page">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <nav className="navbar">
        <a href="/" className="navbar-logo">
          CareLink
        </a>
        <div className="navbar-links">
          <a href="#">Features</a>
          <a href="#">Support</a>
          <a href="#">About</a>
        </div>
        <a href="login" className="btn-login-nav">
          Log In
        </a>
      </nav>

      <main className="signup-content">
        <div className="signup-card">
          {showSuccess && (
            <div className="success-overlay">
              <div className="success-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="success-title">Account created!</h2>
              <p className="success-text">Redirecting to your dashboard...</p>
            </div>
          )}

          <div className="signup-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Start accessing healthcare in minutes
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              {["firstName", "lastName"].map((field) => (
                <div className="form-group" key={field}>
                  <label className="form-label">
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
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
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name={field}
                      className={`form-input ${validateField(field, formData[field]) ? "valid" : ""} ${errors[field] ? "invalid" : ""}`}
                      placeholder={field === "firstName" ? "John" : "Doe"}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                  {errors[field] && (
                    <div className="field-error">{errors[field]}</div>
                  )}
                </div>
              ))}
            </div>

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
                  name="email"
                  className={`form-input ${validateField("email", formData.email) ? "valid" : ""} ${errors.email ? "invalid" : ""}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
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
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  className={`form-input ${validateField("phone", formData.phone) ? "valid" : ""} ${errors.phone ? "invalid" : ""}`}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && (
                <div className="field-error">{errors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
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
                  name="password"
                  className={`form-input ${errors.password ? "invalid" : ""}`}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => toggleUi("showPassword")}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div
                    className={`password-strength-bar ${passwordStrength}`}
                  ></div>
                  <div className="password-strength-text">
                    Strength: {passwordStrength}
                  </div>
                </div>
              )}
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="checkbox-group">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <div className="checkbox-custom">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <span className="checkbox-label">
                I agree to the <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>
              </span>
            </div>
            {errors.agreed && (
              <div className="field-error">{errors.agreed}</div>
            )}

            {/* Error banner for API failures */}
            {errors.submit && (
              <div
                className="field-error"
                style={{
                  textAlign: "center",
                  background: "#fee2e2",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              >
                {errors.submit}
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Creating account...
                </>
              ) : (
                "Create Account"
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

          <p className="login-prompt">
            Already have an account?{" "}
            <a href="#login" className="login-link">
              Log In
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
