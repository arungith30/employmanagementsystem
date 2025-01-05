const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { router: authRoutes } = require("./routes/auth");
const cookieParser = require("cookie-parser");

const employeeRoutes = require("./routes/employeeRoutes");

const taskRoutes = require("./routes/taskRoutes");
const timeLogRoutes = require("./routes/timeLog");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const MONGO_URI = process.env.db_url;
// MongoDB Connection
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/timelogs", timeLogRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occurred",
  });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
