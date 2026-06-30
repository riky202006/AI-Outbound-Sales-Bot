import Card from "../common/Card";

function LeadTable({ leads, loading }) {
  return (
    <Card className="p-8">

      <h2 className="text-3xl font-bold mb-6">
        Recent Leads
      </h2>

      {loading ? (
        <p className="text-slate-400">Loading leads...</p>
      ) : leads.length === 0 ? (
        <p className="text-slate-400">
          No leads found.
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 text-left">

                <th className="py-3">Name</th>

                <th>Company</th>

                <th>Email</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-4">
                    {lead.first_name} {lead.last_name}
                  </td>

                  <td>{lead.company}</td>

                  <td>{lead.email}</td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                      {lead.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </Card>
  );
}

export default LeadTable;