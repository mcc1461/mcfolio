const mongoose = require("mongoose");
import { experiences } from "../../client/src/resources/experiences";
import { projects } from "../../client/src/resources/projects";

const portfolioSchema = new mongoose.Schema(
  {
    welcomeText: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    firstName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    caption: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    description: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  {
    timestamps: true,
  }
);

const aboutSchema = new mongoose.Schema(
  {
    lotttieURL: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    aboutTitle: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    aboutDescription: {
      type: String,
      required: true,
    },

    aboutSkills: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const experiencesSchema = new mongoose.Schema(
  {
    experiencePeriod: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    experienceLocation: {
      type: Array,
      required: true,
    },
    experienceRole: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    experienceDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectsSchema = new mongoose.Schema(
  {
    projectType: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    projectTitle: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    projectImage_Url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const contactSchema = new mongoose.Schema(
  {
    contactLogoImage_Url: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    contactDeveloperName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    contactLinkedInAddress: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    contactDeveloperEmail: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    contactDeveloperExpertise: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    contactDeveloperLocation: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },

  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
const About = mongoose.model("About", aboutSchema);
const Experiences = mongoose.model("Experiences", experiencesSchema);
const Projects = mongoose.model("Projects", projectsSchema);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Portfolio,
  About,
  Experiences,
  Projects,
  Contact,
};
// module.exports = mongoose.model("Portfolio", portfolioSchema);
// module.exports = mongoose.model("About", aboutSchema);
// module.exports = mongoose.model("Experiences", experiencesSchema);
// module.exports = mongoose.model("Projects", projectsSchema);
// module.exports = mongoose.model("Contact", contactSchema);
