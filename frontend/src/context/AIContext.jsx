import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

import { generateEmail } from "../services/api";

const AIContext = createContext();

export function AIProvider({ children }) {
  const [selectedLead, setSelectedLead] = useState(null);

  const [generatedEmail, setGeneratedEmail] = useState({
    recipient: "",
    subject: "",
    body: "",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  const [aiSettings, setAISettings] = useState({
    prompt: "",
    tone: "Professional",
    length: "Medium",
    cta: "Book Demo",
  });

  const generateAIEmail = async () => {
    if (!selectedLead) {
      toast.error("Please select a lead first.");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await generateEmail({
        leadId: selectedLead.id,
        ...aiSettings,
      });

      setGeneratedEmail(res.data);

      toast.success("AI Email Generated!");

    } catch (err) {
      console.error(err);
      toast.error("Failed to generate email.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        selectedLead,
        setSelectedLead,

        generatedEmail,
        setGeneratedEmail,

        aiSettings,
        setAISettings,

        loadingAI,

        generateAIEmail,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(AIContext);
}