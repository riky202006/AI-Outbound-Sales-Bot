import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

import { addLead } from "../../services/api";

function LeadForm({ refreshLeads }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    additional_context: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await addLead(formData);

      console.log("Lead Added:", res.data);

      // Refresh table automatically
      if (refreshLeads) {
        await refreshLeads();
      }

      toast.success("Lead added successfully!");

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        company: "",
        email: "",
        additional_context: "",
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to add lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8">

      <h2 className="text-3xl font-bold mb-2">
        Add New Lead
      </h2>

      <p className="text-slate-400 mb-8">
        Enter lead information to generate personalized AI outreach.
      </p>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >

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
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <TextArea
          name="additional_context"
          rows={4}
          placeholder="Additional Context"
          value={formData.additional_context}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="primary"
          icon={<Plus size={18} />}
          className="w-full"
        >
          {loading ? "Adding Lead..." : "Add Lead"}
        </Button>

      </form>

    </Card>
  );
}

export default LeadForm;