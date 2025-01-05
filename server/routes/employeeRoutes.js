// server/routes/employeeRoutes.js

const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Assuming employees are stored in the User model
const { verifyToken } = require("./auth");

// GET /api/employees - Admin only
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ role: "employee" }, "name email");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

module.exports = router;
