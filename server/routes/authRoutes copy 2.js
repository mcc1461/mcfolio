const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing and comparing passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const Admin = require("../models/adminModel");

const router = express.Router(); // Router for handling API routes

// *********** ADMIN LOGIN ROUTE *********** //
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password provided with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for the admin
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET, // Use your environment secret key
      { expiresIn: "1d" } // Token expiration (1 day)
    );

    // Respond with the token
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** ADMIN REGISTRATION ROUTE *********** //
router.post("/admin-register", async (req, res) => {
  const { email, password, specialCode } = req.body;

  // Validate special code for admin registration
  if (specialCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(400).json({ message: "Invalid admin code!" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving the new admin
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({ email, password: hashedPassword });

    await admin.save(); // Save the new admin to the database

    // Generate a JWT token for the new admin
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET, // Use your environment secret key
      { expiresIn: "3h" } // Token expiration (3 hours)
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** GET ALL ADMIN DATA *********** //
// This route will fetch and return all admin data (you can customize this as needed)
router.get("/admin-data", authMiddleware, async (req, res) => {
  try {
    // Fetch all admin data from the database
    const admins = await Admin.find({}, { password: 0 }); // Exclude password field for security reasons

    // Return the admin data in JSON format
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
