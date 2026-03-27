// ─── CareLink AI Client (Frontend → Backend) ─────────────────────

const API_BASE = "http://localhost:5000/api/ai";

// ─────────────────────────────────────────────────────────────────
// AI NURSE — multi-turn intake
// ─────────────────────────────────────────────────────────────────

const NURSE_SYSTEM = `You are CareLink AI Nurse, a warm, professional medical intake assistant.

Your job is to gather enough information about the patient's symptoms to produce a structured medical assessment. Ask focused follow-up questions ONE AT A TIME until you feel confident about:
- The main symptoms
- Duration and severity
- Any relevant history or context

When you have enough information (usually after 1-3 exchanges), produce the final assessment.

IMPORTANT RULES:
1. Always respond with valid JSON only — no markdown, no prose outside the JSON.
2. If you need more information, respond with:
   { "status": "follow_up", "question": "Your follow-up question here?" }
3. When ready for final assessment, respond with:
   {
     "status": "complete",
     "symptoms": ["symptom 1", "symptom 2"],
     "urgency_level": "high" | "medium" | "low",
     "recommended_specialty": "Specialty name",
     "summary": "Clinical summary",
     "nurse_response": "Patient-friendly explanation"
   }
4. Never diagnose — only recommend a specialist.`;

export async function nurseIntakeTurn(history) {
  const res = await fetch(`${API_BASE}/nurse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      history,
      systemPrompt: NURSE_SYSTEM,
    }),
  });

  if (!res.ok) {
    throw new Error("Nurse request failed");
  }

  return await res.json();
}

// ─────────────────────────────────────────────────────────────────
// AI DOCTOR
// ─────────────────────────────────────────────────────────────────

function buildDoctorSystem(doctor, assessment) {
  return `You are ${doctor.name}, a ${doctor.specialty} at CareLink Health platform.

SYMPTOMS: ${assessment.symptoms?.join(", ") || "Not specified"}
URGENCY: ${assessment.urgency_level || "medium"}
SUMMARY: ${assessment.summary || ""}

Speak professionally, ask targeted questions, and give clear guidance.
Keep responses concise. Do not mention AI.`;
}

export async function doctorReply(doctor, assessment, chatHistory) {
  const system = buildDoctorSystem(doctor, assessment);

  const res = await fetch(`${API_BASE}/doctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system,
      chatHistory,
    }),
  });

  if (!res.ok) {
    throw new Error("Doctor request failed");
  }

  const data = await res.json();
  return data.reply;
}

// ─────────────────────────────────────────────────────────────────
// DOCTOR MATCHING (UNCHANGED)
// ─────────────────────────────────────────────────────────────────

const SPECIALTY_MAP = {
  cardiology: ["cardiologist", "cardiology", "heart"],
  dermatology: ["dermatologist", "dermatology", "skin"],
  "general practice": ["general", "gp", "family", "primary"],
  neurology: ["neurologist", "neurology", "brain", "headache"],
  orthopedics: ["orthopedic", "bone", "joint", "fracture"],
  psychiatry: ["psychiatrist", "mental", "anxiety", "depression"],
  pediatrics: ["pediatrician", "child"],
  gastroenterology: ["stomach", "digestive"],
};

export function matchDoctor(doctors, recommendedSpecialty) {
  if (!recommendedSpecialty || !doctors?.length) return doctors[0];

  const lower = recommendedSpecialty.toLowerCase();

  const direct = doctors.find(
    (d) =>
      d.specialty.toLowerCase().includes(lower) ||
      lower.includes(d.specialty.toLowerCase())
  );
  if (direct) return direct;

  for (const [key, keywords] of Object.entries(SPECIALTY_MAP)) {
    if (keywords.some((k) => lower.includes(k))) {
      const matched = doctors.find((d) =>
        d.specialty.toLowerCase().includes(key)
      );
      if (matched) return matched;
    }
  }

  return (
    doctors.find((d) =>
      d.specialty.toLowerCase().includes("general")
    ) || doctors[0]
  );
}