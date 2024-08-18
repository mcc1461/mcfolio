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
router.get("/portfolio", async (req, res) => {
  console.log("Request received at /api/portfolio");
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

// *********** EXPERIENCE ROUTES *********** //

// @desc Get all experiences
router.get("/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get experience by ID
router.get("/experiences/:id", async (req, res) => {
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
router.post("/experience", async (req, res) => {
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
router.put("/experience/:id", async (req, res) => {
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
router.delete("/experience/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** PROJECT ROUTES *********** //

// @desc Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get project by ID
router.get("/projects/:id", async (req, res) => {
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
router.post("/projects", async (req, res) => {
  console.log("POST /projects request received with data:", req.body);
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
router.put("/projects/:id", async (req, res) => {
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
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** INTRO ROUTES *********** //

// @desc    Update intro data
router.post("/intro", async (req, res) => {
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
      message: "Intro updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// *********** ABOUT ROUTES *********** //

// @desc    Update about data
router.post("/about", async (req, res) => {
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

// @desc    Update contact data
router.post("/contact", async (req, res) => {
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
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
