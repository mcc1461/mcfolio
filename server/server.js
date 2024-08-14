const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Import and use routes
const portfolioRoutes = require("./routes/portfolioRoutes");
app.use("/api/portfolio", portfolioRoutes);

// Database connection
const dbConnection = require("./config/dbConnection");
dbConnection();

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define port and start the server
const port = process.env.PORT || 8061;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
