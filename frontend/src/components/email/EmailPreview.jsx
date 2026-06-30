import { useState } from "react";
import { Copy, RefreshCw, Mail } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";
import { useAI } from "../../context/AIContext";

function EmailPreview() {
  const {
    generatedEmail,
    generateAIEmail,
    loadingAI,
  } = useAI();

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!generatedEmail.body) {
      toast.error("No email generated yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`
      );

      setCopied(true);

      toast.success("Email copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <Card className="p-8 h-full">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            ✨ AI Email Preview
          </h2>

          <p className="text-slate-400">
            Review your generated outreach email.
          </p>

        </div>

      </div>

      {!generatedEmail.body ? (

        <div className="h-[420px] flex flex-col justify-center items-center text-center">

          <Mail
            size={60}
            className="text-cyan-400 mb-6"
          />

          <h3 className="text-xl font-semibold">

            No Email Generated

          </h3>

          <p className="text-slate-400 mt-2">

            Select a lead and click
            <br />
            <strong>Generate AI Email</strong>

          </p>

        </div>

      ) : (

        <>

          <div className="space-y-5">

            <div>

              <p className="text-slate-400 mb-2">

                Recipient

              </p>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

                {generatedEmail.recipient}

              </div>

            </div>

            <div>

              <p className="text-slate-400 mb-2">

                Subject

              </p>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

                {generatedEmail.subject}

              </div>

            </div>

            <div>

              <p className="text-slate-400 mb-2">

                Email Body

              </p>

              <textarea
                value={generatedEmail.body}
                readOnly
                className="
                  w-full
                  h-64
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  p-4
                  resize-none
                  text-white
                  outline-none
                "
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <Button
              variant="secondary"
              icon={<Copy size={18} />}
              onClick={copyEmail}
            >
              {copied ? "Copied!" : "Copy Email"}
            </Button>

            <Button
              icon={<RefreshCw size={18} />}
              onClick={generateAIEmail}
              disabled={loadingAI}
            >
              {loadingAI
                ? "Generating..."
                : "Regenerate"}
            </Button>

          </div>

        </>

      )}

    </Card>
  );
}

export default EmailPreview;