const { google } = require("googleapis");
const pool = require("../config/db");
const oauth2Client = require("../config/google");

// ============================
// SEND EMAIL
// ============================

exports.sendEmail = async (req, res) => {

  try {

    const { id } = req.params;

    // Get Email Draft
    const emailResult = await pool.query(
      "SELECT * FROM emails WHERE id=$1",
      [id]
    );

    if (emailResult.rows.length === 0) {
      return res.status(404).json({
        error: "Email not found",
      });
    }

    const email = emailResult.rows[0];

    // Get Gmail Token
    const tokenResult = await pool.query(
      "SELECT * FROM gmail_tokens LIMIT 1"
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({
        error: "Connect Gmail first.",
      });
    }

    const token = tokenResult.rows[0];

    oauth2Client.setCredentials({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const message = [
      `From: ${token.email}`,
      `To: ${email.recipient}`,
      `Subject: ${email.subject}`,
      "",
      email.body,
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    // Update Email Status
    await pool.query(
      `
      UPDATE emails
      SET
        status='Sent',
        sent_at=NOW()
      WHERE id=$1
      `,
      [id]
    );

    // Update Lead Status
    await pool.query(
      `
      UPDATE leads
      SET status='Contacted'
      WHERE id=$1
      `,
      [email.lead_id]
    );

    res.json({
      message: "Email sent successfully!",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });

  }

};