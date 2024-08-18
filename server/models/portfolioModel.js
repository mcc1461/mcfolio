const mongoose = require("mongoose");

// Define schemas
const introSchema = new mongoose.Schema(
  {
    welcomeText: { type: String, required: true, min: 6, max: 255 },
    firstName: { type: String, required: true, min: 6, max: 255 },
    lastName: { type: String, required: true, min: 6, max: 255 },
    caption: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 6, max: 255 },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

const aboutSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true, min: 6, max: 255 },
    title: { type: String, required: true, min: 6, max: 255 },
    desc1: { type: String, required: true },
    desc2: { type: String },
    desc3: { type: String },
    desc4: { type: String },
    skills: { type: Array, required: true },
  },
  { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
  {
    period: { type: String, required: true, min: 6, max: 255 },
    location: { type: Array, required: true },
    role: { type: String, required: true, min: 6, max: 255 },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, min: 6, max: 255 },
    title: { type: String, required: true, min: 6, max: 255 },
    desc: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    videoUrl: { type: String, required: true, min: 6, max: 255 },
    name: { type: String, required: true, min: 6, max: 255 },
    linkedinUrl: { type: String, required: true, min: 6, max: 255 },
    location: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    expertise: { type: String, required: true, min: 6, max: 255 },
  },
  { timestamps: true }
);

// Export models
module.exports = {
  Intro: mongoose.model("Intro", introSchema, "intro"),
  About: mongoose.model("About", aboutSchema, "about"),
  Experience: mongoose.model("Experience", experienceSchema, "experiences"),
  Project: mongoose.model("Project", projectSchema, "projects"),
  Contact: mongoose.model("Contact", contactSchema, "contact"),
};
