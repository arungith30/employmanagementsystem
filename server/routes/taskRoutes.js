// server/routes/taskRoutes.js

const express = require("express");
const Task = require("../models/Task");
const { verifyToken } = require("./auth");

const router = express.Router();

// Create Task (Admin Only)
router.post("/", async (req, res) => {
  const { employeeId, name, description, deadline } = req.body;
  try {
    const newTask = new Task({ employeeId, name, description, deadline });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

// Get Tasks (Employee or Admin)
router.get("/", async (req, res) => {
  try {
    const tasks =
      req.user.role === "admin"
        ? await Task.find()
        : await Task.find({ employeeId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update Task (Admin or Assigned Employee)
router.put("/:id", async (req, res) => {
  const { name, description, status, deadline, hoursLogged } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (
      req.user.role !== "admin" &&
      req.user.id !== task.employeeId.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    Object.assign(task, { name, description, status, deadline, hoursLogged });
    await task.save();
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to update task" });
  }
});

// Route: GET /api/tasks/filter
router.get("/filter", async (req, res) => {
  try {
    // Extract query parameters
    const { status, project } = req.query;

    // Build a filter object dynamically
    const filter = {};
    if (status) filter.status = status;
    if (project) filter.project = { $regex: project, $options: "i" }; // Case-insensitive search

    // Fetch tasks based on the filter
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

module.exports = router;
