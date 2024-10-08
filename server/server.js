// Import required modules
const dotenv = require("dotenv"); // Import dotenv
const path = require("path"); // Import path module
const express = require("express");
const cors = require("cors");
const createError = require("http-errors"); // To handle 404 errors
const dbConnection = require("./config/dbConnection"); // Ensure database connection function is imported

// Determine the environment and load the corresponding .env file
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

// Configure dotenv to load environment variables from the specified file
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Define allowed origins for CORS
const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://127.0.0.1:3000",
  "https://musco.dev",
  process.env.CLIENT_ORIGIN, // Ensure CLIENT_ORIGIN is defined
].filter(Boolean); // Removes undefined entries

// Log CLIENT_ORIGIN for debugging
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

// Database connection
dbConnection(); // Make sure database connection is established

// Middleware setup
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allows cookies and authentication headers
  })
);

app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve static files

// Import and use your route files
const portfolioRoutes = require("./routes/portfolioRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Ensure the correct route is imported
const visitorRoutes = require("./routes/visitorRoutes");

app.use("/api", portfolioRoutes);
app.use("/api", adminRoutes); // Use admin routes
app.use("/api", visitorRoutes);

// Default root route
app.get("/", (req, res) => {
  res.send("Hello World from MusCo Portfolio API");
});

// Handle 404 errors for unknown routes
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Customize the error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
