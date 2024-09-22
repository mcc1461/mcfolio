// controllers/visitorController.js
const { incrementVisitorCount } = require("../models/visitorModel");

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
