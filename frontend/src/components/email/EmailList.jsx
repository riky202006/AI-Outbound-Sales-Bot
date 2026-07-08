import Card from "../common/Card";
import { Mail } from "lucide-react";

function EmailList({
  emails,
  selectedEmail,
  setSelectedEmail,
}) {
  return (
    <Card className="h-[calc(100vh-140px)] overflow-hidden flex flex-col">

      {/* Header */}

      <div className="p-5 border-b border-white/10 shrink-0">

        <h2 className="text-xl font-bold">
          Inbox
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          {emails.length} Emails
        </p>

      </div>

      {/* Email List */}

      <div className="overflow-y-auto flex-1">

        {emails.length === 0 ? (

          <div className="flex items-center justify-center h-full text-slate-400">
            No emails found.
          </div>

        ) : (

          emails.map((email) => {

            const active =
              selectedEmail?.id === email.id;

            return (

              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`
                  cursor-pointer
                  border-b
                  border-white/5
                  px-5
                  py-4
                  transition-all
                  duration-300

                  ${
                    active
                      ? "bg-cyan-500/20 border-l-4 border-l-cyan-400"
                      : "hover:bg-white/5"
                  }
                `}
              >

                <div className="flex gap-3">

                  {/* Avatar */}

                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-cyan-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Mail size={18} />
                  </div>

                  {/* Details */}

                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start">

                      <h3 className="font-semibold truncate">

                        {email.subject}

                      </h3>

                      <span className="text-xs text-slate-500">

                        {new Date(email.created_at).toLocaleDateString()}

                      </span>

                    </div>

                    <p className="text-sm text-slate-400 truncate mt-1">

                      {email.recipient}

                    </p>

                    <div className="mt-3">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs

                          ${
                            email.status === "Draft"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-green-500/20 text-green-300"
                          }
                        `}
                      >
                        {email.status}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

    </Card>
  );
}

export default EmailList;