const express = require("express");

const router = express.Router();

const {
  getLeads,
  addLead,
  deleteLead,
  updateStatus,
} = require("../controllers/leadController");

// =======================
// GET ALL LEADS
// =======================

router.get("/", getLeads);

// =======================
// ADD LEAD
// =======================

router.post("/", addLead);

// =======================
// DELETE LEAD
// =======================

router.delete("/:id", deleteLead);

// =======================
// UPDATE STATUS
// =======================

router.patch("/:id/status", updateStatus);

module.exports = router;