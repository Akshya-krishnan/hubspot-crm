import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";

import {
  createCompany,
  updateCompany,
} from "../../services/companyService";

const CompanyForm = ({
  company,
  onClose,
  onCompanyCreated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    industry: "",
    phone: "",
    website: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        domain: company.domain || "",
        industry: company.industry || "",
        phone: company.phone || "",
        website: company.website || "",
        address: company.address || "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Company name is required.");
      return;
    }

    try {
      setLoading(true);

      if (company) {
        await updateCompany(company._id, formData);
        toast.success("Company updated successfully.");
      } else {
        await createCompany(formData);
        toast.success("Company created successfully.");
      }

      onCompanyCreated();
      onClose();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
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
        label="Company Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter company name"
      />

      <Input
        label="Domain"
        name="domain"
        value={formData.domain}
        onChange={handleChange}
        placeholder="example.com"
      />

      <Input
        label="Industry"
        name="industry"
        value={formData.industry}
        onChange={handleChange}
        placeholder="Software"
      />

      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 9876543210"
      />

      <Input
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="https://example.com"
      />

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Company address"
      />

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
          {loading
            ? "Saving..."
            : company
            ? "Update Company"
            : "Save Company"}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;