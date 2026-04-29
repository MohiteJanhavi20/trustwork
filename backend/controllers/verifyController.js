const Verification = require("../models/Verification");
const axios = require("axios");

const verifyInput = async (req, res) => {
  try {
    const { input } = req.body;

    const response = await axios.post("http://localhost:8000/api/full-scan", {
      input,
    });
    console.log(response.data);

    const riskScore = response.data.score;

    const severity = response.data.verdict;

    const issues = [response.data.message];

    const verification = await Verification.create({
      input,
      riskScore,
      severity,
      issues,
    });

    res.status(200).json({
      success: true,
      verification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

module.exports = {
  verifyInput,
};
