const {
  incrementVisitorCount,
  getCurrentVisitorCount,
} = require("../models/visitorModel");

// Controller for updating visitor count (POST request)
exports.updateVisitorCount = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    const count = await incrementVisitorCount(ip);
    res.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for getting the visitor count (GET request)
exports.getVisitorCount = async (req, res) => {
  try {
    const count = await getCurrentVisitorCount();
    res.json({ count });
  } catch (error) {
    console.error("Error retrieving visitor count:", error);
    res.status(500).json({ error: "Server error" });
  }
};
