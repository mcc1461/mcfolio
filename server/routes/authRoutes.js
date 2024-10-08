const express = require("express");
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const Admin = require("../models/adminModel"); // Mongoose Admin model
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware for protected routes

const router = express.Router(); // Express Router

// *********** ADMIN REGISTRATION ROUTE *********** //
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  // Check if the special code for admin registration is correct
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin and save to the database
    const admin = new Admin({ email, password }); // Pass the plain password
    await admin.save();

    // Generate a JWT token with the isAdmin flag
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: "3h" } // Token expiration time of 3 hours
    );

    console.log("Admin registered successfully, token generated:", token); // Log the success message
    return res.status(201).json({ token }); // Respond with the token
  } catch (error) {
    console.error("Server error during registration:", error); // Log any server error
    return res.status(500).json({ message: "Server error" }); // Respond with server error
  }
});

// *********** ADMIN LOGIN ROUTE *********** //
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found with this email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Admin found:", admin);

    // Compare the entered password with the hashed password in the database
    const isMatch = await admin.comparePassword(password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for admin:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with the isAdmin flag
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful, token generated:", token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Server error during login:", error); // Log the error
    return res.status(500).json({ message: "Server error during login" });
  }
});

// *********** PROTECTED ADMIN DASHBOARD ROUTE *********** //
router.get("/admin-dashboard", authMiddleware, (req, res) => {
  // Only accessible if the token is valid and the user is an admin
  console.log("Admin dashboard accessed by:", req.user); // Log the user accessing the dashboard
  return res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router; // Export the router for use in the main app
