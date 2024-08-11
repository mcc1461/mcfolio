const mongoose = require("mongoose");
import { experiences } from "../../client/src/resources/experiences";
import { projects } from "../../client/src/resources/projects";

const introSchema = new mongoose.Schema(
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
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const aboutSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    title: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    desc1: {
      type: String,
      required: true,
    },
    desc2: {
      type: String,
    },
    desc3: {
      type: String,
    },
    desc4: {
      type: String,
    },

    skills: {
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
    period: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    location: {
      type: Array,
      required: true,
    },
    role: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    desc: {
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
    type: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    title: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    desc: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
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
    videoUrl: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    linkedinUrl: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    location: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },

    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    expertise: {
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

const Intro = mongoose.model("Portfolio", introSchema);
const About = mongoose.model("About", aboutSchema);
const Experiences = mongoose.model("Experiences", experiencesSchema);
const Projects = mongoose.model("Projects", projectsSchema);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Intro,
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
