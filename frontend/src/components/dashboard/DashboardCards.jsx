import {
  Users,
  UserPlus,
  PhoneCall,
  Clock3,
  BadgeCheck,
} from "lucide-react";

import StatCard from "./StatCard";

function DashboardCards({ leads }) {
  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const followUpLeads = leads.filter(
    (lead) => lead.status === "Follow-up"
  ).length;

  const bookedLeads = leads.filter(
    (lead) => lead.status === "Booked"
  ).length;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Leads"
        value={totalLeads}
        color="text-cyan-400"
        icon={<Users size={40} />}
      />

      <StatCard
        title="New Leads"
        value={newLeads}
        color="text-green-400"
        icon={<UserPlus size={40} />}
      />

      <StatCard
        title="Contacted"
        value={contactedLeads}
        color="text-orange-400"
        icon={<PhoneCall size={40} />}
      />

      <StatCard
        title="Follow-up"
        value={followUpLeads}
        color="text-yellow-400"
        icon={<Clock3 size={40} />}
      />

      <StatCard
        title="Booked"
        value={bookedLeads}
        color="text-violet-400"
        icon={<BadgeCheck size={40} />}
      />

    </div>
  );
}

export default DashboardCards;