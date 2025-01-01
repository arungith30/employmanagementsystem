const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await employee.save();
    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering employee" });
  }
});
// Login route
router.post("/login", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log("Login request body:", req.body);

    // Destructure email and password from request body
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate a JWT
    const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
    const role = employee.role;
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // Set the token as a cookie and respond
    res
      .cookie("token", token, {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "lax", // Controls cross-site behavior
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({ message: "Login successful", token, role });
  } catch (error) {
    console.error("Error in /login route:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});
// Logout
router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .clearlocalstorage("token")
    .json({ message: "Logged out successfully" });
});

// Role-Based Middleware
const verifyToken = (role) => (req, res, next) => {
  try {
    const token = req.localstorage.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (role && decoded.role !== role)
      return res.status(403).json({ error: "Forbidden" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { router, verifyToken };
