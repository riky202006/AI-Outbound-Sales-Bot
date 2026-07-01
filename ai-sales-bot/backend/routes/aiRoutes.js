const express = require("express");

const router = express.Router();

const {
  generateEmail,
} = require("../controllers/aiController");

// =======================
// GENERATE AI EMAIL
// =======================

router.post("/generate", generateEmail);

module.exports = router;