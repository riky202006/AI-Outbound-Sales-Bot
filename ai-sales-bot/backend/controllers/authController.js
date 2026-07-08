// ==========================
// GOOGLE CALLBACK
// ==========================

const oauth2Client = require("../config/google");
const { google } = require("googleapis");
const pool = require("../config/db");

// ==========================
// GOOGLE LOGIN
// ==========================

exports.googleLogin = (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  
  res.redirect(url);

};



// ==========================
// GOOGLE LOGIN
// ==========================

exports.googleLogin = (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  res.redirect(url);

};

// ==========================
// GOOGLE CALLBACK
// ==========================

exports.googleCallback = async (req, res) => {

  try {

    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    await pool.query(
      `
      INSERT INTO gmail_tokens
      (
        email,
        access_token,
        refresh_token,
        expiry_date
      )
      VALUES
      (
        $1,$2,$3,$4
      )
      ON CONFLICT (email)
      DO UPDATE SET

        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        expiry_date = EXCLUDED.expiry_date;
      `,
      [
        data.email,
        tokens.access_token,
        tokens.refresh_token,
        tokens.expiry_date,
      ]
    );

    res.redirect("http://localhost:5173/settings");

  } catch (err) {

    console.error(err);

    res.status(500).send(err.message);

  }

};
// ==========================
// GET GMAIL STATUS
// ==========================

exports.getGmailStatus = async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT email FROM gmail_tokens LIMIT 1"
    );

    if (result.rows.length === 0) {

      return res.json({
        connected: false,
      });

    }

    res.json({
      connected: true,
      email: result.rows[0].email,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });

  }

};
exports.disconnectGmail = async (req, res) => {
  try {
    await pool.query("DELETE FROM gmail_tokens");

    res.json({
      message: "Gmail disconnected successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};