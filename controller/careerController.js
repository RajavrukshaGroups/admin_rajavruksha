const Career = require("../models/career");

const newCareer = async (req, res) => {
  console.log("function called");
  try {
    const {
      title,
      shortTitle,
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
      link
    } = req.body;
    const file = req.file;
    console.log("file", req.file);

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing title." });
    }
    if (!shortTitle || typeof shortTitle !== "string" || shortTitle.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing shortTitle." });
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
    if (!link || typeof link !== "string" || link.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing link." });
    }

    // Validate skills
    let parsedSkills;
    if (!skills) {
      return res.status(400).json({ error: "Skills are required." });
    }
    try {
      // If skills is a JSON string, parse it; otherwise, use it as is
      parsedSkills = typeof skills === "string" ? JSON.parse(skills) : skills;

      if (!Array.isArray(parsedSkills) || parsedSkills.length === 0) {
        return res
          .status(400)
          .json({ error: "Skills must be a non-empty array." });
      }

      // Ensure each skill is a non-empty string
      if (
        parsedSkills.some(
          (skill) => typeof skill !== "string" || skill.trim().length === 0
        )
      ) {
        return res
          .status(400)
          .json({ error: "Each skill must be a non-empty string." });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Invalid skills format. Must be a valid array." });
    }

    // File validation (e.g., only allow image files)
    if (!file) {
      return res.status(400).json({ error: "Please upload a file." });
    }

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.mimetype)) {
      return res
        .status(400)
        .json({ error: "Invalid file type. Only image files are allowed." });
    }

    // Create the new career entry
    const url = file.path;
    const filename = file.filename;

    const newCareer = new Career({
      title,
      shortTitle,
      description,
      qualifications,
      skills: parsedSkills,
      experience,
      salary,
      age,
      timings,
      category,
      jobType,
      location,
      link,
      image: { url, filename },
    });

    await newCareer.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (e) {
    console.error("Error saving career:", e);
    res
      .status(500)
      .json({ error: "An error occurred while saving the career." });
  }
};

const getCareerDetails = async (req, res) => {
  try {
    const careers = await Career.find();
    console.log("careers", careers);
    res.status(200).json({ success: true, data: careers });
  } catch (e) {
    console.error("Error fetching career details", e);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch career details" });
  }
};

const getIndCareerDetails = async (req, res) => {
  try {
    const indCareer = await Career.findById(req.params.id);
    if (!indCareer) {
      return res
        .status(404)
        .json({ success: false, message: "Career not found" });
    }
    res.status(200).json({ success: true, data: indCareer });
  } catch (e) {
    console.error("error fetching career details", e);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch career details" });
  }
};

const deleteCareer = async (req, res) => {
  const careerId = req.params.id;
  try {
    const career = await Career.findByIdAndDelete(careerId);
    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }
    res.status(200).json({ message: "Career deleted successfully" });
  } catch (e) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting career" });
  }
};

const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      shortTitle,
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
      link
    } = req.body;

    const file = req.file;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing title." });
    }
    if (!shortTitle || typeof shortTitle !== "string" || shortTitle.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing shortTitle." });
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
    if (
      !link ||
      typeof link !== "string" ||
      link.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing link." });
    }

    // Parse skills if needed
    let parsedSkills;
    if (!skills) {
      return res.status(400).json({ error: "Skills are required." });
    }
    try {
      // If skills is a JSON string, parse it; otherwise, use it as is
      parsedSkills = typeof skills === "string" ? JSON.parse(skills) : skills;

      if (!Array.isArray(parsedSkills) || parsedSkills.length === 0) {
        return res
          .status(400)
          .json({ error: "Skills must be a non-empty array." });
      }

      // Ensure each skill is a non-empty string
      if (
        parsedSkills.some(
          (skill) => typeof skill !== "string" || skill.trim().length === 0
        )
      ) {
        return res
          .status(400)
          .json({ error: "Each skill must be a non-empty string." });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Invalid skills format. Must be a valid array." });
    }

    // Prepare updated data
    const updatedData = {
      title,
      shortTitle,
      description,
      qualifications,
      skills: parsedSkills,
      experience,
      salary,
      age,
      timings,
      category,
      jobType,
      location,
      link
    };

    if (file) {
      // If a new image is uploaded, include it
      updatedData.image = { url: file.path, filename: file.filename };
    }

    // Update the career in the database
    const updatedCareer = await Career.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedCareer) {
      return res.status(404).json({ error: "Career not found." });
    }

    res.status(200).json({ message: "Career updated successfully!", data: updatedCareer });
  } catch (error) {
    console.error("Error updating career:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the career." });
  }
};

module.exports = {
  newCareer,
  getCareerDetails,
  getIndCareerDetails,
  deleteCareer,
  updateCareer
};
