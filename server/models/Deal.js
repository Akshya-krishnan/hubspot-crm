const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    dealName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    stage: {
      type: String,
      enum: [
        "Appointment Scheduled",
        "Qualified to Buy",
        "Presentation Scheduled",
        "Decision Maker Bought In",
        "Contract Sent",
        "Closed Won",
        "Closed Lost",
      ],
      default: "Appointment Scheduled",
    },

    closeDate: {
      type: Date,
    },

    description: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    contact: {
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

module.exports = mongoose.model("Deal", dealSchema);