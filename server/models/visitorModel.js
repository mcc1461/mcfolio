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

const incrementVisitorCount = async (ip) => {
  try {
    const hash = crypto.createHash("sha256").update(ip).digest("hex");

    if (enforceDailyLimit) {
      const today = new Date().toISOString().slice(0, 10);
      const newVisitor = new Visitor({ ip: hash, date: today });

      await newVisitor.save();
      return await updateGlobalVisitorCount(); // Update global count only if new visitor is added
    } else {
      return await incrementGlobalCounter();
    }
  } catch (error) {
    if (error.code === 11000 && enforceDailyLimit) {
      return await getCurrentVisitorCount(); // Visitor already counted today
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

// Updated getCurrentVisitorCount to ensure fallback
const getCurrentVisitorCount = async () => {
  if (enforceDailyLimit) {
    return await Visitor.countDocuments();
  } else {
    const result = await Counter.findOne({ _id: "visitorCount" });
    return result ? result.count : 0; // Fallback to 0 if no record exists
  }
};

module.exports = {
  Visitor,
  Counter,
  incrementVisitorCount,
  getCurrentVisitorCount,
};
