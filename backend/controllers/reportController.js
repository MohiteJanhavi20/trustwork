const Report = require("../models/Report");

// ---------------------------------------------------------------------------
// Severity keywords — grouped by level so logic stays clean and extensible
// ---------------------------------------------------------------------------
const HIGH_SEVERITY_KEYWORDS = [
  "payment", "upi", "crypto", "advance fee", "deposit",
  "registration fee", "training fee", "transfer money",
];

const MEDIUM_SEVERITY_KEYWORDS = [
  "telegram", "whatsapp", "aadhaar", "pan card",
  "personal details", "bank account", "otp",
];

/**
 * Derive severity from description text.
 * HIGH   — financial fraud signals
 * MEDIUM — identity/contact exposure signals
 * LOW    — default
 */
const getSeverity = (description = "") => {
  const text = description.toLowerCase();

  if (HIGH_SEVERITY_KEYWORDS.some((kw) => text.includes(kw))) {
    return "HIGH";
  }

  if (MEDIUM_SEVERITY_KEYWORDS.some((kw) => text.includes(kw))) {
    return "MEDIUM";
  }

  return "LOW";
};

// ---------------------------------------------------------------------------
// POST /api/reports — Submit a new scam report
// ---------------------------------------------------------------------------
const createReport = async (req, res) => {
  try {
    const { company, recruiter, scamType, description } = req.body;

    // FIX 1: Validate required fields instead of letting Mongoose throw a
    //         cryptic CastError or ValidationError to the client
    if (!company || !recruiter || !scamType || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: company, recruiter, scamType, description",
      });
    }

    // FIX 2: Trim whitespace so "  Infosys  " doesn't create duplicate entries
    const severity = getSeverity(description);

    const report = await Report.create({
      company:     company.trim(),
      recruiter:   recruiter.trim(),
      scamType:    scamType.trim(),
      description: description.trim(),
      severity,
    });

    return res.status(201).json({
      success: true,
      report,
    });

  } catch (error) {
    // FIX 3: Handle Mongoose validation errors separately with a 400
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }

    console.error("[createReport]", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit report",
      // FIX 4: Don't leak error.message to client in production
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

// ---------------------------------------------------------------------------
// GET /api/reports — Fetch all reports (newest first)
// ---------------------------------------------------------------------------
const getReports = async (req, res) => {
  try {
    // FIX 5: Add pagination so the endpoint doesn't return thousands of docs
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    // FIX 6: Allow filtering by severity or scamType via query params
    const filter = {};
    if (req.query.severity) filter.severity = req.query.severity.toUpperCase();
    if (req.query.scamType) filter.scamType = req.query.scamType;

    const [reports, total] = await Promise.all([
      Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Report.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      reports,
    });

  } catch (error) {
    console.error("[getReports]", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

module.exports = { createReport, getReports };
