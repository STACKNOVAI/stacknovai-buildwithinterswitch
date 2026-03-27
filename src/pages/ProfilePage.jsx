import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

/* ── Dummy data ─────────────────────────────────────────────── */
const DUMMY_USER = {
  firstName: "Ademide",
  lastName: "Adedeji",
  email: "ademide.adedeji@gmail.com",
  phone: "+234 801 234 5678",
  dob: "14 March 1993",
  gender: "Male",
  bloodType: "O+",
  weight: "74 kg",
  height: "5′ 11″",
  address: "12 Kofo Abayomi St, Victoria Island, Lagos",
  memberSince: "January 2024",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=faces",
};

const HEALTH_STATS = [
  { label: "Heart Rate", value: "72", unit: "bpm", icon: "❤️", trend: "normal" },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", icon: "🩺", trend: "normal" },
  { label: "Blood Sugar", value: "98", unit: "mg/dL", icon: "🩸", trend: "normal" },
  { label: "BMI", value: "22.4", unit: "kg/m²", icon: "⚖️", trend: "normal" },
];

const RECENT_ACTIVITY = [
  { type: "consultation", label: "Consulted Dr. Robert Chen", date: "2 days ago", icon: "👨‍⚕️" },
  { type: "ai", label: "AI Nurse session — Headache", date: "5 days ago", icon: "🤖" },
  { type: "medication", label: "Lisinopril refill logged", date: "1 week ago", icon: "💊" },
  { type: "consultation", label: "Consulted Dr. Sarah Obi", date: "2 weeks ago", icon: "👩‍⚕️" },
];

const MENU_ITEMS = [
  {
    group: "Account",
    items: [
      { label: "Personal Information", icon: IdCardIcon },
      { label: "Notifications", icon: BellIcon },
      { label: "Privacy & Security", icon: ShieldIcon },
    ],
  },
  {
    group: "Health",
    items: [
      { label: "Medical Records", icon: FileIcon },
      { label: "Insurance Details", icon: ClipboardIcon },
      { label: "Emergency Contacts", icon: PhoneIcon },
    ],
  },
  {
    group: "Support",
    items: [
      { label: "Help Center", icon: HelpIcon },
      { label: "Give Feedback", icon: StarIcon },
    ],
  },
];

/* ── SVG Icon Components ────────────────────────────────────── */
function IdCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M14 9h4M14 12h4M14 15h2" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.05 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
function ProfilePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Pull firstName from localStorage (set during login), fall back to dummy
  const storedName = localStorage.getItem("firstName");
  const user = storedName
    ? { ...DUMMY_USER, firstName: storedName }
    : DUMMY_USER;

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    localStorage.removeItem("firstName");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-logo">CareLink</div>
        <nav className="sidebar-nav">
          <button className="sidebar-item" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <button className="sidebar-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Chats
          </button>
          <button className="sidebar-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </button>
          <button className="sidebar-item ai-nurse" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            AI Nurse
          </button>
        </nav>
      </aside>

      {/* ── Mobile Navbar ────────────────────────────────────── */}
      <nav className="navbar">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="navbar-logo">CareLink</span>
        <button className="edit-btn" aria-label="Edit profile">
          <EditIcon />
        </button>
      </nav>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="profile-content">

        {/* Hero Card */}
        <div className="profile-hero">
          <div className="hero-bg-arc" />
          <div className="avatar-wrapper">
            <img src={user.avatar} alt={fullName} className="profile-avatar" />
            <span className="avatar-badge">✓</span>
          </div>
          <h1 className="profile-name">{fullName}</h1>
          <p className="profile-meta">{user.email}</p>
          <div className="profile-tags">
            <span className="tag tag-green">Blood: {user.bloodType}</span>
            <span className="tag tag-navy">Since {user.memberSince}</span>
          </div>
        </div>

        {/* Health Stats */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Health Stats</h2>
            <span className="section-link">Update</span>
          </div>
          <div className="stats-grid">
            {HEALTH_STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-icon">{s.icon}</span>
                <div className="stat-value">
                  {s.value}
                  <span className="stat-unit">{s.unit}</span>
                </div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-pill">Normal</div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Details */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Personal Details</h2>
            <span className="section-link">Edit</span>
          </div>
          <div className="details-card">
            {[
              { label: "Date of Birth", value: user.dob },
              { label: "Gender", value: user.gender },
              { label: "Phone", value: user.phone },
              { label: "Weight", value: user.weight },
              { label: "Height", value: user.height },
              { label: "Address", value: user.address },
            ].map((d) => (
              <div className="detail-row" key={d.label}>
                <span className="detail-label">{d.label}</span>
                <span className="detail-value">{d.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
            <span className="section-link">View all</span>
          </div>
          <div className="activity-list">
            {RECENT_ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-icon-wrap">{a.icon}</div>
                <div className="activity-info">
                  <div className="activity-label">{a.label}</div>
                  <div className="activity-date">{a.date}</div>
                </div>
                <ChevronRight />
              </div>
            ))}
          </div>
        </section>

        {/* Settings Menu */}
        {MENU_ITEMS.map((group) => (
          <section className="section" key={group.group}>
            <div className="section-header">
              <h2 className="section-title">{group.group}</h2>
            </div>
            <div className="menu-card">
              {group.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button className="menu-row" key={item.label}>
                    <div className="menu-icon-wrap">
                      <Icon />
                    </div>
                    <span className="menu-label">{item.label}</span>
                    <ChevronRight />
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {/* Logout */}
        <div className="logout-wrap">
          <button className="btn-logout" onClick={() => setShowLogoutModal(true)}>
            <LogoutIcon />
            Log Out
          </button>
          <p className="version-text">CareLink v1.0.0</p>
        </div>
      </main>

      {/* ── Mobile Bottom Nav ────────────────────────────────── */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeNav === "chats" ? "active" : ""}`}
          onClick={() => { setActiveNav("chats"); navigate("/dashboard"); }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span>Chats</span>
        </button>
        <div className="ai-nurse-btn">
          <button className="ai-nurse-circle" onClick={() => navigate("/dashboard")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </button>
          <div className="ai-nurse-label">AI NURSE</div>
        </div>
        <button className="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </button>
      </nav>

      {/* ── Logout Confirmation Modal ─────────────────────────── */}
      {showLogoutModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowLogoutModal(false)} />
          <div className="logout-modal">
            <div className="modal-handle" />
            <div className="logout-modal-content">
              <div className="logout-icon-circle">
                <LogoutIcon />
              </div>
              <h3 className="logout-modal-title">Log out?</h3>
              <p className="logout-modal-sub">
                You'll need to sign in again to access your health dashboard.
              </p>
              <button className="btn-confirm-logout" onClick={handleLogout}>
                Yes, Log Out
              </button>
              <button className="btn-cancel-logout" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;