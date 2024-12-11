const express = require("express");
const router = express.Router();
const multer = require("multer");
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})
const usersController = require("../controller/userController");
const careerController = require("../controller/careerController");

router.post("/login", usersController.login);
router.post("/newCareer", upload.single("image"), careerController.newCareer);

module.exports = router;
