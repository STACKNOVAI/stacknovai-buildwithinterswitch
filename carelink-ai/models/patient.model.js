const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    auth: { otpHash: { type: String }, otpExpiresAt: { type: Date }, isVerified: { type: Boolean, default: false }},
    profile: {fullName: { type: String }, age: { type: Number }, gender: { type: String }, bloodGroup: { type: String }, weightKg: { type: Number }, allergies: [{ type: String }], profileImage: { type: String }},
    emergencyContacts: [{ name: { type: String }, relationship: { type: String }, phone: { type: String }}],
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);