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

// @desc    Get all portfolio data
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

// @desc    Update intro data
router.post("/data/intro", async (req, res) => {
  // **Changed route to /data/intro**
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update about data
router.post("/data/about", async (req, res) => {
  // **Changed route to /data/about**
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      data: about,
      success: true,
      message: "About data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update experience data
router.post("/data/experience", async (req, res) => {
  // **Changed route to /data/experience**
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      data: experience,
      success: true,
      message: "Experience data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update project data
router.post("/data/project", async (req, res) => {
  // **Changed route to /data/project**
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      data: project,
      success: true,
      message: "Project data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update contact data
router.post("/data/contact", async (req, res) => {
  // **Changed route to /data/contact**
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      data: contact,
      success: true,
      message: "Contact data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
