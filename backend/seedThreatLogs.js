const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require("./config/db");

const ThreatLog =
  require("./models/ThreatLog");

connectDB();

const threatLogs = [
  {
    threatType: "Phishing",
    source: "Fake Infosys Portal",
    riskScore: 92,
    actionTaken: "Escalated",
  },

  {
    threatType: "Telegram Scam",
    source: "Remote Job Group",
    riskScore: 88,
    actionTaken: "Monitoring",
  },

  {
    threatType: "Fake Recruiter",
    source: "WhatsApp Campaign",
    riskScore: 85,
    actionTaken: "Blocked",
  },

  {
    threatType: "Credential Harvesting",
    source: "Cloned TCS Website",
    riskScore: 95,
    actionTaken: "Escalated",
  },

  {
    threatType: "UPI Fraud",
    source: "Verification Payment Scam",
    riskScore: 74,
    actionTaken: "Monitoring",
  },

  {
    threatType: "Internship Scam",
    source: "Fake Certificate Program",
    riskScore: 68,
    actionTaken: "Under Review",
  },

  {
    threatType: "Resume Harvesting",
    source: "Fraud Startup Hiring",
    riskScore: 80,
    actionTaken: "Escalated",
  },
];

async function seedThreatLogs() {
  try {

    await ThreatLog.deleteMany();

    await ThreatLog.insertMany(
      threatLogs
    );

    console.log(
      "Threat logs seeded successfully"
    );

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
}

seedThreatLogs();