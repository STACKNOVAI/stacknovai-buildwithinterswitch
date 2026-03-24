const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
  amount: { type: Number, required: true },
  reference: { type: String, required: true, unique: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  type: { type: String, enum: ["one-time", "subscription"] },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);