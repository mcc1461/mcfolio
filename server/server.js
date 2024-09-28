const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const visitorRoutes = require("./routes/visitorRoutes");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://127.0.0.1:3000",
  "https://musco.dev",
];

// Database connection
dbConnection();

// Middleware
app.use(
  cors({
    origin: { allowedOrigins },
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use(express.static("public")); // Serve static files from the public folder

// Routes
app.use("/api", portfolioRoutes);
app.use("/api", authRoutes); // Add the auth routes
app.use("/api/visitor-count", visitorRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World from MusCo Portfolio API");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
