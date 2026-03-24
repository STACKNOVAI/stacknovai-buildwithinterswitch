const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dosage: { type: String },
  instructions: { type: String },
  schedule: { time: { type: String }, frequency: { type: String, enum: ["daily", "weekly", "custom"]}},
  logs: [{ date: { type: String }, status: { type: String, enum: ["taken", "missed"] }, timestamp: { type: Date, default: Date.now }}],
}, { timestamps: true });

module.exports = mongoose.model("Medication", medicationSchema);