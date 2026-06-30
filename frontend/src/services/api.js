import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;

// -----------------------------

export const addLead = (leadData) => API.post("/leads", leadData);

export const getLeads = () => API.get("/leads");

export const generateEmail = (leadId) =>
  API.post("/ai/generate", { leadId });