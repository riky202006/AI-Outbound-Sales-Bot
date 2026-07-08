import { useState, useEffect } from "react";
import {
  Trash2,Pencil,Save,X,Send,} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";

import {
  deleteEmail,
  updateEmail,
  sendEmail,
} from "../../services/api";

function EmailViewer({
  email,
  refreshEmails,
  setSelectedEmail,
}) {

  const [editing, setEditing] = useState(false);

  const [editedSubject, setEditedSubject] = useState("");

  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {

    if (email) {

      setEditedSubject(email.subject);

      setEditedBody(email.body);

      setEditing(false);

    }

  }, [email]);

  if (!email) {
    return (
      <Card className="h-[700px] flex items-center justify-center">
        <p className="text-slate-400 text-lg">
          Select an email to preview
        </p>
      </Card>
    );
  }

  // ==========================
  // DELETE EMAIL
  // ==========================

  const handleDelete = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this email?"
    );

    if (!confirmed) return;

    try {

      await deleteEmail(email.id);

      toast.success("Email deleted successfully!");

      setSelectedEmail(null);

      await refreshEmails();

    } catch (err) {

      console.error(err);

      toast.error("Failed to delete email.");

    }

  };

  // ==========================
  // SAVE EMAIL
  // ==========================

  const handleSave = async () => {

    try {

      await updateEmail(email.id, {
        subject: editedSubject,
        body: editedBody,
      });

      toast.success("Draft updated!");

      setEditing(false);

      await refreshEmails();

    } catch (err) {

      console.error(err);

      toast.error("Failed to update draft.");

    }

  };

  // ==========================
// SEND EMAIL
// ==========================

const handleSend = async () => {

  const confirmed = window.confirm(
    "Send this email now?"
  );

  if (!confirmed) return;

  try {

    await sendEmail(email.id);

    toast.success("Email sent successfully!");

    await refreshEmails();

  } catch (err) {

    console.error(err);

    toast.error(
      err?.response?.data?.error ||
      "Failed to send email."
    );

  }

};
  return (
  <Card className="h-[calc(100vh-140px)] flex flex-col overflow-hidden">

    {/* Sticky Header */}

    <div className="shrink-0 border-b border-white/10 bg-[#0f172a] p-6">

      <div className="flex justify-between items-start gap-6">

        <div className="flex-1">

          {editing ? (

            <input
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                text-2xl
                font-bold
                outline-none
              "
            />

          ) : (

            <h2 className="text-2xl font-bold">
              {email.subject}
            </h2>

          )}

          <div className="flex flex-wrap gap-3 mt-4">

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
              {email.recipient}
            </span>

            <span
              className={`px-3 py-1 rounded-full ${
                email.status === "Draft"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {email.status}
            </span>

          </div>

        </div>

        {/* Buttons ALWAYS visible */}

        <div className="flex gap-2 flex-wrap justify-end">

          {editing ? (

            <>
              <Button
                variant="secondary"
                icon={<X size={18} />}
                onClick={() => {
                  setEditedSubject(email.subject);
                  setEditedBody(email.body);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button
                icon={<Save size={18} />}
                onClick={handleSave}
              >
                Save
              </Button>
            </>

          ) : (

            <Button
              icon={<Pencil size={18} />}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>

          )}

          <Button
            variant="danger"
            icon={<Trash2 size={18} />}
            onClick={handleDelete}
          >
            Delete
          </Button>

         <Button
  icon={<Send size={18} />}
  onClick={handleSend}
  disabled={email.status === "Sent"}
>
  {email.status === "Sent"
    ? "Already Sent"
    : "Send"}
</Button>

        </div>

      </div>

    </div>

    {/* Scrollable Body */}

    <div className="flex-1 overflow-y-auto p-8">

      {editing ? (

        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          className="
            w-full
            min-h-[700px]
            bg-white/5
            border
            border-white/10
            rounded-xl
            p-5
            resize-none
            outline-none
            leading-7
          "
        />

      ) : (

        <div className="whitespace-pre-wrap leading-8 text-[15px]">

          {email.body}

        </div>

      )}

    </div>

  </Card>
);
}

export default EmailViewer;