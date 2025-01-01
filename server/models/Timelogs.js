const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee model
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task", // Reference to the Task model
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes (optional for easy querying)
      default: function () {
        if (this.startTime && this.endTime) {
          return (this.endTime - this.startTime) / (1000 * 60); // Convert ms to minutes
        }
        return null;
      },
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("TimeLog", timeLogSchema);
