const express = require("express");
const TimeLog = require("../models/Timelogs");
const { verifyToken } = require("./auth");
const router = express.Router();

// Employee: Log time
router.post("/log", async (req, res) => {
  try {
    const { taskId, startTime, endTime } = req.body;
    const timeLog = new TimeLog({
      employeeId: req.user.id,
      taskId,
      startTime,
      endTime,
    });
    await timeLog.save();
    res.status(201).json({ message: "Time logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging time" });
  }
});

// Admin: Get all time logs
router.get("/all", async (req, res) => {
  try {
    const timeLogs = await TimeLog.find().populate("employeeId taskId");
    res.json(timeLogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching time logs" });
  }
});
// Approve/Reject Time Log (Admin Only)
router.put("/:id", async (req, res) => {
  const { approved } = req.body;

  try {
    const log = await TimeLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Time log not found" });

    log.approved = approved;
    await log.save();
    res.json({ message: `Time log ${approved ? "approved" : "rejected"}` });
  } catch (err) {
    res.status(400).json({ error: "Failed to update time log" });
  }
});

module.exports = router;
