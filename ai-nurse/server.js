require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { analyzeSymptoms } = require("./index");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ai/intake", async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ success: false, message: "userInput is required" });
    }
    const result = await analyzeSymptoms(req.body.userInput);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("AI intake error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "CareLink AI Nurse is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AI Nurse server running on port ${PORT}`);
});