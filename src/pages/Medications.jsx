import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Medications.css";

const MEDICATIONS = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Daily after breakfast",
    time: "08:00 AM",
    category: "Blood Pressure",
    color: "#22C55E",
    taken: true,
    refillDays: 12,
    prescribedBy: "Dr. Robert Chen",
    startDate: "Jan 15, 2025",
    instructions: "Take with water. Avoid potassium supplements.",
  },
  {
    id: 2,
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Daily at bedtime",
    time: "10:00 PM",
    category: "Blood Pressure",
    color: "#3B82F6",
    taken: false,
    refillDays: 12,
    prescribedBy: "Dr. Robert Chen",
    startDate: "Jan 15, 2025",
    instructions: "Can be taken with or without food.",
  },
  {
    id: 3,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    time: "01:00 PM",
    category: "Diabetes",
    color: "#F59E0B",
    taken: false,
    refillDays: 5,
    prescribedBy: "Dr. Sarah Chen",
    startDate: "Feb 1, 2025",
    instructions: "Take with meals to reduce stomach upset.",
  },
  {
    id: 4,
    name: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Daily with lunch",
    time: "12:00 PM",
    category: "Supplement",
    color: "#8B5CF6",
    taken: true,
    refillDays: 45,
    prescribedBy: "Dr. James Wilson",
    startDate: "Dec 10, 2024",
    instructions: "Take with a fatty meal for best absorption.",
  },
];

const LOGS = [
  { date: "Today", items: [
    { name: "Lisinopril 10mg", time: "8:02 AM", status: "taken" },
    { name: "Vitamin D3 2000IU", time: "12:15 PM", status: "taken" },
    { name: "Amlodipine 5mg", time: "10:00 PM", status: "upcoming" },
  ]},
  { date: "Yesterday", items: [
    { name: "Lisinopril 10mg", time: "8:10 AM", status: "taken" },
    { name: "Metformin 500mg", time: "1:30 PM", status: "missed" },
    { name: "Vitamin D3 2000IU", time: "12:00 PM", status: "taken" },
    { name: "Amlodipine 5mg", time: "10:12 PM", status: "taken" },
  ]},
];

function MedCard({ med, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`med-card ${med.taken ? "med-card--taken" : ""}`}>
      <div className="med-card__top" onClick={() => setExpanded(!expanded)}>
        <div className="med-icon" style={{ background: med.color + "18" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={med.color} strokeWidth="2">
            <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z" />
            <path d="M7 10l7 7" />
          </svg>
        </div>
        <div className="med-info">
          <div className="med-name">{med.name}</div>
          <div className="med-meta">{med.dosage} · {med.frequency}</div>
          <span className="med-category" style={{ background: med.color + "18", color: med.color }}>
            {med.category}
          </span>
        </div>
        <div className="med-right">
          <div className="med-time">{med.time}</div>
          <button
            className={`med-check ${med.taken ? "med-check--done" : ""}`}
            onClick={(e) => { e.stopPropagation(); onToggle(med.id); }}
          >
            {med.taken ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="med-details">
          <div className="med-detail-row">
            <span className="med-detail-label">Prescribed by</span>
            <span className="med-detail-val">{med.prescribedBy}</span>
          </div>
          <div className="med-detail-row">
            <span className="med-detail-label">Start date</span>
            <span className="med-detail-val">{med.startDate}</span>
          </div>
          <div className="med-detail-row">
            <span className="med-detail-label">Instructions</span>
            <span className="med-detail-val">{med.instructions}</span>
          </div>
          {med.refillDays <= 14 && (
            <div className={`refill-alert ${med.refillDays <= 5 ? "refill-alert--urgent" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Refill needed in {med.refillDays} days
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Medications() {
  const navigate = useNavigate();
  const [meds, setMeds] = useState(MEDICATIONS);
  const [tab, setTab] = useState("today");

  const toggleTaken = (id) => {
    setMeds((prev) => prev.map((m) => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const takenCount = meds.filter((m) => m.taken).length;
  const adherence = Math.round((takenCount / meds.length) * 100);

  return (
    <div className="med-page">
      {/* Sidebar */}
      <aside className="med-sidebar">
        <div className="med-sidebar__logo">CareLink</div>
        <nav className="med-sidebar__nav">
          <button className="med-nav-item" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <button className="med-nav-item" onClick={() => navigate("/conversations")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Chats
          </button>
          <button className="med-nav-item med-nav-item--active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z" /><path d="M7 10l7 7" />
            </svg>
            Medications
          </button>
          <button className="med-nav-item" onClick={() => navigate("/doctors")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            My Doctors
          </button>
          <button className="med-nav-item" onClick={() => navigate("/bookings")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Bookings
          </button>
          <button className="med-nav-item" onClick={() => navigate("/profile")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="med-main">
        {/* Mobile header */}
        <div className="med-mobile-header">
          <button className="med-back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="med-mobile-title">Medications</h1>
          <div style={{ width: 36 }} />
        </div>

        <div className="med-content">
          {/* Header */}
          <div className="med-header">
            <div>
              <h1 className="med-title">My Medications</h1>
              <p className="med-subtitle">Track your daily doses</p>
            </div>
            <button className="med-add-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Medication
            </button>
          </div>

          {/* Stats */}
          <div className="med-stats">
            <div className="med-stat-card">
              <div className="med-stat-value" style={{ color: "#22C55E" }}>{takenCount}/{meds.length}</div>
              <div className="med-stat-label">Taken Today</div>
            </div>
            <div className="med-stat-card">
              <div className="med-stat-value" style={{ color: "#3B82F6" }}>{adherence}%</div>
              <div className="med-stat-label">Adherence</div>
            </div>
            <div className="med-stat-card">
              <div className="med-stat-value" style={{ color: "#F59E0B" }}>
                {meds.filter((m) => m.refillDays <= 14).length}
              </div>
              <div className="med-stat-label">Refills Soon</div>
            </div>
          </div>

          {/* Adherence bar */}
          <div className="adherence-bar-wrap">
            <div className="adherence-bar-label">
              <span>Today's Progress</span>
              <span>{takenCount} of {meds.length} taken</span>
            </div>
            <div className="adherence-bar">
              <div className="adherence-fill" style={{ width: `${adherence}%` }} />
            </div>
          </div>

          {/* Tabs */}
          <div className="med-tabs">
            {["today", "log"].map((t) => (
              <button
                key={t}
                className={`med-tab ${tab === t ? "med-tab--active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "today" ? "Today's Medications" : "History Log"}
              </button>
            ))}
          </div>

          {/* Content */}
          {tab === "today" ? (
            <div className="med-list">
              {meds.map((med) => (
                <MedCard key={med.id} med={med} onToggle={toggleTaken} />
              ))}
            </div>
          ) : (
            <div className="med-log">
              {LOGS.map((day, i) => (
                <div key={i} className="log-day">
                  <div className="log-day-label">{day.date}</div>
                  {day.items.map((item, j) => (
                    <div key={j} className={`log-item log-item--${item.status}`}>
                      <div className={`log-dot log-dot--${item.status}`} />
                      <div className="log-info">
                        <div className="log-name">{item.name}</div>
                        <div className="log-time">{item.time}</div>
                      </div>
                      <span className={`log-badge log-badge--${item.status}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Medications;