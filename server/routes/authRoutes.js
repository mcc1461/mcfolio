const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // Assuming you have an Admin model
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Admin login route
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiry time
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin registration route
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  // Validate the special code for admin registration
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Protected Admin Route
router.get("/admin-dashboard", authMiddleware, (req, res) => {
  // Only accessible if the token is valid
  return res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
