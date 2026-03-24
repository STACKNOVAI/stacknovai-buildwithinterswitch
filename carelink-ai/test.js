require("dotenv").config();
const { analyzeSymptoms } = require("./utils/analyzesymptoms");

const testCases = [
  "I have been having chest pain and difficulty breathing since this morning",
  "I have a mild headache and runny nose for the past 2 days",
  "My skin has been itchy with a red rash on my arm for about a week",
  "I have had a high fever, weakness and body aches since yesterday",
  "", // edge case: empty input
  "idk i just feel off", // edge case: vague input
];

async function runTests() {
  for (const input of testCases) {
    console.log("\n--- INPUT ---");
    console.log(input || "(empty)");
    console.log("--- OUTPUT ---");

    try {
      const result = await analyzeSymptoms(input);
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

runTests();