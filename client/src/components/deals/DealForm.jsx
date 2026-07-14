import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";

import {
  createDeal,
  updateDeal,
} from "../../services/dealService";

const DealForm = ({
  deal,
  onClose,
  onDealCreated,
}) => {
  const [formData, setFormData] = useState({
    dealName: "",
    amount: "",
    company: "",
    contact: "",
    stage: "Appointment Scheduled",
    closeDate: "",
    description: "",
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        dealName: deal.dealName || "",
        amount: deal.amount || "",
        company: deal.company || "",
        contact: deal.contact || "",
        stage: deal.stage || "Appointment Scheduled",
        closeDate: deal.closeDate
          ? deal.closeDate.substring(0, 10)
          : "",
        description: deal.description || "",
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dealName || !formData.amount) {
      toast.error("Deal Name and Amount are required.");
      return;
    }

    try {
      if (deal) {
        await updateDeal(deal._id, formData);
        toast.success("Deal updated successfully.");
      } else {
        await createDeal(formData);
        toast.success("Deal created successfully.");
      }

      onDealCreated();
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Deal Name"
        name="dealName"
        value={formData.dealName}
        onChange={handleChange}
        required
      />

      <Input
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      <Input
        label="Contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
      />

      <div>
        <label className="block mb-2 font-medium">
          Stage
        </label>

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Appointment Scheduled</option>
          <option>Qualified to Buy</option>
          <option>Presentation Scheduled</option>
          <option>Decision Maker Bought In</option>
          <option>Contract Sent</option>
          <option>Closed Won</option>
          <option>Closed Lost</option>
        </select>
      </div>

      <Input
        label="Close Date"
        type="date"
        name="closeDate"
        value={formData.closeDate}
        onChange={handleChange}
      />

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit">
          {deal ? "Update Deal" : "Create Deal"}
        </Button>

        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DealForm;