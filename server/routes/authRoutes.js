const express = require("express");
const router = express.Router();

const { test } = require("../controllers/authController");

router.get("/xx", test);

module.exports = router;
