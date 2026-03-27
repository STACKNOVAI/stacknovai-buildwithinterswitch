import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctors.css";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Robert Chen",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces",
    online: true,
    rating: 4.9,
    reviews: 312,
    experience: "14 yrs",
    nextAppt: "Mar 30, 2026",
    languages: ["English", "Mandarin"],
    about: "Specializing in hypertension, heart failure, and preventive cardiology. Dr. Chen has performed over 3,000 cardiac procedures.",
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    hospital: "Skin & Wellness Clinic",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces",
    online: false,
    rating: 4.8,
    reviews: 198,
    experience: "9 yrs",
    nextAppt: "Apr 12, 2026",
    languages: ["English", "French"],
    about: "Expertise in acne, eczema, psoriasis, and cosmetic dermatology. Committed to evidence-based skin care.",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "General Practice",
    hospital: "HealthFirst Medical Centre",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces",
    online: true,
    rating: 4.7,
    reviews: 425,
    experience: "18 yrs",
    nextAppt: null,
    languages: ["English"],
    about: "Primary care physician with focus on preventive health, chronic disease management, and patient education.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="star-row">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function DoctorCard({ doc }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="doc-card">
      <div className="doc-card__main">
        <div className="doc-avatar-wrap">
          <img src={doc.avatar} alt={doc.name} className="doc-avatar" />
          {doc.online && <span className="doc-online-dot" />}
        </div>
        <div className="doc-info">
          <div className="doc-name">{doc.name}</div>
          <div className="doc-specialty">{doc.specialty}</div>
          <div className="doc-hospital">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            {doc.hospital}
          </div>
          <div className="doc-meta">
            <StarRating rating={doc.rating} />
            <span className="doc-rating">{doc.rating}</span>
            <span className="doc-reviews">({doc.reviews})</span>
            <span className="doc-exp">{doc.experience} exp.</span>
          </div>
        </div>
        <div className="doc-actions">
          <button className="doc-btn-chat" onClick={() => navigate("/conversations")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </button>
          <button className="doc-btn-book" onClick={() => navigate("/bookings")}>Book</button>
        </div>
      </div>

      <button className="doc-expand-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>

      {expanded && (
        <div className="doc-expanded">
          <p className="doc-about">{doc.about}</p>
          <div className="doc-tags">
            {doc.languages.map((l, i) => (
              <span key={i} className="doc-tag">{l}</span>
            ))}
            <span className="doc-tag doc-tag--exp">{doc.experience} experience</span>
          </div>
          {doc.nextAppt && (
            <div className="doc-next-appt">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Next appointment: <strong>{doc.nextAppt}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Doctors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = DOCTORS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="docs-page">
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar__logo">CareLink</div>
        <nav className="docs-sidebar__nav">
          <button className="docs-nav-item" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <button className="docs-nav-item" onClick={() => navigate("/conversations")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Chats
          </button>
          <button className="docs-nav-item" onClick={() => navigate("/medications")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z"/><path d="M7 10l7 7"/>
            </svg>
            Medications
          </button>
          <button className="docs-nav-item docs-nav-item--active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            My Doctors
          </button>
          <button className="docs-nav-item" onClick={() => navigate("/bookings")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Bookings
          </button>
          <button className="docs-nav-item" onClick={() => navigate("/profile")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="docs-main">
        {/* Mobile header */}
        <div className="docs-mobile-header">
          <button className="docs-back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="docs-mobile-title">My Doctors</h1>
          <div style={{ width: 36 }} />
        </div>

        <div className="docs-content">
          <div className="docs-header">
            <div>
              <h1 className="docs-title">My Doctors</h1>
              <p className="docs-subtitle">{DOCTORS.length} doctors in your care team</p>
            </div>
            <button className="docs-add-btn" onClick={() => navigate("/find-doctor")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Find Doctor
            </button>
          </div>

          {/* Search */}
          <div className="docs-search-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="docs-search"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Stat strip */}
          <div className="docs-stat-strip">
            <div className="docs-stat">
              <span className="docs-stat-val">{DOCTORS.filter((d) => d.online).length}</span>
              <span className="docs-stat-label">Online Now</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-val">{DOCTORS.filter((d) => d.nextAppt).length}</span>
              <span className="docs-stat-label">Upcoming Appts</span>
            </div>
            <div className="docs-stat">
              <span className="docs-stat-val">{DOCTORS.length}</span>
              <span className="docs-stat-label">Total Doctors</span>
            </div>
          </div>

          {/* Doctor list */}
          <div className="docs-list">
            {filtered.length === 0 ? (
              <div className="docs-empty">No doctors found matching "{search}"</div>
            ) : (
              filtered.map((doc) => <DoctorCard key={doc.id} doc={doc} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;