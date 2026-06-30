import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import TextArea from "../common/TextArea";
import Select from "../common/Select";

import { useAI } from "../../context/AIContext";

function AIStudio() {
  const {
    selectedLead,
    aiSettings,
    setAISettings,
    generateAIEmail,
    loadingAI,
  } = useAI();

  const [prompt, setPrompt] = useState(aiSettings.prompt);
  const [tone, setTone] = useState(aiSettings.tone);
  const [length, setLength] = useState(aiSettings.length);
  const [cta, setCTA] = useState(aiSettings.cta);

  useEffect(() => {
    setAISettings({
      prompt,
      tone,
      length,
      cta,
    });
  }, [prompt, tone, length, cta]);

  const handleGenerate = () => {
    generateAIEmail();
  };

  return (
    <Card className="p-8 h-full">

      <div className="flex items-center gap-3 mb-8">
        <Sparkles size={30} className="text-cyan-400" />

        <div>
          <h2 className="text-3xl font-bold">
            AI Studio
          </h2>

          <p className="text-slate-400">
            Control how Gemini writes your email.
          </p>
        </div>
      </div>

      {/* Selected Lead */}

      <div className="mb-6">

        <label className="text-sm text-slate-400">
          Selected Lead
        </label>

        <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">

          {selectedLead ? (
            <>
              <p className="font-semibold">
                {selectedLead.first_name} {selectedLead.last_name}
              </p>

              <p className="text-slate-400">
                {selectedLead.company}
              </p>

              <p className="text-slate-500 text-sm">
                {selectedLead.email}
              </p>
            </>
          ) : (
            <p className="text-slate-500">
              No lead selected
            </p>
          )}

        </div>

      </div>

      {/* AI Instructions */}

      <div className="mb-6">

        <label className="text-sm text-slate-400 mb-2 block">
          AI Instructions
        </label>

        <TextArea
          rows={5}
          placeholder="Mention our free trial and keep it friendly..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

      </div>

      {/* Quick Suggestions */}

      <div className="flex flex-wrap gap-2 mb-6">

        {[
          "Mention our free trial",
          "Keep it friendly",
          "Focus on ROI",
          "Mention AI automation",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setPrompt(item)}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 transition text-sm"
          >
            {item}
          </button>

        ))}

      </div>

      {/* Settings */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        <Select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          options={[
            "Professional",
            "Friendly",
            "Casual",
            "Persuasive",
          ]}
        />

        <Select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          options={[
            "Short",
            "Medium",
            "Long",
          ]}
        />

        <Select
          value={cta}
          onChange={(e) => setCTA(e.target.value)}
          options={[
            "Book Demo",
            "Schedule Meeting",
            "Reply",
            "Visit Website",
          ]}
        />

      </div>

      <Button
        className="w-full"
        icon={<Sparkles size={18} />}
        onClick={handleGenerate}
        disabled={loadingAI}
      >
        {loadingAI
          ? "Generating AI..."
          : "Generate AI Email"}
      </Button>

    </Card>
  );
}

export default AIStudio;