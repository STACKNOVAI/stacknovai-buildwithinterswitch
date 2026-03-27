import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

  .nurse-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 300;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  @media (min-width: 768px) {
    .nurse-overlay { align-items: center; }
  }

  .nurse-sheet {
    background: white;
    border-radius: 24px 24px 0 0;
    width: 100%;
    max-width: 560px;
    max-height: 92vh;
    overflow-y: auto;
    animation: slideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1);
    padding: 0 0 32px;
  }

  @media (min-width: 768px) {
    .nurse-sheet { border-radius: 24px; max-height: 85vh; }
  }

  .nurse-handle {
    width: 40px; height: 4px;
    background: #E5E7EB; border-radius: 2px;
    margin: 12px auto 0;
  }

  .nurse-header { text-align: center; padding: 20px 24px 0; }

  .nurse-title {
    font-family: 'Instrument Serif', serif;
    font-size: 24px; color: #0A1628; margin-bottom: 6px;
  }

  .nurse-subtitle { font-size: 14px; color: #6B7280; line-height: 1.5; }

  .nurse-body {
    padding: 24px;
    display: flex; flex-direction: column;
    align-items: center; gap: 20px;
  }

  .mic-wrap {
    position: relative;
    display: flex; align-items: center;
    justify-content: center;
    width: 140px; height: 140px;
  }

  .mic-ring {
    position: absolute; border-radius: 50%;
    background: rgba(34,197,94,0.15);
    animation: ringPulse 1.8s ease-in-out infinite;
  }

  .mic-ring-1 { width: 140px; height: 140px; animation-delay: 0s; }
  .mic-ring-2 { width: 110px; height: 110px; animation-delay: 0.3s; }
  .mic-ring.inactive { animation: none; background: rgba(34,197,94,0.06); }

  @keyframes ringPulse {
    0%, 100% { transform: scale(0.9); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 0.2; }
  }

  .mic-btn {
    width: 80px; height: 80px;
    background: #22C55E; border-radius: 50%; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; z-index: 1;
    box-shadow: 0 8px 32px rgba(34,197,94,0.4);
    transition: all 0.2s ease;
  }

  .mic-btn:hover { transform: scale(1.05); }
  .mic-btn:active { transform: scale(0.95); }

  .mic-btn.listening {
    background: #EF4444;
    box-shadow: 0 8px 32px rgba(239,68,68,0.4);
    animation: micPulse 1s ease-in-out infinite;
  }

  .mic-btn.processing {
    background: #F59E0B;
    box-shadow: 0 8px 32px rgba(245,158,11,0.4);
  }

  @keyframes micPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }

  .mic-btn svg { color: white; width: 32px; height: 32px; }

  .status-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 18px; border-radius: 100px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
  }

  .status-pill.idle { background: #F3F4F6; color: #6B7280; }
  .status-pill.listening { background: #FEE2E2; color: #EF4444; }
  .status-pill.processing { background: #FEF3C7; color: #D97706; }
  .status-pill.speaking { background: #DCFCE7; color: #16A34A; }

  .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .status-dot.idle { background: #9CA3AF; }
  .status-dot.listening { background: #EF4444; animation: blink 1s infinite; }
  .status-dot.processing { background: #D97706; animation: blink 0.5s infinite; }
  .status-dot.speaking { background: #16A34A; animation: blink 0.8s infinite; }

  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .transcript-box {
    width: 100%; background: #F9FAFB;
    border-radius: 16px; padding: 16px;
    min-height: 60px; border: 1px solid #E5E7EB;
  }

  .transcript-label {
    font-size: 11px; font-weight: 600; color: #9CA3AF;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
  }

  .transcript-text { font-size: 14px; color: #374151; line-height: 1.6; font-style: italic; }

  .followup-box {
    width: 100%; background: #EFF6FF;
    border-radius: 16px; padding: 16px; border: 1px solid #BFDBFE;
  }

  .followup-label {
    font-size: 11px; font-weight: 600; color: #3B82F6;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
  }

  .followup-text { font-size: 14px; color: #1E40AF; line-height: 1.6; }

  .symptoms-box {
    width: 100%; background: #F0FDF4;
    border-radius: 16px; padding: 16px; border: 1px solid #BBF7D0;
  }

  .symptoms-label {
    font-size: 11px; font-weight: 600; color: #16A34A;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;
    display: flex; align-items: center; gap: 6px;
  }

  .symptoms-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }

  .symptom-chip {
    background: white; border: 1px solid #BBF7D0;
    padding: 6px 14px; border-radius: 100px;
    font-size: 13px; color: #0A1628; font-weight: 500;
  }

  .result-row { display: flex; gap: 8px; flex-wrap: wrap; }

  .result-badge { padding: 5px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
  .badge-high { background: #FEE2E2; color: #DC2626; }
  .badge-medium { background: #FEF3C7; color: #D97706; }
  .badge-low { background: #DCFCE7; color: #16A34A; }
  .badge-specialty { background: #EDE9FE; color: #7C3AED; }

  .ai-response-box { width: 100%; background: #0A1628; border-radius: 16px; padding: 16px; }
  .ai-response-label {
    font-size: 11px; font-weight: 600; color: #22C55E;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
  }
  .ai-response-text { font-size: 14px; color: white; line-height: 1.7; }

  .nurse-actions {
    width: 100%; display: flex; flex-direction: column;
    gap: 10px; padding: 0 24px;
  }

  .btn-proceed {
    width: 100%; padding: 16px;
    background: #22C55E; color: white;
    border: none; border-radius: 50px;
    font-size: 15px; font-weight: 700;
    font-family: inherit; cursor: pointer;
    display: flex; align-items: center;
    justify-content: center; gap: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(34,197,94,0.3);
  }

  .btn-proceed:hover { background: #16A34A; transform: scale(1.02); }
  .btn-proceed:disabled { opacity: 0.4; cursor: not-allowed; transform: none; background: #9CA3AF; box-shadow: none; }

  .btn-reset {
    width: 100%; padding: 12px;
    background: #F3F4F6; color: #6B7280;
    border: none; border-radius: 50px;
    font-size: 14px; font-weight: 600;
    font-family: inherit; cursor: pointer; transition: all 0.2s;
  }

  .btn-reset:hover { background: #E5E7EB; color: #374151; }

  .nurse-note {
    font-size: 12px; color: #9CA3AF;
    text-align: center; padding: 0 24px;
  }

  .text-input-wrap { width: 100%; display: flex; gap: 8px; }

  .text-input {
    flex: 1; padding: 12px 16px;
    border: 1.5px solid #E5E7EB; border-radius: 50px;
    font-size: 14px; font-family: inherit;
    outline: none; transition: border-color 0.2s;
  }

  .text-input:focus { border-color: #22C55E; }

  .btn-send {
    width: 48px; height: 48px; background: #22C55E;
    border: none; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.2s;
  }

  .btn-send:hover { background: #16A34A; transform: scale(1.05); }
  .btn-send svg { color: white; width: 20px; height: 20px; }

  .divider { display: flex; align-items: center; gap: 12px; width: 100%; }
  .divider-line { flex: 1; height: 1px; background: #E5E7EB; }
  .divider-text { font-size: 12px; color: #9CA3AF; font-weight: 500; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const BACKEND_URL = "http://localhost:5000";

export default function AINurse({ onClose, onProceed }) {
  const [status, setStatus] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(true);

  // use ref to track status inside speech recognition callbacks
  const statusRef = useRef("idle");
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const updateStatus = (newStatus) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => updateStatus("listening");

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += text;
        else interim += text;
      }
      setTranscript(final || interim);
    };

    // KEY FIX — use statusRef not status (avoids stale closure)
    recognition.onend = () => {
      if (statusRef.current === "listening") {
        updateStatus("processing");
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
      updateStatus("idle");
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (status === "processing" && transcript) {
      sendToAI(transcript);
    }
  }, [status, transcript]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setResult(null);
    setFollowUp(null);
    setAiResponse("");
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    updateStatus("processing");
  };

  const sendToAI = async (input) => {
    updateStatus("processing");
    try {
      const res = await fetch(`${BACKEND_URL}/ai/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const aiData = data.data;

      if (aiData.follow_up_question) {
        setFollowUp(aiData.follow_up_question);
        updateStatus("speaking");
        speak(aiData.follow_up_question);
      } else {
        setResult(aiData);
        const response = buildSpeechResponse(aiData);
        setAiResponse(response);
        updateStatus("speaking");
        speak(response);
      }
    } catch (err) {
      console.error("AI error:", err.message);
      setAiResponse("I had trouble analyzing your symptoms. Please try again or type your symptoms below.");
      updateStatus("idle");
    }
  };

  const buildSpeechResponse = (data) => {
    const urgencyText = {
      high: "This appears urgent. Please seek medical attention immediately.",
      medium: "You should see a doctor within the next 24 hours.",
      low: "This seems routine and can be addressed at your next appointment.",
    };
    const symptoms = data.symptoms?.slice(0, 3).join(", ") || "your symptoms";
    const specialty = data.recommended_specialty || "a general physician";
    const urgency = urgencyText[data.urgency_level] || "";
    return `I've detected ${symptoms}. I recommend you see ${specialty}. ${urgency}`;
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v =>
      v.name.includes("Female") ||
      v.name.includes("Samantha") ||
      v.name.includes("Google UK English Female")
    );
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => updateStatus("idle");
    synthRef.current.speak(utterance);
  };

  const handleMicClick = () => {
    if (status === "listening") {
      stopListening();
    } else if (status === "idle" || status === "speaking") {
      synthRef.current?.cancel();
      startListening();
    }
  };

  const handleTextSend = () => {
    if (!textInput.trim()) return;
    const input = textInput.trim();
    setTranscript(input);
    setTextInput("");
    sendToAI(input);
  };

  const handleReset = () => {
    synthRef.current?.cancel();
    updateStatus("idle");
    setTranscript("");
    setResult(null);
    setFollowUp(null);
    setAiResponse("");
    setTextInput("");
  };

  const handleProceed = () => {
    console.log("Proceeding with result:", result);
    synthRef.current?.cancel();
    onProceed?.(result);
  };

  const getStatusText = () => {
    switch (status) {
      case "listening": return "LISTENING...";
      case "processing": return "ANALYZING...";
      case "speaking": return "AI NURSE SPEAKING...";
      default: return result ? "TAP MIC TO SPEAK AGAIN" : "TAP MIC TO SPEAK";
    }
  };

  const getMicIcon = () => {
    if (status === "processing") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      );
    }
    if (status === "speaking") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    );
  };

  return (
    <>
      <style>{css}</style>
      <div className="nurse-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="nurse-sheet">
          <div className="nurse-handle" />

          <div className="nurse-header">
            <h2 className="nurse-title">CareLink AI Nurse</h2>
            <p className="nurse-subtitle">
              {followUp ? "I need a bit more information" : "Tell me what you are feeling"}
            </p>
          </div>

          <div className="nurse-body">
            <div className="mic-wrap">
              <div className={`mic-ring mic-ring-1 ${status !== "listening" ? "inactive" : ""}`} />
              <div className={`mic-ring mic-ring-2 ${status !== "listening" ? "inactive" : ""}`} />
              <button
                className={`mic-btn ${status === "listening" ? "listening" : status === "processing" ? "processing" : ""}`}
                onClick={handleMicClick}
                disabled={status === "processing"}
              >
                {getMicIcon()}
              </button>
            </div>

            <div className={`status-pill ${status}`}>
              <div className={`status-dot ${status}`} />
              {getStatusText()}
            </div>

            {transcript ? (
              <div className="transcript-box">
                <div className="transcript-label">You said</div>
                <div className="transcript-text">"{transcript}"</div>
              </div>
            ) : null}

            {followUp ? (
              <div className="followup-box">
                <div className="followup-label">AI Nurse asks</div>
                <div className="followup-text">{followUp}</div>
              </div>
            ) : null}

            {aiResponse && !followUp ? (
              <div className="ai-response-box">
                <div className="ai-response-label">AI Nurse says</div>
                <div className="ai-response-text">{aiResponse}</div>
              </div>
            ) : null}

            {result && result.symptoms?.length > 0 ? (
              <div className="symptoms-box">
                <div className="symptoms-label">✦ Detected Symptoms</div>
                <div className="symptoms-chips">
                  {result.symptoms.map((s, i) => (
                    <span key={i} className="symptom-chip">{s}</span>
                  ))}
                </div>
                <div className="result-row">
                  <span className={`result-badge badge-${result.urgency_level}`}>
                    {result.urgency_level?.toUpperCase()} URGENCY
                  </span>
                  <span className="result-badge badge-specialty">
                    {result.recommended_specialty}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">
                {voiceSupported ? "or type instead" : "type your symptoms"}
              </span>
              <div className="divider-line" />
            </div>

            <div className="text-input-wrap">
              <input
                className="text-input"
                placeholder="Describe your symptoms..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextSend()}
                disabled={status === "processing"}
              />
              <button
                className="btn-send"
                onClick={handleTextSend}
                disabled={status === "processing"}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="nurse-actions">
            <button
              className="btn-proceed"
              disabled={!result}
              onClick={handleProceed}
            >
              Proceed to Doctor →
            </button>
            {(transcript || result) && (
              <button className="btn-reset" onClick={handleReset}>
                Start Over
              </button>
            )}
          </div>

          <p className="nurse-note" style={{marginTop: 12}}>
            Your AI Nurse analysis will be shared securely with your physician
          </p>
        </div>
      </div>
    </>
  );
}