const express = require("express");
const authController = require("../controllers/auth.controller");
const photoController = require("../controllers/photo.controller");
const router = express.Router();


router.post("/", authController.authenticate, photoController.createPhoto);

router.get("/", photoController.getPhoto)

module.exports = router;