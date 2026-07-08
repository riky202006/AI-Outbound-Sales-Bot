const express = require("express");

const router = express.Router();

const {
  sendEmail,
} = require("../controllers/gmailController");

router.post("/send/:id", sendEmail);

module.exports = router;