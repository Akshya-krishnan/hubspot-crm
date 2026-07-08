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
      enum: ["Website", "Referral", "Event", "Other"],
      default: "Other",
    },

    lifecycleStage: {
      type: String,
      enum: ["Lead", "Qualified", "Customer"],
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