// models/visitorModel.js
const mongoose = require("mongoose");
const crypto = require("crypto");
const { enforceDailyLimit } = require("../config/dailyLimiting"); // Or use environment variables

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});
VisitorSchema.index({ ip: 1, date: 1 }, { unique: true });
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
      const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

      // Attempt to create a new visitor document
      const newVisitor = new Visitor({ ip: hash, date: today });
      await newVisitor.save();

      // If successful, count the total number of unique visitors
      const count = await Visitor.countDocuments();
      return count;
    } else {
      // No daily limit, increment the global counter
      const count = await incrementGlobalCounter();
      return count;
    }
  } catch (error) {
    if (error.code === 11000 && enforceDailyLimit) {
      // Duplicate key error, visitor already counted today
      const count = await Visitor.countDocuments();
      return count;
    } else {
      console.error("Error accessing MongoDB:", error);
      throw error;
    }
  }
};

// Helper function to increment the global counter
const incrementGlobalCounter = async () => {
  const result = await Counter.findOneAndUpdate(
    { _id: "visitorCount" },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  return result.count;
};

module.exports = {
  Visitor,
  Counter,
  incrementVisitorCount,
};
