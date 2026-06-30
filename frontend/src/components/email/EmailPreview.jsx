import Card from "../common/Card";
import Button from "../common/Button";
import {
  Bot,
  Copy,
  Send,
  Sparkles,
  Mail,
} from "lucide-react";

function EmailPreview() {
  return (
    <Card className="p-8 flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">

          <Bot className="text-cyan-400" size={24} />

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Email Preview
          </h2>

          <p className="text-slate-400">
            Gemini AI Generated Outreach
          </p>

        </div>

      </div>

      {/* Recipient */}

      <div className="mb-5">

        <p className="text-sm text-slate-400 mb-2">
          To
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
          john@company.com
        </div>

      </div>

      {/* Subject */}

      <div className="mb-5">

        <p className="text-sm text-slate-400 mb-2">
          Subject
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">

          Reducing Manual Work at Acme Corp

        </div>

      </div>

      {/* Email Body */}

      <div className="flex-1 mb-6">

        <p className="text-sm text-slate-400 mb-2">
          Email
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 h-[320px] overflow-y-auto whitespace-pre-wrap text-slate-300 leading-7">

Hi John,

I noticed Acme Corp has been expanding rapidly, and I thought I'd reach out.

Our AI-powered sales automation platform helps teams reduce repetitive outreach work while increasing response rates through personalized emails generated with AI.

Would you be open to a quick 10-minute conversation next week?

Best regards,

The Sales Team

        </div>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-3 gap-4">

        <Button
          variant="secondary"
          icon={<Copy size={18} />}
        >
          Copy
        </Button>

        <Button
          variant="secondary"
          icon={<Send size={18} />}
        >
          Send
        </Button>

        <Button
          variant="primary"
          icon={<Sparkles size={18} />}
        >
          Generate AI
        </Button>

      </div>

    </Card>
  );
}

export default EmailPreview;