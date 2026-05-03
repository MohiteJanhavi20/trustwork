const express = require("express");

const router = express.Router();

const adminAuth =
  require("../middleware/adminAuth");

const Report =
  require("../models/Report");

const CompanyVerification =
  require("../models/CompanyVerification");

const ThreatLog =
  require("../models/ThreatLog");

router.get(
  "/reports",
  adminAuth,
  async (req, res) => {
    try {

      const reports =
        await Report.find().sort({
          createdAt: -1,
        });

      res.json(reports);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.get(
  "/stats",
  adminAuth,
  async (req, res) => {
    try {

      const totalReports =
        await Report.countDocuments();

      const pendingReports =
        await Report.countDocuments({
          status: "UNDER REVIEW",
        });

      const approvedCompanies =
        await CompanyVerification.countDocuments({
          status: "APPROVED",
        });

      const totalThreats =
        await ThreatLog.countDocuments();

      res.json({
        totalReports,
        pendingReports,
        approvedCompanies,
        totalThreats,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

router.put(
  "/reports/:id/status",
  adminAuth,
  async (req, res) => {
    try {

      const report =
        await Report.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          { new: true }
        );

      res.json(report);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;