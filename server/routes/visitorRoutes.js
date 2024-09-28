// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();
const { updateVisitorCount } = require("../controllers/visitorController");

router.post("/visitor-count", updateVisitorCount);

router.get("/visitor-count", (req, res) => {
  res.send("Visitor count route");
});

module.exports = router;
