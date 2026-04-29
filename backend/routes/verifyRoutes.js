const express = require("express");

const {
verifyInput,
} = require("../controllers/verifyController");

const router = express.Router();

router.post("/", verifyInput);

module.exports = router;
