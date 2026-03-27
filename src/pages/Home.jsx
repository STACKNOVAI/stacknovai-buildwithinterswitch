import { useState, useEffect } from "react";
import AINurse from "./AiNurse.jsx";
import "./Home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow =   "";
    };
  }, [showModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="home-page">
      {/* Sidebar for desktop */}
      <aside className="sidebar">
        <div className="sidebar-logo">CareLink</div>
        <nav className="sidebar-nav">
          <button className="sidebar-item active">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <button className="sidebar-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Chats
          </button>
          <button className="sidebar-item">
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
            Profile
          </button>
          <button
            className="sidebar-item ai-nurse"
            onClick={() => setShowModal(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            AI Nurse
          </button>
        </nav>
      </aside>

      {/* Top Navbar (mobile) */}
      <nav className="navbar">
        <button className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="navbar-logo">CareLink</span>
        <div className="navbar-spacer"></div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Health Talk Feed */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Health Talk Feed</h2>
            <a className="section-link">View all</a>
          </div>
          <div className="health-talk-grid">
            <div className="health-talk-card">
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces"
                alt="Dr. Smith"
                className="doctor-avatar"
              />
              <div className="doctor-name-row">
                <span className="doctor-name">Dr. Smith</span>
                <svg
                  className="verified-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="doctor-quote">
                "Hydration is key to kidney health."
              </p>
              <button className="btn-read-more">Read more</button>
            </div>
            <div className="health-talk-card">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces"
                alt="Dr. Sarah"
                className="doctor-avatar"
              />
              <div className="doctor-name-row">
                <span className="doctor-name">Dr. Sarah</span>
                <svg
                  className="verified-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="doctor-quote">
                "15 min walking reduces daily stress."
              </p>
              <button className="btn-read-more">Read more</button>
            </div>
            <div className="health-talk-card">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces"
                alt="Dr. Chen"
                className="doctor-avatar"
              />
              <div className="doctor-name-row">
                <span className="doctor-name">Dr. Chen</span>
                <svg
                  className="verified-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="doctor-quote">
                "Sleep 7-8 hours for heart health."
              </p>
              <button className="btn-read-more">Read more</button>
            </div>
          </div>
        </section>

        {/* My Medications */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">My Medications</h2>
            <a className="section-link">Track</a>
          </div>
          <div className="medication-card">
            <div className="medication-content">
              <div className="medication-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z" />
                  <path d="M7 10l7 7" />
                </svg>
              </div>
              <div className="medication-info">
                <div className="medication-name">Lisinopril</div>
                <div className="medication-dosage">
                  10mg • Daily after breakfast
                </div>
              </div>
              <div className="medication-time">
                <div className="medication-time-value">08:00 AM</div>
                <div className="medication-time-label">Next Dose</div>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </section>

        {/* My Doctors */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">My Doctors</h2>
            <a className="section-link">Bookings</a>
          </div>
          <div className="doctor-card">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces"
              alt="Dr. Robert Chen"
              className="doctor-card-avatar"
            />
            <div className="doctor-card-info">
              <div className="doctor-card-name">Dr. Robert Chen</div>
              <div className="doctor-card-specialty">
                Cardiologist • City Hospital
              </div>
            </div>
            <button className="btn-consult">Consult</button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (mobile) */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeNav === "chats" ? "active" : ""}`}
          onClick={() => setActiveNav("chats")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span>Chats</span>
        </button>
        <div className="ai-nurse-btn">
          <button
            className="ai-nurse-circle"
            onClick={() => setShowModal(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </button>
          <div className="ai-nurse-label">AI NURSE</div>
        </div>
        <button
          className={`nav-item ${activeNav === "profile" ? "active" : ""}`}
          onClick={() => setActiveNav("profile")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </button>
      </nav>

      {/* AI Nurse Modal */}
      {showModal && (
        <AINurse
          onClose={() => setShowModal(false)}
          onProceed={(result) => {
            setShowModal(false);
            onProceedToDoctor?.(result);
          }}
        />
      )}
    </div>
  );
}

export default Home;
