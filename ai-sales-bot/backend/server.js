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
// DELETE LEAD
app.delete('/api/leads/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM leads WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Lead not found"
      });
    }

    res.json({
      message: "Lead deleted successfully",
      deletedLead: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to delete lead",
      details: err.message
    });
  }
});

// UPDATE LEAD STATUS
app.patch("/api/leads/:id/status", async (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE leads
      SET status = $1
      WHERE id = $2
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
      message: "Status updated successfully",
      lead: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to update status",
      details: err.message,
    });

  }

});

// GENERATE AI EMAIL
app.post('/api/ai/generate', async (req, res) => {
const {
  leadId,
  prompt,
  tone,
  length,
  cta,
} = req.body;

  if (!leadId) {
    return res.status(400).json({
      error: "leadId is required"
    });
  }

  try {
    // Fetch lead from database
    const leadResult = await pool.query(
      "SELECT * FROM leads WHERE id = $1",
      [leadId]
    );

    if (leadResult.rows.length === 0) {
      return res.status(404).json({
        error: "Lead not found"
      });
    }

    const lead = leadResult.rows[0];

const promptText = `
You are an elite B2B outbound sales copywriter.

Generate a highly personalized cold outreach email.

Return ONLY valid JSON.

The JSON format MUST be:

{
  "subject":"...",
  "body":"..."
}

Rules:

- Tone: ${tone}
- Length: ${length}
- Call To Action: ${cta}

Additional AI Instructions:

${prompt || "None"}

Lead Information:

Name: ${lead.first_name} ${lead.last_name}

Company: ${lead.company}

Email: ${lead.email}

Context:

${lead.additional_context || "None"}

Requirements:

- Professional
- Personalized
- No markdown
- No code block
- Mention the company naturally
- Mention the context if available
- End with:

"The Sales Team"
`;
    // Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });

    const text = response.text.trim();

    // Parse JSON returned by Gemini
    const email = JSON.parse(text);

    res.json({
      leadId: lead.id,
      recipient: lead.email,
      subject: email.subject,
      body: email.body,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Gemini AI generation failed",
      details: err.message,
    });
  }
});

app.get('/', (req, res) => res.send('AI Outbound Sales Bot Backend running on Free Tier!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));