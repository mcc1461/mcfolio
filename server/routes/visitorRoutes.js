const express = require("express");
const router = express.Router();
const {
  updateVisitorCount,
  getVisitorCount,
} = require("../controllers/visitorController");

// POST request to update visitor count
router.post("/visitor-count", updateVisitorCount);

// GET request to retrieve visitor count
router.get("/visitor-count", getVisitorCount);

module.exports = router;
