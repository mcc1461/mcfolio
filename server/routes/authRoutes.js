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
      console.log("Admin not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Admin found:", admin);
    console.log("Password received:", password);
    console.log("Hashed password from DB:", admin.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with isAdmin flag
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Server error during login:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** ADMIN REGISTRATION ROUTE *********** //
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    console.log("Invalid admin code");
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password for new admin:", hashedPassword);

    // Create new admin
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    // Generate JWT token with isAdmin flag
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Server error during registration:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** PROTECTED ADMIN ROUTE *********** //
router.get("/admin-dashboard", authMiddleware, (req, res) => {
  console.log("Admin dashboard accessed by:", req.user);
  return res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
