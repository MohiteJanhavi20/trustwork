const express = require("express");
const { createReport, getReports } = require("../controllers/reportController");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.post("/", createReport);
router.get("/", getReports);


module.exports = router;