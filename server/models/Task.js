const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Done"],
      default: "To-Do",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    project: { type: String },
    deadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);