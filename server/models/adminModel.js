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

// **Hash the password before saving to the database**
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is new or modified
  const salt = await bcrypt.genSalt(12); // Generate salt with 12 rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to the next middleware or save operation
});

// Compare the entered plain password with the hashed password stored in the database
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Use bcrypt to compare passwords
};

// Export the Admin model for use in the app
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
