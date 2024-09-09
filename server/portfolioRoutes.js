//portfolioRoutes.js will contain all the routes for the portfolio data.

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portfolioModel");

// *********** AUTH ROUTES *********** //

router.get("/login", async (req, res) => {
  res.send("Login page");
});

// @desc Get all portfolio data
router.get("/portfolio", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const experiences = await Experience.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    res.status(200).json({
      intros,
      abouts,
      experiences,
      projects,
      contacts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.log("Portfolio data is taken successfully");
  console.log(Intro);
});

// *********** EXPERIENCE ROUTES *********** //

// @desc Get all experiences
router.get("/experiences", authMiddleware, async (req, res) => {
  try {
    const experiences = await Experience.find();
    console.log(experiences);
    res.json(experiences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get experience by ID
router.get("/experiences/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Add experience data
router.post("/experiences", authMiddleware, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const data = await experience.save();
    res.status(201).json({
      data,
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update experience data
router.put("/experiences/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({
      data: experience,
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete experience data
router.delete("/experiences/:id", authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** PROJECT ROUTES *********** //

// @desc Get all projects
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get project by ID
router.get("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Add project data
router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    const data = await project.save();
    res.status(201).json({
      data,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update project data
router.put("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      data: project,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete project data
router.delete("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** INTRO ROUTES *********** //

// @desc  Get intro data
router.get("/intro", authMiddleware, async (req, res) => {
  try {
    const intros = await Intro.find();
    res.status(200).send({
      data: intros,
      success: true,
      message: "Intro Info is taken successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update intro data
router.put("/intro", authMiddleware, async (req, res) => {
  try {
    const intros = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      data: intros,
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** ABOUT ROUTES *********** //

// @desc Get about data
router.get("/about", authMiddleware, async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json({
      data: about,
      success: true,
      message: "About info is taken successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update about data
router.put("/about", authMiddleware, async (req, res) => {
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
      message: "About updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** CONTACT ROUTES *********** //

// @desc Get contact data
router.get("/contact", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      data: contacts,
      success: true,
      message: "Contact info is taken successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update contact data
router.put("/contact", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      data: contacts,
      success: true,
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
