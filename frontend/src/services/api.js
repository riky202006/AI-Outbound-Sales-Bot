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