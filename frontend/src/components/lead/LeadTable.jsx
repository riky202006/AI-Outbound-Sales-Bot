import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import ConfirmModal from "../common/ConfirmModal";
import EditLeadModal from "./EditLeadModal";
import { useAI } from "../../context/AIContext";
import {
  deleteLead,
  updateLeadStatus,
} from "../../services/api";

function LeadTable({
  leads,
  loading,
  refreshLeads,
}) {
  const {
    selectedLead,
    setSelectedLead,
  } = useAI();

  const [showModal, setShowModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = async () => {

  try {

    await deleteLead(leadToDelete.id);

    toast.success("Lead deleted successfully!");

    if (selectedLead?.id === leadToDelete.id) {
      setSelectedLead(null);
    }

    await refreshLeads();

  } catch (err) {

    console.error(err);

    toast.error("Failed to delete lead.");

  } finally {

    setShowModal(false);
    setLeadToDelete(null);

  }
};
const handleStatusChange = async (leadId, status) => {
  try {

    await updateLeadStatus(leadId, status);

    toast.success("Status updated!");

    await refreshLeads();

  } catch (err) {

    console.error(err);

    toast.error("Failed to update status.");

  }
};
// ===============================
// Search + Status Filter
// ===============================

const filteredLeads = leads.filter((lead) => {

  const searchText = search.toLowerCase();

  const matchesSearch =
    lead.first_name?.toLowerCase().includes(searchText) ||
    lead.last_name?.toLowerCase().includes(searchText) ||
    lead.company?.toLowerCase().includes(searchText) ||
    lead.email?.toLowerCase().includes(searchText);

  const matchesStatus =
    statusFilter === "All" ||
    lead.status === statusFilter;

  return matchesSearch && matchesStatus;

});

  return (
    <>
      <Card className="p-8">

       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

  <div>

    <h2 className="text-3xl font-bold">
      Recent Leads
    </h2>

    {selectedLead && (
      <div className="mt-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30 inline-block">
        Selected:
        {" "}
        {selectedLead.first_name}
        {" "}
        {selectedLead.last_name}
      </div>
    )}

  </div>

  <div className="flex gap-4">

    <input
      type="text"
      placeholder="🔍 Search Leads..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-72
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-2
        outline-none
        focus:border-cyan-400
      "
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="
        rounded-xl
        border
        border-white/10
        bg-[#0f172a]
        px-4
        py-2
      "
    >
      <option>All</option>
      <option>New</option>
      <option>Contacted</option>
      <option>Follow-up</option>
      <option>Booked</option>
    </select>

  </div>

</div>

        {loading ? (
          <p className="text-slate-400">
            Loading leads...
          </p>
        ) : leads.length === 0 ? (
          <p className="text-slate-400">
            No leads found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-left">

                  <th className="py-4">Name</th>

                  <th>Company</th>

                  <th>Email</th>

                  <th>Status</th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredLeads.map((lead) => {

                  const isSelected =
                    selectedLead?.id === lead.id;

                  return (

                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`
                        cursor-pointer
                        border-b
                        transition-all
                        duration-300
                        ${
                          isSelected
                            ? "bg-cyan-500/10 border-cyan-400"
                            : "border-white/5 hover:bg-white/5"
                        }
                      `}
                    >

                      <td className="py-4 font-medium">
                        {lead.first_name} {lead.last_name}
                      </td>

                      <td>
                        {lead.company}
                      </td>

                      <td>
                        {lead.email}
                      </td>

                      <td>

  <select
    value={lead.status}
    onClick={(e) => e.stopPropagation()}
    onChange={(e) =>
      handleStatusChange(
        lead.id,
        e.target.value
      )
    }
    className="
      rounded-lg
      bg-slate-900
      border
      border-cyan-500/20
      px-3
      py-2
      text-cyan-300
      outline-none
      hover:border-cyan-400
    "
  >
    <option value="New">New</option>

    <option value="Contacted">
      Contacted
    </option>

    <option value="Follow-up">
      Follow-up
    </option>

    <option value="Booked">
      Booked
    </option>

  </select>

</td>
                      <td className="text-center">

                        <div className="flex justify-center gap-2">

                          {isSelected ? (

                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-400/30">

                              ✓ Selected

                            </span>

                          ) : (
                              <><button
                                onClick={(e) => {
                                  e.stopPropagation();

                                  setLeadToEdit(lead);

                                  setShowEditModal(true);
                                } }
                                className="p-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition"
                              >
                                <Pencil
                                  size={16}
                                  className="text-cyan-400" />
                              </button><button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLead(lead);
                                } }
                                className="px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400 hover:text-cyan-300 transition"
                              >
                                  Select
                                </button></>

                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setLeadToDelete(lead);
                              setShowModal(true);
                            }}
                            className="p-2 rounded-lg border border-red-500/30 hover:bg-red-500/20 transition"
                          >
                            <Trash2
                              size={16}
                              className="text-red-400"
                            />
                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>
        )}

      </Card>

            <ConfirmModal
        isOpen={showModal}
        title="Delete Lead"
        message={
          leadToDelete
            ? `Are you sure you want to delete ${leadToDelete.first_name} ${leadToDelete.last_name}?`
            : ""
        }
        onCancel={() => {
          setShowModal(false);
          setLeadToDelete(null);
        }}
        onConfirm={handleDelete}
      />

      <EditLeadModal
        isOpen={showEditModal}
        lead={leadToEdit}
        refreshLeads={refreshLeads}
        onClose={() => {
          setShowEditModal(false);
          setLeadToEdit(null);
        }}
      />
    </>
  );
}

export default LeadTable;