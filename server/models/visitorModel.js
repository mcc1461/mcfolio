const mongoose = require("mongoose");
const crypto = require("crypto");
const { enforceDailyLimit } = require("../config/dailyLimiting"); // Or use environment variables

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
VisitorSchema.index({ ip: 1, date: 1 }, { unique: true }); // Ensure unique visitor per day
const Visitor = mongoose.model("Visitor", VisitorSchema);

// Counter Schema
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", CounterSchema);

// Function to increment visitor count
const incrementVisitorCount = async (ip) => {
  try {
    // Hash the IP address for privacy
    const hash = crypto.createHash("sha256").update(ip).digest("hex");

    if (enforceDailyLimit) {
      const today = new Date().toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

      // Attempt to create a new visitor document
      const newVisitor = new Visitor({ ip: hash, date: today });
      await newVisitor.save();

      // If successful, update and return the global count
      return await updateGlobalVisitorCount();
    } else {
      // If daily limit is not enforced, increment the global counter
      return await incrementGlobalCounter();
    }
  } catch (error) {
    if (error.code === 11000 && enforceDailyLimit) {
      // Duplicate key error: visitor already counted today, return current count
      return await getCurrentVisitorCount();
    } else {
      console.error("Error accessing MongoDB:", error);
      throw error;
    }
  }
};

// Helper function to update global visitor count based on Visitor collection
const updateGlobalVisitorCount = async () => {
  const count = await Visitor.countDocuments();

  // Store the latest count in Counter collection
  await Counter.findOneAndUpdate(
    { _id: "visitorCount" },
    { count },
    { upsert: true, new: true }
  );

  return count;
};

// Helper function to increment the global counter when daily limit is not enforced
const incrementGlobalCounter = async () => {
  const result = await Counter.findOneAndUpdate(
    { _id: "visitorCount" },
    { $inc: { count: 1 } },
    { upsert: true, new: true } // Create if not exists, return updated document
  );
  return result.count;
};

// Function to retrieve the current visitor count
const getCurrentVisitorCount = async () => {
  if (enforceDailyLimit) {
    // Return the number of unique visitors in the database
    const count = await Visitor.countDocuments();
    return count;
  } else {
    // Return the global counter value
    const result = await Counter.findOne({ _id: "visitorCount" });
    return result ? result.count : 0;
  }
};

module.exports = {
  Visitor,
  Counter,
  incrementVisitorCount,
  getCurrentVisitorCount,
};
