const pool = require("../config/db");

// =======================
// GET ALL LEADS
// =======================

exports.getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC;"
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch leads",
      details: err.message,
    });

  }
};

// =======================
// ADD LEAD
// =======================

exports.addLead = async (req, res) => {

  const {
    first_name,
    last_name,
    company,
    email,
    additional_context,
  } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  try {

    const result = await pool.query(
      `
      INSERT INTO leads
      (
        first_name,
        last_name,
        company,
        email,
        additional_context,
        status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,'New'
      )
      RETURNING *;
      `,
      [
        first_name,
        last_name,
        company,
        email,
        additional_context,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to add lead",
      details: err.message,
    });

  }
};

// =======================
// DELETE LEAD
// =======================

exports.deleteLead = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      "DELETE FROM leads WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Lead not found",
      });

    }

    res.json({
      message: "Lead deleted successfully",
      deletedLead: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Delete failed",
      details: err.message,
    });

  }

};

// =======================
// UPDATE STATUS
// =======================

exports.updateStatus = async (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE leads
      SET status=$1
      WHERE id=$2
      RETURNING *;
      `,
      [status, id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Lead not found",
      });

    }

    res.json({
      message: "Status updated",
      lead: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Status update failed",
      details: err.message,
    });

  }

};