import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";

const UPCOMING = [
  {
    id: 1,
    doctor: "Dr. Robert Chen",
    specialty: "Cardiologist",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces",
    date: "Sunday, March 30",
    time: "10:00 AM",
    duration: "30 min",
    type: "Video Call",
    status: "confirmed",
    location: "CareLink Video",
  },
  {
    id: 2,
    doctor: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces",
    date: "Saturday, April 12",
    time: "2:30 PM",
    duration: "45 min",
    type: "In-Person",
    status: "pending",
    location: "Skin & Wellness Clinic",
  },
];

const PAST = [
  {
    id: 3,
    doctor: "Dr. Robert Chen",
    specialty: "Cardiologist",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces",
    date: "Saturday, February 15",
    time: "11:00 AM",
    duration: "30 min",
    type: "Video Call",
    status: "completed",
    notes: "BP controlled. Continue current medications.",
  },
  {
    id: 4,
    doctor: "Dr. James Wilson",
    specialty: "General Practice",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces",
    date: "Monday, January 20",
    time: "9:00 AM",
    duration: "20 min",
    type: "In-Person",
    status: "completed",
    notes: "Annual checkup. All vitals normal.",
  },
];

const CALENDAR_DAYS = [
  { day: "Mon", date: 24 }, { day: "Tue", date: 25 }, { day: "Wed", date: 26 },
  { day: "Thu", date: 27, today: true }, { day: "Fri", date: 28 },
  { day: "Sat", date: 29 }, { day: "Sun", date: 30, hasAppt: true },
];

const AVAILABLE_SLOTS = ["9:00 AM", "10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];

function Sidebar({ navigate }) {
  return (
    <aside className="bk-sidebar">
      <div className="bk-sidebar__logo">CareLink</div>
      <nav className="bk-sidebar__nav">
        <button className="bk-nav-item" onClick={() => navigate("/dashboard")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </button>
        <button className="bk-nav-item" onClick={() => navigate("/conversations")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Chats
        </button>
        <button className="bk-nav-item" onClick={() => navigate("/medications")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z"/><path d="M7 10l7 7"/>
          </svg>
          Medications
        </button>
        <button className="bk-nav-item" onClick={() => navigate("/doctors")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          My Doctors
        </button>
        <button className="bk-nav-item bk-nav-item--active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Bookings
        </button>
        <button className="bk-nav-item" onClick={() => navigate("/profile")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </button>
      </nav>
    </aside>
  );
}

function ApptCard({ appt, past }) {
  const navigate = useNavigate();
  return (
    <div className={`appt-card ${past ? "appt-card--past" : ""}`}>
      <div className="appt-card__date-badge">
        <div className="appt-date-num">{appt.date.split(" ")[2]}</div>
        <div className="appt-date-month">{appt.date.split(" ")[1].replace(",", "")}</div>
      </div>
      <img src={appt.avatar} alt={appt.doctor} className="appt-avatar" />
      <div className="appt-info">
        <div className="appt-doctor">{appt.doctor}</div>
        <div className="appt-spec">{appt.specialty}</div>
        <div className="appt-meta">
          <span className="appt-time-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {appt.time} · {appt.duration}
          </span>
          <span className={`appt-type-tag appt-type-tag--${appt.type === "Video Call" ? "video" : "person"}`}>
            {appt.type === "Video Call" ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
            )}
            {appt.type}
          </span>
        </div>
        {appt.notes && <div className="appt-notes">{appt.notes}</div>}
      </div>
      <div className="appt-card__actions">
        <span className={`appt-status appt-status--${appt.status}`}>
          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
        </span>
        {!past && (
          <button className="appt-join-btn" onClick={() => navigate("/conversations")}>
            {appt.type === "Video Call" ? "Join" : "View"}
          </button>
        )}
        {past && (
          <button className="appt-rebook-btn" onClick={() => navigate("/bookings")}>
            Rebook
          </button>
        )}
      </div>
    </div>
  );
}

function Bookings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("upcoming");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);

  return (
    <div className="bk-page">
      <Sidebar navigate={navigate} />

      <div className="bk-main">
        {/* Mobile header */}
        <div className="bk-mobile-header">
          <button className="bk-back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="bk-mobile-title">Bookings</h1>
          <div style={{ width: 36 }} />
        </div>

        <div className="bk-content">
          <div className="bk-header">
            <div>
              <h1 className="bk-title">Appointments</h1>
              <p className="bk-subtitle">Manage your medical visits</p>
            </div>
            <button className="bk-new-btn" onClick={() => setShowBookModal(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Booking
            </button>
          </div>

          {/* Mini calendar strip */}
          <div className="cal-strip">
            <div className="cal-strip__title">March 2026</div>
            <div className="cal-days">
              {CALENDAR_DAYS.map((d, i) => (
                <div key={i} className={`cal-day ${d.today ? "cal-day--today" : ""} ${d.hasAppt ? "cal-day--has-appt" : ""}`}>
                  <span className="cal-day-name">{d.day}</span>
                  <span className="cal-day-num">{d.date}</span>
                  {d.hasAppt && <span className="cal-dot" />}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bk-stats">
            <div className="bk-stat-card bk-stat-card--green">
              <div className="bk-stat-val">{UPCOMING.length}</div>
              <div className="bk-stat-label">Upcoming</div>
            </div>
            <div className="bk-stat-card bk-stat-card--blue">
              <div className="bk-stat-val">{PAST.length}</div>
              <div className="bk-stat-label">Completed</div>
            </div>
            <div className="bk-stat-card bk-stat-card--yellow">
              <div className="bk-stat-val">{UPCOMING.filter((a) => a.status === "pending").length}</div>
              <div className="bk-stat-label">Pending</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bk-tabs">
            {["upcoming", "past"].map((t) => (
              <button
                key={t}
                className={`bk-tab ${tab === t ? "bk-tab--active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "upcoming" ? `Upcoming (${UPCOMING.length})` : `Past (${PAST.length})`}
              </button>
            ))}
          </div>

          {/* Appointments */}
          <div className="appt-list">
            {tab === "upcoming" ? (
              UPCOMING.map((a) => <ApptCard key={a.id} appt={a} past={false} />)
            ) : (
              PAST.map((a) => <ApptCard key={a.id} appt={a} past={true} />)
            )}
          </div>
        </div>
      </div>

      {/* New Booking Modal */}
      {showBookModal && (
        <div className="bk-modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bk-modal__handle" />
            <div className="bk-modal__header">
              <h2 className="bk-modal__title">Book Appointment</h2>
              <button className="bk-modal__close" onClick={() => setShowBookModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="bk-modal__body">
              <div className="bk-modal__label">Select Doctor</div>
              <div className="bk-modal-doctors">
                {[
                  { name: "Dr. Robert Chen", spec: "Cardiologist", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces" },
                  { name: "Dr. Sarah Chen", spec: "Dermatologist", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces" },
                  { name: "Dr. James Wilson", spec: "General Practice", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces" },
                ].map((d, i) => (
                  <div key={i} className="bk-modal-doc-chip">
                    <img src={d.avatar} alt={d.name} className="bk-modal-doc-avatar" />
                    <div>
                      <div className="bk-modal-doc-name">{d.name}</div>
                      <div className="bk-modal-doc-spec">{d.spec}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bk-modal__label">Available Slots — Mar 30</div>
              <div className="bk-slots">
                {AVAILABLE_SLOTS.map((slot, i) => (
                  <button
                    key={i}
                    className={`bk-slot ${selectedSlot === slot ? "bk-slot--selected" : ""}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="bk-modal__label">Appointment Type</div>
              <div className="bk-type-row">
                <button className="bk-type-btn bk-type-btn--active">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                  </svg>
                  Video Call
                </button>
                <button className="bk-type-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  In-Person
                </button>
              </div>

              <button
                className="bk-confirm-btn"
                disabled={!selectedSlot}
                onClick={() => setShowBookModal(false)}
              >
                Confirm Booking {selectedSlot ? `· ${selectedSlot}` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;