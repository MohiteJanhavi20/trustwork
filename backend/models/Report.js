const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
company: {
type: String,
required: true,
},
recruiter: {
  type: String,
  required: true,
},

scamType: {
  type: String,
  required: true,
},

description: {
  type: String,
  required: true,
},

severity: {
  type: String,
  default: "MEDIUM",
},

},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"Report",
reportSchema
);
