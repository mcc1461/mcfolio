const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoutes = require("./routes/authRoutes"); // Import auth routes

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8001;

const allowedOrigins = ["http://localhost:3000", "https://127.0.0.1:3000"];

// Database connection
dbConnection();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api", portfolioRoutes);
app.use("/api", authRoutes); // Add the auth routes

// Default route
app.get("/", (req, res) => {
  res.send("Hello World from MusCo Portfolio API");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
