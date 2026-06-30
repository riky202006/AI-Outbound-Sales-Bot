import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

import { updateLead } from "../../services/api";
import { useAI } from "../../context/AIContext";

function EditLeadModal({
  isOpen,
  onClose,
  lead,
  refreshLeads,
}) {
  const { selectedLead, setSelectedLead } = useAI();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    additional_context: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        first_name: lead.first_name || "",
        last_name: lead.last_name || "",
        company: lead.company || "",
        email: lead.email || "",
        additional_context: lead.additional_context || "",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await updateLead(
        lead.id,
        formData
      );

      toast.success("Lead updated successfully!");

      await refreshLeads();

      if (selectedLead?.id === lead.id) {
        setSelectedLead(res.data.lead);
      }

      onClose();

    } catch (err) {
      console.error(err);

      toast.error("Failed to update lead.");

    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <Card className="w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          ✏️ Edit Lead
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <Input
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <Input
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <Input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

        </div>

        <div className="mt-5">

          <TextArea
            rows={5}
            name="additional_context"
            placeholder="Additional Context"
            value={formData.additional_context}
            onChange={handleChange}
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </Card>

    </div>
  );
}

export default EditLeadModal;