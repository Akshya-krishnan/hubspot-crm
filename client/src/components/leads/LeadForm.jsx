import { useState } from "react";
import { createLead } from "../../services/leadService";
import Input from "../common/Input";
import Button from "../common/Button";
import toast from "react-hot-toast";

const LeadForm = ({ onClose, onLeadCreated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    leadSource: "",
    lifecycleStage: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createLead(formData);

    toast.success("Lead created successfully");

    onLeadCreated();

    onClose();

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      leadSource: "",
      lifecycleStage: "",
    });

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to create lead"
    );
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
      />

      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter last name"
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />

      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
      />

      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Enter company"
      />

      <div>
        <label className="block mb-2 text-sm font-medium">
          Lead Source
        </label>

        <select
          name="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Lead Source</option>
          <option value="Website">Website</option>
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Lifecycle Stage
        </label>

        <select
          name="lifecycleStage"
          value={formData.lifecycleStage}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Stage</option>
          <option value="Subscriber">Subscriber</option>
          <option value="Lead">Lead</option>
          <option value="Marketing Qualified Lead">
            Marketing Qualified Lead
          </option>
          <option value="Sales Qualified Lead">
            Sales Qualified Lead
          </option>
          <option value="Opportunity">Opportunity</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">

        <Button
  type="button"
  onClick={onClose}
  className="bg-gray-300 text-black hover:bg-gray-400 w-auto px-6"
>
  Cancel
</Button>
        <Button
          type="submit"
          className="w-auto px-6"
        >
          Save Lead
        </Button>

      </div>

    </form>
  );
};

export default LeadForm;