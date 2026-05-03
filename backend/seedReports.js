const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require("./config/db");

const Report = require("./models/Report");

connectDB();

const reports = [
  {
    title: "Fake Infosys Recruiter",
    description:
      "Candidate asked to pay onboarding fee before interview process.",
    company: "Infosys",
    phone: "9876543210",
    severity: "HIGH",
    status: "UNDER REVIEW",
    reportedBy: "community",
  },

  {
    title: "Telegram Remote Job Scam",
    description:
      "Fraudsters offering fake work-from-home jobs through Telegram groups.",
    company: "Unknown",
    phone: "9988776655",
    severity: "CRITICAL",
    status: "ESCALATED",
    reportedBy: "anonymous",
  },

  {
    title: "Cloned TCS Career Portal",
    description:
      "Fake TCS hiring website collecting Aadhaar and PAN details.",
    company: "TCS",
    phone: "9123456780",
    severity: "HIGH",
    status: "MONITORING",
    reportedBy: "community",
  },

  {
    title: "WhatsApp Data Entry Fraud",
    description:
      "Victims promised salary after paying registration charges.",
    company: "Unknown",
    phone: "9090909090",
    severity: "MEDIUM",
    status: "UNDER REVIEW",
    reportedBy: "student",
  },

  {
    title: "Fake Wipro Internship Offer",
    description:
      "Scammers requesting security deposit for internship confirmation.",
    company: "Wipro",
    phone: "9811122233",
    severity: "HIGH",
    status: "ESCALATED",
    reportedBy: "community",
  },

  {
    title: "OLX Packaging Job Scam",
    description:
      "Fake warehouse jobs shared through OLX and WhatsApp.",
    company: "Unknown",
    phone: "9765432109",
    severity: "MEDIUM",
    status: "UNDER REVIEW",
    reportedBy: "anonymous",
  },

  {
    title: "Fake Amazon Hiring Campaign",
    description:
      "Fraudulent Amazon recruiter demanding laptop processing fees.",
    company: "Amazon",
    phone: "9000011111",
    severity: "CRITICAL",
    status: "ESCALATED",
    reportedBy: "community",
  },

  {
    title: "Call Center Recruitment Scam",
    description:
      "Mass hiring scam targeting freshers through Telegram channels.",
    company: "Unknown",
    phone: "9898989898",
    severity: "MEDIUM",
    status: "MONITORING",
    reportedBy: "moderator",
  },

  {
    title: "Fake HR Interview Link",
    description:
      "Phishing website impersonating HR interview scheduling portal.",
    company: "Accenture",
    phone: "9777777777",
    severity: "HIGH",
    status: "UNDER REVIEW",
    reportedBy: "community",
  },

  {
    title: "Internship Certificate Scam",
    description:
      "Students asked to pay certificate generation charges.",
    company: "Unknown",
    phone: "9666666666",
    severity: "LOW",
    status: "MONITORING",
    reportedBy: "student",
  },

  {
    title: "Fake Tech Mahindra Recruiter",
    description:
      "Recruiter impersonation scam through LinkedIn and WhatsApp.",
    company: "Tech Mahindra",
    phone: "9555555555",
    severity: "HIGH",
    status: "UNDER REVIEW",
    reportedBy: "community",
  },

  {
    title: "UPI Verification Scam",
    description:
      "Applicants asked to send ₹10 UPI verification payment.",
    company: "Unknown",
    phone: "9444444444",
    severity: "MEDIUM",
    status: "MONITORING",
    reportedBy: "anonymous",
  },

  {
    title: "Fake Flipkart Warehouse Jobs",
    description:
      "Fraudulent warehouse recruitment targeting tier-2 cities.",
    company: "Flipkart",
    phone: "9333333333",
    severity: "HIGH",
    status: "ESCALATED",
    reportedBy: "community",
  },

  {
    title: "Phishing Zoom Interview Link",
    description:
      "Malicious interview links stealing candidate credentials.",
    company: "Unknown",
    phone: "9222222222",
    severity: "CRITICAL",
    status: "ESCALATED",
    reportedBy: "moderator",
  },

  {
    title: "Resume Collection Scam",
    description:
      "Mass resume harvesting through fake startup hiring campaigns.",
    company: "Unknown",
    phone: "9111111111",
    severity: "MEDIUM",
    status: "UNDER REVIEW",
    reportedBy: "community",
  },
];

async function seedReports() {
  try {

    await Report.deleteMany();

    await Report.insertMany(reports);

    console.log("Reports seeded successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
}

seedReports();