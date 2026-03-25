require("dotenv").config();
const Groq = require("groq-sdk");
const systemPrompt = require("./prompt");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeSymptoms(userInput) {
  // handle empty input immediately
  if (!userInput || userInput.trim() === "") {
    return {
      symptoms: [],
      duration: "unknown",
      severity: "unknown",
      urgency_level: "low",
      recommended_specialty: "general medicine",
      follow_up_question: null,
      summary: "No symptoms provided. Patient should describe their condition.",
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

  // check if AI returned a follow-up question instead of JSON
  const isFollowUp = !raw.startsWith("{");

  if (isFollowUp) {
    return {
      symptoms: [],
      duration: "unknown",
      severity: "unknown",
      urgency_level: "low",
      recommended_specialty: "general medicine",
      follow_up_question: raw,
      summary: "More information needed from patient.",
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("JSON parse failed:", raw);
    throw new Error("AI returned invalid JSON");
  }
}

// follow-up conversation handler
async function continueConversation(originalInput, followUpAnswer) {
  const combinedInput = `
Original complaint: ${originalInput}
Follow-up answer: ${followUpAnswer}

Now analyze the full picture and return the JSON output.
  `.trim();

  return await analyzeSymptoms(combinedInput);
}

module.exports = { analyzeSymptoms, continueConversation };