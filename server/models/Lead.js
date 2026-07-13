const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      default: "",
    },

    leadSource: {
      type: String,
      enum: [
        "Website",
        "Referral",
        "Facebook",
        "LinkedIn",
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

    // NEW
    isConverted: {
      type: Boolean,
      default: false,
    },

    // NEW
    convertedContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);