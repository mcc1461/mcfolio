const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portfolioModel");
const Admin = require("../models/adminModel"); // Assuming you have an Admin model

// *********** AUTH ROUTES *********** //

// @desc Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// *********** PORTFOLIO ROUTES *********** //

// @desc Get all portfolio data (Public)
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

// *********** EXPERIENCE ROUTES (Protected) *********** //

// @desc Get all experiences (Protected)
router.get("/experiences", authMiddleware, async (req, res) => {
  try {
    const experiences = await Experience.find();
    console.log(experiences);
    res.json(experiences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get experience by ID (Protected)
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

// @desc Add experience data (Protected)
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

// @desc Update experience data (Protected)
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

// @desc Delete experience data (Protected)
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

// *********** PROJECT ROUTES (Protected) *********** //

// @desc Get all projects (Protected)
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get project by ID (Protected)
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

// @desc Add project data (Protected)
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

// @desc Update project data (Protected)
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

// @desc Delete project data (Protected)
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

// *********** INTRO ROUTES (Protected) *********** //

// @desc Get intro data (Protected)
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

// @desc Update intro data (Protected)
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

// *********** ABOUT ROUTES (Protected) *********** //

// @desc Get about data (Protected)
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

// @desc Update about data (Protected)
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

// *********** CONTACT ROUTES (Protected) *********** //

// @desc Get contact data (Protected)
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

// @desc Update contact data (Protected)
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
