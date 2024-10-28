// Import required modules
const express = require("express"); // Import express
const dotenv = require("dotenv"); // Import dotenv
dotenv.config(); // Use dotenv config
const path = require("path"); // Import path module
const cors = require("cors"); // Import cors
const createError = require("http-errors"); // Import http-errors
const dbConnection = require("./config/dbConnection"); // Ensure database connection function is imported

// Determine the environment and load the corresponding .env file
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

// Log environment variables after loading dotenv
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);

// Initialize Express app
const app = express();
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

// Import and use required modules
app.use(cors()); // Enable CORS

app.use(express.static(path.join(__dirname, "public"))); // Serve static files  from the public directory

// Define the port for the server
const port = process.env.PORT || 8000;

// Define allowed origins for CORS
const allowedOrigins = [
  "http://127.0.0.1:3000",
  "https://127.0.0.1:3000",
  "https://musco.dev",
  process.env.CLIENT_ORIGIN, // Ensure CLIENT_ORIGIN is defined
].filter(Boolean); // Removes undefined entries

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

// Import and use your route files
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoutes = require("./routes/authRoutes"); // If applicable
const visitorRoutes = require("./routes/visitorRoutes");

app.use("/api", portfolioRoutes);
app.use("/api", authRoutes); // Add authentication routes if applicable
app.use("/api", visitorRoutes);

// Default root route
app.get("/", (req, res) => {
  res.send("Hello World from MusCo ßPortfolio API");
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
