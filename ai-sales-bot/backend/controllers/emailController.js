const pool = require("../config/db");

// ========================
// GET ALL EMAILS
// ========================

exports.getEmails = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT *
      FROM emails
      ORDER BY created_at DESC;
    `);

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch emails",
      details: err.message,
    });

  }
};

// ========================
// SAVE EMAIL
// ========================

exports.saveEmail = async (req, res) => {

  const {
    lead_id,
    recipient,
    subject,
    body,
    status,
    source,
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO emails
      (
        lead_id,
        recipient,
        subject,
        body,
        status,
        source
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6
      )
      RETURNING *;
      `,
      [
        lead_id,
        recipient,
        subject,
        body,
        status || "Draft",
        source || "AI",
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to save email",
      details: err.message,
    });

  }

};
// ========================
// DELETE EMAIL
// ========================

exports.deleteEmail = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      "DELETE FROM emails WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Email not found",
      });

    }

    res.json({
      message: "Email deleted successfully",
      email: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to delete email",
      details: err.message,
    });

  }

};
// ========================
// UPDATE EMAIL
// ========================

exports.updateEmail = async (req, res) => {

  const { id } = req.params;

  const {
    subject,
    body,
  } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE emails
      SET
        subject = $1,
        body = $2
      WHERE id = $3
      RETURNING *;
      `,
      [
        subject,
        body,
        id,
      ]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Email not found",
      });

    }

    res.json({
      message: "Email updated successfully",
      email: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to update email",
      details: err.message,
    });

  }

};