import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added useNavigate

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .fd-page {
    font-family: 'DM Sans', sans-serif;
    background: #F5F5F5;
    min-height: 100vh;
    color: #0A1628;
  }

  /* HEADER */
  .fd-header {
    background: white;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .fd-back {
    width: 40px; height: 40px;
    border: none; background: #F5F5F5;
    border-radius: 50%; display: flex;
    align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
  }

  .fd-back:hover { background: #E5E7EB; }
  .fd-back svg { width: 20px; height: 20px; color: #0A1628; }

  .fd-header-title {
    font-size: 17px; font-weight: 700; color: #0A1628;
  }

  .fd-filter-btn {
    width: 40px; height: 40px;
    border: none; background: #F5F5F5;
    border-radius: 50%; display: flex;
    align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
  }

  .fd-filter-btn:hover { background: #E5E7EB; }
  .fd-filter-btn svg { width: 20px; height: 20px; color: #0A1628; }

  /* AI NURSE SUMMARY */
  .fd-ai-summary {
    margin: 16px;
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    border-radius: 16px;
    padding: 14px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    animation: fadeUp 0.5s ease both;
  }

  .fd-ai-icon {
    width: 36px; height: 36px;
    background: #22C55E;
    border-radius: 10px;
    display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
    font-size: 18px;
  }

  .fd-ai-label {
    font-size: 11px; font-weight: 700;
    color: #16A34A; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 4px;
  }

  .fd-ai-symptoms {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 8px;
  }

  .fd-ai-chip {
    background: white; border: 1px solid #BBF7D0;
    padding: 4px 10px; border-radius: 100px;
    font-size: 12px; color: #0A1628; font-weight: 500;
  }

  .fd-urgency-badge {
    display: inline-flex; align-items: center;
    gap: 4px; padding: 3px 10px;
    border-radius: 100px; font-size: 11px;
    font-weight: 700; margin-left: 8px;
  }

  .urgency-high { background: #FEE2E2; color: #DC2626; }
  .urgency-medium { background: #FEF3C7; color: #D97706; }
  .urgency-low { background: #DCFCE7; color: #16A34A; }

  /* SEARCH */
  .fd-search-wrap {
    padding: 0 16px;
    margin-bottom: 16px;
    animation: fadeUp 0.5s ease 0.1s both;
  }

  .fd-search {
    width: 100%;
    background: white;
    border: 1.5px solid #E5E7EB;
    border-radius: 50px;
    padding: 12px 20px 12px 46px;
    font-size: 14px;
    font-family: inherit;
    color: #0A1628;
    outline: none;
    transition: border-color 0.2s;
    position: relative;
  }

  .fd-search:focus { border-color: #22C55E; }

  .fd-search-icon {
    position: absolute;
    left: 32px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
  }

  .fd-search-box {
    position: relative;
  }

  /* SPECIALTIES */
  .fd-specialties {
    padding: 0 16px;
    display: flex; gap: 8px;
    overflow-x: auto; padding-bottom: 4px;
    margin-bottom: 20px;
    scrollbar-width: none;
    animation: fadeUp 0.5s ease 0.15s both;
  }

  .fd-specialties::-webkit-scrollbar { display: none; }

  .fd-spec-pill {
    padding: 8px 18px;
    border-radius: 100px;
    font-size: 13px; font-weight: 600;
    white-space: nowrap; cursor: pointer;
    border: none; font-family: inherit;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .fd-spec-pill.active {
    background: #22C55E; color: white;
    box-shadow: 0 4px 12px rgba(34,197,94,0.3);
  }

  .fd-spec-pill.inactive {
    background: white; color: #6B7280;
    border: 1.5px solid #E5E7EB;
  }

  .fd-spec-pill.inactive:hover {
    border-color: #22C55E; color: #22C55E;
  }

  /* SECTION HEADER */
  .fd-section-header {
    padding: 0 16px;
    display: flex; align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .fd-section-title {
    font-size: 18px; font-weight: 700; color: #0A1628;
  }

  .fd-available {
    font-size: 13px; font-weight: 600; color: #22C55E;
  }

  /* DOCTOR CARDS */
  .fd-cards {
    padding: 0 16px;
    display: flex; flex-direction: column;
    gap: 16px; padding-bottom: 32px;
  }

  .fd-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: all 0.3s ease;
    animation: fadeUp 0.5s ease both;
    border: 1.5px solid transparent;
  }

  .fd-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
    border-color: rgba(34,197,94,0.2);
  }

  .fd-card-top {
    padding: 20px;
    display: flex; gap: 14px; align-items: flex-start;
  }

  .fd-doc-img-wrap {
    position: relative; flex-shrink: 0;
  }

  .fd-doc-img {
    width: 80px; height: 80px;
    border-radius: 16px; object-fit: cover;
    display: block;
    background: #DCFCE7;
  }

  .fd-online-dot {
    position: absolute;
    bottom: 4px; right: 4px;
    width: 14px; height: 14px;
    background: #22C55E;
    border-radius: 50%;
    border: 2px solid white;
  }

  .fd-doc-info { flex: 1; min-width: 0; }

  .fd-doc-spec {
    font-size: 11px; font-weight: 700;
    color: #22C55E; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 4px;
  }

  .fd-doc-name {
    font-size: 17px; font-weight: 700;
    color: #0A1628; margin-bottom: 6px;
    display: flex; align-items: center; gap: 6px;
  }

  .fd-verified {
    width: 18px; height: 18px; color: #22C55E; flex-shrink: 0;
  }

  .fd-doc-meta {
    display: flex; gap: 12px; flex-wrap: wrap;
  }

  .fd-meta-item {
    display: flex; align-items: center; gap: 4px;
    font-size: 12px; color: #6B7280; font-weight: 500;
  }

  .fd-meta-item svg { width: 14px; height: 14px; }

  .fd-rating {
    display: flex; align-items: center; gap: 4px;
    background: #FFF7ED;
    padding: 4px 10px; border-radius: 100px;
    font-size: 13px; font-weight: 700; color: #D97706;
  }

  .fd-card-bottom {
    padding: 14px 20px;
    border-top: 1px solid #F3F4F6;
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .fd-price-label {
    font-size: 10px; font-weight: 600;
    color: #9CA3AF; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 2px;
  }

  .fd-price {
    font-size: 22px; font-weight: 700; color: #0A1628;
  }

  .fd-price span {
    font-size: 13px; font-weight: 400; color: #6B7280;
  }

  .fd-consult-btn {
    padding: 12px 28px;
    background: #22C55E; color: white;
    border: none; border-radius: 50px;
    font-size: 14px; font-weight: 700;
    font-family: inherit; cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(34,197,94,0.3);
  }

  .fd-consult-btn:hover {
    background: #16A34A;
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(34,197,94,0.4);
  }

  /* RECOMMENDED BADGE */
  .fd-recommended {
    background: #FFF7ED;
    padding: 6px 14px;
    display: flex; align-items: center; gap: 6px;
    border-bottom: 1px solid #FED7AA;
  }

  .fd-recommended-text {
    font-size: 12px; font-weight: 600; color: #D97706;
  }

  /* EMPTY STATE */
  .fd-empty {
    text-align: center; padding: 48px 24px;
    color: #6B7280;
  }

  .fd-empty-icon { font-size: 48px; margin-bottom: 12px; }
  .fd-empty-title { font-size: 16px; font-weight: 700; color: #0A1628; margin-bottom: 8px; }
  .fd-empty-sub { font-size: 14px; line-height: 1.6; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* DESKTOP */
  @media (min-width: 768px) {
    .fd-page { max-width: 800px; margin: 0 auto; }
    .fd-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .fd-card:hover { transform: translateY(-6px); }
  }
`;

const SPECIALTIES = [
  "All",
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Gastroenterology",
  "Pulmonology",
  "Orthopedics",
  "Psychiatry",
  "Urology",
  "Ophthalmology",
  "ENT",
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "General Medicine",
    exp: "12 yrs",
    wait: "2 mins",
    rating: "4.8",
    price: "₦70,000",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Pediatrics",
    exp: "8 yrs",
    wait: "5 mins",
    rating: "4.9",
    price: "₦60,000",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 3,
    name: "Dr. Michael Roe",
    specialty: "Cardiology",
    exp: "15 yrs",
    wait: "10 mins",
    rating: "4.7",
    price: "₦100,000",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 4,
    name: "Dr. Emily Park",
    specialty: "Neurology",
    exp: "10 yrs",
    wait: "8 mins",
    rating: "4.9",
    price: "₦110,000",
    img: "https://images.unsplash.com/photo-1559839734-2b71f1536783?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 5,
    name: "Dr. David Osei",
    specialty: "Dermatology",
    exp: "7 yrs",
    wait: "3 mins",
    rating: "4.6",
    price: "₦80,000",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&fit=crop&crop=faces",
    online: false,
  },
  {
    id: 6,
    name: "Dr. Amara Nwosu",
    specialty: "Psychiatry",
    exp: "9 yrs",
    wait: "15 mins",
    rating: "4.8",
    price: "₦95,000",
    img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 7,
    name: "Dr. Kevin Adeyemi",
    specialty: "Gastroenterology",
    exp: "11 yrs",
    wait: "6 mins",
    rating: "4.7",
    price: "₦85,000",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
  {
    id: 8,
    name: "Dr. Lisa Okonkwo",
    specialty: "Pulmonology",
    exp: "13 yrs",
    wait: "4 mins",
    rating: "4.9",
    price: "₦98,000",
    img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&q=80&fit=crop&crop=faces",
    online: true,
  },
];

export default function FindDoctor({ aiResult, onConsult }) {
  const navigate = useNavigate(); // Initialize navigate
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState(
    aiResult?.recommended_specialty
      ? SPECIALTIES.find(s => s.toLowerCase() === aiResult.recommended_specialty.toLowerCase()) || "All"
      : "All"
  );

  const filtered = DOCTORS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = activeSpec === "All" ||
      d.specialty.toLowerCase() === activeSpec.toLowerCase();
    return matchSearch && matchSpec;
  });

  const isRecommended = (doc) =>
    aiResult?.recommended_specialty &&
    doc.specialty.toLowerCase() === aiResult.recommended_specialty.toLowerCase();

  return (
    <>
      <style>{css}</style>
      <div className="fd-page">

        {/* HEADER */}
        <div className="fd-header">
          <button className="fd-back" onClick={() => navigate("/dashboard")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <span className="fd-header-title">Find Your Doctor</span>
          <button className="fd-filter-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
          </button>
        </div>

        {/* AI NURSE SUMMARY */}
        {aiResult && (
          <div className="fd-ai-summary">
            <div className="fd-ai-icon">🩺</div>
            <div style={{flex:1, minWidth:0}}>
              <div className="fd-ai-label">
                AI Nurse Summary
                <span className={`fd-urgency-badge urgency-${aiResult.urgency_level}`}>
                  {aiResult.urgency_level?.toUpperCase()}
                </span>
              </div>
              <div style={{fontSize:"13px", color:"#374151", marginBottom:"8px"}}>
                {aiResult.summary || "Symptoms analyzed successfully"}
              </div>
              {aiResult.symptoms?.length > 0 && (
                <div className="fd-ai-symptoms">
                  {aiResult.symptoms.map((s, i) => (
                    <span key={i} className="fd-ai-chip">{s}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEARCH */}
        <div className="fd-search-wrap">
          <div className="fd-search-box">
            <svg className="fd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="fd-search"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* SPECIALTIES */}
        <div className="fd-specialties">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              className={`fd-spec-pill ${activeSpec === spec ? "active" : "inactive"}`}
              onClick={() => setActiveSpec(spec)}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* SECTION HEADER */}
        <div className="fd-section-header">
          <span className="fd-section-title">
            {aiResult?.recommended_specialty && activeSpec !== "All"
              ? `Recommended for you`
              : "Available Doctors"}
          </span>
          <span className="fd-available">{filtered.length} Available</span>
        </div>

        {/* DOCTOR CARDS */}
        <div className="fd-cards">
          {filtered.length === 0 ? (
            <div className="fd-empty">
              <div className="fd-empty-icon">🔍</div>
              <div className="fd-empty-title">No doctors found</div>
              <div className="fd-empty-sub">Try a different specialty or search term</div>
            </div>
          ) : (
            filtered.map((doc, i) => (
              <div
                key={doc.id}
                className="fd-card"
                style={{animationDelay: `${i * 0.08}s`}}
              >
                {isRecommended(doc) && (
                  <div className="fd-recommended">
                    <span>⭐</span>
                    <span className="fd-recommended-text">Recommended based on your symptoms</span>
                  </div>
                )}
                <div className="fd-card-top">
                  <div className="fd-doc-img-wrap">
                    <img src={doc.img} alt={doc.name} className="fd-doc-img" />
                    {doc.online && <div className="fd-online-dot" />}
                  </div>
                  <div className="fd-doc-info">
                    <div className="fd-doc-spec">{doc.specialty}</div>
                    <div className="fd-doc-name">
                      {doc.name}
                      <svg className="fd-verified" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div className="fd-doc-meta">
                      <div className="fd-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2"/>
                          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                        </svg>
                        {doc.exp} exp
                      </div>
                      <div className="fd-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {doc.online ? `${doc.wait} wait` : "Offline"}
                      </div>
                    </div>
                  </div>
                  <div className="fd-rating">⭐ {doc.rating}</div>
                </div>
                <div className="fd-card-bottom">
                  <div>
                    <div className="fd-price-label">Consultation Fee</div>
                    <div className="fd-price">{doc.price}<span> / consult</span></div>
                  </div>
                  <button
                    className="fd-consult-btn"
                    onClick={() => onConsult?.(doc, aiResult)}
                    disabled={!doc.online}
                    style={!doc.online ? {opacity:0.5, cursor:"not-allowed"} : {}}
                  >
                    {doc.online ? "Consult Now" : "Offline"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}