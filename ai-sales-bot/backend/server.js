const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

// ADD A NEW LEAD
app.post('/api/leads', async (req, res) => {
  const { first_name, last_name, company, email, additional_context } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const queryText = `
      INSERT INTO leads (first_name, last_name, company, email, additional_context, status)
      VALUES ($1, $2, $3, $4, $5, 'New') RETURNING *;
    `;
    const result = await pool.query(queryText, [first_name, last_name, company, email, additional_context]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add lead", details: err.message });
  }
});

// GET ALL LEADS
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC;');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads", details: err.message });
  }
});

/// GENERATE FREE PERSONALIZED EMAIL USING THE MODERN GEMINI SDK
app.post('/api/ai/generate', async (req, res) => {
  const { leadId } = req.body;
  if (!leadId) return res.status(400).json({ error: "leadId is required" });

  try {
    const leadResult = await pool.query('SELECT * FROM leads WHERE id = $1', [leadId]);
    if (leadResult.rows.length === 0) return res.status(404).json({ error: "Lead not found" });

    const lead = leadResult.rows[0];

    const prompt = `You are an elite outbound sales assistant. Write a short, compelling cold outreach email to a prospective lead.
     Use their details below to personalize it natively. Keep it under 150 words, professional, and include a clear, low-friction call to action.
     Do not include placeholder text like "[Your Name]". Sign off simply as "The Sales Team".
    
    Lead Details:
    - Name: ${lead.first_name} ${lead.last_name}
    - Company: ${lead.company}
    - Custom Context: ${lead.additional_context || "None provided"}`;

    // Fix: Using the correct new client route structure
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    res.json({
      leadId: lead.id,
      recipient: lead.email,
      emailDraft: response.text  // Grabs the generated string directly
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini AI generation failed", details: err.message });
  }
});

app.get('/', (req, res) => res.send('AI Outbound Sales Bot Backend running on Free Tier!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));