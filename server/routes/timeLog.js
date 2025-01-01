const express = require("express");
const TimeLog = require("../models/Timelogs");
const { verifyToken } = require("./auth");
const router = express.Router();

// Employee: Log time
router.post("/log", verifyToken("employee"), async (req, res) => {
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
router.get("/all", verifyToken("admin"), async (req, res) => {
  try {
    const timeLogs = await TimeLog.find().populate("employeeId taskId");
    res.json(timeLogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching time logs" });
  }
});

module.exports = router;
