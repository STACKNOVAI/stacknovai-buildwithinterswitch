require("dotenv").config();
const Groq = require("groq-sdk");
const systemPrompt = require("./prompt.js"); // Changed to require

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeSymptoms(userInput) {
  if (!userInput || userInput.trim() === "") {
    return {
      symptoms: [],
      duration: "unknown",
      severity: "unknown",
      urgency_level: "low",
      recommended_specialty: "general medicine",
      follow_up_question: null,
      summary: "No symptoms provided. Patient should describe their condition.",
      advice: "Please describe what you are feeling so we can help you better.",
    };
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    temperature: 0.2,
  });

  const raw = response.choices[0].message.content.trim();
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  const isFollowUp = !cleaned.startsWith("{");

  if (isFollowUp) {
    return {
      symptoms: [], duration: "unknown", severity: "unknown", urgency_level: "low",
      recommended_specialty: "general medicine", follow_up_question: cleaned,
      summary: "More information needed from patient.",
      advice: "Please answer the question above so we can assess your condition.",
    };
  }

  try {
    const parsed = JSON.parse(cleaned);
    return {
      symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
      duration: parsed.duration || "unknown",
      severity: parsed.severity || "unknown",
      urgency_level: parsed.urgency_level || "low",
      recommended_specialty: parsed.recommended_specialty || "general medicine",
      follow_up_question: parsed.follow_up_question || null,
      summary: parsed.summary || "",
      advice: parsed.advice || "",
      ai_response: parsed.summary || parsed.advice || "Analysis complete."
    };
  } catch (err) {
    throw new Error("AI returned invalid JSON");
  }
}

async function continueConversation(originalInput, followUpAnswer) {
  const combinedInput = `Original complaint: ${originalInput}\nFollow-up answer: ${followUpAnswer}\n\nNow analyze the full picture and return the JSON output.`.trim();
  return await analyzeSymptoms(combinedInput);
}

module.exports = { analyzeSymptoms, continueConversation };
