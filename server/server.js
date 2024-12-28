const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  console.log(`app running on ${process.env.PORT}`);
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log should appear here
});
