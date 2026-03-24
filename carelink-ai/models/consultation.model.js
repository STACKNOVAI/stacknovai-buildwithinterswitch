const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    status: { type: String, enum: ["scheduled", "active", "completed"], default: "scheduled" },
    aiNurseSummary: {transcript: { type: String }, detectedSymptoms: [{ type: String }], severity: { type: String }, analyzedAt: { type: Date }},
    chatHistory: [{ senderId: { type: mongoose.Schema.Types.ObjectId }, role: { type: String, enum: ["doctor", "patient"] }, message: { type: String }, timestamp: { type: Date, default: Date.now }}],
    videoRoomId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Consultation", consultationSchema);