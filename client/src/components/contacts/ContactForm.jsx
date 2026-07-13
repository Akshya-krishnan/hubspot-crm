import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";

import {
  createContact,
  updateContact,
} from "../../services/contactService";

const ContactForm = ({
  contact,
  onClose,
  onContactCreated,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    leadSource: "",
    lifecycleStage: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        leadSource: contact.leadSource || "",
        lifecycleStage: contact.lifecycleStage || "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        leadSource: "",
        lifecycleStage: "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      return toast.error("First Name is required");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      if (contact) {
        await updateContact(contact._id, formData);
        toast.success("Contact updated successfully");
      } else {
        await createContact(formData);
        toast.success("Contact created successfully");
      }

      onContactCreated();
      onClose();

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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
          disabled={loading}
          className="w-auto px-6"
        >
          {loading
            ? "Saving..."
            : contact
            ? "Update Contact"
            : "Save Contact"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;