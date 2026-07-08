import { useEffect, useState } from "react";
import { getEmails } from "../../services/api";
import EmailList from "./EmailList";
import EmailViewer from "./EmailViewer";

function EmailCenter() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await getEmails();

      setEmails(res.data);

      if (res.data.length > 0) {
        setSelectedEmail(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEmails = emails.filter((email) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      email.subject.toLowerCase().includes(searchText) ||
      email.recipient.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      email.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          📧 Email Center
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all your AI generated outreach emails.
        </p>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="🔍 Search emails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            outline-none
            focus:border-cyan-400
          "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-40
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            px-4
            py-3
          "
        >
          <option>All</option>
          <option>Draft</option>
          <option>Sent</option>
        </select>

      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-12 gap-6">

        {/* Email List */}

        <div className="col-span-12 lg:col-span-4">

          <EmailList
            emails={filteredEmails}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />

        </div>

        {/* Email Viewer */}

        <div className="col-span-12 lg:col-span-8">

          <EmailViewer
            email={selectedEmail}
            refreshEmails={fetchEmails}
            setSelectedEmail={setSelectedEmail}
          />

        </div>

      </div>

    </div>
  );
}

export default EmailCenter;