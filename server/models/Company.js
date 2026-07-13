const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
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

module.exports = mongoose.model("Company", companySchema);