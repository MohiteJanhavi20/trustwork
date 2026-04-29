const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
{
input: {
type: String,
required: true,
},

riskScore: {
  type: Number,
  required: true,
},

severity: {
  type: String,
  required: true,
},

issues: {
  type: [String],
  required: true,
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"Verification",
verificationSchema
);
