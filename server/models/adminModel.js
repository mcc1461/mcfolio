const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin schema definition
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Compare the entered plain password with the hashed password stored in the database
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Use bcrypt to compare passwords
};

// Export the Admin model for use in the app
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
