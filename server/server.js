const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const portfolioRoutes = require("./routes/portfolioRoutes");

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

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
