const mongoose = require("mongoose");

const threatLogSchema = new mongoose.Schema(
  {
    threatType: String,
    source: String,
    riskScore: Number,
    actionTaken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThreatLog", threatLogSchema);