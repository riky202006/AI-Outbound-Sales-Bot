require('dotenv').config();
const aiRoutes = require("./routes/aiRoutes");
const express = require('express');
const cors = require('cors');
const pool = require("./config/db");
const { GoogleGenAI } = require('@google/genai');
const leadRoutes = require("./routes/leadRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const emailRoutes = require("./routes/emailRoutes");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const gmailRoutes = require("./routes/gmailRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api/gmail", gmailRoutes);

app.use("/api/emails", emailRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
// 2. Initialize Gemini Client with your Free Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Test Database Connection Route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW();');
    res.json({ message: "Successfully connected to Supabase!", timestamp: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});




app.get("/", (req, res) =>
  res.send("LeadPilot Backend is running!")
);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));