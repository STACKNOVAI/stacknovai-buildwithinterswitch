const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  profileImage: { type: String },
  bio: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);