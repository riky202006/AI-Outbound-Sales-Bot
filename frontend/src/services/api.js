import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;

// ==============================
// LEADS
// ==============================

export const addLead = (leadData) =>
  API.post("/leads", leadData);

export const getLeads = () =>
  API.get("/leads");

export const updateLead = (id, leadData) =>
  API.put(`/leads/${id}`, leadData);

export const deleteLead = (id) =>
  API.delete(`/leads/${id}`);

// ⭐ NEW
export const updateLeadStatus = (id, status) =>
  API.patch(`/leads/${id}/status`, {
    status,
  });

// ==============================
// AI EMAIL GENERATION
// ==============================

export const generateEmail = ({
  leadId,
  prompt,
  tone,
  length,
  cta,
}) =>
  API.post("/ai/generate", {
    leadId,
    prompt,
    tone,
    length,
    cta,
  });


// ==============================
// EMAILS
// ==============================

export const getEmails = () =>
  API.get("/emails");

export const saveEmail = (emailData) =>
  API.post("/emails", emailData);

export const deleteEmail = (id) =>
  API.delete(`/emails/${id}`);

export const updateEmail = (id, emailData) =>
  API.put(`/emails/${id}`, emailData);

// ==============================
// GMAIL
// ==============================

export const sendEmail = (id) =>
  API.post(`/gmail/send/${id}`);

// ==============================
// AUTH
// ==============================

export const getGmailStatus = () =>
  API.get("/auth/status");

export const disconnectGmail = () =>
  API.delete("/auth/disconnect");