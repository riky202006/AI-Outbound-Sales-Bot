const pool = require("../config/db");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateEmail = async (req, res) => {
  const {
    leadId,
    prompt,
    tone,
    length,
    cta,
  } = req.body;

  if (!leadId) {
    return res.status(400).json({
      error: "leadId is required",
    });
  }

  try {
    const leadResult = await pool.query(
      "SELECT * FROM leads WHERE id = $1",
      [leadId]
    );

    if (leadResult.rows.length === 0) {
      return res.status(404).json({
        error: "Lead not found",
      });
    }

    const lead = leadResult.rows[0];

    const promptText = `
You are an elite B2B outbound sales copywriter.

Generate a highly personalized cold outreach email.

Return ONLY valid JSON.

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });

    const text = response.text.trim();

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
};