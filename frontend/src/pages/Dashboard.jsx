import { useEffect, useState } from "react";

import Navbar from "../components/dashboard/Navbar";
import DashboardCards from "../components/dashboard/DashboardCards";

import LeadForm from "../components/lead/LeadForm";
import LeadTable from "../components/lead/LeadTable";

import AIStudio from "../components/ai/AIStudio";
import EmailPreview from "../components/email/EmailPreview";

import { getLeads } from "../services/api";

function Dashboard() {
  // ==========================
  // State
  // ==========================

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);



  // ==========================
  // Fetch Leads
  // ==========================

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await getLeads();

      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-[160px]" />

        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[180px]" />

      </div>

      <Navbar />

      <main className="max-w-[1700px] mx-auto px-6 py-8 space-y-8">

        {/* Dashboard Cards */}

        <DashboardCards leads={leads} />

        {/* Top Section */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Lead Form */}

          <LeadForm
            refreshLeads={fetchLeads}
          />

          <AIStudio />

<EmailPreview />

        </div>

        {/* Lead Table */}

<LeadTable
  leads={leads}
  loading={loading}
  refreshLeads={fetchLeads}
/>
      </main>

    </div>
  );
}

export default Dashboard;