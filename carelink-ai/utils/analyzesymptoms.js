require("dotenv").config();
const Groq = require("groq-sdk");
const systemPrompt = require("./prompt");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzesymptoms(userInput) {
  if (!userInput || userInput.trim() === "") {
    return {
      symptoms: [],
      duration: "unknown",
      severity: "unknown",
      urgency_level: "low",
      recommended_specialty: "general medicine",
    };
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    temperature: 0.3,
  });

  const raw = response.choices[0].message.content.trim();

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("JSON parse failed:", raw);
    throw new Error("AI returned invalid JSON");
  }
}

module.exports = { analyzesymptoms };