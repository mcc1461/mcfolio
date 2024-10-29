const mongoose = require("mongoose");
const crypto = require("crypto");
const { enforceDailyLimit } = require("../config/dailyLimiting"); // Ensure this is correctly set to true

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure unique visitor per day
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
      const today = new Date().toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
      console.log(`Attempting to log visitor: IP=${hash}, Date=${today}`);

      // Attempt to create a new visitor document
      const newVisitor = new Visitor({ ip: hash, date: today });
      await newVisitor.save();
      console.log("New visitor logged successfully.");

      // Increment the global visitor count
      await incrementGlobalCounter();

      // Return the new global count
      const count = await getCurrentVisitorCount();
      return count;
    } else {
      // If daily limit is not enforced, simply increment the global counter
      const count = await incrementGlobalCounter();
      return count;
    }
  } catch (error) {
    if (error.code === 11000 && enforceDailyLimit) {
      console.log("Visitor already counted for today.");
      // If already counted for today, return the current global count
      const count = await getCurrentVisitorCount();
      return count;
    } else {
      console.error("Error accessing MongoDB:", error);
      throw error;
    }
  }
};

// Increment the global visitor counter
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
  const result = await Counter.findOne({ _id: "visitorCount" });
  return result ? result.count : 0;
};

module.exports = {
  Visitor,
  Counter,
  incrementVisitorCount,
  getCurrentVisitorCount,
};
