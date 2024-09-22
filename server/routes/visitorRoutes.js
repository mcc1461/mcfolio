// routes/visitorRoutes.js
const express = require("express");
const router = express.Router();
const { updateVisitorCount } = require("../controllers/visitorController");

router.post("/", updateVisitorCount);

module.exports = router;
