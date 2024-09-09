const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // Assuming you have an Admin model
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin registration route
// Admin registration route
router.post("/register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  // Validate special code
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const admin = new Admin({ email, password });
    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Protected Admin Route
router.get("/admin", authMiddleware, (req, res) => {
  // Only accessible if the token is valid
  res.send("Welcome to the Admin Panel");
});

module.exports = router;
