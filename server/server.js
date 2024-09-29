const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const visitorRoutes = require("./routes/visitorRoutes");

// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../../server/.env.${env}`) });

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

const allowedOrigins = [
  "http://127.0.0.1:3000",
  "https://127.0.0.1:3000",
  "https://musco.dev",
  process.env.CLIENT_ORIGIN,
];

// server/src/index.js
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

// Database connection
dbConnection();

// Middleware
app.use(
  cors({
    origin: allowedOrigins.filter(Boolean), // Remove undefined if CLIENT_ORIGIN is not set
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // If you need to send cookies or auth headers
  })
);

app.use(express.json());

app.use(express.static("public")); // Serve static files from the public folder

// Routes
app.use("/api", portfolioRoutes);
app.use("/api", authRoutes); // Add the auth routes
app.use("/api", visitorRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World from MusCo Portfolio API");
});

// Start server
app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on port ${port}`);
});
