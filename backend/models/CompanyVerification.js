const mongoose = require("mongoose");

const companyVerificationSchema = new mongoose.Schema(
  {
    companyName: String,
    gstNumber: String,
    cinNumber: String,
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CompanyVerification",
  companyVerificationSchema
);