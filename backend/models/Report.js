const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    company: String,
    phone: String,
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    },
    status: {
      type: String,
      default: "PENDING",
    },
    screenshot: String,
    reportedBy: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);