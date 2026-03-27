import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Conversations.css";

// ─── Dummy Data ───────────────────────────────────────────────────
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Robert Chen",
    specialty: "Cardiologist",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces",
    online: true,
    lastSeen: "Active now",
    aiDiagnosis: {
      symptoms: ["persistent headaches", "elevated BP", "dizziness"],
      urgency: "high",
      specialty: "Cardiology",
    },
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces",
    online: false,
    lastSeen: "2 hours ago",
    aiDiagnosis: null,
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "General Practice",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces",
    online: true,
    lastSeen: "Active now",
    aiDiagnosis: null,
  },
];

const INITIAL_MESSAGES = {
  1: [
    {
      id: 1,
      from: "system",
      text: "AI Nurse assessment shared with Dr. Robert Chen",
      time: "10:02 AM",
    },
    {
      id: 2,
      from: "doctor",
      text: "Good morning! I've reviewed the AI Nurse assessment. Your symptoms — persistent headaches, elevated blood pressure, and dizziness — are concerning and warrant immediate attention.",
      time: "10:03 AM",
    },
    {
      id: 3,
      from: "doctor",
      text: "Can you tell me how long you've been experiencing these symptoms? And has anyone in your family had heart disease or high blood pressure?",
      time: "10:04 AM",
    },
    {
      id: 4,
      from: "patient",
      text: "It's been about 2 weeks. My father had hypertension.",
      time: "10:06 AM",
    },
    {
      id: 5,
      from: "doctor",
      text: "Thank you. Given your family history and current readings, I'm going to prescribe Lisinopril 10mg once daily and Amlodipine 5mg once daily. I've sent the prescription to your account.",
      time: "10:08 AM",
    },
    {
      id: 6,
      from: "doctor",
      text: "Please monitor your blood pressure daily using a home monitor and reduce sodium intake. I'd like to see you again in 4 weeks. Do you have any questions?",
      time: "10:08 AM",
    },
  ],
  2: [
    {
      id: 1,
      from: "doctor",
      text: "Hello! How can I help you today?",
      time: "Yesterday",
    },
  ],
  3: [],
};

// ─── Chat Bubble ──────────────────────────────────────────────────
function Bubble({ msg }) {
  if (msg.from === "system") {
    return (
      <div className="chat-system-msg">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
          <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
        {msg.text}
      </div>
    );
  }
  return (
    <div className={`chat-bubble-row chat-bubble-row--${msg.from}`}>
      <div className={`chat-bubble chat-bubble--${msg.from}`}>
        <p>{msg.text}</p>
        <span className="chat-time">{msg.time}</span>
      </div>
    </div>
  );
}

// ─── AI Diagnosis Banner ──────────────────────────────────────────
function AIDiagnosisBanner({ diagnosis }) {
  const [visible, setVisible] = useState(true);
  if (!diagnosis || !visible) return null;
  return (
    <div className="ai-banner">
      <div className="ai-banner__inner">
        <div className="ai-banner__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
            <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>
        <div className="ai-banner__content">
          <div className="ai-banner__label">AI Nurse Assessment Shared</div>
          <div className="ai-banner__chips">
            {diagnosis.symptoms.map((s, i) => (
              <span key={i} className="ai-banner__chip">{s}</span>
            ))}
            <span className={`ai-banner__chip ai-banner__chip--urgency ai-banner__chip--${diagnosis.urgency}`}>
              {diagnosis.urgency} urgency
            </span>
          </div>
        </div>
        <button className="ai-banner__close" onClick={() => setVisible(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
function Conversations({ aiResult }) {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(false);
  const bottomRef = useRef(null);

  const currentMsgs = messages[selectedDoctor.id] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMsgs]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "patient",
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedDoctor.id]: [...(prev[selectedDoctor.id] || []), newMsg],
    }));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setShowList(false);
  };

  return (
    <div className="conv-page">
      {/* ── Doctor list panel ── */}
      <aside className={`conv-list ${showList ? "conv-list--visible" : ""}`}>
        <div className="conv-list__header">
          <div className="conv-list__logo">CareLink</div>
          <h2 className="conv-list__title">Conversations</h2>
        </div>
        <div className="conv-list__doctors">
          {DOCTORS.map((doc) => {
            const msgs = messages[doc.id] || [];
            const last = msgs[msgs.length - 1];
            return (
              <button
                key={doc.id}
                className={`conv-doctor-item ${selectedDoctor.id === doc.id ? "conv-doctor-item--active" : ""}`}
                onClick={() => selectDoctor(doc)}
              >
                <div className="conv-doctor-item__avatar-wrap">
                  <img src={doc.avatar} alt={doc.name} className="conv-doctor-item__avatar" />
                  {doc.online && <span className="conv-online-dot" />}
                </div>
                <div className="conv-doctor-item__info">
                  <div className="conv-doctor-item__name">{doc.name}</div>
                  <div className="conv-doctor-item__preview">
                    {last ? last.text.slice(0, 42) + (last.text.length > 42 ? "…" : "") : doc.specialty}
                  </div>
                </div>
                {doc.aiDiagnosis && (
                  <span className="conv-ai-badge">AI</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom nav (desktop sidebar) */}
        <div className="conv-list__nav">
          <button className="conv-list__nav-item" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <button className="conv-list__nav-item" onClick={() => navigate("/medications")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.5 20.5L3.5 13.5C1.5 11.5 1.5 8 3.5 6C5.5 4 9 4 11 6L18 13C20 15 20 18.5 18 20.5C16 22.5 12.5 22.5 10.5 20.5Z" />
              <path d="M7 10l7 7" />
            </svg>
            Medications
          </button>
          <button className="conv-list__nav-item conv-list__nav-item--active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Chats
          </button>
          <button className="conv-list__nav-item" onClick={() => navigate("/profile")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </button>
        </div>
      </aside>

      {/* ── Chat panel ── */}
      <div className="conv-chat">
        {/* Chat header */}
        <div className="conv-chat__header">
          <button className="conv-chat__back" onClick={() => setShowList(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="conv-chat__avatar" />
          <div className="conv-chat__info">
            <div className="conv-chat__name">{selectedDoctor.name}</div>
            <div className={`conv-chat__status ${selectedDoctor.online ? "conv-chat__status--online" : ""}`}>
              {selectedDoctor.online ? "● Active now" : `Last seen ${selectedDoctor.lastSeen}`}
            </div>
          </div>
          <button className="conv-chat__call-btn" title="Video call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>
        </div>

        {/* AI Diagnosis banner */}
        <AIDiagnosisBanner diagnosis={selectedDoctor.aiDiagnosis} />

        {/* Messages */}
        <div className="conv-messages">
          {currentMsgs.length === 0 ? (
            <div className="conv-empty">
              <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="conv-empty__avatar" />
              <div className="conv-empty__name">{selectedDoctor.name}</div>
              <div className="conv-empty__specialty">{selectedDoctor.specialty}</div>
              <p className="conv-empty__hint">Start the conversation — describe your concern or share your AI Nurse assessment.</p>
            </div>
          ) : (
            currentMsgs.map((msg) => <Bubble key={msg.id} msg={msg} />)
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="conv-input-bar">
          <textarea
            className="conv-input"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className={`conv-send-btn ${input.trim() ? "conv-send-btn--active" : ""}`}
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {showList && (
        <div className="conv-list-backdrop" onClick={() => setShowList(false)} />
      )}
    </div>
  );
}

export default Conversations;