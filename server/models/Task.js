const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Done"],
      default: "To-Do",
    },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    deadline: { type: Date, required: true },
    hoursLogged: { type: Number, default: 0 },
    project: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
