const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing and comparison
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const Admin = require("../models/adminModel"); // Admin model from your database

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware to protect routes

// *********** ADMIN LOGIN ROUTE *********** //
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found with this email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Admin found:", admin);

    // Debugging: Display the plain password and hashed password for comparison
    console.log("Password received (plain):", password);
    console.log("Hashed password from DB:", admin.password);

    // Compare password: bcrypt compares the plain text password with the hashed password from the database
    const isMatch = await bcrypt.compare(password, admin.password);

    // Log the result of password comparison
    console.log("Password comparison result:", isMatch);

    // If password does not match, return error
    if (!isMatch) {
      console.log("Password does not match for admin with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If the password matches, generate the JWT token
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful for admin with email:", email);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Server error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** ADMIN REGISTRATION ROUTE *********** //
// This route handles admin registration requests
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body; // Extract email, password, and special code from request body

  // Check if the provided specialCode matches the environment variable for admin registration
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    console.log("Invalid admin code");
    return res.status(400).json({ message: "Invalid admin code!" }); // Return error if the special code is incorrect
  }

  try {
    // Check if an admin already exists with the same email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      return res.status(400).json({ message: "Admin already exists" }); // Return error if the admin is already registered
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with 12 salt rounds
    console.log("Hashed password for new admin:", hashedPassword);

    // Create a new admin and save it to the database
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save(); // Save the new admin to the database

    // Generate a JWT token with an "isAdmin" flag for the new admin
    const token = jwt.sign(
      { id: admin._id, isAdmin: true }, // Payload with admin ID and isAdmin flag
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: "3h" } // Token expiration time of 3 hours
    );

    console.log("Admin registered successfully:", email);
    return res.status(201).json({ token }); // Return the generated token to the client
  } catch (error) {
    console.error("Server error during registration:", error);
    return res.status(500).json({ message: "Server error" }); // Return server error for unexpected issues
  }
});

// *********** PROTECTED ADMIN ROUTE *********** //
// This route is protected by an authentication middleware
router.get("/admin-dashboard", authMiddleware, (req, res) => {
  console.log("Admin dashboard accessed by:", req.user);
  return res.status(200).json({ message: "Welcome to the Admin Dashboard" }); // Protected route for admins
});

module.exports = router;
