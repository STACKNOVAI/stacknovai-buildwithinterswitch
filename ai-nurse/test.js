require("dotenv").config();
const { analyzeSymptoms, continueConversation } = require("./index");

const testCases = [
  // DAY 1 BASICS
  {
    label: "High urgency — chest pain combo",
    input: "I have chest pain, shortness of breath and my left arm feels numb since this morning",
  },
  {
    label: "Medium urgency — fever + rash combo",
    input: "I have had a high fever and a red rash spreading on my body for 2 days",
  },
  {
    label: "Low urgency — mild cold",
    input: "I have a mild headache and runny nose for the past 2 days",
  },
  {
    label: "Dermatology — skin rash",
    input: "My skin has been itchy with a red rash on my arm for about a week",
  },

  // DAY 2 — URGENCY DETECTION
  {
    label: "HIGH — stroke symptoms",
    input: "My face is drooping on one side, my arm is weak and I am having trouble speaking",
  },
  {
    label: "HIGH — meningitis combo",
    input: "I have a severe headache, high fever and my neck feels very stiff",
  },
  {
    label: "HIGH — severe allergic reaction",
    input: "My throat is swelling, I have hives all over and I am having trouble breathing",
  },
  {
    label: "MEDIUM — UTI symptoms",
    input: "It burns when I urinate and I have a mild fever and lower back pain",
  },
  {
    label: "MEDIUM — mental health",
    input: "I have been feeling very hopeless lately, no interest in anything and having dark thoughts",
  },
  {
    label: "LOW — routine skin",
    input: "I have had acne on my face for months and it is getting worse",
  },

  // DAY 2 — SPECIALTY MAPPING
  {
    label: "Neurology — migraine",
    input: "I get severe migraines with visual aura and light sensitivity that last for hours",
  },
  {
    label: "Gastroenterology — stomach combo",
    input: "I have severe stomach pain, nausea, vomiting and I have not been able to eat for 2 days",
  },
  {
    label: "Pulmonology — breathing",
    input: "I have been wheezing and have chest tightness especially at night for the past week",
  },
  {
    label: "Ophthalmology — eye",
    input: "My right eye is very red, painful and my vision has become blurry since yesterday",
  },
  {
    label: "Psychiatry — anxiety",
    input: "I have been having panic attacks, racing heart and extreme anxiety for the past month",
  },

  // DAY 2 — FOLLOW-UP LOGIC
  {
    label: "Vague — should trigger follow-up",
    input: "I feel bad",
  },
  {
    label: "Vague — should trigger follow-up",
    input: "pain",
  },
  {
    label: "Empty — edge case",
    input: "",
  },
  {
    label: "Nonsense — edge case",
    input: "asdfghjkl qwerty",
  },
];

// follow-up conversation test
const followUpTest = {
  original: "I feel bad",
  answer: "I have been having stomach pain and vomiting since last night and I also have a fever",
};

async function runTests() {
  console.log("=".repeat(60));
  console.log("CARELINK AI NURSE — DAY 2 TEST SUITE");
  console.log("=".repeat(60));

  let passed = 0;
  let failed = 0;

  for (const test of testCases) {
    console.log(`\n📋 ${test.label}`);
    console.log(`INPUT: "${test.input || "(empty)"}"`);

    try {
      const result = await analyzeSymptoms(test.input);

      if (result.follow_up_question) {
        console.log(`🔁 FOLLOW-UP: ${result.follow_up_question}`);
      } else {
        console.log(`✅ urgency: ${result.urgency_level} | specialty: ${result.recommended_specialty} | severity: ${result.severity}`);
        console.log(`   symptoms: ${result.symptoms.join(", ") || "none"}`);
        console.log(`   summary: ${result.summary}`);
      }
      passed++;
    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
      failed++;
    }
  }

  // test follow-up conversation
  console.log("\n" + "=".repeat(60));
  console.log("FOLLOW-UP CONVERSATION TEST");
  console.log("=".repeat(60));
  console.log(`\nOriginal: "${followUpTest.original}"`);
  console.log(`Follow-up answer: "${followUpTest.answer}"`);

  try {
    const result = await continueConversation(followUpTest.original, followUpTest.answer);
    console.log(`\n✅ Follow-up resolved:`);
    console.log(`   urgency: ${result.urgency_level} | specialty: ${result.recommended_specialty}`);
    console.log(`   symptoms: ${result.symptoms.join(", ")}`);
    console.log(`   summary: ${result.summary}`);
    passed++;
  } catch (err) {
    console.log(`❌ ERROR: ${err.message}`);
    failed++;
  }

  console.log("\n" + "=".repeat(60));
  console.log(`RESULTS: ${passed} passed | ${failed} failed`);
  console.log("=".repeat(60));
}

runTests();