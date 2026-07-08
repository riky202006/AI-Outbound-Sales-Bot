const express = require("express");

const router = express.Router();

const {
  googleLogin,
  googleCallback,
  getGmailStatus,
  disconnectGmail,
} = require("../controllers/authController");

router.get("/google", googleLogin);

router.get("/google/callback", googleCallback);

router.get("/status", getGmailStatus);

router.delete("/disconnect", disconnectGmail);
module.exports = router;