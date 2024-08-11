const express = require("express");
const router = express.Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portfolioModel");

// Define routes
router.get("/data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    res.json({ intros, abouts, experiences, projects, contacts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
