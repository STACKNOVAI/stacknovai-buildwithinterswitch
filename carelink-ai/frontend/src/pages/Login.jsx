import { useState, useEffect } from 'react'

const css = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #F0FDF4;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Animated background blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    z-index: 0;
  }

  .blob-1 {
    width: 400px;
    height: 400px;
    background: rgba(22, 163, 74, 0.2);
    top: -100px;
    left: -100px;
    animation: blobMove1 20s ease-in-out infinite;
  }

  .blob-2 {
    width: 350px;
    height: 350px;
    background: rgba(22, 163, 74, 0.15);
    bottom: -50px;
    right: -100px;
    animation: blobMove2 25s ease-in-out infinite;
  }

  .blob-3 {
    width: 300px;
    height: 300px;
    background: rgba(22, 163, 74, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: blobMove3 18s ease-in-out infinite;
  }

  @keyframes blobMove1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(50px, 50px) scale(1.1); }
    50% { transform: translate(30px, 80px) scale(0.95); }
    75% { transform: translate(-30px, 40px) scale(1.05); }
  }

  @keyframes blobMove2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-40px, -30px) scale(1.05); }
    50% { transform: translate(-60px, 20px) scale(0.9); }
    75% { transform: translate(20px, -40px) scale(1.1); }
  }

  @keyframes blobMove3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    33% { transform: translate(-40%, -60%) scale(1.15); }
    66% { transform: translate(-60%, -40%) scale(0.85); }
  }

  /* Navbar */
  .navbar {
    position: relative;
    z-index: 10;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-bottom: 1px solid #E5E7EB;
  }

  .navbar-logo {
    font-family: 'Instrument Serif', serif;
    font-size: 24px;
    color: #16A34A;
    text-decoration: none;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .navbar-links a {
    color: #6B7280;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }

  .navbar-links a:hover {
    color: #0A1628;
  }

  .btn-signup {
    background: #16A34A;
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    transition: all 0.2s;
  }

  .btn-signup:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
  }

  /* Main content */
  .login-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    position: relative;
    z-index: 1;
  }

  .login-card {
    background: white;
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(30px);
    animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
  }

  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-icon {
    width: 64px;
    height: 64px;
    background: #F0FDF4;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: #16A34A;
    animation: iconPulse 3s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .login-title {
    font-family: 'Instrument Serif', serif;
    font-size: 32px;
    text-align: center;
    margin-bottom: 8px;
    color: #0A1628;
  }

  .login-subtitle {
    font-size: 15px;
    color: #6B7280;
    text-align: center;
    margin-bottom: 32px;
  }

  /* Form */
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  .form-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .input-wrapper {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 1.5px solid #E5E7EB;
    border-radius: 12px;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.2s;
    background: #FAFAFA;
  }

  .form-input:focus {
    outline: none;
    border-color: #16A34A;
    background: white;
    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
  }

  .form-input::placeholder {
    color: #9CA3AF;
  }

  .password-toggle {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9CA3AF;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .password-toggle:hover {
    color: #6B7280;
  }

  .form-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }

  .forgot-link {
    color: #16A34A;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #15803D;
  }

  /* Submit button */
  .btn-submit {
    width: 100%;
    padding: 16px;
    background: #16A34A;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-submit:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
  }

  .btn-submit:active:not(:disabled) {
    transform: scale(0.98);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Error state */
  .error-message {
    background: #FEF2F2;
    color: #DC2626;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .login-card.shake {
    animation: shake 0.5s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    60% { transform: translateX(-10px); }
    80% { transform: translateX(10px); }
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 28px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: #E5E7EB;
  }

  .divider-text {
    font-size: 12px;
    font-weight: 500;
    color: #9CA3AF;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Social buttons */
  .social-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }

  .btn-social {
    padding: 14px 20px;
    border: 1.5px solid #E5E7EB;
    border-radius: 12px;
    background: white;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.2s;
    color: #0A1628;
  }

  .btn-social:hover {
    border-color: #16A34A;
    background: #F0FDF4;
  }

  /* Sign up link */
  .signup-prompt {
    text-align: center;
    font-size: 14px;
    color: #6B7280;
  }

  .signup-link {
    color: #16A34A;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;
    transition: color 0.2s;
  }

  .signup-link:hover {
    color: #15803D;
  }

  /* Trust badges */
  .trust-badges {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 32px;
    opacity: 0;
    animation: fadeIn 0.5s ease 0.7s forwards;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #6B7280;
  }

  .trust-badge svg {
    color: #16A34A;
  }

  /* Footer */
  .footer {
    position: relative;
    z-index: 1;
    background: white;
    padding: 20px 24px;
    border-top: 1px solid #E5E7EB;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-logo {
    font-family: 'Instrument Serif', serif;
    font-size: 20px;
    color: #16A34A;
  }

  .footer-links {
    display: flex;
    gap: 24px;
  }

  .footer-links a {
    font-size: 13px;
    color: #6B7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: #16A34A;
  }

  .footer-copyright {
    font-size: 13px;
    color: #16A34A;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .navbar-links {
      display: none;
    }

    .login-card {
      padding: 32px 24px;
    }

    .social-buttons {
      grid-template-columns: 1fr;
    }

    .trust-badges {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .footer-inner {
      flex-direction: column;
      text-align: center;
    }

    .footer-links {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid email or password')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      window.location.href = '#dashboard'
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <style>{css}</style>

      {/* Animated background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="navbar-logo">CareLink</a>
        <div className="navbar-links">
          <a href="#">Features</a>
          <a href="#">Support</a>
          <a href="#">About</a>
        </div>
        <a href="#signup" className="btn-signup">Sign Up</a>
      </nav>

      {/* Main content */}
      <main className="login-content">
        <div className={`login-card ${shake ? 'shake' : ''}`}>
          <div className="login-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Securely access your personalized health curator</p>

          {error && (
            <div className="error-message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" className="forgot-link">Forgot Password?</a>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or continue with</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-buttons">
            <button className="btn-social">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="btn-social">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="signup-prompt">
            New to CareLink?
            <a href="#signup" className="signup-link">Sign Up</a>
          </p>

          <div className="trust-badges">
            <div className="trust-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              HIPAA COMPLIANT
            </div>
            <div className="trust-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              END-TO-END ENCRYPTED
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">CareLink</div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
          <div className="footer-copyright">
            © 2024 CareLink Health. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login
