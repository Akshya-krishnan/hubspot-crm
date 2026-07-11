const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    leadSource: {
      type: String,
      enum: [
        "Website",
        "Facebook",
        "LinkedIn",
        "Referral",
        "Other",
      ],
      default: "Other",
    },

    lifecycleStage: {
      type: String,
      enum: [
        "Subscriber",
        "Lead",
        "Marketing Qualified Lead",
        "Sales Qualified Lead",
        "Opportunity",
        "Customer",
      ],
      default: "Lead",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);