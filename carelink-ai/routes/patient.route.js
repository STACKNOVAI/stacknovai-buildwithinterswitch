const express = require("express");
const patientRouter = express.Router();
const { patientRequestOTP, patientVerifyOTP, patientLogin } = require("../controller/auth.contoller");
const { analyzesymptoms } = require("../utils/analyzesymptoms");

patientRouter.post("/register", patientRequestOTP);
patientRouter.post("/verify", patientVerifyOTP);
patientRouter.post("/login", patientLogin);

patientRouter.post("/ai/intake", async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ success: false, message: "userInput is required" });
    }
    const result = await analyzesymptoms(userInput);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("AI intake error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = patientRouter;