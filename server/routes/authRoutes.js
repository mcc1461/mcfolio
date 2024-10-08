const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// *********** ADMIN LOGIN ROUTE *********** //
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found with this email:", email); // Debugging: log the email that was checked
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Admin found:", admin); // Log the admin object to check the fetched data

    // Debugging: Display the plain password and the hashed password for comparison
    console.log("Password received (plain):", password);
    console.log("Hashed password from DB:", admin.password);

    // Compare the provided plain password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password comparison result:", isMatch); // Log result of password comparison

    if (!isMatch) {
      console.log("Password does not match for admin with email:", email); // Debugging: log mismatched password attempt
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If the password matches, generate the JWT token
    const token = jwt.sign(
      { id: admin._id, isAdmin: true }, // Payload: admin ID and isAdmin flag
      process.env.JWT_SECRET, // Secret for signing the JWT
      { expiresIn: "1d" } // Expiration time: 1 day
    );

    console.log("Login successful for admin with email:", email); // Log successful login
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Server error during login:", error); // Log server errors
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** ADMIN REGISTRATION ROUTE *********** //
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  // Check if the provided special code is correct
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    console.log("Invalid admin code"); // Debugging: log invalid special code attempts
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists with email:", email); // Debugging: log duplicate admin registration attempts
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving the admin
    const hashedPassword = await bcrypt.hash(password, 12); // Hash with 12 salt rounds
    console.log("Hashed password for new admin:", hashedPassword); // Debugging: log hashed password for new admin

    // Create new admin and save to the database
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save(); // Save the new admin

    // Generate JWT token with isAdmin flag
    const token = jwt.sign(
      { id: admin._id, isAdmin: true }, // Payload: admin ID and isAdmin flag
      process.env.JWT_SECRET, // Secret for signing the JWT
      { expiresIn: "3h" } // Expiration time: 3 hours
    );

    console.log("Admin registered successfully with email:", email); // Log successful admin registration
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Server error during registration:", error); // Log server errors during registration
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** PROTECTED ADMIN ROUTE *********** //
router.get("/admin-dashboard", authMiddleware, (req, res) => {
  console.log("Admin dashboard accessed by:", req.user); // Log access to the dashboard
  return res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
