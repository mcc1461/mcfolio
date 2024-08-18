const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();
const port = process.env.PORT || 8061;

// Database connection
dbConnection();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api", portfolioRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
