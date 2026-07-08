const express = require("express");

const router = express.Router();

const {
  getEmails,
  saveEmail,
  deleteEmail,
  updateEmail,
} = require("../controllers/emailController");

router.get("/", getEmails);

router.post("/", saveEmail);

router.delete("/:id", deleteEmail);

router.put("/:id", updateEmail);

module.exports = router;