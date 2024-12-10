const Career = require("../models/career");

const newCareer = async (req, res) => {
  console.log("function called");
  try {
    const {
      title,
      description,
      qualifications,
      skills,
      experience,
      salary,
      age,
      timings,
      category,
      jobType,
      location,
    } = req.body;
    const file = req.file;
    console.log("file", req.file);

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing title." });
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing description." });
    }
    if (
      !qualifications ||
      typeof qualifications !== "string" ||
      qualifications.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Invalid or missing qualifications." });
    }

    if (
      !experience ||
      typeof experience !== "string" ||
      experience.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing experience." });
    }

    if (!salary || typeof salary !== "string" || salary.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing salary." });
    }

    if (!age || typeof age !== "string" || age.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing age." });
    }

    if (
      !timings ||
      typeof timings !== "string" ||
      timings.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing timings." });
    }

    if (
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing category." });
    }

    if (
      !jobType ||
      typeof jobType !== "string" ||
      jobType.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing jobType." });
    }

    if (
      !location ||
      typeof location !== "string" ||
      location.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing location." });
    }

    if (!file) {
      return res.status(400).json({ message: "Please Upload a file." });
    }
    const url = file.path;
    const filename = file.filename;
    const newCareer = new Career({
      title,
      description,
      qualifications,
      skills,
      experience,
      salary,
      age,
      timings,
      category,
      jobType,
      location,
      image: { url, filename },
    });
    await newCareer.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  newCareer,
};
