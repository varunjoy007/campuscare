const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "In Progress",
        "Resolved",
        "Closed",
      ],
      default: "Pending",
    },

    image: {
      type: String,
      default: null,
    },
    aiPredictedCategory: {
  type: String,
  default: null,
},
aiConfidence: {
  type: Number,
  default: null,
},

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedDepartment: {
      type: String,
      default: null,
    },

    adminRemark: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);