const mongoose = require("mongoose");
const crypto = require("crypto");
const { enforceDailyLimit } = require("../config/dailyLimiting"); // Or use environment variables

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  date: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now, expires: "7d" }, // Expire document after 7 days
  // This line includes expiration of the document after 7 days which causes decrement on the count of visitors after 7 days of the visit, so that the count of visitors is not accurate. For this reason, this line is commented out and changed with the line below which does not include expiration of the document.
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Expire document after 7 days
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

      // If successful, count the total number of unique visitors
      const count = await Visitor.countDocuments();
      return count;
    } else {
      // If daily limit is not enforced, increment the global counter
      const count = await incrementGlobalCounter();
      return count;
    }
  } catch (error) {
    if (error.code === 11000 && enforceDailyLimit) {
      // Duplicate key error: visitor already counted today
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
